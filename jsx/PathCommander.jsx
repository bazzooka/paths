import React from 'react';
import Row from './Row.jsx';

let PathCommander = React.createClass({
  getInitialState: function() {
    return {
      allRows: [
        {
          "command": "M",
          "x": "15",
          "y": "20"
        },
        {
          "command": "C",
          "x": "20",
          "y": "20",
          "x1": "20",
          "y1": "20",
          "x2": "20",
          "y2": "20"
        }
      ]
    }
  },

  onDrawChanged: function(position) {
    this.refs["command-" + position.index].onDrawChanged(position);
  },

  onParamsChange: function(controls) {
    let path = this.getControlPoints();

    this.setState({
      allRows: path.controls
    }, function() {});

    this.props.onPathChange(path);

  },

  getControlPoints: function() {
    let path = {
      controls: [],
      path: ""
    };
    for (let key in this.refs) {
      let newState = this.refs[key].state;
      path.path += " " + newState.path;
      path.controls.push(newState);
    }
    return path;
  },

  deleteRow: function(index, e) {
    let newRows = this.state.allRows.splice(index, 1);
    this.setState(
      {
        allRows: newRows
      },
      function() {
        this.onParamsChange();
      });
  },

  addRow: function() {
    let newRows = this.state.allRows;
    newRows.push({
      "command": "L",
      "x": "10",
      "y": "10"
    });


    this.setState({
      allRows: newRows
    }, function() {
      this.onParamsChange();
    });

  },

  render: function() {
    let commands = null;

    if (this.state.allRows) {
      commands = this.state.allRows.map((command, index) => {
        let ref = "command-" + index;
        return (
          <div key={ref}>
	            <Row command={command.command} x={command.x} y={command.y} ref={ref} onParamsChange={this.onParamsChange}>
	              <span className="delete-row" onClick={this.deleteRow.bind(this, index)}>X</span>
	            </Row>
	          </div>
          )
        });
      }

      // <Row command="M" ref="command-" onChange={this.onChange} />
      return (
        <div id="path-commander" className="path-commander">
	        {commands}
	        <div className="addRow" onClick={this.addRow}>+ ADD POINT</div>
	      </div>
        )
    }
  });

  module.exports = PathCommander;