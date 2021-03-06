import Axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((t) => t.username),
          username: res.data[0].username,
        });
      }
    });
  }
  onchangename = (e) => this.setState({ username: e.target.value });
  onChangeDescription = (e) => this.setState({ description: e.target.value });

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  handleChange = (daten) => {
    this.setState({
      date: daten,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    Axios.post("http://localhost:5000/exercises/add", exercise).then((t) =>
      console.log(t.data)
    );
    console.log(exercise);

    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        {/* form starts here */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            {" "}
            {/* username input starts here */}
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onchangename}
              onBlur={this.onchangename}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>{" "}
          {/* username input ends here */}
          {/* description input starts here */}
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              onBlur={this.onChangeDescription}
            />
          </div>
          {/* description input ends here */}
          {/* duration input starts here */}
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          {/* duration input ends here */}
          {/* date input starts here */}
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* date input ends here */}
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
