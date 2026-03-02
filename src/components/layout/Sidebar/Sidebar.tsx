'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface OpcionMenu {
  id: string;
  titulo: string;
  ruta: string;
  icono: React.ReactNode;
  habilitado: boolean;
}

export const Sidebar: React.FC = () => {
  const [colapsado, setColapsado] = useState(false);
  const rutaActual = usePathname();

  const opcionesMenu: OpcionMenu[] = [
    {
      id: 'peliculas',
      titulo: 'Películas',
      ruta: '/peliculas',
      habilitado: true,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
        </svg>
      ),
    },
    {
      id: 'series',
      titulo: 'Series',
      ruta: '/series',
      habilitado: true,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
          <polyline points="8 12 16 12 16 20 8 20 8 12"/>
        </svg>
      ),
    },

    {
      id: 'mejores',
      titulo: 'Mejores Películas',
      ruta: '/mejores',
      habilitado: false,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
  ];

  const alternarColapso = () => {
    setColapsado(!colapsado);
  };

  const estaActivo = (ruta: string): boolean => {
    return rutaActual === ruta || rutaActual.startsWith(`${ruta}/`);
  };

  return (
    <aside className={`${styles.sidebar} ${colapsado ? styles.colapsado : ''}`}>
      <div className={styles.encabezado}>
        <div className={styles.logo}>
          {!colapsado && (
            <span className={styles.logoTexto}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7v10"/>
                <path d="M12 7v10"/>
                <path d="M17 7v10"/>
                <path d="M3 3h18v18H3z"/>
              </svg>
              <span>MOVIE</span>
            </span>
          )}
        </div>
        <button 
          className={styles.botonColapsar} 
          onClick={alternarColapso}
          aria-label={colapsado ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {colapsado ? (
              <polyline points="9 18 15 12 9 6"/>
            ) : (
              <polyline points="15 18 9 12 15 6"/>
            )}
          </svg>
        </button>
      </div>

      <nav className={styles.navegacion}>
        {opcionesMenu.map((opcion) => (
          <Link
            key={opcion.id}
            href={opcion.habilitado ? opcion.ruta : '#'}
            className={`${styles.enlace} ${
              estaActivo(opcion.ruta) ? styles.activo : ''
            } ${!opcion.habilitado ? styles.deshabilitado : ''}`}
            onClick={(e) => !opcion.habilitado && e.preventDefault()}
            title={opcion.titulo}
          >
            <span className={styles.icono}>{opcion.icono}</span>
            {!colapsado && (
              <span className={styles.texto}>
                {opcion.titulo}
                {!opcion.habilitado && (
                  <span className={styles.etiquetaProximamente}>Próximamente</span>
                )}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className={styles.pie}>
        {!colapsado && (
          <div className={styles.info}>
            <p className={styles.version}>v1.0.0</p>
            <p className={styles.copyright}>© 2026 MOVIE</p>
          </div>
        )}
      </div>
    </aside>
  );
};
