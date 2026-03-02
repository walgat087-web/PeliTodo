# 🤖 GUÍA RÁPIDA PARA EL AGENTE

## ⚠️ RESTRICCIÓN FUNDAMENTAL

Esta aplicación es **100% FRONTEND SIN BACKEND**

**NUNCA CREAR:**
- ❌ Rutas API en `src/app/api/`
- ❌ Bases de datos
- ❌ Autenticación con servidor
- ❌ Modelos de datos persistentes

**SOLO USAR:**
- ✅ APIs externas (TMDB, VidSrc, VidLink)
- ✅ Estado local del navegador

## ⚡ Orden de Lectura

1. **[REGLAS_OBLIGATORIAS.md](./REGLAS_OBLIGATORIAS.md)** ← EMPEZAR AQUÍ
2. **[AGENT_RULES.md](./AGENT_RULES.md)** ← Reglas completas
3. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** ← Estructura del proyecto

---

## 🔴 REGLAS CRÍTICAS (NO NEGOCIABLES)

### 1. Nomenclatura en Español
```typescript
// ✅ CORRECTO
const obtenerUsuario = async (id: string) => { };
const manejarClick = () => { };
const nombreCompleto = 'Juan Pérez';

// ❌ INCORRECTO
const getUser = async (id: string) => { };
const handleClick = () => { };
const fullName = 'Juan Pérez';
```

### 2. Sin Comentarios Innecesarios
```typescript
// ✅ CORRECTO
const sumar = (a: number, b: number) => a + b;

// ❌ INCORRECTO
// Función que suma dos números
const sumar = (a: number, b: number) => a + b;
```

---

## 📁 Estructura Principal

```
MOVIE/
├── REGLAS_OBLIGATORIAS.md    ⚠️ LEER PRIMERO
├── AGENT_RULES.md             📋 Reglas completas
├── PROJECT_STRUCTURE.md       📂 Estructura detallada
├── README.md                  📖 Documentación principal
├── src/
│   ├── components/            🧩 Componentes
│   │   ├── ui/               └─ Componentes base
│   │   ├── features/         └─ Features específicas
│   │   └── layout/           └─ Layout (Header, Footer)
│   ├── hooks/                🪝 Custom hooks
│   ├── services/             🔌 APIs y servicios
│   ├── store/                💾 Estado global (Zustand)
│   ├── types/                📝 Tipos TypeScript
│   ├── utils/                🛠️ Utilidades
│   ├── constants/            🔢 Constantes
│   └── styles/               🎨 Estilos globales
└── tests/                    🧪 Tests
```

---

## 🎯 Plantillas de Código

### Componente
```typescript
interface PropsBotón {
  onClick: () => void;
  deshabilitado?: boolean;
  children: React.ReactNode;
}

export const Botón: React.FC<PropsBotón> = ({
  onClick,
  deshabilitado = false,
  children,
}) => {
  return (
    <button onClick={onClick} disabled={deshabilitado}>
      {children}
    </button>
  );
};
```

### Custom Hook
```typescript
export const usePeliculas = (genero?: string) => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [estaCargando, setEstaCargando] = useState(false);

  const obtenerPeliculas = async () => {
    setEstaCargando(true);
    const datos = await fetch(`/api/peliculas?genero=${genero}`);
    setPeliculas(await datos.json());
    setEstaCargando(false);
  };

  return { peliculas, estaCargando, obtenerPeliculas };
};
```

### Servicio
```typescript
export const servicioPeliculas = {
  obtenerTodas: async (): Promise<Pelicula[]> => {
    const respuesta = await fetch('/api/peliculas');
    return respuesta.json();
  },

  obtenerPorId: async (id: string): Promise<Pelicula> => {
    const respuesta = await fetch(`/api/peliculas/${id}`);
    return respuesta.json();
  },
};
```

### Tipos
```typescript
export interface Pelicula {
  id: string;
  titulo: string;
  sinopsis: string;
  fechaEstreno: string;
  calificacion: number;
}

export interface Usuario {
  id: string;
  nombreUsuario: string;
  email: string;
}
```

---

## ✅ Checklist Pre-Implementación

Antes de escribir código, verificar:

- [ ] ¿Funciones en español? → `obtenerDatos`, `manejarClick`
- [ ] ¿Variables en español? → `nombreUsuario`, `estaCargando`
- [ ] ¿Sin comentarios innecesarios? → Código auto-explicativo
- [ ] ¿TypeScript con tipos explícitos? → `interface`, `type`
- [ ] ¿Props de React en inglés estándar? → `onClick`, `children`, `className`

---

## 🚫 Errores Comunes a Evitar

| ❌ ERROR | ✅ CORRECTO |
|---------|-------------|
| `const getData = ...` | `const obtenerDatos = ...` |
| `const handleSubmit = ...` | `const manejarEnvio = ...` |
| `const isLoading = ...` | `const estaCargando = ...` |
| `// Create user` | (sin comentario) |
| `// Add two numbers` | (sin comentario) |
| `interface ButtonProps` | `interface PropsBotón` |

---

## 📞 Archivos de Referencia

- **Componente ejemplo**: [src/components/ui/Button/Button.tsx](./src/components/ui/Button/Button.tsx)
- **Test ejemplo**: [src/components/ui/Button/Button.test.tsx](./src/components/ui/Button/Button.test.tsx)
- **Tipos**: [src/types/index.ts](./src/types/index.ts)
- **Constantes**: [src/constants/index.ts](./src/constants/index.ts)

---

## 🎓 Resumen Ultra-Rápido

1. **Funciones/Variables**: ESPAÑOL → `obtenerDatos`, `manejarClick`, `nombreUsuario`
2. **Comentarios**: SOLO el "por qué" cuando NO sea obvio
3. **Props React**: INGLÉS estándar → `onClick`, `children`, `className`
4. **TypeScript**: Tipos EXPLÍCITOS siempre
5. **Estructura**: Feature-based con separación clara

---

**Última actualización**: Marzo 2026
