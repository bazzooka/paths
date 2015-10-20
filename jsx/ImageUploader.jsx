import React from 'react';
import DrawStoreConstants from '../js/constants/DrawStoreConstants';
import DrawStoreActions from '../js/actions/DrawStoreActions';


let ImageUploader = React.createClass({
	getInitialState: function(){
		return ({
			x: "0",
			y: "0",
			w: "100",
			h: "100",
			visible: 0,
			data: ""
		})
	},

	onParamsChange: function(attrib, e){
		let newChange = {},
			target = e.target;

		if("checkbox" === target.type){
			newChange[attrib] = e.target.checked ? "visible" : "hidden";
		} else {
			newChange[attrib] = e.target.value;
		}
		
		this.setState(newChange, function(){
			DrawStoreActions.imageChange(this.state);
		});
	},

	onImageChange : function(event){
		var reader = new FileReader();
	    reader.onload = () => {
	    	this.setState({data: reader.result}, function(){
	    		DrawStoreActions.imageChange(this.state);
	    	});
	    };
	    reader.readAsDataURL(event.target.files[0]);
	},

	render: function(){
		return (
			<div className="image-uploader-container">
				<form id="form1" runat="server">
					<input ref="imageFile" type='file' id="imgInp" onChange={this.onImageChange} />
					<div className="image-field">
						<label>OffsetX :</label>
						<input data-id="x" type="number" x={this.state.x} onChange={this.onParamsChange.bind(this, 'x')} />
						<span>px</span>
					</div>
					<div className="image-field">
						<label>OffsetY :</label>
						<input ref="y"  type="number" y={this.state.y} onChange={this.onParamsChange.bind(this, 'y')} />
						<span>px</span>
					</div>
					<div className="image-field">
						<label>Width :</label>
						<input ref="w"  type="number" w={this.state.w} value={this.state.w} min="0" max="100" onChange={this.onParamsChange.bind(this, 'w')}/>
						<span>%</span>
					</div>
					<div className="image-field">
						<label>Height :</label>
						<input ref="h"  type="number" h={this.state.h} value={this.state.h} min="0" max="100" onChange={this.onParamsChange.bind(this, 'h')}/>
						<span>%</span>
					</div>
					<div className="image-field">
						<label>Visible :</label>
						<input ref="visible"  type="checkbox" h={this.state.visible} checked={this.state.checked} onChange={this.onParamsChange.bind(this, 'visible')}/>
					</div>
				</form>
			</div>
		)
	}
});

module.exports = ImageUploader;