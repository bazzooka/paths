import React from 'react';

let M_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "M 5 8",
      command: "M",
      x: 5,
      y: 8
    }
  },

  componentDidMount: function() {
    let x = this.props.x,
      y = this.props.y;

    this.setState({
      path: "M " + x + " " + y,
      command: "M",
      x: x,
      y: y
    }, function() {
      this.props.onUpdate();
    });
  },

  getControls: function() {
    let path = {
      path: "M " + this.state.x + " " + this.state.y,
      command: "M",
      x: this.state.x,
      y: this.state.y
    }
  },

  updatePath: function(e) {
    let x = this.refs.x.getDOMNode().value,
      y = this.refs.y.getDOMNode().value;
    this.setState({
      x: this.refs.x.getDOMNode().value,
      y: this.refs.y.getDOMNode().value,
      path: "M " + x + " " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position){
    this.setState({
      path: "M " + position.x + " " + position.y,
      command: "M",
      x: position.x,
      y: position.y
    }, function(){
      this.updatePath(null);
    });
  },

  update: function(controls) {
    console.log(controls);
  },

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

module.exports = M_Command;