import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SyncLoader from 'halogen/SyncLoader';
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
    const loading = <SyncLoader color="#222" className={styles.loading} />;

    return (
      <div className={styles.root}>
        <figure>
          <figcaption>Current Load</figcaption>
          {Number.isFinite(avg1Min) ? <h3>{avg1Min}</h3> : loading}
        </figure>
        <figure>
          <figcaption>Last 5 Minutes</figcaption>
          {Number.isFinite(avg5Min) ? <h3>{avg5Min}</h3> : loading}
        </figure>
        <figure>
          <figcaption>Last 15 Minutes</figcaption>
          {Number.isFinite(avg15Min) ? <h3>{avg15Min}</h3> : loading}
        </figure>
      </div>
    );
  }
}

export default Stats;
