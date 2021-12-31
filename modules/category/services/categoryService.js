const { Category, Property, FilterChoice, Unit } = require('../models/index')
const { defaultPageOffset, defaultPageSize, getDocumentOffset } = require('../../../utils/global')
// const mongoose = require('mongoose')

const createCategory = async (categoryInput) => {
    const propertyIds = []
    
    if (categoryInput.properties && Array.isArray(categoryInput.properties)) {
        for (let i = 0; i < categoryInput.properties.length; i++) {
            const propertyInput = categoryInput.properties[i]

            if (propertyInput.filterChoices && Array.isArray(propertyInput.filterChoices)) {
                const filterChoiceIds = []
                for (let i = 0; i < propertyInput.filterChoices.length; i++) {
                    const filterChoiceInput = propertyInput.filterChoices[i]
                    const filterChoice = new FilterChoice(filterChoiceInput)
                    await filterChoice.save()
                    filterChoiceIds.push(filterChoice._id)
                }
                propertyInput.filterChoices = filterChoiceIds
            }

            if (propertyInput.units && Array.isArray(propertyInput.units)) {
                const unitIds = []
                for (let i = 0; i < propertyInput.units.length; i++) {
                    const unitInput = propertyInput.units[i]
                    const unit = new Unit(unitInput)
                    await unit.save()
                    unitIds.push(unit._id)
                }
                propertyInput.units = unitIds
            }

            const property = new Property(propertyInput)
            await property.save()
            propertyIds.push(property._id)
        } 
    }

    categoryInput.properties = propertyIds
    const category = new Category(categoryInput)
    await category.save()
    return category
}

const getParentCategories = async () => {
    const parentCategories = await Category.find({
        isLeaf: false,
        // isActive: true
    }).lean()
    return parentCategories
}

const getCategoriesOnPage = async ({ pageIndex = defaultPageOffset, pageSize = defaultPageSize, keyword }) => {
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    const filters = {}
    if (keyword) {
        filters.name = {
            $regex: keyword
        }
    }

    const [categories, totalDocument] = await Promise.all([
        Category
            .find(filters)
            .populate({
                path: 'properties',
                populate: ['filterChoices', 'units']
            })
            .skip(getDocumentOffset({ pageIndex, pageSize }))
            .limit(pageSize)
            .lean(),
        Category.countDocuments(filters)
    ])
    const pageInfo = { totalDocument, pageIndex, pageSize }
    return { categories, pageInfo }
}

const deleteCategory = async categoryId => {
    //if (mongoose.isValidObjectId(categoryId)) {
    const result = await Category.deleteOne({ _id: categoryId })
    return result
    // } else {
    //     console.log("invalid:" + categoryId)
    // }
} 

module.exports = { createCategory, getParentCategories, getCategoriesOnPage, deleteCategory }