# 🤖 Configuración del Agente de Desarrollo

## ⚠️ RESTRICCIÓN FUNDAMENTAL: Solo Frontend

Esta es una aplicación **100% frontend sin backend**:
- ✅ Solo cliente (navegador)
- ✅ APIs externas (TMDB, VidSrc, VidLink)
- ❌ No hay servidor propio
- ❌ No hay base de datos
- ❌ No hay autenticación con servidor
- ❌ No se persiste ningún dato

**NUNCA CREAR:**
- Rutas de API en `src/app/api/`
- Modelos de base de datos
- Conexiones a DB (Prisma, Mongoose, etc.)
- Endpoints propios

## 📐 Arquitectura Frontend

### Stack Tecnológico Principal
- **Framework**: React 18+ / Next.js 14+
- **Lenguaje**: TypeScript (estricto)
- **Estilos**: Tailwind CSS + CSS Modules
- **Estado**: Zustand / Redux Toolkit
- **Peticiones HTTP**: Axios / React Query
- **Routing**: React Router / Next.js App Router
- **Testing**: Jest + React Testing Library
- **Build Tool**: Vite / Next.js

### Estructura de Carpetas
```
/src
  /app                    # Páginas y rutas (Next.js) o entrada principal
  /components             # Componentes reutilizables
    /ui                   # Componentes UI base (buttons, inputs, etc)
    /features             # Componentes específicos de features
    /layout               # Componentes de layout (Header, Footer, etc)
  /hooks                  # Custom React hooks
  /services               # Servicios y APIs
  /store                  # Estado global (Zustand/Redux)
  /utils                  # Funciones utilitarias
  /types                  # Tipos TypeScript compartidos
  /constants              # Constantes y configuraciones
  /styles                 # Estilos globales
  /assets                 # Imágenes, iconos, fuentes
  /lib                    # Librerías y configuraciones externas
```

---

## 🚨 Reglas y Restricciones del Agente

### 🔴 REGLAS CRÍTICAS (OBLIGATORIAS)

Estas reglas son **OBLIGATORIAS** y **NO OPCIONALES**:

#### Idioma del Código
- ✅ **OBLIGATORIO**: Todas las funciones, métodos y variables deben estar nombradas en **ESPAÑOL**
- ✅ **OBLIGATORIO**: Los nombres de funciones deben ser descriptivos en español: `manejarClick`, `obtenerUsuario`, `validarFormulario`
- ✅ **OBLIGATORIO**: Variables en español: `nombreUsuario`, `datosPelicula`, `estadoCarga`
- ❌ **PROHIBIDO**: Usar inglés en nombres de funciones o variables: `handleClick`, `getUserData`, `isLoading`
- ⚠️ **EXCEPCIÓN**: Props de React y APIs estándar pueden mantener inglés: `onClick`, `children`, `className`

```typescript
// ✅ CORRECTO - Nombres en español
const obtenerPeliculas = async (genero: string) => {
  const datos = await fetch(`/api/peliculas?genero=${genero}`);
  return datos.json();
};

const manejarEnvio = (evento: FormEvent) => {
  evento.preventDefault();
  validarFormulario();
};

// ❌ INCORRECTO - Nombres en inglés
const getMovies = async (genre: string) => {
  const data = await fetch(`/api/movies?genre=${genre}`);
  return data.json();
};

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
  validateForm();
};
```

#### Comentarios
- ✅ **OBLIGATORIO**: NO incluir comentarios innecesarios
- ✅ **OBLIGATORIO**: El código debe ser auto-explicativo
- ✅ Solo comentar el "por qué", NUNCA el "qué"
- ✅ JSDoc solo para funciones públicas exportadas y APIs complejas
- ❌ **PROHIBIDO**: Comentarios que describen lo que hace el código obvio
- ❌ **PROHIBIDO**: Comentarios redundantes o de ejemplo

```typescript
// ❌ INCORRECTO - Comentarios innecesarios
const sumar = (a: number, b: number) => {
  // Sumar dos números
  return a + b;
};

// Crear un usuario
const usuario = { nombre: 'Juan', edad: 25 };

// ✅ CORRECTO - Sin comentarios innecesarios
const sumar = (a: number, b: number) => a + b;

const usuario = { nombre: 'Juan', edad: 25 };

// ✅ CORRECTO - Solo comentar razones no obvias
const calcularDescuento = (precio: number) => {
  // Reducción del 15% por política de marzo 2026
  return precio * 0.85;
};
```

