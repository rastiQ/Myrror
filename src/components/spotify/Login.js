import React from 'react'
import { RiSpotifyLine } from 'react-icons/ri'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENTID}&response_type=code&redirect_uri=http://localhost:3000&
scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20
user-modify-playback-state`

export default function Login() {
    return (
        <div className="spotifyAuth">
            <p>Ak chcete počúvať hudbu, pokračujte <b>prihlásením</b>!</p>
            <a className="spotifyLogin" href={AUTH_URL}><RiSpotifyLine className="spotifyIcon"/> Prihlásiť sa cez spotify</a>
        </div>
    )
}
