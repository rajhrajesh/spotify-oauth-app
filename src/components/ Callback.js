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
                    redirect_uri: "https://3001-cs-22039308829-default.cs-asia-southeast1-fork.cloudshell.dev/callback",
                    client_id: "f4dc20142ff44f7f8ebab97384c58cda",
                    client_secret: "5f497c76e61f4e2f8c55a6bafd0db387"
                });


                const response = await fetch("https://accounts.spotify.com/api/token", {
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