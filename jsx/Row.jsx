import React from 'react';
import M_Command from './M_Command.jsx';
import L_Command from './L_Command.jsx';
import H_Command from './H_Command.jsx';
import V_Command from './V_Command.jsx';
import Z_Command from './Z_Command.jsx';
import C_Command from './C_Command.jsx';


let Row = React.createClass({

  componentDidMount: function() {
    this.setState({
      command: this.props.command
    });
  },

  commandChange: function(e) {
    this.setState({
      command: e.currentTarget.value
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

  render: function() {
    let coordonnees = null,
      options = null,
      me = this;

    if (!this.state) {
      return null;
    }

    switch (this.state.command) {
      case "M":
        coordonnees = <M_Command  x={this.props.x} y={this.props.y} data-command="M" ref="coordonnees" onUpdate={this.onUpdate}/>;
        break;
      case "L":
        coordonnees = <L_Command  x={this.props.x} y={this.props.y} data-command="L" ref="coordonnees" onUpdate={this.onUpdate} />;
        break;
      case "H":
        coordonnees = <H_Command  x={this.props.x} data-command="H" ref="coordonnees" onUpdate={this.onUpdate} />;
        break;
      case "V":
        coordonnees = <V_Command  y={this.props.y} data-command="V" ref="coordonnees" onUpdate={this.onUpdate} />;
        break;
      case "Z":
        coordonnees = <Z_Command data-command="Z" ref="coordonnees" onUpdate={this.onUpdate} />;
        break;
      case "C":
        coordonnees = <C_Command  x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} x={this.props.x} y={this.props.y}data-command="M" ref="coordonnees" onUpdate={this.onUpdate}/>;
        break;

    }

    options = ["M", "L", "H", "V", "Z", "C"].map((elt, i) => {
      return (<option value={elt} key={elt}>{elt}</option>)
      });

      return (
        <div className="row">
        <div className="command">
          <select onChange={this.commandChange} value={me.state.command}>
            {options}
          </select>
        </div>
        {coordonnees}
      </div>
        )
    }
  });

  module.exports = Row;