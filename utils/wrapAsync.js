const wrapAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Directly call .catch on the result of fn
    };
};

module.exports = wrapAsync;