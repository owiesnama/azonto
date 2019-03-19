const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const stepsModel = models.steps;

const include = [{
    model: models.workflows,
    as: 'workflow',
    attributes: ['name']
  },
  {
    model: models.users,
    as: 'initiator',
    attributes: {
      exclude: ['password']
    }
  },
  {
    model: models.step_types,
    as: 'step_type',
    attributes: ['name']
  }
];

class StepsDao extends BaseDao {
  constructor() {
    super(stepsModel)
  }

  findAll(where = {}, pageSize, pageNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await super.findAll(where, include, pageSize, pageNumber);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = StepsDao