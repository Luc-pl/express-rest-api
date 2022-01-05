const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertsController.getAll);

router.route('/concerts/:id').get(ConcertController.getById);

router.route('/concerts').post(ConcertController.post);

router.route('/concerts/:id').delete(ConcertController.delete);

router.route('/concerts/:id').put(ConcertController.put);

module.exports = router;