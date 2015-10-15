import AppDispatcher from '../dispatcher/AppDispatcher.js';
import DrawStoreConstants from '../constants/DrawStoreConstants';

let DrawStoreActions = {
	loadPath: function(data){
		AppDispatcher.handleViewAction({
			actionType: DrawStoreConstants.PARAM_2_DRAW,
			data: data
		});
	},
	pathChange: function(data){
		AppDispatcher.handleViewAction({
			actionType: DrawStoreConstants.PATH_CHANGE,
			data: data
		});
	},

	drawChange: function(data){
		AppDispatcher.handleViewAction({
			actionType: DrawStoreConstants.DRAW_CHANGE,
			data: data
		});
	},

	drawSelectionChange: function(data){
		AppDispatcher.handleViewAction({
			actionType: DrawStoreConstants.DRAW_SELECTION_CHANGE,
			data: data
		})
	},

	paramSelectionChange: function(data){
		AppDispatcher.handleViewAction({
			actionType: DrawStoreConstants.PARAM_SELECTION_CHANGE,
			data: data
		})
	}
}

module.exports = DrawStoreActions;

