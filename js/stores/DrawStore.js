import AppDispatcher from '../dispatcher/AppDispatcher.js';
import DrawStoreConstants from '../constants/DrawStoreConstants';
import {EventEmitter} from 'events';

let _path = {},
	_lastPosition = {};

let loadPath = function(data){
	_path = data;
}

let loadLastPosition = function(data){
	_lastPosition = data;
}

let DrawStore = Object.assign({}, EventEmitter.prototype, {
	getPath : function(){
		return _path;
	},

	getLastPosition: function(){
		return _lastPosition;
	},

	emitChange: function(){
		this.emit('change');
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
			break;
		default:
			return true;
	}
	DrawStore.emitChange();
	return true;
});

module.exports = DrawStore;