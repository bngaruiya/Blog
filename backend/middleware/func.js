function validPost(post) {
  const hasTitle = typeof post.title == 'string' && post.title.trim() != '';
  const hasContent =
    typeof post.content == 'string' && post.content.trim() != '';
  return hasTitle && hasContent;
}

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  } else {
    next(new Error('Invalid ID!!'));
  }
}

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword =
    typeof user.password == 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
}

module.exports = {
  validPost,
  isValidId,
  validUser
};
