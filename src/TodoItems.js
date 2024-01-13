import React, { Component } from "react";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return (
      <li key={item.key}>
        <strong>Task:</strong> {item.text} <br />
        <strong>Priority:</strong> {item.priority} <br />
        <strong>Date:</strong> {item.date ? item.date : "N/A"} <br />
        <button className="simpleButton" onClick={() => this.props.delete(item.key)}>
          Delete
        </button>

      </li>
    );
  }

  render() {
    const itemsWithDate = this.props.entriesWithDate;
    const itemsWithoutDate = this.props.entriesWithoutDate;

    return (
      <div className="todoItemsContainer">
        <div className="tasksWithDate">
          <ul className="theList">{itemsWithDate.map(this.createTasks)}</ul>
        </div>
        <div className="tasksWithoutDate">
          <ul className="theList">{itemsWithoutDate.map(this.createTasks)}</ul>
        </div>
      </div>
    );
  }
}

export default TodoItems;
