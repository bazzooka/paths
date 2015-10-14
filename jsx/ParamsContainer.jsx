import React from 'react';
import ParamsPanel from './ParamsPanel.jsx';
import PathCommander from './PathCommander.jsx';
import ImageUploader from './ImageUploader.jsx'; 

let ParamsContainer = React.createClass({

  onDrawChanged: function(position) { 
    this.refs.pathCommander.onDrawChanged(position);
  },

  onSelectHandler: function(index){
    this.refs.pathCommander.onSelectHandler(index);
  },

  imageUploaded: function(url){
    this.props.imageUploaded(url); 
  },

  render: function() {
    return (
    	<div className="params-container">
          <ParamsPanel title="Commands" isOpen="true">
      		  <PathCommander ref="pathCommander" onPathChange={this.props.onPathChange} />
          </ParamsPanel>
          <ParamsPanel title="Image" isOpen="true">
            <ImageUploader ref="imageUploader" imageUploaded={this.imageUploaded}/>
          </ParamsPanel>
      	</div>
      )
  }

});

module.exports = ParamsContainer;