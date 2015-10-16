import React from 'react';

let ParamsPanel = React.createClass({
	componentDidMount: function(){
		this.setState({isOpen: this.props.isOpen});
		this.elt = this.refs.panel.getDOMNode();

		this.refs.panel.getDOMNode().getElementsByClassName('title-container')[0].addEventListener("click", (e) => {
			this.toggleOpen(e);
		});
	},

	onReady: function(){
		this.toggleOpen(this.props.isOpen);
	},

	toggleOpen: function(e){
		let open = false,
			elt = this.elt;
		
		let panelContent = this.refs.panel.getDOMNode().getElementsByClassName('panel-content')[0],
			panelChild = this.refs.panel.getDOMNode().getElementsByClassName('panel-child')[0];

		if(typeof(e) === "string" && e == "true"){
			open = e;
		} else if(elt.classList.contains("open")){
			open = false;
		} else {
			open = true;
		}

		if(open){
			elt.classList.add("open");
			panelContent.style['max-height'] = panelChild.offsetHeight + "px";
		} else {
			elt.classList.remove("open");
			panelContent.style['max-height'] = 0;
		}
	},

	render: function(){
		let panelClasses = "param-panel " + (this.state && this.state.isOpen ? "open" : "");


		let children = React.Children.map(this.props.children, function (child) {
	        /*let addedProperties = {
	        	onComponentDidMount: this.onReady,
	        	ref: "myRef"
	        };*/
	        return React.cloneElement(child, {
	        	"onComponentDidMount": this.onReady,
	        	"onResize": this.toggleOpen
	        });
    	}.bind(this))

		return (
			<div ref="panel" className={panelClasses}>
				<div className="title-container">
					<span>{this.props.title}</span>
					<span>-</span>
				</div>
				<div className="panel-content">
					<div ref="panelChild" className="panel-child">
						{children}
					</div>
				</div>
			</div>
		)
	}
});

module.exports = ParamsPanel;