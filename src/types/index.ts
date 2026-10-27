export type CompanionType = 'pareja' | 'familia' | 'amigos' | 'solo' | 'corporativo';

export type DietaryNeed = 
  | 'alergico_celiaco'
  | 'diabetico'
  | 'adulto_mayor_movilidad'
  | 'menu_infantil';

export interface Reservation {
  id: string;
  code: string; // e.g. ELQ-2026-A8F2
  date: string; // YYYY-MM-DD
  guests: number; // 1 to 12
  companion_type: CompanionType;
  dietary_needs: DietaryNeed[];
  name: string;
  email: string;
  phone: string;
  comments?: string;
  discount_code?: string;
  discount_applied?: number; // e.g. 15
  status: 'confirmed' | 'cancelled' | 'pending';
  created_at: string;
}

export interface ReservationInput {
  date: string;
  guests: number;
  companion_type: CompanionType;
  dietary_needs?: DietaryNeed[];
  name: string;
  email: string;
  phone: string;
  comments?: string;
  discount_code?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  companion_type: CompanionType;
  coupon_code: string; // e.g. ELQUI15-A4B7
  notified: boolean;
  created_at: string;
}

export interface SubscriberInput {
  name: string;
  email: string;
  companion_type: CompanionType;
  honeypot?: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  heroProduct: string;
  prepTime: string;
  servings: string;
  difficulty: 'Fácil' | 'Media' | 'Avanzada';
  description: string;
  ingredients: string[];
  steps: string[];
  pairing: string;
  chefNote: string;
  imageUrl: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  cloudCover: number;
  windSpeed: number;
  humidity: number;
  skyCondition: 'Despejado estelar' | 'Parcialmente despejado' | 'Bruma de altura' | 'Nublado';
  isObservingRecommended: boolean;
  updatedAt: string;
}

export interface AlliedRestaurant {
  id: string;
  name: string;
  locality: string;
  specialty: string;
  description: string;
  isDemo: boolean;
}
