import React from 'react';

let S_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "S 5 8 10 8",
      command: "S",

      x2: 8,
      y2: 5,

      x: 10,
      y: 8
    }
  },

  componentDidMount: function() {
    let x2 = this.props.x2 || this.state.x2,
      y2 = this.props.y2 || this.state.y2,
      x = this.props.x || this.state.x,
      y = this.props.y || this.state.y;

    this.setState({
      path: "S " + x2 + " " + y2 + " " + x + " " + y,
      command: "S",
      x2: x2,
      y2: y2,
      x: x,
      y: y
    }, function() {
      this.props.onUpdate();
    });
  },

  updatePath: function(e) {
    let x2 = this.refs.x2.getDOMNode().value,
      y2 = this.refs.y2.getDOMNode().value,
      x = this.refs.x.getDOMNode().value,
      y = this.refs.y.getDOMNode().value;

    this.setState({
      x2: this.refs.x2.getDOMNode().value,
      y2: this.refs.y2.getDOMNode().value,
      x: this.refs.x.getDOMNode().value,
      y: this.refs.y.getDOMNode().value,
      path: "S " + x2 + " " + y2 + " " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position) {
    let x2 = 0,
      y2 = 0,
      x = 0,
      y = 0;
    if (position.dragCurveIndex) {
      x2 = (position.x2 || this.state.x2),
      y2 = (position.y2 || this.state.y2),
      x = this.state.x,
      y = this.state.y;
    } else {
      x2 = this.state.x2,
      y2 = this.state.y2,
      x = position.x,
      y = position.y;
    }

    let newState = {
      path: "S " + x2 + " " + y2 + " " + x + " " + y,
      command: "S",
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
      <div className="">
          <label>x2</label>
          <input type="number" ref="x2" value={this.state.x2} onChange={this.updatePath} />
          <label>y2</label>
          <input type="number" ref="y2" value={this.state.y2} onChange={this.updatePath}/>
          <label>x</label>
          <input type="number" ref="x" value={this.state.x} onChange={this.updatePath} />
          <label>y</label>
          <input type="number" ref="y" value={this.state.y} onChange={this.updatePath}/>
        </div>
      )
  }
});

module.exports = S_Command;