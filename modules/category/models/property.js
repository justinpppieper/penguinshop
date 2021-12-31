const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  required: {
    type: Boolean,
    required: true
  },
  
  filterable: {
    type: Boolean,
    default: false
  },

  filterChoices: [{
    type: mongoose.Types.ObjectId,
    ref: 'FilterChoice'
  }],
  
  hasUnits: Boolean,
  
  units: [{
    type: mongoose.Types.ObjectId,
    ref: 'Unit'
  }],

  input: {
    type: {
      type: String,
      enum: [
        'fractionalNumber', // Numbers with decimal points
        'completeNumber', // Numbers without decimal points
        'textOneline', // One line of text
        'textMultiline', // Paragraph line of text
        'selectOne', // Dropdown with abitlity to select one
        'selectMultiple' // Dropdown with abiltiy to select multiple
      ]
    },
    propertyChoices: [{
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }]
  }
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property
