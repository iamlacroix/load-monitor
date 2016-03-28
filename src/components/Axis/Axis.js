import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import styles from './styles.css';

class Axis extends React.Component {
  static propTypes = {
    h: PropTypes.number,
    axis: PropTypes.func,
    axisType: PropTypes.oneOf(['x', 'y']),
  }

  componentDidMount() { this.renderAxis(); }
  componentDidUpdate() { this.renderAxis(); }

  renderAxis = () => {
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axis);
  }

  render() {
    const translate = `translate(0,${this.props.h})`;

    return (
      <g className={styles.axis} transform={this.props.axisType === 'x' ? translate : ''} />
    );
  }
}

export default Axis;
