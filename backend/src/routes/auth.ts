import { Router } from 'express';
import { stravaCallback } from '../controllers/authController';

const router = Router();

// Define the callback route for Strava OAuth
router.get('/strava/callback', stravaCallback);

export default router;

