import React, { PropTypes } from 'react';
import d3 from 'd3';
import Axis from '../Axis/Axis';
import Grid from '../Grid/Grid';
import { get10SecondInterval } from '../../lib/getInterval';
import styles from './styles.css';

class LineChart extends React.Component {
  static propTypes = {
    chartData: PropTypes.array,
    maxWidth: PropTypes.number,
  }

  render() {
    const { chartData, maxWidth } = this.props;
    // Get the current 10 second block, then shift back to the previous block.
    // We don't want to display the block until after the whole block is in the past.
    const latest10SecondBlock = get10SecondInterval(Date.now()) - 10000;
    const dateMin = new Date(latest10SecondBlock - 600000); // 10m * 60s * 1000ms
    const dateMax = new Date(latest10SecondBlock);
    // Limit records to the range of the x-axis
    const chartDataFiltered = chartData.filter(record => record.x >= dateMin && record.x <= dateMax);

    const width = Math.min(maxWidth, 800);
    const height = 300;
    const margin = { top: 5, right: 10, bottom: 20, left: 35 };
    const chartWidth = width - (margin.left + margin.right);
    const chartHeight = height - (margin.top + margin.bottom);

    const xDomain = [dateMin, dateMax];
    const x = d3.time.scale().range([0, chartWidth]).domain(xDomain).clamp(true);

    const yMax = Math.max.apply(null, chartDataFiltered.map(data => data.y)) + 1;
    const y = d3.scale.linear().range([chartHeight, 0]).domain([0, yMax]);

    const line = d3.svg.line()
        .x(d => x(d.x))
        .y(d => y(d.y));

    const transform = `translate(${margin.left}, ${margin.top})`;

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(8);

    const xValuesFactor = chartWidth > 700 ? 1 : 2;
    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickValues(x.ticks(d3.time.minute, xValuesFactor))
      .tickFormat(d3.time.format('%-H:%M'))
      .ticks(d3.time.minute, 1);

    const yGrid = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(8)
      .tickSize(-chartWidth, 0, 0)
      .tickFormat('');

    const yGridHalves = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(16)
      .tickSize(-chartWidth, 0, 0)
      .tickFormat('');

    const xGridMinute = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(d3.time.minute, 1)
      .tickSize(-chartWidth, 0, 0)
      .tickFormat('');

    const xGrid10Seconds = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(d3.time.second, 10)
      .tickSize(-chartWidth, 0, 0)
      .tickFormat('');

    return (
      <div>
        <svg width={width} height={height} className={styles.svg}>
          <g transform={transform}>
            <Grid h={chartHeight} grid={yGrid} gridType="y" />
            <Grid h={chartHeight} grid={yGridHalves} gridType="y" subtle />
            <Grid h={chartHeight} grid={xGridMinute} gridType="x" />
            <Grid h={chartHeight} grid={xGrid10Seconds} gridType="x" subtle />
            <Axis h={chartHeight} axis={yAxis} axisType="y" />
            <Axis h={chartHeight} axis={xAxis} axisType="x" />
            <path className={styles.line} d={line(chartDataFiltered)} />
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
