'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ReproductorPelicula } from '@/components/features/ReproductorPelicula';
import { ListaPeliculas } from '@/components/features/ListaPeliculas';
import type { SerieTMDB } from '@/types';
import { servicioSeries } from '@/services/tmdb/servicioSeries';
import {
  construirUrlFondo,
  construirUrlPoster,
  formatearDuracion,
  formatearCalificacion,
  formatearFecha,
} from '@/utils/peliculas';
import styles from './page.module.css';

export default function PaginaDetalleSerie() {
  const params = useParams();
  const router = useRouter();
  const idSerie = Number(params.id);

  const [serie, setSerie] = useState<SerieTMDB | null>(null);
  const [seriesSimilares, setSeriesSimilares] = useState<SerieTMDB[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setEstaCargando(true);
        setError(null);

        const [detalle, similares] = await Promise.all([
          servicioSeries.obtenerDetalle(idSerie),
          servicioSeries.obtenerSimilares(idSerie),
        ]);

        setSerie(detalle);
        setSeriesSimilares(similares.results.slice(0, 6));
      } catch (err) {
        setError('Error al cargar los detalles de la serie');
        console.error('Error cargando detalles serie:', err);
      } finally {
        setEstaCargando(false);
      }
    };

    if (idSerie) {
      cargarDatos();
    }
  }, [idSerie]);

  const manejarRetroceso = () => {
    router.back();
  };

  if (estaCargando) {
    return (
      <div className={styles.contenedorCargando}>
        <div className={styles.spinner} />
        <p>Cargando serie...</p>
      </div>
    );
  }

  if (error || !serie) {
    return (
      <div className={styles.contenedorError}>
        <div className={styles.error}>
          <svg className={styles.iconoError} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2>Error al cargar la serie</h2>
          <p>{error || 'No se pudo obtener la información de la serie'}</p>
          <button onClick={manejarRetroceso} className={styles.botonVolver}>
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  const urlFondo = construirUrlFondo(serie.backdrop_path);
  const urlPoster = construirUrlPoster(serie.poster_path);

  return (
    <div className={styles.contenedor}>
      <div className={styles.fondo} style={{ backgroundImage: `url(${urlFondo})` }}>
        <div className={styles.superposicionFondo} />
      </div>

      <div className={styles.contenido}>
        <button onClick={manejarRetroceso} className={styles.botonRetroceso}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className={styles.informacion}>
          <div className={styles.poster}>
            <Image
              src={urlPoster}
              alt={serie.name}
              width={300}
              height={450}
              className={styles.imagenPoster}
              priority
            />
          </div>

          <div className={styles.detalles}>
            <h1 className={styles.titulo}>{serie.name}</h1>
            {serie.original_name !== serie.name && (
              <p className={styles.tituloOriginal}>{serie.original_name}</p>
            )}

            <div className={styles.metadatos}>
              <div className={styles.calificacion}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>{formatearCalificacion(serie.vote_average)}</span>
              </div>

              {serie.first_air_date && (
                <span className={styles.fecha}>{formatearFecha(serie.first_air_date)}</span>
              )}

              {serie.episode_run_time && serie.episode_run_time.length > 0 && (
                <span className={styles.duracion}>{formatearDuracion(serie.episode_run_time[0])}</span>
              )}
            </div>

            {serie.genres && serie.genres.length > 0 && (
              <div className={styles.generos}>
                {serie.genres.map((genero) => (
                  <span key={genero.id} className={styles.genero}>
                    {genero.name}
                  </span>
                ))}
              </div>
            )}

            {serie.overview && (
              <div className={styles.sinopsis}>
                <h3>Sinopsis</h3>
                <p>{serie.overview}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.seccionReproductor}>
          <h2 className={styles.subtituloSeccion}>Ver Serie</h2>
          <ReproductorPelicula idPelicula={serie.id} tituloPelicula={serie.name} tipo="tv" />
        </div>

        {seriesSimilares.length > 0 && (
          <div className={styles.seccionSimilares}>
            <ListaPeliculas
              peliculas={seriesSimilares}
              estaCargando={false}
              titulo="Series Similares"
            />
          </div>
        )}
      </div>
    </div>
  );
}
