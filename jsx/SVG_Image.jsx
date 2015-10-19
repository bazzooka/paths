import React from 'react';

let SVG_Image = React.createClass({

	getInitialState : function(){
		return (
			this.props
		);
	},
	

	render: function(){
		let imageElt = [' <image x=', this.state.x, 'y=', this.state.y, 'width=', this.state.w + '%', 'height=', this.state.h + '%', 'xlink:href=', this.state.data, '/>'].join(' ');
		return (
			<g createClassName="imageBg" dangerouslySetInnerHTML={{ __html: imageElt}}></g>
		)
	}
});

module.exports = SVG_Image;