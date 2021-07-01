const mongoose = require("mongoose")
const folderSchema = new mongoose.Schema({
  author: { type: String, required: true },
  parent: { type: String, required: true, default: "homepage" },
  title: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  createdtime: { type: Date, required: true, default: Date.now },
})
const cardSchema = new mongoose.Schema({
  author: { type: String, required: true },
  parent: { type: String, required: true, default: "homepage" },
  title: { type: String, required: true },
  data: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  createdtime: { type: Date, required: true, default: Date.now },
})

const folders = mongoose.model("folders", folderSchema)
const cards = mongoose.model("cards", cardSchema)

module.exports = { folders, cards }
