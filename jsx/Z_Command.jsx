import React from 'react';

let Z_Command = React.createClass({
  
  componentDidMount: function() {
    this.setState({
      path: "Z",
      command: "Z"
    }, function() {
      this.props.onUpdate();
    });
  },

  render: function() {
    return (
      <div className="entries-container">
        <div className="entry">
          <div></div>
        </div>
      </div>
      )
  }
});

module.exports = Z_Command;