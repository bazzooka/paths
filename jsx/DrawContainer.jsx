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
        this.dragParams.dragElt.setAttribute("cx", newX);
      } else {
        newX = null;
      }

      if (this.dragParams.command !== "H") {
        this.dragParams.dragElt.setAttribute("cy", newY);
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
      if (["M", "L", "H", "V", "C"].indexOf(path.command) !== -1) {
        this.handlers.push({
          type: "circle",
          index: i,
          x: parseInt(newPath.controls[i].x),
          y: parseInt(newPath.controls[i].y)
        });
      }
      if ("C" === path.command) {
        this.curveHandlers.push({
          type: "rect",
          index: i,
          pos: 1,
          x: parseInt(newPath.controls[i].x1),
          y: parseInt(newPath.controls[i].y1)
        });
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
      circleHandlers = null,
      rectHandlers = null;
    if (this.state.paths) {
      paths = <path d={this.state.paths.path}></path>
    }
    if (this.handlers.length !== 0) {
      let oldEltX = null,
        oldEltY = null;
      circleHandlers = this.handlers.map((elt, i) => {
        let circle = <circle className="position-handler" cx={elt.x || oldEltX.x} cy={elt.y || oldEltY.y} r="1" data-id={elt.index} key={i}></circle>;
        oldEltX = elt.x ? elt : oldEltX;
        oldEltY = elt.y ? elt : oldEltY;
        return circle;
      });
    }

    if (this.curveHandlers.length !== 0) {
      rectHandlers = this.curveHandlers.map((elt, i) => {
        return <rect className="curve-handler" x={elt.x} y={elt.y} width="1" height="1" data-id={elt.index} data-pos={elt.pos} key={i}></rect>;
      });
    }

    return (
      <div id="draw-container" className="draw-container">
        <svg ref="svgElt" viewBox="0 0 80 80" width="480" height="480" fill="currentcolor" className="svg-style">
          {paths}
          {circleHandlers}
          {rectHandlers}
        </svg>
      </div>
      )
  }
});

module.exports = DrawContainer;