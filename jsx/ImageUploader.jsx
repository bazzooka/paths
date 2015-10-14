import React from 'react';


let ImageUploader = React.createClass({
	componentDidMount: function(){
		this.refs.imageUploaderButton.getDOMNode().addEventListener("click", () =>{
			this.props.imageUploaded(this.refs.urlImage.getDOMNode().value);
		});
	},

	render: function(){
		return (
			<div className="image-uploader-container">
				<input ref="urlImage" type="text" placeholder="URL de l'image"/>
				<button ref="imageUploaderButton">Import</button>
			</div>
		)
	}
});

module.exports = ImageUploader;