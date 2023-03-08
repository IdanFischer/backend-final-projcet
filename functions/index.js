import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addAnime, deleteAnimeDate, deleteAnimeRating, getAnimesByDate, getAnimesByRating, updateAnimeDate, updateAnimeRating } from "./src/animeFunctions.js"

const app = express()
app.use( express.json() )
app.use( cors() )

app.get("/", (req, res) => res.send("The one root is real"))

app.get("/anime/date", getAnimesByDate)
app.get("/anime/rating", getAnimesByRating)
app.post("/anime", addAnime)
app.patch("/anime/date/:animeId", updateAnimeDate)
app.patch("/anime/rating/:animeId", updateAnimeRating)
app.delete("/anime/date/:animeId", deleteAnimeDate)
app.delete("/anime/rating/:animeId", deleteAnimeRating)

export const api = functions.https.onRequest(app)
