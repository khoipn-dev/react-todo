import React, { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./components/TodoItemComponent/TodoItem";
import Footer from "./components/FooterComponent/Footer";
import allComplete from "./components/image/allComplete.svg";
import nonComplete from "./components/image/nonComplete.svg";
import { TodoStore } from "./FirebaseConnect";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [itemLeft, setItemLeft] = useState(0);

  useEffect(() => {
    TodoStore.on("value", snapshot => {
      let arrTodo = [];

      snapshot.forEach(element => {
        arrTodo.push({
          id: element.key,
          title: element.val().title,
          isComplete: element.val().isComplete
        });
      });

      setTodos(arrTodo);
    });
  }, []);

  useEffect(() => {
    setItemLeft(checkItemLeft(todos));
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleTickComplete = item => {
    return () => {
      TodoStore.child(item.id).update({ isComplete: !item.isComplete });
    };
  };

  const handleTickClear = item => {
    return () => {
      TodoStore.child(item.id).remove();
    };
  };

  const handleKeyUpEnter = async event => {
    if (event.keyCode === 13) {
      if (event.target.value.trim() === "") {
        return;
      }
      let newTodo = { title: event.target.value, isComplete: false };

      await TodoStore.push(newTodo);

      setInput("");
    }
  };

  const handleInput = event => {
    setInput(event.target.value);
  };

  const handleSetAllComplete = () => {
    if (checkItemLeft(todos) === 0) {
      todos.forEach(item => {
        TodoStore.child(item.id).update({ isComplete: false });
      });
    } else {
      todos.forEach(item => {
        if (!item.isComplete) {
          TodoStore.child(item.id).update({ isComplete: true });
        }
      });
    }
  };

  const handleClearCompleted = () => {
    todos.forEach(item => {
      if (item.isComplete) {
        TodoStore.child(item.id).remove();
      }
    });
  };

  const handleOnEdit = (item, newTitle) => {
    TodoStore.child(item.id).update({ ...item, title: newTitle });
  };

  const checkItemLeft = arr => {
    let countItemLeft = 0;
    arr.forEach(element => {
      if (element.isComplete === false) {
        countItemLeft += 1;
      }
    });
    return countItemLeft;
  };

  let url = nonComplete;
  if (checkItemLeft(todos) === 0) {
    url = allComplete;
  }

  return (
    <div className="App">
      <div className="Header">
        <img
          alt="checkAll"
          src={url}
          width={32}
          height={32}
          onClick={handleSetAllComplete}
        />
        <input
          type="text"
          placeholder="What needs to be done ?"
          value={input}
          onChange={handleInput}
          onKeyUp={handleKeyUpEnter}
        />
      </div>
      {todos.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          handleTickComplete={handleTickComplete(item)}
          handleTickClear={handleTickClear(item)}
          handleOnEdit={handleOnEdit}
        />
      ))}
      {todos.length !== 0 && (
        <Footer
          itemLeft={itemLeft}
          countTodo={todos.length}
          handleClearCompleted={handleClearCompleted}
        />
      )}
    </div>
  );
}

export default App;
