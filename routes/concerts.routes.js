const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertsController.getAll);

router.route('/concerts/:id').get(ConcertsController.getById);

router.route('/concerts').post(ConcertsController.post);

router.route('/concerts/:id').delete(ConcertsController.delete);

router.route('/concerts/:id').put(ConcertsController.put);

module.exports = router;