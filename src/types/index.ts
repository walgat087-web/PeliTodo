export interface PeliculaTMDB {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime?: number;
  genre_ids?: number[];
  genres?: Genero[];
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface Pelicula {
  id: number;
  titulo: string;
  tituloOriginal: string;
  sinopsis: string;
  fechaEstreno: string;
  duracion?: number;
  generos: Genero[];
  calificacion: number;
  cantidadVotos: number;
  poster: string;
  imagenFondo: string;
  popularidad: number;
  idioma: string;
}

export interface Genero {
  id: number;
  name: string;
}

export interface RespuestaPaginadaTMDB<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface VideoTMDB {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CreditoTMDB {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

export interface OpcionReproductor {
  nombre: string;
  url: string;
  activo: boolean;
}

export type VarianteBotón = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type TamañoBotón = 'sm' | 'md' | 'lg';
