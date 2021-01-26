module.exports = async function (req, res, proceed) {
  if (req.session.user) {
    return proceed();
  }
  return res.redirect('/user/login?r='+encodeURIComponent(req.url));
};
