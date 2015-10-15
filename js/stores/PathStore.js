import AppDispatcher from '../dispatcher/AppDispatcher.js';
import DrawStoreConstants from '../constants/DrawStoreConstants';
import {EventEmitter} from 'events';

let _lastPosition = {},
	_lastSelection = {};

let loadLastSelection = function(data){
	_lastSelection = data;
}

let loadLastPosition = function(data){
	_lastPosition = data;
}

let PathStore = Object.assign({}, EventEmitter.prototype, {
	getLastPosition: function(){
		return _lastPosition;
	},

	getLastSelection: function(){
		return _lastSelection;
	},

	emitChange: function(param){
		this.emit('change', param);
	},

	addChangeListener: function(callback){
		this.on('change', callback);
	},

	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

PathStore.dispatcherIndex = AppDispatcher.register(function(payload){
	let action = payload.action;
	let text;

	switch(action.actionType){
		case DrawStoreConstants.DRAW_CHANGE:
			loadLastPosition(action.data);
			PathStore.emitChange(DrawStoreConstants.DRAW_CHANGE);
			break;
		case DrawStoreConstants.DRAW_SELECTION_CHANGE:
			loadLastSelection(action.data);
			PathStore.emitChange(DrawStoreConstants.DRAW_SELECTION_CHANGE);
			break;
		default:
			return true;
	}
	
	return true;
});

module.exports = PathStore;