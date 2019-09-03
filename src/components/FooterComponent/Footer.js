import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Footer.css";

class Footer extends Component {
  render() {
    const { itemLeft, handleClearCompleted, countTodo } = this.props;
    return (
      <div className="Footer">
        <p className="item-left">{itemLeft} item left</p>
        <ul className="filters">
          <li>
            <a href="#all" className="selected">
              All
            </a>
          </li>
          <li>
            <a href="#active">Active</a>
          </li>
          <li>
            <a href="#complete">Complete</a>
          </li>
        </ul>
        {countTodo !== itemLeft && (
          <p className="clear-all" onClick={handleClearCompleted}>
            Clear all completed
          </p>
        )}
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.itemLeft === this.props.itemLeft) {
      return false;
    }

    return true;
  }
}

Footer.propTypes = {
  itemLeft: PropTypes.number,
  handleClearCompleted: PropTypes.func,
  countTodo: PropTypes.number
};

export default Footer;
