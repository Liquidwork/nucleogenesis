'use strict';

angular
.module('incremental')
.service('element',
['player',
'data',
'$rootScope',
function(player, data, $rootScope) {
	this.elementPrice = function (element) {
		return Math.pow(2, player.data.elements_unlocked) *  data.elements[element].number;
	};

	this.isElementCostMet = function (element) {
		var price = this.elementPrice(element);
		return player.data.resources['e-'].number >= price &&
			player.data.resources.p.number >= price &&
			player.data.resources.n.number >= price;
	};

	this.buyElement = function (element) {
		if(player.data.elements[element].unlocked) {
			return;
		}
		if(this.isElementCostMet(element)) {
			var price = this.elementPrice(element);
			player.data.resources['e-'].number -= price;
			player.data.resources.p.number -= price;
			player.data.resources.n.number -= price;

			player.data.elements[element].unlocked = true;
			player.data.elements[element].generators["Tier 1"] = 1;
			player.data.elements_unlocked++;
		}
	};
}]);
