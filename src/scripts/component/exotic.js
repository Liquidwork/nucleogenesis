/**
 exotic
 Component that handles the exotic matter and prestige logic.
 It includes exotic matter production, exotic upgrades, and infusion of
 subatomic particles to boost exotic production.
 A prestige erases the progress of a single element, and produces exotic
 matter for said element.

 @namespace Components
 */
'use strict';

angular.module('game').component('exotic', {
  templateUrl: 'views/exotic.html',
  controller: ['state', 'format', 'visibility', 'upgrade', 'data', 'util', exotic],
  controllerAs: 'ct'
});

function exotic(state, format, visibility, upgrade, data, util) {
  let ct = this;
  ct.state = state;
  ct.data = data;
  ct.util = util;
  ct.format = format;
  ct.infuse = {};

  /* Exotic production is a function of the different resources of each
  element. Additionally, multi-element molecules count double, once for
  each participating element. */
  ct.exoticProduction = function(element) {
    let production = {};
    let exoticResource = data.elements[element].exotic;
    production[exoticResource] = 0;
    for (let resource of data.elements[element].includes) {
      if (!state.player.resources[resource].unlocked) {
        continue;
      }
      if (data.resources[resource].type.indexOf('molecule') !== -1) {
        let multiplier = 0;
        for (let key in data.resources[resource].elements) {
          let number = data.resources[resource].elements[key];
          multiplier += number;
        }
        for (let elem in data.resources[resource].elements) {
          let newExotic = data.elements[elem].exotic;
          production[newExotic] = production[newExotic] || 0;
          production[newExotic] += prestigeFormula(state.player.resources[resource].number)*multiplier;
        }
      }else{
        production[exoticResource] += prestigeFormula(state.player.resources[resource].number);
      }
    }
    for (let key in production) {
      // we adjust the infusion
      production[key] = Math.floor(production[key]*ct.totalInfuseBoost());
    }

    return production;
  };

  function prestigeFormula(resource){
    let stepFactor = Math.max(Math.pow(10, Math.floor(Math.log10(resource))), 1);
    let step = stepFactor/data.constants.EXOTIC_STEP_QUOTIENT;
    let sigmoidQuotient = 1+Math.pow(Math.E, -(resource/stepFactor-data.constants.EXOTIC_SIGMOID_MAGIC));
    let sigmoid = 1/sigmoidQuotient+0.1;
    return Math.floor(step * sigmoid);
  }

  ct.exoticPrestige = function(slot) {
    let resources = state.player.resources;
    let production = ct.exoticProduction(slot.element);

    for (let key in production) {
      resources[key].number += production[key];
      resources[key].unlocked = true;
    }

    for(let resource in ct.infuse){
      state.player.resources[resource].number -= ct.infuse[resource];
    }

    upgrade.resetElement(state.player, slot.element);

    // we deactivate reactions and redoxes
    for (let reaction of slot.reactions) {
      reaction.active = false;
    }

    for (let redox of slot.redoxes) {
      redox.active = false;
    }

    // we cache them in case players want to pick up the same element
    // the cache only lasts the current session
    state.reactionsCache[slot.element] = slot.reactions;
    state.redoxesCache[slot.element] = slot.redoxes;

    // FIXME: copy the hydrogen for the time being. actually should be set to null
    for(let key in data.element_slot){
      slot[key] = angular.copy(data.element_slot[key]);
    }
    slot.generators['1'] = 1;
    slot.element = 'H';
  };

  ct.buyExoticUpgrade = function(name, slot) {
    let price = data.exotic_upgrades[name].price;
    let currency = data.elements[slot.element].exotic;
    upgrade.buyUpgrade(state.player,
      state.player.exotic_upgrades[slot.element],
      name,
      price,
      currency);
  };

  ct.setPercentage = function(resource, percentage) {
    ct.infuse[resource] = Math.floor(state.player.resources[resource].number*(percentage/100));
  };

  ct.fixNumber = function(resource) {
    ct.infuse[resource] = Math.max(0, Math.min(state.player.resources[resource].number, ct.infuse[resource]));
  };

  /* This function checks that values inserted in the text boxes are
  valid numbers */
  ct.isValidInfusion = function() {
    let valid = true;
    for(let resource in ct.infuse){
      valid = valid && Number.isFinite(ct.infuse[resource]);
    }
    return valid;
  };

  ct.infuseBoost = function(resource) {
      let number = Math.min(ct.infuse[resource], state.player.resources[resource].number);
      if(number === 0){
        return 1;
      }
      // log adds diminishing returns to the infusion
      return 1 + Math.log(number)/Math.log(1.25)*ct.data.constants.INFUSE_POWER;
  };

  /* The infusion boosts are multiplicative with respect to each other */
  ct.totalInfuseBoost = function() {
    let total = 1;
    for(let resource in ct.infuse){
      total *= ct.infuseBoost(resource);
    }
    return total;
  };

  ct.visibleExoticUpgrades = function(slot) {
    return visibility.visible(data.exotic_upgrades, isExoticUpgradeVisible, slot);
  };

  function isExoticUpgradeVisible(name, slot) {
    return visibility.isUpgradeVisible(name, slot, data.exotic_upgrades[name]);
  }

  ct.visibleSubatomic = function() {
    return visibility.visible(data.resources, isSubatomicVisible, '');
  };

  function isSubatomicVisible(name) {
    if (!state.player.resources[name].unlocked) {
      return false;
    }

    if(data.resources[name].type &&
       data.resources[name].type.indexOf('subatomic') !== -1){
        return true;
    }

    return false;
  }
}