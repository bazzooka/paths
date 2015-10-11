import React from 'react';
import PathCommander from './PathCommander.jsx';

let ParamsContainer = React.createClass({

  onDrawChanged: function(position) {
    this.refs.pathCommander.onDrawChanged(position);
  },

  render: function() {
    return (
      <PathCommander ref="pathCommander" onPathChange={this.props.onPathChange}/>
      )
  }

});

module.exports = ParamsContainer;