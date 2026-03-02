'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PeliculaTMDB, SerieTMDB } from '@/types';
import { construirUrlPoster, formatearCalificacion } from '@/utils/peliculas';
import styles from './TarjetaPelicula.module.css';

interface PropsTarjetaPelicula {
  pelicula: PeliculaTMDB | SerieTMDB;
}

export const TarjetaPelicula: React.FC<PropsTarjetaPelicula> = ({ pelicula }) => {
  const urlPoster = construirUrlPoster(pelicula.poster_path);
  const calificacion = formatearCalificacion(pelicula.vote_average);
  const esSerie = 'name' in pelicula;
  const titulo = esSerie ? pelicula.name : pelicula.title;
  const fecha = esSerie ? pelicula.first_air_date : pelicula.release_date;
  const año = fecha ? new Date(fecha).getFullYear() : 'N/A';
  const ruta = esSerie ? `/series/${pelicula.id}` : `/peliculas/${pelicula.id}`;

  return (
    <Link href={ruta} className={styles.tarjeta}>
      <div className={styles.contenedorImagen}>
        <Image
          src={urlPoster}
          alt={pelicula.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={styles.imagen}
        />
        <div className={styles.calificacion}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>{calificacion}</span>
        </div>
      </div>
      
      <div className={styles.contenido}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.año}>{año}</p>
      </div>
    </Link>
  );
};
