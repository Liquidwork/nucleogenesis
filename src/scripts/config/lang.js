'use strict';

angular
  .module('game')
  .config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'GAME_NAME': 'Nucleogenesis',
    'BANDWIDTH': 'Bandwidth',
    'ADJUST_AMOUNT': 'Adjust amount',
    'ADJUST_LEVEL': 'Adjust level',
    'UPGRADE': 'Upgrades',
    'LEVEL': 'Level',
    'ADD': 'Add',
    'SLOTS': 'Slots',
    'REACTION': 'Reaction',
    'REDOX': 'Redox',
    'ACTIVE': 'Active',
    'REMOVE': 'Remove',
    'FROM': 'From',
    'TO': 'To',
    'INDEX': {
      'MATTER': 'Matter',
      'EXOTIC': 'Exotic matter',
      'DARK': 'Dark matter',
      'REDOX': 'Redox',
      'REACTIONS': 'Reactions',
      'FUSION': 'Fusion',
      'TABLE': 'Periodic Table',
      'ACHIEVEMENTS': 'Achievements',
      'DASHBOARD': 'Dashboard',
      'STATS': 'Statistics',
      'OPTIONS': 'Options',
      'DEV_WARNING': '<b>Warning:</b> This is an early beta version under heavy development. Expect unbalanced gameplay, bugs, save wipes and broken features.',
      'FASTER_TICKS': 'Faster ticks: spend your offline gains to accelerate game speed.',
      'ACTIVATE': 'Activate',
      'ACHIEVEMENT': 'Achievement'
    },
    'ACHIEVEMENTS': {
      'HIDE_COMPLETE': 'Hide completed achivements:'
    },
    'DARK': {
      'DESCRIPTION': 'Sacrifice your progress to obtain dark matter. Dark matter boosts your global production {{ct.data.constants.DARK_POWER*100}}% and unlocks new upgrades.',
      'PRESTIGE_NOW': 'Prestige now to obtain',
      'PRESTIGE': 'Prestige',
      'PRODUCTION': 'You produced'
    },
    'DASHBOARD': {
      'MISC': 'Misc.'
    },
    'ELEMENT_SELECT': {
      'SELECT': 'Select an element for slot'
    },
    'ELEMENTS': {
      'DESCRIPTION': 'Buy new elements to unlock generators and upgrades. Success rate is proportional to each element abundance. Accumulate resources or spend more <get-html value="\'dark_matter\'"></get-html> to increase the chance of success. All used <get-html value="\'dark_matter\'"></get-html> will be consumed on purchase.',
      'BUY_AMOUNT': 'Buy amount',
      'LEGEND': 'Legend',
      'COLOR': 'Color',
      'STATE': 'State',
      'HIDE': 'Hide',
      'PURCHASED': 'Purchased',
      'AVAILABLE': 'Available',
      'UNAVAILABLE': 'Unavailable',
      'SYNTHETIC': 'Synthetic',
      'ABUNDANCE': 'Abundance',
      'ISOTOPES': 'Isotopes',
      'REDOXES': 'Redoxes',
      'BUY': 'Buy',
      'SUCCESS': 'Success'
    },
    'EXOTIC': {
      'HIDE': 'Hide bought upgrades',
      'SORT': 'Sort by',
      'SORT_NAME': 'Name',
      'SORT_PRICE': 'Price',
      'SACRIFICE': 'Sacrifice your progress to obtain exotic matter. Exotic matter boosts your production for the element by {{ct.data.constants.EXOTIC_POWER*100}}% and unlocks new upgrades.',
      'BOOST': 'You can spend subatomic particles to boost your exotic matter production.',
      'BOOST_TOTAL': 'Total boost',
      'PRESTIGE_NOW': 'Prestige now to obtain',
      'PRESTIGE': 'Prestige',
      'PRODUCED': 'You produced'
    },
    'FUSION': {
      'CAPACITY': 'Capacity',
      'AREA': 'Area',
      'AMOUNT': 'Adjust amount',
      'LEVEL': 'Adjust level',
      'BAND': 'eV bandwidth',
      'BEAM': 'Beam',
      'TARGET': 'Target',
      'NO_PRODUCT': 'No product for these source isotopes',
      'PRODUCT': 'Product',
      'ISOTOPE': 'Isotope',
      'ENERGY': 'Energy',
      'BARRIER': 'Coulomb barrier',
      'YIELD_P': 'Yield',
      'YIELD_TOTAL': 'Yield total',
      'TOTAL_TIME': 'Total time',
      'REACTION': 'Reaction',
      'LOAD': 'Load',
      'UNLOAD': 'Unload',
      'RUN': 'Run'
    },
    'GENERATORS': {
      'ELECTRONEG': 'Electronegativity',
      'GENERATOR': 'Generator',
      'NUMBER': 'Number',
      'TOTAL': 'Total',
      'PRICE': 'Price',
      'BUY': 'Buy'
    },
    'OPTIONS': {
      'ERASE': 'Erase save',
      'IMPORT': 'Import Save',
      'EXPORT': 'Export Save',
      'FORMAT': 'Number Format',
      'STD': 'Standard',
      'SCI': 'Scientific',
      'HY': 'Hybrid',
      'ENG': 'Engineering',
      'GITHUB': 'Github',
      'CHANGE': 'Changelog'
    },
    'STATS': {
      'EXO': 'Exotic run',
      'DARK': 'Dark run',
      'ALL': 'All time'
    },
    'UPGRADES': {
      'HIDE': 'Hide bought upgrades',
      'SORT': 'Sort by',
      'NAME': 'Name',
      'PRICE': 'Price',
      'GLOBAL': 'Global',
      'LEVEL': 'Level',
      'BUY_ALL': 'Buy all'
    }
  });

  $translateProvider.preferredLanguage('en');
}]);