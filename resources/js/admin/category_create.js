const app = new Vue({

  el: '#app',
  data: {
    parentCategories: parentCategories,
    inputTypes: inputTypes,
    filterTypes: filterTypes,

    category: 
    {
      name: '',
      description: '',
      seoDescription: '',
      parentCategoryId: '',
      isLeaf: true,
      properties: []
    }
  },

  methods: {
    saveCategory: function () {
      axios.post('api/v1/category', this.category)
        .then(response => {
          Swal.fire(
            response.data.message,
            'success.'
          ).then( _ => {
            window.location = '/create'
          })
        })
    },

    addProperty: function () {
      this.category.properties.push({
        name: '',
        required: true,
        filterable: true,
        hasUnits: true,
        units: [],
        filterChoices: [],
        input: {
          type: '',
          propertyChoices: []
        }
      })
    },
    
    deleteProperty: function (index) {
      this.category.properties.splice(index, 1)
    },

    addFilter: function (property) {
      const filterObj = {
        label: '',
        value: '',
        type: ''
      }
      if (Array.isArray(property.filterChoices)) {
        return property.filterChoices.push(filterObj)
      }
      property.filterChoices = [filterObj]
    },

    deleteFilter: function (property, index) {
      property.filterChoices.splice(index, 1)
    }, 

    addUnit: function (property) {
      const unitObj = {
          label: '',
          printLabel: '',
          threshold: '',
          nextLabel: ''
      }
      if(Array.isArray(property.units)) {
        return property.units.push(unitObj)
      }
      property.units = [unitObj]
    },

    deleteUnit: function (property, index) {
      property.units.splice(index, 1)
    },

    addPropertyChoice: function (property) {
      const choiceObj = {
        label: '',
        value: ''
      }
      if (Array.isArray(property.input.propertyChoices)) {
        return property.input.propertyChoices.push(choiceObj)
      }
      property.input.propertyChoices = [choiceObj]
    },

    deletePropertyChoice: function (index, property) {
      property.input.propertyChoices.splice(index, 1)
    }
  }
})
