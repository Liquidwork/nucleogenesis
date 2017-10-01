/* eslint no-var: 0 */
/* globals describe,commonSpec,it,expect */
/* jshint varstmt: false */
'use strict';

describe('Dark', function() {
  let spec = {};

  commonSpec(spec);

  describe('prestige', function() {
    it('should produce prestige currency', function() {
      spec.data.elements.H = {
        exotic:'xH'
      };
      spec.data.elements.O = {
        exotic:'xO'
      };
      spec.state.player.resources.xH = {number:1e8, unlocked: true};
      spec.state.player.resources.xO = {number:1e8, unlocked: true};

      let production = spec.dark.darkProduction();

      expect(production).toEqual(36);
    });

    it('should prestige', function() {
      spec.data.elements.H = {
        exotic:'xH',
        includes: ['1H'],
        reactions: ['H.OH-H2O']
      };
      spec.data.resources = {
        '1H': {elements: {H: 1}, type: ['isotope']}
      };
      spec.state.player.elements.H = true;
      spec.state.player.resources['1H'] = {number:1e4, unlocked: true};
      spec.state.player.resources.xH = {number:1e8, unlocked: true};
      spec.state.player.resources.dark_matter = {number:0, unlocked: false};
      spec.state.player.exotic_upgrades = {
        'H':{
          x3: true
        }
      }
      spec.data.element_slot = {
        upgrades: {
          '1-1': false
        },
        generators: {
          '1': 0,
          '2': 0
        },
        reactions: [],
        redoxes: []
      };
      spec.state.player.element_slots = [{
          element: 'H',
          upgrades: {
            '1-1': true
          },
          generators: {
            '1': 99,
            '2': 99
          },
          reactions: [{
            active: true,
            reaction: ['H.OH-H2O']
          }]
        }
      ]

      spec.dark.darkPrestige();

      expect(spec.state.player.element_slots[0].upgrades['1-1']).toBeFalsy();
      expect(spec.state.player.exotic_upgrades.H.x3).toBeFalsy();
      expect(spec.state.player.element_slots[0].reactions.length).toEqual(0);
      expect(spec.state.player.element_slots[0].generators['1']).toEqual(1);
      expect(spec.state.player.element_slots[0].generators['2']).toEqual(0);
      expect(spec.state.player.resources['1H'].number).toEqual(0);
      expect(spec.state.player.resources.xH.number).toEqual(0);
      expect(spec.state.player.resources.dark_matter.number).toEqual(18);
    });
  });

  describe('purchase functions', function() {
    it('should purchase an upgrade if cost is met', function() {
      spec.data.dark_upgrades = {
        redox: {
          price: 100,
          deps: []
        }
      };
      spec.state.player.resources.dark_matter = {number:110};
      spec.state.player.dark_upgrades.redox = false;

      spec.dark.buyDarkUpgrade('redox');

      expect(spec.state.player.resources.dark_matter.number).toEqual(10);
      expect(spec.state.player.dark_upgrades.redox).toEqual(true);
    });

    it('should not purchase an upgrade if cost is not met', function() {
      spec.data.dark_upgrades = {
        redox: {
          price: 100,
          deps: []
        }
      };
      spec.state.player.resources.dark_matter = {number:10};
      spec.state.player.dark_upgrades.redox = false;

      spec.dark.buyDarkUpgrade('redox');

      expect(spec.state.player.resources.dark_matter.number).toEqual(10);
      expect(spec.state.player.dark_upgrades.redox).toEqual(false);
    });

    it('should skip if the upgrade is already bought', function() {
      spec.data.dark_upgrades = {
        redox: {
          price: 100,
          deps: []
        }
      };
      spec.state.player.resources.dark_matter = {number:110};
      spec.state.player.dark_upgrades.redox = true;

      spec.dark.buyDarkUpgrade('redox');

      expect(spec.state.player.resources.dark_matter.number).toEqual(110);
      expect(spec.state.player.dark_upgrades.redox).toEqual(true);
    });
  });

  describe('visibility functions', function() {
      it('should show if a dark upgrade is visible', function() {
        spec.data.dark_upgrades = {
          redox: {
            price: 100,
            deps: []
          }
        };
        spec.state.player.element_slots = [{
          element: 'H'
        }];

        let values = spec.dark.visibleDarkUpgrades('H');

        expect(values).toEqual(['redox']);
      });
  });
});