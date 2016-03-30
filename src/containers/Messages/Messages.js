import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { HEALTH_WARNING } from '../../constants/healthStatus';
import selector from './selector';
import styles from './styles.css';

const getClass = (status) => (status === HEALTH_WARNING ? styles.warn : styles.ok);

@connect(selector)
class Messages extends React.Component {
  static propTypes ={
    messages: PropTypes.array,
  }

  render() {
    const { messages } = this.props;

    const messageList = messages.map(msg =>
      <li key={msg.id} className={getClass(msg.status)}>
        <p>{msg.text}</p>
      </li>
    );

    const noMessages = <p className={styles.none}>There are no recent alerts.</p>;

    const content = messages.length > 0 ?
      <ul className={styles.list}>{messageList}</ul> : noMessages;

    return (
      <div className={styles.root}>
        <h2 className={styles.title}>Alerts</h2>
        {content}
      </div>
    );
  }
}

export default Messages;
