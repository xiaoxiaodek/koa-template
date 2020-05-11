"use strict";

const ExampleService = require("../service/example.js");

module.exports = {
    hello: () => {
        return ExampleService.hello();
    },
    error: () => {
        return ExampleService.someError();
    },
};
