const isString = input => typeof input === 'string' || input instanceof String
const isObj = input => typeof input === 'object'

const defaultPageOffset = 1
const defaultPageSize = 5

const trimString = input => {
    for (const key in input) {
        if (isString(input[key])) {
            // dont trim password
            if (key.indexOf('password') !== -1) {
                continue
            }

            // delete empty string
            if (isString(input[key]) && !input[key].trim()) {
                delete input[key]
                continue
            }

            // trim all other strings
            input[key] = input[key].trim()

            // lowercase email
            if (key.toLowerCase().indexOf('email') !== -1) {
                input[key] = input[key].toLowerCase()
            }
        } 
        // trim elements in array
        else if (Array.isArray(input[key])) {
            for (let i = 0; i < input[key].length; i++) {
                trimString(input[key][i])
            }
        }
        
        // trim elements in object
        else if (isObj(input[key])) {
            trimString(input[key])
        }
    }
}

const getDocumentOffset = ({ pageIndex, pageSize }) => {
    return (pageIndex - 1) * pageSize
}

module.exports = { defaultPageOffset, defaultPageSize, trimString, getDocumentOffset }