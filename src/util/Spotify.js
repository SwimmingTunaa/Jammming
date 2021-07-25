const clientID = '38d11822e0f14b869289d5cf6479f492';
const redirectUri = 'http://localhost:3000/';
let token;
const Spotify = {
    getAccessToken()
    {
        if (token)
        {
            return token;
        }
        
        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken && expiresInMatch)
        {
            token = accessToken[1]
            const expiresIn = Number(expiresInMatch[1])
            //this clears the parameters and allows us to access a token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return token;
        } else
        {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessURL
        }
    },

    search(term)
    {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization : `Bearer ${accessToken}`
                }
            }).then(response =>
            {
                return response.json();
            }).then(jsonResponse =>
            {
                if (!jsonResponse.tracks)
                {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri : track.uri
                }))
            })
    },

    savePlaylist(name, trackUris)
    {
        
        if (!name || !trackUris.length)
            return
        
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` }
        let userID;

        return fetch(
            'https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse =>{
            userID = jsonResponse.id
        console.log(userID)

            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name:name})
                }).then(response => response.json()
            ).then(jsonResponse =>{
                const playlistId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body : JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}

export default Spotify;