import React from 'react';
import ParamsPanel from './ParamsPanel.jsx';
import PathCommander from './PathCommander.jsx';
import ImageUploader from './ImageUploader.jsx'; 

let ParamsContainer = React.createClass({

  imageUploaded: function(url){
    this.props.imageUploaded(url); 
  },

  render: function() {
    return (
    	<div className="params-container">
          <ParamsPanel ref="panel-command" title="Commands" isOpen="true">
      		  <PathCommander ref="pathCommander" />
          </ParamsPanel>
          <ParamsPanel title="Image" isOpen="true">
            <ImageUploader ref="imageUploader" imageUploaded={this.imageUploaded}/>
          </ParamsPanel>
      	</div>
      )
  }

});

module.exports = ParamsContainer;