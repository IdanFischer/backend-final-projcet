import { ObjectId } from "mongodb";
import { mongo_creds } from "../secrets.js";
import { dbConnect } from "./dbConnect.js";

const collection_anime = mongo_creds.COLLECTION_ANIME

// --------------------- GET ---------------------

export function getAnimes(req, res) {
  const db = dbConnect();
  const collection = db.collection(collection_anime)
  collection.find().sort({ createdAt: -1 }).toArray()
    .then(docs => {
      const anime = docs.map(doc => ({ ...doc }))
      res.send(anime)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.message })
    });
}

// --------------------- ADD ---------------------

export function addAnime(req, res) {
  const { title, info, rating, review, image } = req.body
  if((title.length || info.length || rating.length || review.length || image.length) < 1) {
    res.status(500).json({message: "Input Fields are empty or too short!"})
    return
  }
  const newAnime = { title, info, rating, review, image, createdAt: new Date() }
  const db = dbConnect()
  db.collection(collection_anime).insertOne(newAnime)

    .then(() => getAnimes(req, res))

    .catch(err => res.status(500).json({ error: err.message }))
}

// --------------------- UPDATE ---------------------

export function updateAnime(req, res) {
  const { animeId } = req.params

  const db = dbConnect()
  db.collection(collection_anime)
    .findOneAndUpdate({ _id: new ObjectId(animeId) }, { $set: req.body })
    .catch(err => res.status(500).json({ error: err.message }))
    .then(() => getAllCommentsInPost(req, res))
  // res.status(202).send({message: "Comment Updated!"})
}

// --------------------- DELETE ---------------------

export function deleteAnime(req, res) {
  const { animeId } = req.params
  
  const db = dbConnect()
  db.collection(collection_anime)
    .findOneAndDelete({_id: new ObjectId(animeId)})
    .catch(err => res.status(500).json({error: err.message}))
    .then(() => getAnimes(req, res))

}
