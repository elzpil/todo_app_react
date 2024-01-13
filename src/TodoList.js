import React, { Component } from "react";
import TodoItems from "./TodoItems";
import DeletedItems from "./DeletedItems";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      deletedItems: [],
      showDeletedTasks: false,
      completedTasks: [],
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.undoDelete = this.undoDelete.bind(this);
    this.displayDeletedTasks = this.displayDeletedTasks.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedDeletedItems =
      JSON.parse(localStorage.getItem("deletedTasks")) || [];

    this.setState(
      {
        items: storedItems,
        deletedItems: storedDeletedItems,
        showDeletedTasks: false,
      },
      () => {
        console.log("Stored Items:", storedItems);
        console.log("Stored Deleted Items:", storedDeletedItems);
      }
    );
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
          localStorage.setItem("tasks", JSON.stringify(this.state.items));
        }
      );
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    const deletedItem = this.state.items.find((item) => item.key === key);

    this.setState(
      (prevState) => ({
        items: filteredItems,
        deletedItems: [...prevState.deletedItems, { ...deletedItem, deletionTime: Date.now() }],
      }),
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.items));
        localStorage.setItem("deletedTasks", JSON.stringify(this.state.deletedItems));
      }
    );
  }

  displayDeletedTasks() {
    const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

    const recentDeletedTasks = deletedTasks.filter(
      (item) => item.deletionTime > threeDaysAgo
    );

    this.setState({ showDeletedTasks: true, recentDeletedTasks });
  }
  goBack() {
    this.setState({ showDeletedTasks: false });
  }
  undoDelete(key) {
    // Implement the logic to undo the delete
    const deletedItem = this.state.completedTasks.find((item) => item.key === key);

    this.setState(
      (prevState) => ({
        items: [...prevState.items, { ...deletedItem, key: Date.now() }],
        deletedItems: prevState.deletedItems.filter((item) => item.key !== key),
      }),
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.items));
        localStorage.setItem("deletedTasks", JSON.stringify(this.state.deletedItems));
      }
    );
  }


   render() {
      const tasksWithDate = this.state.items.filter((item) => item.date);
      const tasksWithoutDate = this.state.items.filter(
        (item) => !item.date || item.date === null
      );
      const completedTasks = this.state.recentDeletedTasks;

      return (
        <div>
          <div className="fixed-top">
            {this.state.showDeletedTasks ? (
              <button onClick={() => this.goBack()}>Go Back</button>
            ) : (
              <button onClick={this.displayDeletedTasks}>Completed</button>
            )}
          </div>
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
                className="custom-select"
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
            {this.state.showDeletedTasks ? (
              <DeletedItems
                deletedTasks={this.state.recentDeletedTasks}
                undoDelete={(key) => this.undoDelete(key)}
              />
            ) : (
              <TodoItems
                entriesWithDate={tasksWithDate}
                entriesWithoutDate={tasksWithoutDate}
                delete={this.deleteItem}
                completedTasks={completedTasks}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
