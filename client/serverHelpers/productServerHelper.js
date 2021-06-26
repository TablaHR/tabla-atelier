var axios = require('axios');

// Returns the active product
const getActiveProductInfo = function() {
    return new Promise((res, rej) => {
        axios.get(`${process.env.EXPRESS_SERVER}/active-product`)
            .then((data) => {
                res(data.data);
            })
            .catch(() => {
                rej("Failed to get Product Data");
            });
    });
}

// Returns the relevant styles
const getActiveProductStyles = function () {
    return new Promise((res, rej) => {
        axios.get(`${process.env.EXPRESS_SERVER}/active-product-styles`)
            .then((data) => {
                res(data.data);
            })
            .catch(() => {
                rej("Failed to get Product Styles");
            });
    });
}
module.exports = {
    getActiveProductInfo: getActiveProductInfo,
    getActiveProductStyles: getActiveProductStyles,
}