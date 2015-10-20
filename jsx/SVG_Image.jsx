import React from 'react';

let SVG_Image = React.createClass({

	getInitialState : function(){
		return (
			this.props
		);
	},
	

	render: function(){
		let imageElt = [' <image ', ('style="visibility:' + this.state.visible + '"'), 'x=', this.state.x, 'y=', this.state.y, 'width=', this.state.w + '%', 'height=', this.state.h + '%', 'xlink:href=', this.state.data, '/>'].join(' '),
			styles = {visibility: this.state.visible };
		return (
			<g createClassName="imageBg" dangerouslySetInnerHTML={{ __html: imageElt}}></g>
		)
	}
});

module.exports = SVG_Image;