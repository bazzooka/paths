import React from 'react';

let C_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "C 5 8 8 5 10 8",
      command: "C",

      x1: 5,
      y1: 8,
      x2: 8,
      y2: 5,

      x: 10,
      y: 8
    }
  },

  componentDidMount: function() {
    let x1 = this.props.x1 || this.state.x1,
      y1 = this.props.y1 || this.state.y1,
      x2 = this.props.x2 || this.state.x2,
      y2 = this.props.y2 || this.state.y2,
      x = this.props.x || this.state.x,
      y = this.props.y || this.state.y;

    this.setState({
      path: "C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y,
      command: "C",
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

  // getControls: function() {
  //   let path = {
  //     path: "L " + this.state.x + " " + this.state.y,
  //     command: "L",
  //     x: this.state.x,
  //     y: this.state.y
  //   }
  // },

  updatePath: function(e) {
    let x1 = this.refs.x1.getDOMNode().value,
      y1 = this.refs.y1.getDOMNode().value,
      x2 = this.refs.x2.getDOMNode().value,
      y2 = this.refs.y2.getDOMNode().value,
      x = this.refs.x.getDOMNode().value,
      y = this.refs.y.getDOMNode().value;

    this.setState({
      x1: this.refs.x1.getDOMNode().value,
      y1: this.refs.y1.getDOMNode().value,
      x2: this.refs.x2.getDOMNode().value,
      y2: this.refs.y2.getDOMNode().value,
      x: this.refs.x.getDOMNode().value,
      y: this.refs.y.getDOMNode().value,
      path: "C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position) {
    let x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      x = 0,
      y = 0;
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
      path: "C " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + x + " " + y,
      command: "C",
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
    return (
      <div className="entries-container">
        <div className="entry">
          <label>x1</label>
          <input type="number" ref="x1" value={this.state.x1} onChange={this.updatePath} onFocus={this.props.onFocus} />
        </div>
        <div className="entry">
          <label>y1</label>
          <input type="number" ref="y1" value={this.state.y1} onChange={this.updatePath} onFocus={this.props.onFocus} />
        </div>
        <div className="entry">
          <label>x2</label>
          <input type="number" ref="x2" value={this.state.x2} onChange={this.updatePath} onFocus={this.props.onFocus} />
        </div>
        <div className="entry">
          <label>y2</label>
          <input type="number" ref="y2" value={this.state.y2} onChange={this.updatePath} onFocus={this.props.onFocus} />
        </div>
        <div className="entry">
          <label>x</label>
          <input type="number" ref="x" value={this.state.x} onChange={this.updatePath} onFocus={this.props.onFocus} />
        </div>
        <div className="entry">
          <label>y</label>
          <input type="number" ref="y" value={this.state.y} onChange={this.updatePath} onFocus={this.props.onFocus} />
        </div>
      </div>
      )
  }
});

module.exports = C_Command;