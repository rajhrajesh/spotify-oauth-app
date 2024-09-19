import React from 'react'

const Home = () => {
    const SPOTIFY_AUTH_URL = process.env.REACT_APP_SPOTIFY_AUTH_URL || 'URL fallback if missing';
    console.log(SPOTIFY_AUTH_URL);


    const handleLoginClick = () => {
        console.log("Login button clicked");
        window.location.href = SPOTIFY_AUTH_URL;
    };


    return (
        <div>
            <h1>Login to Spotify</h1>
            <a href={SPOTIFY_AUTH_URL}>
                <button onClick={handleLoginClick}>Login with Spotify</button>
            </a>
        </div>
    )
}

export default Home