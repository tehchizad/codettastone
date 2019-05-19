const express = require('express')
const router = express.Router()
const Item = require('../../models/items')

// @route GET api/items
// @desc grabs all items
// @access Pulic
router.get('/', (req, res) => {
  Item.find()
    .sort({
      date: -1 // sorts items by time/date
    })
    .then(items => res.json(items))
})

// @route POST api/items
// @desc creat a post request
// @access Pulic
router.post('/', (req, res) => {
  Item.find()
  const newItem = new Item({
    name: req.body.name // date is auto-populated by model
  })
  newItem.save().then(item => res.json(item))
})

// @route DELETE api/items
// @desc delete an item
// @access Pulic
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() =>
        res.json({
          successs: true
        })
      )
    )
    .catch(err =>
      console.log(err)
    )
})

module.exports = router
