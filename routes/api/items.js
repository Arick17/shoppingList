const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

// @route GET api/items
//@description GET all Items
//@access Public
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
});

// @route POST api/items
//@description create a Item
//@access Public bcuz no auth
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
});

newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
//@description DELETE a Item
//@access Public bcuz no auth
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;