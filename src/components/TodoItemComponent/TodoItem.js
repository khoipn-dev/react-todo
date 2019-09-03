import React, { useState, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./TodoItem.css";
import checkDone from "../image/check-done.svg";
import check from "../image/check.svg";
import clear from "../image/clear.svg";

function TodoItem({ item, handleTickComplete, handleTickClear, handleOnEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(item.title);
  const [newTitle, setNewTitle] = useState(item.title);
  const editInput = useRef(null);

  async function openEditInput() {
    await setIsEdit(true);
    editInput.current.focus();
  }

  function closeEditInput () {
    setNewTitle(currentTitle);
    setIsEdit(false);
  }

  function handleOnChange(event) {
    setNewTitle(event.target.value);
  }

  function handleKeyUpEnter(event) {
    if (event.keyCode === 13) {
      if (event.target.value.trim() === "") {
        return;
      }
      setCurrentTitle(newTitle);
      handleOnEdit(item, newTitle);
      setIsEdit(false);
    }
  }

  let className = classNames({ TodoItemComplete: item.isComplete });
  let url = check;
  if (item.isComplete) {
    url = checkDone;
  }

  return (
    <div className="TodoItem">
      <img
        className="tick-complete"
        onClick={handleTickComplete}
        alt="done"
        src={url}
        width={32}
      />
      {!isEdit && (
        <p onDoubleClick={openEditInput} className={className}>
          {item.title}
        </p>
      )}
      {isEdit && (
        <input
          ref={editInput}
          className="edit-input"
          type="text"
          onBlur={closeEditInput}
          onKeyUp={handleKeyUpEnter}
          onChange={event => handleOnChange(event)}
          value={newTitle}
        />
      )}
      <img
        className="clear-button"
        onClick={handleTickClear}
        alt="delete"
        src={clear}
        width={15}
        height={15}
      />
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired
  }),
  handleTickComplete: PropTypes.func.isRequired,
  handleTickClear: PropTypes.func.isRequired,
  handleOnEdit: PropTypes.func.isRequired
};

export default TodoItem;
