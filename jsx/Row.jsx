import React from 'react';
import SVGUtils from '../js/SVGUtils.js';
import M_Command from './M_Command.jsx';
import L_Command from './L_Command.jsx';
import H_Command from './H_Command.jsx';
import V_Command from './V_Command.jsx';
import Z_Command from './Z_Command.jsx';
import C_Command from './C_Command.jsx';
import S_Command from './S_Command.jsx';
import Q_Command from './Q_Command.jsx';
import T_Command from './T_Command.jsx';
import Command from './Command.jsx';


let Row = React.createClass({

  componentDidMount: function() {
    this.setState({
      command: this.props.command,
      x: this.props.x,
      y: this.props.y
    });
  },

/*  componentWillUpdate: function(newProps){
    this.setState({
      command: newProps.command,
      x: newProps.x,
      y: newProps.y
    })
  },*/

  commandChange: function(e) {
    this.setState({
      command: e.currentTarget.value
    }, function(){
      this.refs.coordonnees.updatePath(true);
    });
  },

  onUpdate: function() {
    let newState = this.refs.coordonnees.state;
    this.state = newState;
    this.props.onParamsChange(newState);
  },

  onDrawChanged: function(position) {
    this.refs.coordonnees.onDrawChanged(position);
  },

  onFocus: function(){
    this.props.onFocus(this.props.index, true);
    console.log(this.props);
  },

  getNextPointCoord: function(){
    let lastPos = SVGUtils.getLastPosFrom(this.props.getControlsPoint().controls, this.props.index);
    return lastPos;
  },

  activeRow: function(active){
    if(active){
      this.refs.row.getDOMNode().classList.add("active");
    } else {
      this.refs.row.getDOMNode().classList.remove("active");
    }
  },

  render: function() {
    let coordonnees = null,
      options = null,
      me = this;

    if (!this.state) {
      return null;
    }
            //console.log(this.props.command);
    //console.log(this.props.getControlsPoint());

    // switch (this.props.command) {
    //   case "M":
    //     coordonnees = <M_Command  x={this.props.x} y={this.props.y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "L":
    //     coordonnees = <L_Command  x={this.props.x} y={this.props.y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "H":
    //     coordonnees = <H_Command  x={this.props.x || this.getNextPointCoord().x} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "V":
    //     coordonnees = <V_Command  y={this.props.y || this.getNextPointCoord().y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "Z":
    //     coordonnees = <Z_Command ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "C":
    //     coordonnees = <C_Command  x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} x={this.props.x} y={this.props.y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "S":
    //     coordonnees = <S_Command x2={this.props.x2} y2={this.props.y2} x={this.props.x} y={this.props.y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "Q":
    //     coordonnees = <Q_Command x1={this.props.x1} y1={this.props.y1} x={this.props.x} y={this.props.y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;
    //   case "T":
    //     coordonnees = <T_Command x={this.props.x} y={this.props.y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />;
    //     break;

    // }

 

    options = ["M", "L", "H", "V", "Z", "C", "S", "Q", "T"].map((elt, i) => {
      return (<option value={elt} key={elt}>{elt}</option>)
      });

      return (
        <div className="row" ref="row">
          <div className="command">
            <select onChange={this.commandChange} value={me.state.command}>
              {options}
            </select>
          </div>
          <Command command={this.state.command || this.props.command} x1={this.props.x1 || this.getNextPointCoord().x} y1={this.props.y1  || this.getNextPointCoord().y} x2={this.props.x2 || this.getNextPointCoord().x} y2={this.props.y2  || this.getNextPointCoord().y} x={this.props.x || this.getNextPointCoord().x} y={this.props.y || this.getNextPointCoord().y} ref="coordonnees" onUpdate={this.onUpdate} onFocus={this.onFocus} />
          <div className="entry">
            {this.props.children}
          </div>
      </div>
        )
    }
  });

  module.exports = Row;