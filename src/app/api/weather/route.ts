import { NextResponse } from 'next/server';
import { WeatherData } from '@/types';

// Vicuña, Valle del Elqui, Chile coordinates
const VICUNA_LAT = -30.0319;
const VICUNA_LON = -70.7081;


export async function GET() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${VICUNA_LAT}&longitude=${VICUNA_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,cloud_cover,wind_speed_10m&timezone=America%2FSantiago`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current;

    const cloudCover = current.cloud_cover ?? 10;
    let skyCondition: WeatherData['skyCondition'] = 'Despejado estelar';
    if (cloudCover > 60) {
      skyCondition = 'Nublado';
    } else if (cloudCover > 30) {
      skyCondition = 'Parcialmente despejado';
    } else if (cloudCover > 15) {
      skyCondition = 'Bruma de altura';
    }

    const weatherPayload: WeatherData = {
      temperature: Math.round(current.temperature_2m ?? 22),
      apparentTemperature: Math.round(current.apparent_temperature ?? 21),
      cloudCover,
      windSpeed: Math.round(current.wind_speed_10m ?? 8),
      humidity: Math.round(current.relative_humidity_2m ?? 35),
      skyCondition,
      isObservingRecommended: cloudCover < 35,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(weatherPayload);
  } catch (err) {
    console.warn('[WEATHER API] Open-Meteo query failed, returning fallback Elqui conditions:', err);
    // Reliable Elqui mountain fallback (Elqui has >300 clear nights/year)
    const fallbackPayload: WeatherData = {
      temperature: 23,
      apparentTemperature: 22,
      cloudCover: 5,
      windSpeed: 7,
      humidity: 32,
      skyCondition: 'Despejado estelar',
      isObservingRecommended: true,
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(fallbackPayload);
  }
}
