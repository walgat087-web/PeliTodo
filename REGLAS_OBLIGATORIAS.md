# ⚠️ REGLAS OBLIGATORIAS DEL PROYECTO

## 🔴 CRÍTICAS - NO OPCIONALES

### 1. NOMENCLATURA EN ESPAÑOL

**TODAS** las funciones, variables y nombres personalizados deben estar en **ESPAÑOL**.

#### ✅ PERMITIDO:
```typescript
const obtenerPeliculas = async () => { };
const manejarClick = () => { };
const nombreUsuario = 'Juan';
const calcularTotal = (precio: number) => precio * 1.16;
const validarFormulario = () => { };
```

#### ❌ PROHIBIDO:
```typescript
const getMovies = async () => { };
const handleClick = () => { };
const userName = 'Juan';
const calculateTotal = (price: number) => price * 1.16;
const validateForm = () => { };
```

#### ⚠️ EXCEPCIONES (props de React/APIs estándar):
```typescript
// Props de React - MANTENER en inglés
interface PropsBotón {
  children: React.ReactNode;
  onClick?: () => void;  // Props estándar de React
  className?: string;    // Props estándar HTML/React
}

// Nombres internos - ESPAÑOL
const manejarClick = () => {
  onClick?.();  // Llamar a la prop en inglés está bien
};
```

### 2. CERO COMENTARIOS INNECESARIOS

El código debe ser **auto-explicativo**. NO agregar comentarios obvios.

#### ✅ PERMITIDO:
```typescript
const calcularDescuento = (precio: number) => {
  return precio * 0.85;
};

const sumar = (a: number, b: number) => a + b;

const esMayorDeEdad = (edad: number) => edad >= 18;
```

#### ❌ PROHIBIDO:
```typescript
// Función que calcula el descuento ❌
const calcularDescuento = (precio: number) => {
  // Multiplicar por 0.85 para obtener el 15% de descuento ❌
  return precio * 0.85;
};

// Sumar dos números ❌
const sumar = (a: number, b: number) => a + b;

const usuario = { nombre: 'Juan' }; // Crear usuario ❌
```

#### ✅ SOLO comentar el "POR QUÉ" cuando NO sea obvio:
```typescript
const calcularPrecio = (base: number) => {
  // Política corporativa 2026: 15% descuento marzo-abril
  return base * 0.85;
};

const optimizarImagen = async (url: string) => {
  // WebP no soportado en Safari < 14
  const formato = soportaWebP() ? 'webp' : 'jpg';
  return convertir(url, formato);
};
```

---

## 📋 RESUMEN RÁPIDO

| ✅ HACER | ❌ NO HACER |
|---------|-------------|
| `const obtenerDatos = () => {}` | `const getData = () => {}` |
| `const manejarEnvio = () => {}` | `const handleSubmit = () => {}` |
| `const nombreCompleto = ''` | `const fullName = ''` |
| Código auto-explicativo | Comentarios obvios |
| Comentar el "por qué" | Comentar el "qué" |
| `interface PropsBotón {}` | `interface ButtonProps {}` |
| Props React en inglés: `onClick`, `children` | Todo en inglés |

---

## 🎯 CHECKLIST ANTES DE CADA COMMIT

- [ ] ¿Todas las funciones están en español?
- [ ] ¿Todas las variables están en español?
- [ ] ¿Los tipos/interfaces están en español?
- [ ] ¿NO hay comentarios innecesarios?
- [ ] ¿El código es auto-explicativo?
- [ ] Props de React mantienen inglés estándar

---

## 📚 EJEMPLOS COMPLETOS

### Componente Correcto:
```typescript
interface PropsTarjetaPelicula {
  titulo: string;
  onClick: () => void;
  estaCargando?: boolean;
}

export const TarjetaPelicula: React.FC<PropsTarjetaPelicula> = ({
  titulo,
  onClick,
  estaCargando = false,
}) => {
  const manejarClick = () => {
    if (!estaCargando) {
      onClick();
    }
  };

  return (
    <div onClick={manejarClick} className="tarjeta">
      {estaCargando ? <Spinner /> : titulo}
    </div>
  );
};
```

### Hook Correcto:
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

### Servicio Correcto:
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

  buscar: async (termino: string): Promise<Pelicula[]> => {
    const respuesta = await fetch(`/api/buscar?q=${termino}`);
    return respuesta.json();
  },
};
```

---

**IMPORTANTE**: Estas reglas son **OBLIGATORIAS** y deben cumplirse en TODO el proyecto sin excepciones.
