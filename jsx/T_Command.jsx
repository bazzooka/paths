import React from 'react';

let T_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "T 5 8",
      command: "T",
      x: 5,
      y: 8
    }
  },

  componentDidMount: function() {
    let x = this.props.x || this.state.x,
      y = this.props.y || this.state.y;

    this.setState({
      path: "T " + x + " " + y,
      command: "T",
      x: x,
      y: y
    }, function() {
      this.props.onUpdate();
    });
  },

  // getControls: function() {
  //   let path = {
  //     path: "T " + this.state.x + " " + this.state.y,
  //     command: "T",
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
      path: "T " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position){
    this.setState({
      path: "T " + position.x + " " + position.y,
      command: "T",
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
      <div className="">
          <label>x</label>
          <input type="number" ref="x" value={this.state.x} onChange={this.updatePath} />
          <label>y</label>
          <input type="number" ref="y" value={this.state.y} onChange={this.updatePath}/>
        </div>
      )
  }
});

module.exports = T_Command;