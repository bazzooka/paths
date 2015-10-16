import React from 'react';
import SVGUtils from '../js/SVGUtils.js';
import SVG_Grid from './SVG_Grid.jsx';

import DrawStore from '../js/stores/DrawStore';
import DrawStoreConstants from '../js/constants/DrawStoreConstants';
import DrawStoreActions from '../js/actions/DrawStoreActions';

let DrawContainer = React.createClass({
  handlers: [], // List all position handlers
  curveHandlers: [], // List curve handler
  middlePaths: [], // Middle paths redraw

  dragParams: {
    isDragging: false,
    dragElt: null,
    dragStartPosition: null,
    command: null
  },
  handlerParams: {
    cubeSize: 2,
    halfSize: 1,
    rayon: 0.75,
  },

  svgParams: {
    viewBox_w: 80,
    viewBox_h: 80
  },

  getInitialState: function() {
    return {
      paths: null
    };
  },

  componentDidMount: function() {
    let me = this;

    DrawStore.addChangeListener(this._onChange);

    me.svgElt = this.refs.svgElt.getDOMNode();

    me.svgElt.addEventListener('mousedown', (e) => {
      if (e.srcElement.classList.contains('position-handler') || e.srcElement.classList.contains('curve-handler')) {
        me.dragParams.isDragging = true;
        me.dragParams.dragElt = e.srcElement;
        me.dragParams.dragIndex = e.srcElement.getAttribute('data-id');
        me.dragParams.dragCurveIndex = e.srcElement.getAttribute('data-pos') || null;
        me.dragParams.command = me.state.paths.controls[me.dragParams.dragIndex].command;

        // Create an SVGPoint for future math
        let pt = me.svgElt.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        me.dragParams.dragStartPosition = this.getMousePositionInSVG(e);
      } else {
        me.dragParams.isDragging = false;
        me.dragParams.dragElt = null;
        me.dragParams.dragIndex = -1;
        me.dragParams.dragCurveIndex = -1;
        me.dragParams.command = '';
      }
      this.updateHandlersColors(e);
    });

    this.refs.svgElt.getDOMNode().addEventListener('mousemove', (e) => {
      if (me.dragParams.isDragging) {
        let mPos = this.getMousePositionInSVG(e);
        me.updatePosition(mPos.x, mPos.y);
      }
    });

    this.refs.svgElt.getDOMNode().addEventListener('mouseup', (e) => {
      if (me.dragParams.isDragging) {
        me.dragParams.isDragging = false;
        me.dragParams.dragElt = null;
      }
    });

    window.addEventListener('resize', (e) => {
      me.resize();
    })

    me.resize();
  },

  _onChange: function(param){
    switch(param){
      case DrawStoreConstants.PATH_SELECTION_CHANGE :
        this.updateHandlersColors(DrawStore.getLastSelection());
        break;
      case DrawStoreConstants.PATH_CHANGE : 
        this.pathChanged(DrawStore.getPath());
        break;
    }
    
  },

  updateHandlersColors: function(e) {
    this.hideAllHandlers();

    if(typeof(e) === "number"){
      this.refs.svgElt.getDOMNode().getElementsByClassName('position-handler-' + e)[0].classList.add('selected');
      this.refs.svgElt.getDOMNode().getElementsByClassName('overLapPath-' + (e+1))[0].classList.add('selected');

      let activeClasses = ['.path-to-origin-' + e, '.curve-handler-' + e].join(', ');
        Array.prototype.forEach.call(this.refs.svgElt.getDOMNode().querySelectorAll(activeClasses), function(elt) {
            elt.classList.add('selected');
          });
    } else {
        if (e.srcElement.classList.contains('position-handler') && this.dragParams.isDragging) {
        this.dragParams.dragElt.classList.add('selected');

        if (this.dragParams.dragIndex !== '0') {
          // Active Overlap
          this.refs.svgElt.getDOMNode().getElementsByClassName('overLapPath-' + (this.dragParams.dragIndex))[0].classList.add('selected');
        }
      }

      if ((e.srcElement.classList.contains('position-handler') && this.dragParams.isDragging) ||(e.srcElement.classList.contains('curve-handler'))) {
        let activeClasses = ['.path-to-origin-' + this.dragParams.dragIndex, '.curve-handler-' + this.dragParams.dragIndex].join(', ');
        Array.prototype.forEach.call(this.refs.svgElt.getDOMNode().querySelectorAll(activeClasses), function(elt) {
            elt.classList.add('selected');
          });
      }

      // Select row in pathCommander
      DrawStoreActions.drawSelectionChange(this.dragParams.dragIndex);
    }

    

    
  },

  hideAllHandlers: function(){
    // Remove all selected class from position-handlers and overLapPath
    let hiddenElements = ['.position-handler', '.overLapPath', '.curve-handler', '.path-to-origin'].join(',');
    Array.prototype.forEach.call(this.refs.svgElt.getDOMNode().querySelectorAll(hiddenElements), function(elt) {
      elt.classList.remove('selected');
    });
  },

  updatePosition: function(x, y) {
    let newX = parseInt(x, 10),
      newY = parseInt(y, 10);

    if (this.dragParams.dragCurveIndex) {
      this.dragParams.dragElt.setAttribute('x', newX);
      this.dragParams.dragElt.setAttribute('y', newY);

      let newPosition = {};
      newPosition['x' + this.dragParams.dragCurveIndex] = newX;
      newPosition['y' + this.dragParams.dragCurveIndex] = newY;
      newPosition.index = this.dragParams.dragIndex;
      newPosition.dragCurveIndex = this.dragParams.dragCurveIndex;

      DrawStoreActions.drawChange(newPosition);

    } else {
      if (this.dragParams.command !== 'V') {
        this.dragParams.dragElt.setAttribute('x', newX - this.handlerParams.halfSize);
      } else {
        newX = null;
      }

      if (this.dragParams.command !== 'H') {
        this.dragParams.dragElt.setAttribute('y', newY - this.handlerParams.halfSize);
      } else {
        newY = null;
      }

      DrawStoreActions.drawChange({
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
    this.middlePaths.length = 0;

    for (let i = 0, l = newPath.controls.length; i < l; i++) {
      let path = newPath.controls[i];
      if (['M', 'L', 'H', 'V', 'C', 'S', 'Q', 'T'].indexOf(path.command) !== -1) {
        this.handlers.push({
          type: 'circle',
          index: i,
          x: parseInt(newPath.controls[i].x) - this.handlerParams.halfSize,
          y: parseInt(newPath.controls[i].y) - this.handlerParams.halfSize
        });
      }
      if (['C', 'Q'].indexOf(path.command) !== -1) {
        this.curveHandlers.push({
          type: 'rect',
          index: i,
          pos: 1,
          x: parseInt(newPath.controls[i].x1),
          y: parseInt(newPath.controls[i].y1)
        });
      }
      if (['C', 'S'].indexOf(path.command) !== -1) {
        this.curveHandlers.push({
          type: 'rect',
          index: i,
          pos: 2,
          x: parseInt(newPath.controls[i].x2),
          y: parseInt(newPath.controls[i].y2)
        });
      }

      /*
       * Determine each segments of master path
       */
      let last
      switch (path.command) {
        case 'M': this.middlePaths.push({
            xStart: path.x,
            yStart: path.y,
            xEnd: path.x,
            yEnd: path.y,
            command: 'Z',
            index: i
          });
          break;
        case 'L':
        case 'T':
        case 'C':
        case 'S':
        case 'Q':
          this.middlePaths[i - 1].x1 = path.x1 || null;
          this.middlePaths[i - 1].y1 = path.y1 || null;
          this.middlePaths[i - 1].x2 = path.x2 || null;
          this.middlePaths[i - 1].y2 = path.y2 || null;

          this.middlePaths[i - 1].xEnd = path.x;
          this.middlePaths[i - 1].yEnd = path.y;

          this.middlePaths.push({
            xStart: path.x,
            yStart: path.y,
            xEnd: path.x,
            yEnd: path.y,
            command: 'Z'
          });

          this.middlePaths[i - 1].command = path.command;
          this.middlePaths[i - 1].index = i;
          break;
        case 'H':
          this.middlePaths[i - 1].xEnd = path.x;

          this.middlePaths.push({
            xStart: path.x,
            yStart: this.middlePaths[i - 1].yEnd,
            xEnd: path.x,
            yEnd: this.middlePaths[i - 1].yEnd,
            command: 'Z'
          });
          this.middlePaths[i - 1].command = path.command;
          this.middlePaths[i - 1].index = i;
          break;
        case 'V':
          this.middlePaths[i - 1].yEnd = path.y;

          this.middlePaths.push({
            xStart: this.middlePaths[i - 1].xEnd,
            yStart: path.y,
            xEnd: this.middlePaths[i - 1].xEnd,
            yEnd: path.y,
            command: 'Z'
          });
          this.middlePaths[i - 1].command = path.command;
          this.middlePaths[i - 1].index = i;
          break;
      }
    }

    this.setState({
      paths: newPath
    });

  },

  imageUploaded: function(url){
    console.log("Image uploaded");
  },

  resize: function(e) {
    this.refs.grid.resize(this.svgParams.viewBox_w, this.svgParams.viewBox_h);
  },

  render: function() {
    var paths = null,
      positionHandlers = null,
      curveHandlers = null,
      curvePointToOrigin = null,
      middlePaths = null,
      defs = '';
    if (this.state.paths) {
      paths = <path d={this.state.paths.path} className='blurred'></path>
    }

    /*
     * Draw position handlers
     */
    if (this.handlers.length !== 0) {
      let oldEltX = null,
        oldEltY = null;
      positionHandlers = this.handlers.map((elt, i) => {
        let classNames = 'position-handler position-handler-'+elt.index,
          posHand = <rect className={classNames} x={elt.x || oldEltX.x} y={elt.y || oldEltY.y} width={this.handlerParams.cubeSize} height={this.handlerParams.cubeSize} data-id={elt.index} key={i}></rect>;
        oldEltX = elt.x ? elt : oldEltX;
        oldEltY = elt.y ? elt : oldEltY;
        return posHand;
      });
    }

    /*
     * Draw curve handlers
     */
    if (this.curveHandlers.length !== 0) {
      curveHandlers = this.curveHandlers.map((elt, i) => {
        let classNames = 'curve-handler curve-handler-' + elt.index;
        return <circle className={classNames} cx={elt.x} cy={elt.y} r={this.handlerParams.rayon} data-id={elt.index} data-pos={elt.pos} key={i}></circle>;
      });

      // Draw line between curve modifier and it's origin
      curvePointToOrigin = this.curveHandlers.map((elt, i) => {
        let xStart = elt.x,
          yStart = elt.y,
          xEnd = 0,
          yEnd = 0;
        if (elt.pos === 1) {
          xEnd = this.state.paths.controls[elt.index - 1].x;
          yEnd = this.state.paths.controls[elt.index - 1].y;
        } else {
          xEnd = this.state.paths.controls[elt.index].x;
          yEnd = this.state.paths.controls[elt.index].y;
        }
        let newPathToOrigin = ['M', xStart, yStart, 'L', xEnd, yEnd].join(' '),
          classNames = 'path-to-origin path-to-origin-' + elt.index;
        return <path className={classNames} d={newPathToOrigin} key={i}></path>
      });
    }

    /*
     * Draw middlePaths
     */
    let middlePathsSize = this.middlePaths.length;
    middlePaths = this.middlePaths.map(function(elt, i) {
        if (middlePathsSize - 1 === i) {
          return;
        }
        let classIndex = 'overLapPath overLapPath-' + elt.index,
          path = ['M', elt.xStart, elt.yStart, elt.command].join(' ') + ' ';

        path += (elt.x1 ? [elt.x1, elt.y1].join(' ') : '') + ' ';
        path += (elt.x2 ? [elt.x2, elt.y2].join(' ') : '') + ' ';

        path += (elt.xEnd && elt.command !== 'V') ? [elt.xEnd, ' '].join(' ') : ' ';
        path += (elt.yEnd && elt.command !== 'H') ? [elt.yEnd, ' '].join(' ') : ' ';

        return (
          <path d={path} key={i} className={classIndex}></path>
          )
      });

    /*
     * Define SVG defs
     */

    defs = '<filter id="blurred" filterUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">';
    defs += '<feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>';
    defs += '<feMerge>';
    defs += '<feMergeNode in="coloredBlur"/>';
    defs += '<feMergeNode in="SourceGraphic"/>';
    defs += '</feMerge>';
    defs += '</filter>';

    let viewBox = [0, 0, this.svgParams.viewBox_w, this.svgParams.viewBox_h].join(' ');

    return (
      <div id='draw-container' className='draw-container'>
                  <svg ref='svgElt' viewBox='0 0 80 80' width='100%' height='100%' fill='currentcolor' className='svg-style'>
            <defs dangerouslySetInnerHTML={{
          __html: defs
        }}>
            </defs>
            <rect x='0' y='0' width='100%' height='100%' fill='black'/>
            <SVG_Grid ref='grid'/>
            {paths}
            {middlePaths}
            {curvePointToOrigin}
            {positionHandlers}
            {curveHandlers}
            
                                                                                                                                                                                                                                                                                                                                </svg>
        </div>
        )
  }
});

module.exports = DrawContainer;
