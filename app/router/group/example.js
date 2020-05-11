"use strict";

const Router = require("koa-router");
const router = new Router();
router.prefix("/api");

const validateMiddleware = require("../../middleware/ajv/index");
const exampleSchema = require("../../middleware/ajv/schema/example");

const ExampleController = require("../../controller/example.js");
const upload = require('../../middleware/upload')

router.get("/hello", ExampleController.hello);
router.post(
  "/error",
  validateMiddleware(exampleSchema.updateExample),
  ExampleController.error
);
router
  .get("/index", async (ctx) => {
    console.log('matched', ctx.render);

    await ctx.render("index", {
      users: [
        { name: "Dead Horse" },
        { name: "Jack" },
        { name: "Tom" },
      ],
    });
    console.log(ctx.body);

  })
router.post('/file', upload.single('file'), (ctx) => {
  console.log(ctx.req.body)
})

module.exports = router;
