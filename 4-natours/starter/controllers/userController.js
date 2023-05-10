const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, (err) => {
    if (err) res.send('ERROR :' + err);
  })
);

exports.checkID = (_, res, next, val) => {
  if (val * 1 > users.length) {
    return res.status(404).json({
      code: 404,
      status: 'fail',
      message: 'Requested User not found!!!',
    });
  }
  next();
};

exports.getAllUsers = (_, res) => {
  res.json({
    code: 200,
    status: 'success',
    results: users.length,
    data: users,
  });
};
exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  res.json({
    code: 200,
    status: 'success',
    data: user,
  });
};

exports.addUser = (req, res) => {};
exports.updateUser = (req, res) => {};
exports.deleteUser = (req, res) => {};
