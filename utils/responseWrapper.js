const successWrapper = ({
    res,
    status = 200,
    message = "Success",
    data = null
}) => {
    return res.status(status).json({
        message,
        data
    })
}

const errorWrapper = ({
    res,
    status = 500,
    message = "Something went wrong",
    errors = null,
    type = 'UnknownError' // validation/general/unknown error
}) => {
    return res.status(status).json({
        message,
        errors,
        type
    })
}

module.exports = { successWrapper, errorWrapper }