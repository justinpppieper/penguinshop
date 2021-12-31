/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/admin/category_create.js":
/*!***********************************************!*\
  !*** ./resources/js/admin/category_create.js ***!
  \***********************************************/
/***/ (() => {

eval("const app = new Vue({\n\n  el: '#app',\n  data: {\n    parentCategories: parentCategories,\n    inputTypes: inputTypes,\n    filterTypes: filterTypes,\n\n    category: \n    {\n      name: '',\n      description: '',\n      seoDescription: '',\n      parentCategoryId: '',\n      isLeaf: true,\n      properties: []\n    }\n  },\n\n  methods: {\n    saveCategory: function () {\n      axios.post('api/v1/category', this.category)\n        .then(response => {\n          Swal.fire(\n            response.data.message,\n            'success.'\n          ).then( _ => {\n            window.location = '/create'\n          })\n        })\n    },\n\n    addProperty: function () {\n      this.category.properties.push({\n        name: '',\n        required: true,\n        filterable: true,\n        hasUnits: true,\n        units: [],\n        filterChoices: [],\n        input: {\n          type: '',\n          propertyChoices: []\n        }\n      })\n    },\n    \n    deleteProperty: function (index) {\n      this.category.properties.splice(index, 1)\n    },\n\n    addFilter: function (property) {\n      const filterObj = {\n        label: '',\n        value: '',\n        type: ''\n      }\n      if (Array.isArray(property.filterChoices)) {\n        return property.filterChoices.push(filterObj)\n      }\n      property.filterChoices = [filterObj]\n    },\n\n    deleteFilter: function (property, index) {\n      property.filterChoices.splice(index, 1)\n    }, \n\n    addUnit: function (property) {\n      const unitObj = {\n          label: '',\n          printLabel: '',\n          threshold: '',\n          nextLabel: ''\n      }\n      if(Array.isArray(property.units)) {\n        return property.units.push(unitObj)\n      }\n      property.units = [unitObj]\n    },\n\n    deleteUnit: function (property, index) {\n      property.units.splice(index, 1)\n    },\n\n    addPropertyChoice: function (property) {\n      const choiceObj = {\n        label: '',\n        value: ''\n      }\n      if (Array.isArray(property.input.propertyChoices)) {\n        return property.input.propertyChoices.push(choiceObj)\n      }\n      property.input.propertyChoices = [choiceObj]\n    },\n\n    deletePropertyChoice: function (index, property) {\n      property.input.propertyChoices.splice(index, 1)\n    }\n  }\n})\n\n\n//# sourceURL=webpack://ecommerce-app/./resources/js/admin/category_create.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./resources/js/admin/category_create.js"]();
/******/ 	
/******/ })()
;