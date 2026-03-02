# 📁 Estructura del Proyecto Frontend

## ⚠️ Aplicación Frontend Sin Backend

Este proyecto es **100% frontend**. No hay:
- ❌ Carpeta `src/app/api/` (sin rutas de API)
- ❌ Base de datos ni modelos
- ❌ Autenticación con servidor
- ❌ Persistencia de datos

Solo consume APIs externas: TMDB, VidSrc, VidLink

## Vista General
```
MOVIE/
├── public/                      # Archivos estáticos
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│       ├── logos/
│       └── icons/
│
├── src/                         # Código fuente principal
│   ├── app/                     # Aplicación principal
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Página home
│   │   ├── globals.css          # Estilos globales
│   │   └── providers.tsx        # Providers (React Query, etc)
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── ui/                  # Componentes UI base
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Card/
│   │   │   ├── Spinner/
│   │   │   └── index.ts         # Barrel export
│   │   │
│   │   ├── features/            # Componentes de features específicas
│   │   │   ├── MovieCard/
│   │   │   ├── MovieList/
│   │   │   ├── SearchBar/
│   │   │   ├── FilterPanel/
│   │   │   └── VideoPlayer/
│   │   │
│   │   └── layout/              # Componentes de layout
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Sidebar/
│   │       └── Navigation/
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useMovies.ts
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   ├── services/                # Servicios y APIs
│   │   ├── api/
│   │   │   ├── client.ts        # Cliente HTTP base (Axios)
│   │   │   ├── interceptors.ts  # Interceptores de request/response
│   │   │   └── endpoints.ts     # URLs de endpoints
│   │   ├── movies/
│   │   │   ├── movieService.ts
│   │   │   └── types.ts
│   │   ├── auth/
│   │   │   ├── authService.ts
│   │   │   └── types.ts
│   │   └── storage/
│   │       └── localStorage.ts
│   │
│   ├── store/                   # Estado global
│   │   ├── authStore.ts         # Store de autenticación
│   │   ├── movieStore.ts        # Store de películas
│   │   ├── uiStore.ts           # Store de UI (modals, toasts)
│   │   └── index.ts
│   │
│   ├── types/                   # Tipos TypeScript compartidos
│   │   ├── movie.types.ts
│   │   ├── user.types.ts
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   ├── utils/                   # Funciones utilitarias
│   │   ├── formatters/
│   │   │   ├── date.ts
│   │   │   ├── currency.ts
│   │   │   └── string.ts
│   │   ├── validators/
│   │   │   ├── email.ts
│   │   │   └── form.ts
│   │   ├── helpers/
│   │   │   ├── array.ts
│   │   │   └── object.ts
│   │   └── index.ts
│   │
│   ├── constants/               # Constantes y configuraciones
│   │   ├── routes.ts            # Rutas de la aplicación
│   │   ├── apiConfig.ts         # Configuración de API
│   │   ├── appConfig.ts         # Configuración general
│   │   └── index.ts
│   │
│   ├── styles/                  # Estilos globales
│   │   ├── globals.css
│   │   ├── variables.css        # Variables CSS
│   │   ├── tailwind.css
│   │   └── fonts.css
│   │
│   ├── assets/                  # Assets estáticos
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── lib/                     # Librerías y configuraciones
│   │   ├── analytics.ts         # Google Analytics, etc
│   │   ├── firebase.ts          # Config de Firebase
│   │   └── i18n.ts              # Internacionalización
│   │
│   └── middleware.ts            # Middleware (Next.js)
│
├── tests/                       # Tests adicionales
│   ├── e2e/                     # Tests E2E (Playwright, Cypress)
│   │   ├── movies.spec.ts
│   │   └── auth.spec.ts
│   ├── integration/             # Tests de integración
│   └── __mocks__/               # Mocks para testing
│
├── .github/                     # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── .husky/                      # Git hooks
│   ├── pre-commit
│   └── pre-push
│
├── config/                      # Configuraciones adicionales
│   ├── jest.config.js
│   └── playwright.config.ts
│
├── .env.example                 # Ejemplo de variables de entorno
├── .env.local                   # Variables locales (no commitear)
├── .eslintrc.json               # Configuración ESLint
├── .prettierrc                  # Configuración Prettier
├── .gitignore
├── next.config.js               # Configuración Next.js
├── tsconfig.json                # Configuración TypeScript
├── tailwind.config.ts           # Configuración Tailwind
├── package.json
├── README.md
├── AGENT_RULES.md               # Reglas del agente
└── PROJECT_STRUCTURE.md         # Este archivo
```

