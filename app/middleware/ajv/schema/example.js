module.exports.updateExample = {
    type: "object",
    properties: {
        itemIds: {
            type: "string",
            minLength: 1,
        },
        order: {
            type: "string",
            enum: ["asc", "desc"],
            default: "asc",
        },
        positionNum: {
            type: "integer",
            minimum: 1,
        },
        deviceType: {
            type: "string",
            enum: ["pc", "mobile"],
        },
        taskType: {
            type: "integer",
            enum: [0, 1],
            default: 0,
        },
        taskCategory: {
            type: "integer",
            enum: [0, 1, 2],
        },
        platform: {
            type: "string",
            default: "tmall",
        },
        taskName: {
            type: "string",
        },
    },
    required: [
        "itemIds",
        "order",
        "positionNum",
        "taskType",
        "taskCategory",
        "taskName",
        "deviceType",
    ],
};
