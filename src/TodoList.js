import React, { Component } from "react";
import TodoItems from "./TodoItems";

class TodoList extends Component {
  constructor(props) {
    super(props);
    const storedItems = JSON.parse(localStorage.getItem('tasks')) || [];
    this.state = { items: storedItems };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e, text, priority, date) {
    e.preventDefault();

    if (text !== "") {
      const newItem = {
        text: text,
        priority: priority,
        date: date,
        key: Date.now(),
      };

      this.setState(
        (prevState) => ({
          items: [...prevState.items, newItem],
        }),
        () => {
          localStorage.setItem('tasks', JSON.stringify(this.state.items));
        }
      );
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);

    this.setState(
      {
        items: filteredItems,
      },
      () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.items));
      }
    );
  }

  render() {
    const tasksWithDate = this.state.items.filter((item) => item.date);
    const tasksWithoutDate = this.state.items.filter((item) => !item.date || item.date === null);

    return (
      <div className="todoListMain">
        <div className="header">
          <form
            onSubmit={(e) =>
              this.addItem(
                e,
                this._inputElement.value,
                this._priorityElement.value,
                this._dateElement.value
              )
            }
          >
            <input
              ref={(a) => (this._inputElement = a)}
              placeholder="Enter task"
            ></input>
            <select
              ref={(a) => (this._priorityElement = a)}
              defaultValue="Medium"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              ref={(a) => (this._dateElement = a)}
              type="date"
              placeholder="Date"
            ></input>
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="todoItemsContainer">
          <TodoItems entriesWithDate={tasksWithDate} entriesWithoutDate={tasksWithoutDate} delete={this.deleteItem} />
        </div>
      </div>
    );
  }
}

export default TodoList;
