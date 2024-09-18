import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.STRAVA_CLIENT_ID || '';
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || '';
const REDIRECT_URI = 'localhost:5173';

export const stravaCallback = async (req: Request, res: Response) => {
  console.log('stravaCallback');
  const code = req.query.code;
  console.log(CLIENT_SECRET, CLIENT_ID, REDIRECT_URI, "code", code);
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://www.strava.com/api/v3/oauth/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });
    
    const { access_token, refresh_token, expires_at } = tokenResponse.data;
    console.log(tokenResponse.data),
    // Here, you can handle storing tokens in the database or session
    res.status(200).json({
      message: 'Successfully authenticated',
      access_token,
      refresh_token,
      expires_at,
    });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Authentication failed ' + JSON.stringify(error));
  }
};

