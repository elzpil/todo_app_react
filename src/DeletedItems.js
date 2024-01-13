import React, { Component } from "react";

class DeletedItems extends Component {
  render() {
    const { deletedTasks, undoDelete } = this.props;

    const itemsWithDate = deletedTasks.filter((task) => task.date);
    const itemsWithoutDate = deletedTasks.filter((task) => !task.date || task.date === null);

    return (
      <div className="todoItemsContainer">
        <div className="tasksWithDate">
          <ul className="theList">
            {itemsWithDate.map((task) => (
              <li key={task.key}>
                <strong>Task:</strong> {task.text} <br />
                <strong>Priority:</strong> {task.priority} <br />
                <strong>Date:</strong> {task.date ? task.date : "-"} <br />
                <button className="simpleButton" onClick={() => undoDelete(task.key)}>
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tasksWithoutDate">
          <ul className="theList">
            {itemsWithoutDate.map((task) => (
              <li key={task.key}>
                <strong>Task:</strong> {task.text} <br />
                <strong>Priority:</strong> {task.priority} <br />
                <strong>Date:</strong> {task.date ? task.date : "-"} <br />
                <button className="simpleButton" onClick={() => undoDelete(task.key)}>
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DeletedItems;
