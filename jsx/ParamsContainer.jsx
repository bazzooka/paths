import React from 'react';
import PathCommander from './PathCommander.jsx';

let ParamsContainer = React.createClass({

  onDrawChanged: function(position) {
    this.refs.pathCommander.onDrawChanged(position);
  },

  onSelectHandler: function(index){
    this.refs.pathCommander.onSelectHandler(index);
  },

  render: function() {
    return (
    	<div className="params-container">
      		<PathCommander ref="pathCommander" onPathChange={this.props.onPathChange}/>
      	</div>
      )
  }

});

module.exports = ParamsContainer;