## 📂 Descripción Detallada

### `/public`
Archivos estáticos que se sirven directamente sin procesamiento.
- Accesibles mediante `/nombre-archivo.ext`
- Ideal para favicon, robots.txt, imágenes que no cambian

### `/src/app`
Estructura de App Router de Next.js (o entrada principal en React)
- Cada carpeta puede ser una ruta
- `layout.tsx` define layouts compartidos
- `page.tsx` define las páginas

### `/src/components`
Componentes organizados por propósito:
- **ui/**: Componentes base reutilizables (Button, Input, Card)
- **features/**: Componentes específicos del dominio (MovieCard, SearchBar)
- **layout/**: Componentes estructurales (Header, Footer, Sidebar)

### `/src/hooks`
Custom hooks para reutilizar lógica:
```typescript
// Ejemplo: useMovies.ts
export const useMovies = (genre?: string) => {
  return useQuery(['movies', genre], () => fetchMovies(genre));
};
```

### `/src/services`
Lógica de comunicación con APIs y servicios externos:
- Separado por dominio (movies, auth, etc)
- Cliente HTTP centralizado
- Interceptores para tokens, errores, etc

### `/src/store`
Estado global de la aplicación:
```typescript
// Ejemplo con Zustand
interface MovieStore {
  movies: Movie[];
  selectedMovie: Movie | null;
  setMovies: (movies: Movie[]) => void;
  selectMovie: (movie: Movie) => void;
}
```

### `/src/types`
Definiciones de tipos TypeScript compartidas:
```typescript
export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
}
```

### `/src/utils`
Funciones utilitarias puras:
- Formatters: funciones para formatear datos
- Validators: validaciones de datos
- Helpers: ayudantes varios

### `/src/constants`
Valores constantes utilizados en toda la app:
```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  MOVIE_DETAIL: '/movies/:id',
} as const;
```

### `/tests`
Tests organizados por tipo:
- **e2e/**: Tests end-to-end (flujos completos de usuario)
- **integration/**: Tests de integración entre módulos
- Los tests unitarios van junto a los archivos: `Component.test.tsx`

## 🎯 Principios de Organización

### 1. Colocation
Archivos relacionados deben estar cerca:
```
Button/
├── Button.tsx           # Componente
├── Button.test.tsx      # Test
├── Button.module.css    # Estilos
├── Button.stories.tsx   # Storybook
└── index.ts             # Export
```

### 2. Feature-Based (alternativo)
Para proyectos muy grandes, organizar por features:
```
features/
├── movies/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
└── auth/
    ├── components/
    ├── hooks/
    └── services/
```

### 3. Barrel Exports
Usar `index.ts` para exportaciones limpias:
```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// Uso
import { Button, Input, Modal } from '@/components/ui';
```

### 4. Path Aliases
Configurar alias en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

## 🔥 Estructura Ejemplo Real

```typescript
// src/components/features/MovieCard/MovieCard.tsx
import { Card } from '@/components/ui';
import { formatDate } from '@/utils/formatters';
import { Movie } from '@/types';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onSelect: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  return (
    <Card className={styles.card} onClick={() => onSelect(movie.id)}>
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{formatDate(movie.releaseDate)}</p>
    </Card>
  );
};
```

## ✅ Beneficios de esta Estructura

1. **Escalable**: Fácil agregar nuevas features sin desorganizar
2. **Mantenible**: Archivos relacionados están juntos
3. **Predecible**: Cualquiera puede encontrar lo que busca
4. **Testeable**: Tests junto a su código
5. **Reutilizable**: Componentes y utils bien organizados
6. **Type-Safe**: TypeScript en toda la aplicación

---

**Nota**: Esta estructura es flexible. Adaptala según las necesidades específicas del proyecto.
