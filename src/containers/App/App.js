import React from 'react';
import Stats from '../Stats/Stats';
import History from '../History/History';
import Messages from '../Messages/Messages';
import styles from './styles.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>Load Monitor</h1>
        <section className={styles.stats}><Stats /></section>
        <section className={styles.history}><History /></section>
        <section className={styles.messages}><Messages /></section>
      </div>
    );
  }
}

export default App;
