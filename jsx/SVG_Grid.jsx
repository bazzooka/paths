import React from 'react';

let SVG_Grid = React.createClass({

	resize: function(w, h){
		this.setState({w: w, h: h});
	},

	render: function(){
		let allRows = [];
		if(!this.state){
			return null;
		}
		let i = 0,
			d="",
			d_large = "";
		for(i = 0; i < this.state.w; i = i+2){
			d+= ["M", i, 0, "V", this.state.h, " "].join(" ")
		}
		
		for(i = 0; i < this.state.h; i = i+2){
			d+= ["M", 0, i, "H", this.state.w, " "].join(" ")
		}

		d_large = ["M", "0.1", "0.1", "H", (this.state.w - 0.1), "V", (this.state.h - 0.1), "H", "0.1", "V", "0.1"].join(" ");
		d_large += [" ", "M", (this.state.w / 2), "0.1", "V", (this.state.h - 0.1), "M", 0, (this.state.h / 2), "H", (this.state.w - 0.1), " " ].join(" ");

		return (
			<g id="grid">
				<path d={d} className="grid_v_h"/>
				<path d={d_large} className="grid_large"/>
			</g>
		)
	}
});

module.exports = SVG_Grid;