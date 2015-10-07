import React from 'react';

let V_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "V 5",
      command: "V",
      y: 5    
    }
  },

  componentDidMount: function() {
    let y = this.props.y;

    this.setState({
      path: "V " + y,
      command: "V",
      y: y
    }, function() {
      this.props.onUpdate();
    });
  },

  getControls: function() {
    let path = {
      path: "V " + this.state.y,
      command: "V",
      y: this.state.y
    }
  },

  updatePath: function(e) {
    let y = this.refs.y.getDOMNode().value;
    this.setState({
      y: this.refs.y.getDOMNode().value,
      path: "V " + y
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position){
    this.setState({
      path: "V " + position.y,
      command: "V",
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
          <label>y</label>
          <input type="number" ref="y" value={this.state.y} onChange={this.updatePath} />
        </div>
      )
  }
});

module.exports = V_Command;