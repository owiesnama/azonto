class BaseDao {
  constructor(model) {
    this.model = model;
  }

  findAll(where = {}, include = [], pageSize, pageNumber, order = null) {
    const that = this;

    let options = {
      include: include,
      where: where,
      order
    }

    if (pageSize || pageNumber) {
      const offset = pageSize * pageNumber;
      options.offset = offset;
      options.limit = pageSize;
    }

    return new Promise((resolve, reject) => {
      that.model.findAll(options)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  findById(id, options) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.findById(id, options)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  findOne(where = {}) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.findOne({
          where
        })
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  create(data) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.create(data)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  bulkCreate(data = []) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.bulkCreate(data)
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  update(attributes, where = {}) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.update(attributes, {
          where: where
        })
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  delete(where = {}) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.destroy({
          where: where
        })
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  count(where = {}) {
    const that = this;

    return new Promise((resolve, reject) => {
      that.model.count({
          where: where
        })
        .then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

}

module.exports = BaseDao