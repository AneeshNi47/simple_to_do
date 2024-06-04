import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { getTasks } from "../../actions/tasks";
import { TASK_STATUS_TYPES } from "../../actions/types";

export class ListTasks extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    return (
      <div>
        <Button
          variant="primary"
          style={{ alignItems: "alignRight" }}
          onClick={this.props.openAddTask}
        >
          Add Task
        </Button>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task, index) => {
              return (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{TASK_STATUS_TYPES[task.status]}</td>
                  <td>
                    <Button onClick={() => this.props.editTask(task)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasksReducer.tasks,
});

export default connect(mapStateToProps, { getTasks })(ListTasks);
