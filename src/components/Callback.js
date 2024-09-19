import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";


const Callbacks = () => {
    const [searchParams] = useSearchParams();
    const [accessToken, setAccessToken] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const code = searchParams.get('code')
        if (code) {
            const getToken = async () => {
                const body = new URLSearchParams({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET,
                });

                const response = await fetch("https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: body,
                });


                const data = await response.json()
                setAccessToken(data.access_token)
            }
            getToken()
        }

    }, [searchParams])

    useEffect(() => {
        if (accessToken) {
            console.log("Access Token:", accessToken); // Log access token
            const fetchUserData = async () => {
                const response = await fetch("https://api.spotify.com/v1/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                console.log("User Data:", data);
                setUserData(data);
            };

            fetchUserData();
        }
    }, [accessToken]);

    return (
        <div>
            <h1>Callback</h1>
            {accessToken ? (
                <div>
                    <p>Access Token:</p>
                    <pre>{accessToken}</pre>
                    {userData ? (
                        <div>
                            <h2>User Info:</h2>
                            <p>Name: {userData.display_name}</p>
                            <p>Name: {userData.email}</p>
                        </div>
                    ) : (
                        <p>Loading user info...</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Callbacks