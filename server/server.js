const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/login', (req, res) => {
    const code = req.body.code

    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((error) => {
        res.sendStatus(400)
    })
})

app.post('/refresh', (req,res) => {
    const refreshToken = req.body.refresh_token

    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })

    spotifyApi.refreshAccessToken().then((data) => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expiresIn
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)