const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  Todo: { type: String, required: true },
  completed: {type: Boolean,default: false},
  userId: { type: String, required: true },
});
const todoModel = mongoose.model("todo", todoSchema);

module.exports = {
  todoModel,
};
