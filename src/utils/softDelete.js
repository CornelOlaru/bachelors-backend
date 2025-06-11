//Override default "find", "findOne" and ... functions to exclude delete records
function addSoftDeleteHook(schema) {
  const queryMiddleware = ["find", "findOne", "findById", "findOneAndUpdate"];
  queryMiddleware.forEach((method) => {
    schema.pre(method, function () {
      this.where({ deleted: false });
    });
  });
}


module.exports = addSoftDeleteHook;