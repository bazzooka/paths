import React from 'react';

let DrawContainer = React.createClass({
  handlers: [], // List all circle elements
  curveHandlers: [],
  dragParams: {
    isDragging: false,
    dragElt: null,
    dragStartPosition: null,
    command: null
  },
  positionHandlerParams: {
    cubeSize: 2,
    halfSize: 1
  },

  getInitialState: function() {
    return {
      paths: null
    };
  },

  componentDidMount: function() {
    let me = this;

    me.svgElt = this.refs.svgElt.getDOMNode();

    // https://www.google.fr/search?q=drag+SVG+element&oq=drag+SVG+element&aqs=chrome..69i57j0l4.4846j0j7&sourceid=chrome&es_sm=91&ie=UTF-8#safe=off&q=svg+get+mouse+position
    me.svgElt.addEventListener("mousedown", (e) => {
      if (e.srcElement.classList.contains("position-handler") || e.srcElement.classList.contains("curve-handler")) {
        me.dragParams.isDragging = true;
        me.dragParams.dragElt = e.srcElement;
        me.dragParams.dragIndex = e.srcElement.getAttribute("data-id");
        me.dragParams.dragCurveIndex = e.srcElement.getAttribute("data-pos") || null;
        me.dragParams.command = me.state.paths.controls[me.dragParams.dragIndex].command;

        // Create an SVGPoint for future math
        let pt = me.svgElt.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        me.dragParams.dragStartPosition = this.getMousePositionInSVG(e);

        this.updateHandlersColors(e);
      }
    });

    this.refs.svgElt.getDOMNode().addEventListener("mousemove", (e) => {
      if (me.dragParams.isDragging) {
        let mPos = this.getMousePositionInSVG(e);
        me.updatePosition(mPos.x, mPos.y);
      }
    });

    this.refs.svgElt.getDOMNode().addEventListener("mouseup", (e) => {
      if (me.dragParams.isDragging) {
        me.dragParams.isDragging = false;
        me.dragParams.dragElt = null;
      }
    });
  },

  updateHandlersColors: function(e){
    if (e.srcElement.classList.contains("position-handler") ){
      // Remove all selected class from position-handlers
      Array.prototype.forEach.call(this.refs.svgElt.getDOMNode().getElementsByClassName('position-handler'), function(elt){
        console.log(elt);
        elt.classList.remove('selected');
      });
      this.dragParams.dragElt.classList.add("selected");
    }
  },

  updatePosition: function(x, y) {
    let newX = parseInt(x, 10),
      newY = parseInt(y, 10);

    if (this.dragParams.dragCurveIndex) {
      this.dragParams.dragElt.setAttribute("x", newX);
      this.dragParams.dragElt.setAttribute("y", newY);

      let newPosition = {};
      newPosition["x"+this.dragParams.dragCurveIndex] = newX;
      newPosition["y"+this.dragParams.dragCurveIndex] = newY;
      newPosition.index= this.dragParams.dragIndex;
      newPosition.dragCurveIndex = this.dragParams.dragCurveIndex;
      
      this.props.onDrawChanged(newPosition);

    } else {
      if (this.dragParams.command !== "V") {
        this.dragParams.dragElt.setAttribute("x", newX - this.positionHandlerParams.halfSize);
      } else {
        newX = null;
      }

      if (this.dragParams.command !== "H") {
        this.dragParams.dragElt.setAttribute("y", newY - this.positionHandlerParams.halfSize);
      } else {
        newY = null;
      }

      this.props.onDrawChanged({
        x: newX,
        y: newY,
        index: this.dragParams.dragIndex
      });
    }
  },

  getMousePositionInSVG: function(e) {
    // Create an SVGPoint for future math
    let pt = this.svgElt.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(this.svgElt.getScreenCTM().inverse());
  },

  pathChanged: function(newPath) {
    this.handlers.length = 0;
    this.curveHandlers.length = 0;
    for (let i = 0, l = newPath.controls.length; i < l; i++) {
      let path = newPath.controls[i];
      if (["M", "L", "H", "V", "C", "S", "Q", "T"].indexOf(path.command) !== -1) {
        this.handlers.push({
          type: "circle",
          index: i,
          x: parseInt(newPath.controls[i].x) - this.positionHandlerParams.halfSize,
          y: parseInt(newPath.controls[i].y) - this.positionHandlerParams.halfSize
        });
      }
      if (["C", "Q"].indexOf(path.command) !== -1) {
        this.curveHandlers.push({
          type: "rect",
          index: i,
          pos: 1,
          x: parseInt(newPath.controls[i].x1),
          y: parseInt(newPath.controls[i].y1)
        });
      }
      if(["C", "S"].indexOf(path.command) !== -1){
        this.curveHandlers.push({
          type: "rect",
          index: i,
          pos: 2,
          x: parseInt(newPath.controls[i].x2),
          y: parseInt(newPath.controls[i].y2)
        });
      }
    }

    this.setState({
      paths: newPath
    });

  },

  render: function() {
    var paths = null,
      positionHandlers = null,
      curvetHandlers = null,
      curvePointToOrigin = null,
      defs = "";
    if (this.state.paths) {
      paths = <path d={this.state.paths.path} className="blurred"></path>
    }
    if (this.handlers.length !== 0) {
      let oldEltX = null,
        oldEltY = null;
      positionHandlers = this.handlers.map((elt, i) => {
         let posHand = <rect className="position-handler" x={elt.x || oldEltX.x} y={elt.y || oldEltY.y} width={this.positionHandlerParams.cubeSize} height={this.positionHandlerParams.cubeSize} data-id={elt.index} key={i}></rect>;
        oldEltX = elt.x ? elt : oldEltX;
        oldEltY = elt.y ? elt : oldEltY;
        return posHand;
      });
    }

    if (this.curveHandlers.length !== 0) {
      curvetHandlers = this.curveHandlers.map((elt, i) => {
        return <circle className="curve-handler" cx={elt.x} cy={elt.y} r="0.5" data-id={elt.index} data-pos={elt.pos} key={i}></circle>;
      });
    }

    defs = '<filter id="blurred" filterUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">';
    defs += '<feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>';
    defs += '<feMerge>';
    defs += '<feMergeNode in="coloredBlur"/>';
    defs += '<feMergeNode in="SourceGraphic"/>';
    defs += '</feMerge>';
    defs += '</filter>';

    return (
      <div id="draw-container" className="draw-container">
        <svg ref="svgElt" viewBox="0 0 80 80" width="100%" height="100%" fill="currentcolor" className="svg-style">
        <defs dangerouslySetInnerHTML={{__html: defs}}>
          
        </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="black"/>
          {paths}
          {positionHandlers}
          {curvetHandlers}
          {curvePointToOrigin}
        </svg>
      </div>
      )
  }
});

module.exports = DrawContainer;