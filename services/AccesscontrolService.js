const AccessControl = require('accesscontrol');
const constants = require('../config/constants');

const grantsObject = {
  [constants.ADMIN]: {
    users: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    videos: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    messages: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    featured_videos: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    categories: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    admin: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    'admin/requests': {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    'admin/videos': {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    'admin/messages': {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    'admin/upload': {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    'admin/YouTube': {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    }
  },
  [constants.REVIEWER]: {
    users: {},
    videos: {
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*']
    },
    messages: {},
    featured_videos: {},
    categories: {},
    'admin/requests': {
      'read:any': ['*'],
      'update:any': ['*']
    },
    'admin/videos': {
      'read:any': ['*'],
      'update:any': ['*']
    },
    'admin/messages': {
      'read:any': ['*'],
      'update:any': ['*']
    },
    'admin/upload': {
      'read:any': ['*'],
      'create:any': ['*'],
    },
    'admin/YouTube': {
      'read:any': ['*'],
      'create:any': ['*'],
    }
  }
};

ac = new AccessControl(grantsObject);

module.exports = ac;