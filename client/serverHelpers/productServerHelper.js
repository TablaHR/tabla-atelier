var axios = require('axios');

// Returns the active product
const getActiveProductInfo = function(id) {
    return new Promise((res, rej) => {
        axios.get(`${process.env.EXPRESS_SERVER}/active-product`, { params: {id}})
            .then((data) => {
                res(data.data);
            })
            .catch(() => {
                rej("Failed to get Product Data");
            });
    });
}

// Returns the relevant styles
const getActiveProductStyles = function (id) {
    return new Promise((res, rej) => {
        axios.get(`${process.env.EXPRESS_SERVER}/active-product-styles`, { params: {id}})
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