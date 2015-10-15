import AppDispatcher from '../dispatcher/AppDispatcher.js';
import DrawStoreConstants from '../constants/DrawStoreConstants';
import {EventEmitter} from 'events';

let _path = {},
	_lastSelection = {};

let loadPath = function(data){
	_path = data;
}

let loadLastSelection = function(data){
	_lastSelection = data;
}

let DrawStore = Object.assign({}, EventEmitter.prototype, {
	getPath : function(){
		return _path;
	},

	getLastSelection: function(){
		return _lastPosition;
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

DrawStore.dispatcherIndex = AppDispatcher.register(function(payload){
	let action = payload.action;
	let text;

	switch(action.actionType){
		case DrawStoreConstants.PATH_CHANGE:
			loadPath(action.data);
			DrawStore.emitChange(DrawStoreConstants.PATH_CHANGE);
			break;
		case DrawStoreConstants.PATH_SELECTION_CHANGE:
			loadPath(action.data);
			DrawStore.emitChange(DrawStoreConstants.PATH_SELECTION_CHANGE); 
			break;
		default:
			return true;
	}
	
	return true;
});

module.exports = DrawStore;