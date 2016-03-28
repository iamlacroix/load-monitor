import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import styles from './styles.css';

class Grid extends React.Component {
  static propTypes = {
    h: PropTypes.number,
    grid: PropTypes.func,
    gridType: PropTypes.oneOf(['x', 'y']),
    alert: PropTypes.bool,
    subtle: PropTypes.bool,
  }

  componentDidMount() { this.renderGrid(); }
  componentDidUpdate() { this.renderGrid(); }

  renderGrid = () => {
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.grid);
  }

  render() {
    const translate = `translate(0, ${this.props.h})`;
    const className = this.props.subtle ? styles.subtle : styles.grid;

    return (
      <g className={className} transform={this.props.gridType === 'x' ? translate : ''} />
    );
  }
}

export default Grid;
