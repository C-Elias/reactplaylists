const clientId = 'ab315851dd8d4d23a85da8c08addf3cd';
const redirectUri = 'http://localhost:3000'
let accessToken; 

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }  
        // Check for acess token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); 
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); 
        
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);  
        // Clears the parameters, allows us to grab new access token when expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000); 

        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl; 
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
            return response.json(); 
    }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
            return [];
        } 
        return jsonResponse.tracks.items.map(track ({
            id: track.id,
            name: track.name,
            artist: track.artist[0],
            album: track.album.name,
            uri:track.uri
        }));
    });
}, 


export default Spotify;