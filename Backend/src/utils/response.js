export const success = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

export const fail = (res, error, status = 400) => {
  return res.status(status).json({
    success: false,
    error,
  });
};
