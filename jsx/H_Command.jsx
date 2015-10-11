import React from 'react';

let H_Command = React.createClass({
  getInitialState: function() {
    return {
      path: "H 5",
      command: "H",
      x: 5    
    }
  },

  componentDidMount: function() {
    let x = this.props.x;

    this.setState({
      path: "H " + x,
      command: "H",
      x: x
    }, function() {
      this.props.onUpdate();
    });
  },

  getControls: function() {
    let path = {
      path: "H " + this.state.x,
      command: "H",
      x: this.state.x
    }
  },

  updatePath: function(e) {
    let x = this.refs.x.getDOMNode().value;
    this.setState({
      x: this.refs.x.getDOMNode().value,
      path: "H " + x
    }, function() {
      this.props.onUpdate();
    });

    return true;
  },

  onDrawChanged: function(position){
    this.setState({
      path: "H " + position.x,
      command: "H",
      x: position.x
    }, function(){
      this.updatePath(null);
    });
  },

  update: function(controls) {
    console.log(controls);
  },

  render: function() {
    return (
      <div className="entries-container">
        <div className="entry">
            <label>x</label>
            <input type="number" ref="x" value={this.state.x} onChange={this.updatePath} />
          </div>
        </div>
      )
  }
});

module.exports = H_Command;