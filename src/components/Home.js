import React from 'react'

const Home = () => {
    const SPOTIFY_AUTH_URL =
        "https://accounts.spotify.com/authorize?client_id=f4dc20142ff44f7f8ebab97384c58cda&response_type=code&redirect_uri=https://3001-cs-22039308829-default.cs-asia-southeast1-fork.cloudshell.dev/callback&scope=user-read-private%20user-read-email";


    return (
        <div>
            <h1>Login to Spotify</h1>
            <a href={SPOTIFY_AUTH_URL}>
                <button>Login with Spotify</button>
            </a>
        </div>
    )
}

export default Home