import React from 'react';

let L_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "L 5 8",
      command: "L",
      x: 5,
      y: 8
    }
  },

  componentDidMount: function() {
    let x = this.props.x || this.state.x,
      y = this.props.y || this.state.y;

    this.setState({
      path: "L " + x + " " + y,
      command: "L",
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
    let x = this.refs.x.getDOMNode().value,
      y = this.refs.y.getDOMNode().value;
    this.setState({
      x: this.refs.x.getDOMNode().value,
      y: this.refs.y.getDOMNode().value,
      path: "L " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position){
    this.setState({
      path: "L " + position.x + " " + position.y,
      command: "L",
      x: position.x,
      y: position.y
    }, function() {
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

module.exports = L_Command;