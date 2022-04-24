// custom error handler
const errorHandler = (err, req, res, next) => {
    // getting status code if there is already one available, otherwise 500
    const statusCode = res.statusCode ? res.statusCode : 500;

    // response sent with statuscode above
    res.status(statusCode);

    // sending json information on the error depending on whether app is in development mode or production
    res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });

}

module.exports = {
    errorHandler
};