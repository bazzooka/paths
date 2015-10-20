import React from 'react';
import ParamsPanel from './ParamsPanel.jsx';
import PathCommander from './PathCommander.jsx';
import ImageUploader from './ImageUploader.jsx'; 
import ExporterContainer from './ExporterContainer.jsx'; 

let ParamsContainer = React.createClass({

  render: function() {
    return (
    	<div className="params-container">
          <ParamsPanel ref="panel-command" title="Commands" isOpen="true">
      		  <PathCommander ref="pathCommander" />
          </ParamsPanel>
          <ParamsPanel title="Image" isOpen="false">
            <ImageUploader ref="imageUploader"/>
          </ParamsPanel>
          <ParamsPanel title="Export" isOpen="false">
            <ExporterContainer ref="exporterContainer"/>
          </ParamsPanel>
      	</div>
      )
  }

});

module.exports = ParamsContainer;