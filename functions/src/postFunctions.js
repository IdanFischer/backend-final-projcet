import { mongo_creds } from "../secrets.js";
import { dbConnect } from "./dbConnect.js";

const collection_posts = mongo_creds.COLLECTION_POSTS


// --------------------- GET ---------------------
export function getAllPosts(req, res) {
  const db = dbConnect()
  const collection = db.collection(collection_posts)
  collection.find().sort({createdAt: -1 }).toArray()
  .then(docs => {
    const posts = docs.map(doc => ({...doc}))
    res.send(posts)
  })
  .catch(err => {
    console.error(err)
    res.status(500).json({error: err.message})
  })
}

// --------------------- ADD ---------------------
export function addPost(req, res) {
  const { game, title, description, level } = req.body
  // add image/videos later
  const newPost = { game, title, description, level, createdAt: Date() }
  const db = dbConnect()

  db.collection(collection_posts).insertOne(newPost)

  .then(() => getAllPosts(req, res))

  .catch(err => res.status(500).json({ error: err.message }))
}

// --------------------- UPDATE ---------------------


// --------------------- DELETE ---------------------