---

### 1. CÓDIGO Y CALIDAD

#### TypeScript
- ✅ **OBLIGATORIO**: Usar TypeScript en todos los archivos
- ✅ Definir interfaces/types explícitos para todas las props
- ✅ Evitar `any` - usar `unknown` si es necesario
- ✅ Habilitar modo estricto: `"strict": true`
- ❌ NO usar `as any` para evitar errores de tipo

#### Componentes
```typescript
// ✅ CORRECTO - Tipos explícitos, funciones en español
interface PropsBotón {
  etiqueta: string;
  onClick: () => void;
  variante?: 'primary' | 'secondary';
  deshabilitado?: boolean;
}

export const Botón: React.FC<PropsBotón> = ({ 
  etiqueta, 
  onClick, 
  variante = 'primary',
  deshabilitado = false 
}) => {
  return <button onClick={onClick} disabled={deshabilitado}>{etiqueta}</button>
}

// ❌ INCORRECTO - Sin tipos y nombres en inglés
export const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### 2. ARQUITECTURA Y PATRONES

#### Separación de Responsabilidades
- ✅ Un componente = Una responsabilidad
- ✅ Extraer lógica compleja a custom hooks
- ✅ Servicios separados para llamadas API
- ❌ NO mezclar lógica de negocio en componentes de UI

#### Composición sobre Herencia
- ✅ Usar composición de componentes
- ✅ Patrón de "Children Props" para flexibilidad
- ✅ HOCs solo cuando sea absolutamente necesario

#### Estado
- ✅ Estado local con `useState` para UI simple
- ✅ Estado global solo para datos compartidos
- ✅ Server state con React Query/SWR
- ❌ NO abusar del estado global

### 3. NAMING CONVENTIONS

```typescript
// Archivos
ComponentName.tsx          // Componentes (PascalCase)
useCustomHook.ts          // Hooks (camelCase con 'use')
servicioPeliculas.ts      // Servicios (camelCase en español)
types.ts o interfaces.ts  // Tipos
constantes.ts             // Constantes

// Variables y Funciones (SIEMPRE EN ESPAÑOL)
const nombreUsuario = '';              // camelCase español
const MAX_REINTENTOS = 3;             // UPPER_SNAKE_CASE para constantes
function manejarClick() {}            // camelCase español con verbos
const obtenerDatos = async () => {};  // funciones async en español
interface DatosUsuario {}             // PascalCase español
type RespuestaApi = {};               // PascalCase español
```

### 4. PERFORMANCE

- ✅ Usar `React.memo()` para componentes pesados
- ✅ `useMemo()` y `useCallback()` para optimizaciones
- ✅ Lazy loading con `React.lazy()` y `Suspense`
- ✅ Code splitting por rutas
- ✅ Optimizar imágenes (WebP, lazy loading)
- ❌ NO optimizar prematuramente

### 5. GESTIÓN DE ERRORES

```typescript
// ✅ OBLIGATORIO: Error Boundaries
class ErrorBoundary extends React.Component<Props, State> {
  // Implementación completa
}

// ✅ Try-catch en async operations
try {
  const data = await fetchData();
} catch (error) {
  console.error('Error fetching data:', error);
  // Manejo apropiado del error
}

// ✅ Validación de datos de API
const validateUser = (data: unknown): User => {
  // Validación con zod, yup, o manual
}
```

### 6. SEGURIDAD

- ✅ Sanitizar inputs de usuario
- ✅ Validar datos en frontend Y backend
- ✅ Usar HTTPS en producción
- ✅ Variables de entorno para secrets
- ❌ NO exponer API keys en el código
- ❌ NO confiar en validación solo del frontend
- ✅ Implementar CSP (Content Security Policy)

### 7. ACCESIBILIDAD (a11y)

- ✅ Usar etiquetas semánticas HTML5
- ✅ Atributos ARIA cuando sea necesario
- ✅ Navegación por teclado funcional
- ✅ Contraste de colores adecuado (WCAG AA)
- ✅ Alt text en imágenes
- ✅ Focus visible en elementos interactivos

```tsx
// ✅ CORRECTO
<button 
  onClick={handleClick}
  aria-label="Cerrar modal"
  aria-pressed={isActive}
>
  Cerrar
</button>

