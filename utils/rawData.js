const categoryRawData =  
{
  name: '',
  description: '',
  seoDescription: '',
  categoryId: '',
  isLeaf: true,
  properties: [{
    name: 'Storage',
    required: true,
    filterable: true,
    filterChoices: [],
    hasUnits: true,
    units: [{
      label: 'MB',
      printLabel: 'MB',
      threshold: 1024,
      nextLabel: 'GB'
    }, {
      label: 'GB',
      printLabel: 'GB',
      threshold: 1024,
      nextLabel: 'TB'
    }, {
      label: 'TB',
      printLabel: 'TB',
      threshold: 1024,
      nextLabel: 'PB'
    }, {
      label: 'PB',
      printLabel: 'PB'
    }],
    input: {
      type: 'fractionalNumber',
      propertyChoices: []
    }
  }, {
    name: 'RAM',
    required: true,
    filterable: true,
    filterChoices: [],
    hasUnits: true,
    units: [],
    input: {
      type: 'fractionalNumber',
      propertyChoices: []
    }
  }, {
    name: 'OS',
    required: true,
    filterable: true,
    filterChoices: [],
    hasUnits: true,
    units: [],
    input: {
      type: 'selectOne',
      propertyChoices: [{
        label: 'Android',
        value: 'android'
      }, {
        label: 'iOS',
        value: 'ios'
      }, {
        label: 'Windows',
        value: 'windows'
      }]
    }
  }]
}