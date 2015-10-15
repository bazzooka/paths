import React from 'react';
import DrawContainer from './DrawContainer.jsx';
import ParamsContainer from './ParamsContainer.jsx';

var App = React.createClass({

	componentDidMount: function(){
		document.addEventListener("resize", function(e){
			this.refs.drawContainer.resize(e);
		});
	},

	onSelectHandler: function(index){
		//this.refs.paramsContainer.onSelectHandler(index);
	},

	imageUploaded: function(url){
		this.refs.drawContainer.imageUploaded(url);
	},

	render: function(){
		return (

			<div className="master-wrapper">
				<DrawContainer ref="drawContainer" onSelectHandler={this.onSelectHandler}/>
				<ParamsContainer ref="paramsContainer" imageUploaded={this.imageUploaded}/>
			</div>
		)
	}
});

module.exports = App;