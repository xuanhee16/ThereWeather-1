module.exports = async (req, res) => {
  delete req.headers.authorization;
  res.clearCookie("refreshToken");
  localStorage.clear();
}