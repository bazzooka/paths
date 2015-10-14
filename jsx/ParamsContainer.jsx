import React from 'react';
import ParamsPanel from './ParamsPanel.jsx';
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
          <ParamsPanel title="Commands" isOpen="true">
      		  <PathCommander ref="pathCommander" onPathChange={this.props.onPathChange} />
          </ParamsPanel>
      	</div>
      )
  }

});

module.exports = ParamsContainer;