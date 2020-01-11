const express = require('express');

const router = express.Router();
const posts = require('../db/postQueries');
const { isValidId, validPost } = require('../middleware/func');

router.get('/', (req, res) => {
  posts.getAll().then(post => {
    res.json(post);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  posts.getOne(req.params.id).then(post => {
    if (post) {
      res.json(post);
    } else {
      res.status(404);
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if (validPost(req.body)) {
    posts.create(req.body).then(post => {
      res.json({
        post: post[0]
      });
    });
  } else {
    res.json({ error });
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if (validPost(req.body)) {
    posts.update(req.params.id, req.body).then(post => {
      res.json(post[0]);
    });
  } else {
    next(new Error('Invalid Post!!'));
  }
});

router.delete('/:id', isValidId, (req, res, next) => {
  posts.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
