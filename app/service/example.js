"use strict";

const { CustomError, errorEnums } = require("../utility/error");
const ExampleModel = require("../database/mongodb/model/example");

require("mongoose").set("debug", true);
module.exports = {
  hello: async () => {
    console.log("sssssssssssssss");

    const res = await ExampleModel.find().lean();
    console.log('docs', res);

    return res
    // return 1;
  },
  someError: () => {
    throw new CustomError(errorEnums.ProductNotExists, {
      subError: { msg: "sssssss" },
    });
  },
};
