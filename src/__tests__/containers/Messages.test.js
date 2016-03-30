import 'babel-polyfill';
import test from 'tape';
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import createStore from '../../store/configureStore';
import Messages from '../../containers/Messages/Messages';
import styles from '../../containers/Messages/styles.css';
import { receiveAverages } from '../../actions';
import recordFactory from '../_testHelpers/recordFactory';

test('messages integration test', (t) => {
  t.plan(3);

  const store = createStore();

  const wrapper = mount(<Provider store={store}><Messages /></Provider>);

  t.ok(
    wrapper.contains(<p className={styles.none}>There are no recent alerts.</p>),
    'component should display a message stating there are not any alerts'
  );

  store.dispatch(receiveAverages(recordFactory(1.25)));
  store.dispatch(receiveAverages(recordFactory(1.25)));

  // The sagas are asynchronous, so we need to wait a moment for the status to change.
  setTimeout(() => {
    t.equal(
      wrapper.find('li').first().text().slice(0, 28),
      'High load generated an alert',
      'component should display the alert message'
    );

    store.dispatch(receiveAverages(recordFactory(0)));

    setTimeout(() => {
      t.equal(
        wrapper.find('li').first().text().slice(0, 23),
        'Load returned to normal',
        'component should display the back-to-normal status message'
      );
    }, 100);
  }, 100);
});
