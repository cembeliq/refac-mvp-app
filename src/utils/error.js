/* eslint-disable no-unused-vars */
const handleError = (err, req, res, next) => {
  const { stack } = err;
  res.status(500).json({
    status: 'fail',
    message: stack,
  });
};

module.exports = {
  handleError,
};
