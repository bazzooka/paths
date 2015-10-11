import React from 'react';

let Q_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "Q 5 8 10 8",
      command: "Q",

      x1: 8,
      y1: 5,

      x: 10,
      y: 8
    }
  },

  componentDidMount: function() {
    let x1 = this.props.x1 || this.state.x1,
      y1 = this.props.y1 || this.state.y1,
      x = this.props.x || this.state.x,
      y = this.props.y || this.state.y;

    this.setState({
      path: "Q " + x1 + " " + y1 + " " + x + " " + y,
      command: "Q",
      x1: x1,
      y1: y1,
      x: x,
      y: y
    }, function() {
      this.props.onUpdate();
    });
  },

  updatePath: function(e) {
    let x1 = this.refs.x1.getDOMNode().value,
      y1 = this.refs.y1.getDOMNode().value,
      x = this.refs.x.getDOMNode().value,
      y = this.refs.y.getDOMNode().value;

    this.setState({
      x1: this.refs.x1.getDOMNode().value,
      y1: this.refs.y1.getDOMNode().value,
      x: this.refs.x.getDOMNode().value,
      y: this.refs.y.getDOMNode().value,
      path: "Q " + x1 + " " + y1 + " " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position) {
    let x1 = 0,
      y1 = 0,
      x = 0,
      y = 0;
    if (position.dragCurveIndex) {
      x1 = (position.x1 || this.state.x1),
      y1 = (position.y1 || this.state.y1),
      x = this.state.x,
      y = this.state.y;
    } else {
      x1 = this.state.x1,
      y1 = this.state.y1,
      x = position.x,
      y = position.y;
    }

    let newState = {
      path: "Q " + x1 + " " + y1 + " " + x + " " + y,
      command: "Q",
      x1: x1,
      y1: y1,
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
          <input type="number" ref="x1" value={this.state.x1} onChange={this.updatePath} />
        </div>
        <div className="entry">
          <label>y1</label>
          <input type="number" ref="y1" value={this.state.y1} onChange={this.updatePath}/>
        </div>
        <div className="entry">
          <label>x</label>
          <input type="number" ref="x" value={this.state.x} onChange={this.updatePath} />
        </div>
        <div className="entry">
          <label>y</label>
          <input type="number" ref="y" value={this.state.y} onChange={this.updatePath}/>
        </div>
      </div>
      )
  }
});

module.exports = Q_Command;