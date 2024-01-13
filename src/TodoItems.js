import React, { Component } from "react";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

createTasks(item) {
  if (!item || !this.props.completedTasks) {
    return null;
  }
  if (!item) {
    return null;
  }
  const isCompletedTask = this.props.completedTasks.some(
    (completedTask) => completedTask.key === item.key
  );

  return (
    <li key={item.key}>
      <strong>Task:</strong> {item.text} <br />
      <strong>Priority:</strong> {item.priority} <br />
      <strong>Date:</strong> {item.date ? item.date : "N/A"} <br />
      {isCompletedTask ? (
        <button className="undoButton" onClick={() => this.props.undoDelete(item.key)}>
          Undo Delete
        </button>
      ) : (
        <button className="simpleButton" onClick={() => this.props.delete(item.key)}>
          Delete
        </button>
      )}
    </li>
  );
}



  render() {
    const itemsWithDate = this.props.entriesWithDate;
    const itemsWithoutDate = this.props.entriesWithoutDate;
const completedTasks = this.props.completedTasks;


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
