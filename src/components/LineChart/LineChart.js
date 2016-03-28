import React, { PropTypes } from 'react';
import d3 from 'd3';
import Axis from '../Axis/Axis';
import Grid from '../Grid/Grid';
import styles from './styles.css';

class LineChart extends React.Component {
  static propTypes = {
    chartData: PropTypes.array,
  }

  render() {
    const { chartData } = this.props;

    const width = 800;
    const height = 300;
    const margin = { top: 5, right: 50, bottom: 20, left: 50 };
    const chartWidth = width - (margin.left + margin.right);
    const chartHeight = height - (margin.top + margin.bottom);

    const xDomain = [new Date(Date.now() - 600000), new Date()];
    const x = d3.time.scale().range([0, chartWidth]).domain(xDomain).clamp(true);

    const yMax = Math.max.apply(null, chartData.map(data => data.y)) + 1;
    const y = d3.scale.linear().range([chartHeight, 0]).domain([0, yMax]);

    const line = d3.svg.line()
        .x(d => x(d.x))
        .y(d => y(d.y))
        .interpolate('cardinal');

    const lineThreshold = d3.svg.line()
        .x(d => x(d.x))
        .y(() => y(1)) // 1 is the the alert threshold
        .interpolate('cardinal');

    const transform = `translate(${margin.left}, ${margin.top})`;

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(Math.round(yMax));

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .tickValues(x.ticks(d3.time.minute, 1))
      .tickFormat(d3.time.format('%-H:%M'))
      .ticks(d3.time.minute, 1);

    const yGrid = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(Math.round(yMax))
      .tickSize(-chartWidth, 0, 0)
      .tickFormat('');

    const yGridHalves = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(Math.round(yMax) * 2)
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
        <svg width={width} height={height}>
          <g transform={transform}>
            <Grid h={chartHeight} grid={yGrid} gridType="y" />
            <Grid h={chartHeight} grid={yGridHalves} gridType="y" subtle />
            <Grid h={chartHeight} grid={xGridMinute} gridType="x" />
            <Grid h={chartHeight} grid={xGrid10Seconds} gridType="x" subtle />
            <Axis h={chartHeight} axis={yAxis} axisType="y" />
            <Axis h={chartHeight} axis={xAxis} axisType="x" />
            <path className={styles.line} d={line(chartData)} strokeLinecap="round" />
            <path className={styles.threshold} d={lineThreshold(xDomain.map(d => ({ x: d })))} />
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart;
