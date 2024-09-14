const express = require('express')
const cors = require('cors');
const axios = require('axios');

const app = express()
app.use(cors());
const port = 3001

app.get('/', (req, res) => {
    res.send({
        message: "Hello World from Express API backend!"
    })
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})



// app.get('/auth/callback', async (req, res) => {
//   const authorizationCode = req.query.code;

//   try {
//     const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
//       client_id: process.env.STRAVA_CLIENT_ID,
//       client_secret: process.env.STRAVA_CLIENT_SECRET,
//       code: authorizationCode,
//       grant_type: 'authorization_code',
//     });

//     const accessToken = tokenResponse.data.access_token;
//     const refreshToken = tokenResponse.data.refresh_token;
//     const expiresAt = tokenResponse.data.expires_at;

//     // Store the access and refresh tokens securely in your database
//     // You can create or update the user in your database at this point

//     res.redirect(`http://localhost:5173/dashboard?token=${accessToken}`);  // Redirect to dashboard or frontend with token
//   } catch (error) {
//     console.error('Error exchanging code for token:', error);
//     res.status(500).send('Error during authentication');
    
//   }
// });
app.get('/strava/callback', async (req, res) => {
  try {
    const code = req.query.code; // Strava sends the authorization code here
    
    if (!code) {
      return res.status(400).send('No authorization code provided');
    }

    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code'
    });

    const { access_token, refresh_token, expires_at } = tokenResponse.data;

    // Handle the received tokens, such as storing them in the database
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    console.log('Token Expires At:', new Date(expires_at * 1000));

    // Redirect or send a success response
    res.status(200).send('Authentication successful! You can now close this window.');
    
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).send('Authentication failed.');
  }
});



