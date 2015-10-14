import React from 'react';
import DrawContainer from './DrawContainer.jsx';
import ParamsContainer from './ParamsContainer.jsx';

var App = React.createClass({

	componentDidMount: function(){
		document.addEventListener("resize", function(e){
			this.refs.drawContainer.resize(e);
		});
	},

	onPathChange: function(newPath) {
		this.refs.drawContainer.pathChanged(newPath);
	},

	onDrawChanged: function(position){
		this.refs.paramsContainer.onDrawChanged(position);
	},

	onSelectHandler: function(index){
		this.refs.paramsContainer.onSelectHandler(index);
	},

	imageUploaded: function(url){
		this.refs.drawContainer.imageUploaded(url);
	},

	render: function(){
		return (

			<div className="master-wrapper">
				<DrawContainer ref="drawContainer" onDrawChanged={this.onDrawChanged} onSelectHandler={this.onSelectHandler}/>
				<ParamsContainer onPathChange={this.onPathChange} ref="paramsContainer" imageUploaded={this.imageUploaded}/>
			</div>
		)
	}
});

module.exports = App;