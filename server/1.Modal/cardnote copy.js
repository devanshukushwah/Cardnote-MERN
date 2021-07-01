const mongoose = require("mongoose")
const directorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  createdtime: { type: Date, required: true, default: Date.now },
  author: { type: String, required: true },
  folderlist: [String],
  cardlist: [String],
})
const folderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  createdtime: { type: Date, required: true, default: Date.now },
})
const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: String, required: true },
  trash: { type: Boolean, required: true, default: false },
  createdtime: { type: Date, required: true, default: Date.now },
})

const folders = mongoose.model("folders", folderSchema)
const cards = mongoose.model("cards", cardSchema)
const directories = mongoose.model("directories", directorySchema)

module.exports = { folders, cards, directories }
