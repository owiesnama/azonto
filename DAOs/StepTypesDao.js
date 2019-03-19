const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const stepTypesModel = models.step_types;

class StepTypesDao extends BaseDao {
  constructor() {
    super(stepTypesModel)
  }
}

module.exports = StepTypesDao