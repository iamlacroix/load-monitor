import React from 'react';
import Stats from '../Stats/Stats';
import History from '../History/History';
import styles from './styles.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <h1>Datadog Monitor</h1>
        <Stats />
        <History />
      </div>
    );
  }
}

export default App;
