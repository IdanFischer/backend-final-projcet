import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addAnime, deleteAnime, getAnimes } from "./src/animeFunctions.js"

const app = express()
app.use( express.json() )
app.use( cors() )

app.get("/", (req, res) => res.send("The one root is real"))

app.get("/anime", getAnimes)
app.post("/anime", addAnime)
app.delete("/anime/:animeId", deleteAnime)

export const api = functions.https.onRequest(app)
