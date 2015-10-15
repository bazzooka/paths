import AppDispatcher from '../dispatcher/AppDispatcher.js';
import DrawStoreConstants from '../constants/DrawStoreConstants';
import {EventEmitter} from 'events';

let _path = {},
	_lastPosition = {};

let loadLastPosition = function(data){
	_lastPosition = data;
}

let PathStore = Object.assign({}, EventEmitter.prototype, {
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

PathStore.dispatcherIndex = AppDispatcher.register(function(payload){
	let action = payload.action;
	let text;

	switch(action.actionType){
		case DrawStoreConstants.DRAW_CHANGE:
			//AppDispatcher.waitFor([ "ID_2"]
			//, function(){
				console.log(AppDispatcher._isPending);
				loadLastPosition(action.data);
			//});
			break;
		default:
			return true;
	}
	PathStore.emitChange();
	return true;
});

module.exports = PathStore;