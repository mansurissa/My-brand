const errorRes = (res, status, message) => {
  res.status(status).json({
    success: false,
    message,
    data: {},
  });
};

export default errorRes;
