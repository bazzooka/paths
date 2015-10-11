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

	render: function(){
		return (

			<div className="master-wrapper">
				<DrawContainer ref="drawContainer" onDrawChanged={this.onDrawChanged}/>
				<ParamsContainer onPathChange={this.onPathChange} ref="paramsContainer" />
			</div>
		)
	}
});

module.exports = App;