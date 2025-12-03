import { Router } from 'express';
import { getGovernmentAlerts, getWeatherAtLocation, getForecastAtLocation } from '../controllers/governmentAlertsController';

const router = Router();

// Get all government alerts (NOAA + USGS)
router.get('/alerts', getGovernmentAlerts);

// Get ocean weather at specific location
router.get('/weather', getWeatherAtLocation);

// Get marine forecast for location
router.get('/forecast', getForecastAtLocation);

export default router;
