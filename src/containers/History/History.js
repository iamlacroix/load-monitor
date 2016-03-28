import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LineChart from '../../components/LineChart/LineChart';
import selector from './selector';
import styles from './styles.css';

const mapToChartData = averages => averages.map(record => ({
  x: new Date(record.recordedAt),
  y: record.amount,
}));

@connect(selector)
class History extends React.Component {
  static propTypes ={
    averages: PropTypes.array,
  }

  render() {
    const { averages } = this.props;
    const chartData = averages.length > 0 ? mapToChartData(averages) : [{
      x: new Date(),
      y: 3,
    }];

    return (
      <div className={styles.root}>
        <LineChart chartData={chartData} />
      </div>
    );
  }
}

export default History;
