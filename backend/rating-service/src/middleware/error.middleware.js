const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(err);


  // Duplicate rating
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message:
        "User has already rated this cake",
    });
  }


  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};


module.exports = errorHandler;