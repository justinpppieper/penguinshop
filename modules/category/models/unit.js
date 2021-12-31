const mongoose = require('mongoose')

const unitSchma = new mongoose.Schema({
    /**
       * Applied unit to this category
       * In case of storage it can be MB, GB, TB, etc
       * [{ label: "KB", threshold: 1024, nextLabel: "MB"},
       * { label: "MB", threshold: 1024, nextLabel: "GB"},
       * { label: "GB", threshold: 1024, nextLabel: "TB"},
       * { label: "TB", threshold: 1024, nextLabel: "PB"}]
       */
  label: {
    type: String,
    required: true
  },
  printLabel: {
    type: String,
    required: true
  },
  threshold: Number,
  nextLabel: String
})

const Unit = mongoose.model('Unit', unitSchma)

module.exports = Unit
