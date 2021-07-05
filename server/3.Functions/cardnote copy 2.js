const { folders, cards } = require("../1.Modal/cardnote.js")

// FOR FETCH ALL DATA
const fetchAll = async (req, res) => {
  try {
    const newFolders = await folders.find()
    const newCards = await cards.find()
    res.status(200).json(newFolders.concat(newCards))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const fetchAllTrash = async (req, res) => {
  try {
    const tempFolders = await folders.find({ trash: true })
    const tempCards = await cards.find({ trash: true })
    res.status(200).json(tempFolders.concat(tempCards))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// FOR FETCH ON DIRECTORY
const fetchOneDirectory = async (req, res) => {
  try {
    const author = req.userId
    let { parent } = req.params
    if (!parent) return res.json({ message: "id is null" })
    const fetchFolders = await folders.find({ parent, author, trash: false })
    const fetchCards = await cards.find({ parent, author, trash: false })
    const fetchData = { folders: fetchFolders, cards: fetchCards }
    if (!fetchData) return res.status(200).json([])
    res.status(200).json(fetchData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// FOR INSERT DATA
const postData = async (req, res) => {
  try {
    const { title, data, type } = req.body
    let { parent } = req.body
    const author = req.userId
    if (!parent || !title || !type)
      return res.status(400).json({ message: `some value are null` })

    let insertedItem
    if (type === "folder") {
      const folder = new folders({
        title,
        parent,
        author,
      })
      insertedItem = await folder.save()

      res.status(200).json(insertedItem)
    } else if (type === "card") {
      if (!data) res.status(400).json({ message: "data is null" })
      const card = new cards({
        title,
        data,
        parent,
        author,
      })
      insertedItem = await card.save()

      res.status(200).json(insertedItem)
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// TO DELETE ELEMENTS
const deleteElements = async (req, res) => {
  try {
    const { deletelist } = req.body
    if (!deletelist) res.status(400).json({ message: "id is null" })
    await folders.deleteMany({
      _id: {
        $in: deletelist,
      },
    })
    await cards.deleteMany({
      _id: {
        $in: deletelist,
      },
    })

    res.status(200).json(tempDelete)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// TO TRASH A ELEMENTS
const moveToTrash = async (req, res) => {
  try {
    const { itemlist } = req.body
    if (!itemlist) return res.json({ message: "item is null" })
    const tempFolder = await folders.updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: true },
      },
      { alter: true }
    )
    const tempCard = await cards.updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: true },
      },
      { alter: true }
    )
    res.status(200).json([tempFolder, tempCard])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// TO RESTORE A ITEM
const restoreToTrash = async (req, res) => {
  try {
    const { itemlist } = req.body
    if (!itemlist) return res.json({ message: "item is null" })
    const tempFolder = await folders.updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: false },
      },
      { alter: true }
    )
    const tempCard = await cards.updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: false },
      },
      { alter: true }
    )
    res.status(200).json([tempFolder, tempCard])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// RENAME FOLDER
const renameFolder = async (req, res) => {
  try {
    const { id, newtitle } = req.body
    if (!id || !newtitle)
      return res.status(400).json({ message: "id or new title is null" })
    const newFolder = await folders.updateOne(
      { _id: id },
      {
        $set: { title: newtitle },
      }
    )
    res.status(200).json(newFolder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// RENAME CARD
const renameCard = async (req, res) => {
  try {
    const { id, newtitle, newdata } = req.body
    if (!id || !newtitle || !newdata)
      return res.status(400).json({ message: "id or new title is null" })
    const newCard = await cards.updateOne(
      { _id: id },
      {
        $set: { title: newtitle, data: newdata },
      }
    )
    res.status(200).json(newCard)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  fetchAll,
  fetchOneDirectory,
  postData,
  deleteElements,
  moveToTrash,
  restoreToTrash,
  renameFolder,
  renameCard,
  fetchAllTrash,
}