// ❌ INCORRECTO
<div onClick={handleClick}>Cerrar</div>
```

### 8. TESTING

- ✅ Tests unitarios para utilidades y hooks
- ✅ Tests de integración para componentes
- ✅ Mínimo 70% de cobertura en código crítico
- ✅ Usar `data-testid` para selectores de test

```typescript
// ✅ OBLIGATORIO: Tests para componentes críticos
describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} label="Click me" />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 9. CÓDIGO LIMPIO

#### Comentarios
- ✅ **OBLIGATORIO**: NO comentarios innecesarios
- ✅ **OBLIGATORIO**: Código auto-explicativo
- ✅ Solo comentar el "por qué" cuando no sea obvio
- ✅ JSDoc solo para APIs públicas complejas
- ❌ **PROHIBIDO**: Comentarios que explican código obvio
- ❌ NO dejar código comentado en commits

#### Funciones
- ✅ Funciones pequeñas (máx 30-40 líneas)
- ✅ Máximo 3-4 parámetros
- ✅ Nombres descriptivos y verbos de acción
- ❌ NO usar abreviaciones oscuras

#### DRY (Don't Repeat Yourself)
- ✅ Extraer código duplicado a funciones/componentes
- ✅ Crear utilidades compartidas
- ✅ Custom hooks para lógica repetida

### 10. CONTROL DE VERSIONES

- ✅ Commits atómicos y descriptivos
- ✅ Usar Conventional Commits
  ```
  feat: agregar componente de búsqueda
  fix: corregir error en validación de formulario
  refactor: reorganizar estructura de carpetas
  docs: actualizar documentación de API
  ```
- ✅ Feature branches para nuevas funcionalidades
- ❌ NO hacer commit directamente a `main`

### 11. ESTILOS CSS

- ✅ Usar Tailwind CSS como primera opción
- ✅ CSS Modules para estilos específicos
- ✅ Mobile-first approach
- ✅ Variables CSS para theming
- ❌ NO usar estilos inline excepto dinámicos
- ❌ NO usar `!important` (casi nunca)

```tsx
// ✅ CORRECTO - Tailwind
<div className="flex items-center justify-between p-4 bg-blue-500 hover:bg-blue-600">

// ✅ CORRECTO - CSS Modules para estilos complejos
import styles from './Component.module.css';
<div className={styles.container}>

// ❌ INCORRECTO - Estilos inline estáticos
<div style={{ display: 'flex', padding: '16px' }}>
```

### 12. APIs Y FETCHING

```typescript
// ✅ CORRECTO - Usar React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
});

// ✅ Manejo de estados de carga
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;

// ✅ Tipado de respuestas
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

### 13. CONFIGURACIÓN DE ENTORNO

- ✅ Archivo `.env.example` en el repo
- ✅ Variables con prefijo según framework:
  - React (Vite): `VITE_`
  - Next.js: `NEXT_PUBLIC_`
- ✅ Diferentes configs para dev/staging/prod
- ❌ NO commitear archivos `.env`

### 14. DOCUMENTACIÓN

- ✅ README.md con instrucciones de setup
- ✅ Comentarios JSDoc en funciones complejas
- ✅ Storybook para componentes UI
- ✅ Changelog actualizado

### 15. PRIORIDADES DEL AGENTE

1. **Seguridad** - Primera prioridad siempre
2. **TypeScript** - Tipado correcto y estricto
3. **Accesibilidad** - Código accesible para todos
4. **Performance** - Optimización inteligente
5. **Mantenibilidad** - Código limpio y documentado
6. **Testing** - Cobertura adecuada de tests

---

## 📋 Checklist Pre-Commit

Antes de cada commit, verificar:
- [ ] Código tipado correctamente (TypeScript)
- [ ] Sin errores de ESLint/Prettier
- [ ] Tests pasan correctamente
- [ ] Sin console.logs en producción
- [ ] Código revisado y limpio
- [ ] Comentarios útiles agregados
- [ ] Accesibilidad verificada
- [ ] Performance evaluada

---

## 🚀 Comandos Esenciales

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build de producción
npm run lint         # Ejecutar linter
npm run test         # Ejecutar tests
npm run type-check   # Verificar tipos TypeScript

# Calidad de código
npm run format       # Formatear código con Prettier
npm run analyze      # Analizar bundle size
```

---

## 📚 Referencias

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

---

**Última actualización**: Marzo 2026
**Versión**: 1.0.0
