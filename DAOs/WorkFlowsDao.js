const BaseDao = require('./BaseDao')
const models = require('../DB/models/index')
const workFlowsModel = models.workflows;

class WorkFlowsDao extends BaseDao {
  constructor() {
    super(workFlowsModel)
  }
}

module.exports = WorkFlowsDao