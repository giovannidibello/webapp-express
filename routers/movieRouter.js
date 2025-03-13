// importo express
const express = require('express')
const router = express.Router();

// importo le funzioni del controller
const movieController = require("../controllers/movieController");

// index
router.get('/', movieController.index);

// show
router.get('/:id', movieController.show);

// store
router.post('/', movieController.store);

// store review
router.post('/:id/reviews', movieController.storeReview);

// update
router.put('/:id', movieController.update);

// modify
router.patch('/:id', movieController.modify);

// destroy
router.delete('/:id', movieController.destroy);

// esporto router
module.exports = router;