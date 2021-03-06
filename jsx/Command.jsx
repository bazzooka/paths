import React from 'react';

let Command = React.createClass({
  getInitialState: function() {
    return {
      path: "M 0 0",
      command: "M",

      x1: null,
      y1: null,
      x2: null,
      y2: null,

      x: null,
      y: null
    }
  },

  componentDidMount: function() {
    let x1 = "",
      y1 = "",
      x2 = "",
      y2 = "",
      x = "",
      y = "",
      command = "";

    command = this.props.command;

    if (command === "C" || command === "Q") {
      x1 = this.props.x1 || this.state.x1 || "";
      y1 = this.props.y1 || this.state.y1 || "";
    }

    if (command === "C" || command === "S") {
      x2 = this.props.x2 || this.state.x2 || "";
      y2 = this.props.y2 || this.state.y2 || "";
    }

    if (command === "C" || command === "M" || command === "L" || command === "H" || command === "Q" || command === "S" || command === "T") {
      x = this.props.x || this.state.x || "";
    }

    if (command === "C" || command === "M" || command === "L" || command === "V" || command === "Q" || command === "S" || command === "T") {
      y = this.props.y || this.state.y || "";
    }


    this.setState({
      path: command + " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y,
      command: command,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x: x,
      y: y
    }, function() {
      this.props.onUpdate();
    });
  },

  updatePathBis: function(newState) {
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      x = 0,
      y = 0,
      command = "";

    command = newState.command;
    x1 = newState.x1 || "";
      y1 = newState.y1 || "";
      x2 = newState.x2 || "";
      y2 = newState.y2 || "";
      x = newState.x || "";
      y = newState.y || "";

    this.setState({
      command: command,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x: x,
      y: y,
      path: command + " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  updatePath: function(isCommandChanged) {
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      x = 0,
      y = 0,
      command = "";

    command = isCommandChanged ? this.props.command : this.state.command;
    if (typeof (isCommandChanged) === "boolean") {
      x1 = this.props.x1 || "";
      y1 = this.props.y1 || "";
      x2 = this.props.x2 || "";
      y2 = this.props.y2 || "";
      x = this.props.x || "";
      y = this.props.y || "";
    } else {
      x1 = this.refs.x1 && this.refs.x1.getDOMNode().value || "";
      y1 = this.refs.y1 && this.refs.y1.getDOMNode().value || "";
      x2 = this.refs.x2 && this.refs.x2.getDOMNode().value || "";
      y2 = this.refs.y2 && this.refs.y2.getDOMNode().value || "";
      x = this.refs.x && this.refs.x.getDOMNode().value || "";
      y = this.refs.y && this.refs.y.getDOMNode().value || "";
    }

    this.setState({
      command: command,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x: x,
      y: y,
      path: command + " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position) {
    let x1 = null,
      y1 = null,
      x2 = null,
      y2 = null,
      x = null,
      y = null;
    if (position.dragCurveIndex) {
      x1 = (position.x1 || this.state.x1),
      y1 = (position.y1 || this.state.y1),
      x2 = (position.x2 || this.state.x2),
      y2 = (position.y2 || this.state.y2),
      x = this.state.x,
      y = this.state.y;
    } else {
      x1 = this.state.x1,
      y1 = this.state.y1,
      x2 = this.state.x2,
      y2 = this.state.y2,
      x = position.x,
      y = position.y;
    }

    let newState = {
      path: this.props.command + " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y,
      command: this.props.command,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x: x,
      y: y
    };

    this.setState(newState, function() {
      this.updatePath(null);
    });

  },


  // update: function(controls) {
  //   console.log(controls);
  // },

  render: function() {
    let command = this.props.command,
      x1 = null,
      x2 = null,
      y1 = null,
      y2 = null,
      x = null,
      y = null;

    if (command === "C" || command === "Q") {
      x1 = <div className="entry">
              <label>x1</label>
              <input type="number" ref="x1" value={this.state.x1 || parseInt(this.state.x) - 10} onChange={this.updatePath} onFocus={this.props.onFocus} />
            </div>;
      y1 = <div className="entry">
              <label>y1</label>
              <input type="number" ref="y1" value={this.state.y1 || parseInt(this.state.y) + 10} onChange={this.updatePath} onFocus={this.props.onFocus} />
            </div>;
    }
    if (command === "C" || command === "S") {
      x2 = <div className="entry">
              <label>x2</label>
              <input type="number" ref="x2" value={this.state.x2 || parseInt(this.state.x) + 10} onChange={this.updatePath} onFocus={this.props.onFocus} />
            </div>;
      y2 = <div className="entry">
              <label>y2</label>
              <input type="number" ref="y2" value={this.state.y2 || parseInt(this.state.y) + 10} onChange={this.updatePath} onFocus={this.props.onFocus} />
            </div>;
    }
    if (command === "C" || command === "M" || command === "L" || command === "H" || command === "Q" || command === "S" || command === "T") {
      x = <div className="entry">
            <label>x</label>
            <input type="number" ref="x" value={this.state.x} onChange={this.updatePath} onFocus={this.props.onFocus} />
          </div>;
    }
    if (command === "C" || command === "M" || command === "L" || command === "V" || command === "Q" || command === "S" || command === "T") {
      y = <div className="entry">
            <label>y</label>
            <input type="number" ref="y" value={this.state.y} onChange={this.updatePath} onFocus={this.props.onFocus} />
          </div>;
    }
    return (
      <div className="entries-container">
        {x1}{y1}{x2}{y2}{x}{y}
      </div>
      )
  }
});

module.exports = Command;