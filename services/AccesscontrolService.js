const AccessControl = require('accesscontrol');
const constants = require('../config/constants');

const grantsObject = {
  [constants.ADMIN]: {
    users: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    }
  },
  [constants.REVIEWER]: {
    users: {}
  }
};

ac = new AccessControl(grantsObject);

module.exports = ac;