import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import selector from './selector';
import styles from './styles.css';

@connect(selector)
class Stats extends React.Component {
  static propTypes ={
    avg1Min: PropTypes.number,
    avg5Min: PropTypes.number,
    avg15Min: PropTypes.number,
  }

  render() {
    const { avg1Min, avg5Min, avg15Min } = this.props;

    return (
      <div className={styles.root}>
        <figure>
          <figcaption>Current Load</figcaption>
          <h3>{avg1Min}</h3>
        </figure>
        <figure>
          <figcaption>Last 5 Minutes</figcaption>
          <h3>{avg5Min}</h3>
        </figure>
        <figure>
          <figcaption>Last 15 Minutes</figcaption>
          <h3>{avg15Min}</h3>
        </figure>
      </div>
    );
  }
}

export default Stats;
