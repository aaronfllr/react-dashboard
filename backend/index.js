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



app.get('/auth/callback', async (req, res) => {
  const authorizationCode = req.query.code;

  try {
    const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: authorizationCode,
      grant_type: 'authorization_code',
    });

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;
    const expiresAt = tokenResponse.data.expires_at;

    // Store the access and refresh tokens securely in your database
    // You can create or update the user in your database at this point

    res.redirect(`/dashboard?token=${accessToken}`);  // Redirect to dashboard or frontend with token
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Error during authentication');
  }
});
