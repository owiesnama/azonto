const AccessControl = require('accesscontrol');

// This is actually how the grants are maintained internally.
let grantsObject = {
  admin: {
    settings: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    workflows: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    }
  },
  user: {
    settings: {
      // 'create:any': ['*'],
      'read:any': ['*'],
      // 'update:any': ['*'],
      // 'delete:any': ['*']
    },
    workflows: {
      // 'create:any': ['*'],
      'read:any': ['*'],
      // 'update:any': ['*'],
      // 'delete:any': ['*']
    }
  }
};

const ac = new AccessControl(grantsObject);

module.exports = ac;