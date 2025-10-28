# Skeleton Directive - Guía de Uso

## 📋 Descripción

Directiva profesional y avanzada para crear skeleton loaders en Angular v20. Utiliza las características más modernas de Angular incluyendo signals, computed signals, y effects.

## ✨ Características

- 🎨 **3 tipos de animación**: Shimmer, Pulse, Wave
- 🔷 **3 formas**: Rectangle, Circle, Text
- 📏 **Totalmente personalizable**: altura, ancho, border-radius, duración de animación
- 🌓 **Soporte para modo oscuro** automático
- ♿ **Accesibilidad integrada** (ARIA attributes)
- 📱 **Responsive** y adaptable
- 🎯 **Múltiples líneas** para texto
- 🎨 **Temas personalizados** con CSS variables
- ⚡ **Optimizado** con Angular v20 signals

## 🚀 Instalación

La directiva es standalone, simplemente impórtala donde la necesites:

```typescript
import { Skeleton } from './shared/directives/skeleton';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [Skeleton],
  // ...
})
export class MyComponent {}
```

## 📖 Ejemplos de Uso

### Uso Básico

```html
<!-- Skeleton simple -->
<div skeleton [isLoading]="isLoading()">
  Contenido real aquí
</div>
```

### Diferentes Tipos de Animación

```html
<!-- Shimmer (por defecto) -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonType]="'shimmer'">
  Contenido
</div>

<!-- Pulse -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonType]="'pulse'">
  Contenido
</div>

<!-- Wave -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonType]="'wave'">
  Contenido
</div>
```

### Diferentes Formas

```html
<!-- Rectángulo (por defecto) -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonShape]="'rect'"
     [skeletonHeight]="'100px'"
     [skeletonWidth]="'200px'">
</div>

<!-- Círculo (perfecto para avatares) -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonShape]="'circle'"
     [skeletonHeight]="'80px'"
     [skeletonWidth]="'80px'">
</div>

<!-- Texto con múltiples líneas -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonShape]="'text'"
     [skeletonLines]="3">
</div>
```

### Personalización Avanzada

```html
<!-- Skeleton totalmente personalizado -->
<div skeleton 
     [isLoading]="isLoading()" 
     [skeletonType]="'shimmer'"
     [skeletonShape]="'rect'"
     [skeletonHeight]="'150px'"
     [skeletonWidth]="'100%'"
     [skeletonBorderRadius]="'12px'"
     [skeletonAnimationDuration]="'1.5s'"
     [skeletonTheme]="'#e3f2fd'">
  Contenido real
</div>
```

### Ejemplo de Tarjeta de Producto

```html
<div class="product-card">
  <!-- Imagen del producto -->
  <div skeleton 
       [isLoading]="isLoading()" 
       [skeletonType]="'shimmer'"
       [skeletonHeight]="'200px'"
       [skeletonBorderRadius]="'8px'">
    <img [src]="product.image" alt="Product">
  </div>
  
  <!-- Título -->
  <h3 skeleton 
      [isLoading]="isLoading()" 
      [skeletonShape]="'text'"
      [skeletonHeight]="'24px'">
    {{ product.title }}
  </h3>
  
  <!-- Descripción -->
  <p skeleton 
     [isLoading]="isLoading()" 
     [skeletonShape]="'text'"
     [skeletonLines]="3">
    {{ product.description }}
  </p>
  
  <!-- Precio -->
  <div skeleton 
       [isLoading]="isLoading()" 
       [skeletonWidth]="'100px'"
       [skeletonHeight]="'32px'">
    {{ product.price | currency }}
  </div>
</div>
```

### Ejemplo de Lista de Usuarios

```html
<div class="user-list">
  @for (user of users(); track user.id) {
    <div class="user-item">
      <!-- Avatar -->
      <div skeleton 
           [isLoading]="isLoading()" 
           [skeletonShape]="'circle'"
           [skeletonHeight]="'50px'"
           [skeletonWidth]="'50px'">
        <img [src]="user.avatar" alt="Avatar">
      </div>
      
      <!-- Info del usuario -->
      <div class="user-info">
        <h4 skeleton 
            [isLoading]="isLoading()" 
            [skeletonShape]="'text'"
            [skeletonWidth]="'150px'">
          {{ user.name }}
        </h4>
        <p skeleton 
           [isLoading]="isLoading()" 
           [skeletonShape]="'text'"
           [skeletonWidth]="'200px'">
          {{ user.email }}
        </p>
      </div>
    </div>
  }
</div>
```

### Ejemplo con Componente

```typescript
import { Component, signal } from '@angular/core';
import { Skeleton } from './shared/directives/skeleton';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [Skeleton],
  template: `
    <div class="movie-card">
      <div skeleton 
           [isLoading]="isLoading()" 
           [skeletonType]="'shimmer'"
           [skeletonHeight]="'300px'"
           [skeletonBorderRadius]="'12px'">
        <img [src]="movie()?.poster" alt="Movie poster">
      </div>
      
      <h2 skeleton 
          [isLoading]="isLoading()" 
          [skeletonShape]="'text'"
          [skeletonHeight]="'28px'">
        {{ movie()?.title }}
      </h2>
      
      <p skeleton 
         [isLoading]="isLoading()" 
         [skeletonShape]="'text'"
         [skeletonLines]="4">
        {{ movie()?.overview }}
      </p>
    </div>
  `,
  styles: [`
    .movie-card {
      max-width: 400px;
      padding: 16px;
    }
  `]
})
export class MovieCardComponent {
  isLoading = signal(true);
  movie = signal<Movie | null>(null);

  ngOnInit() {
    this.loadMovie();
  }

  async loadMovie() {
    this.isLoading.set(true);
    const data = await this.movieService.getMovie(this.movieId);
    this.movie.set(data);
    this.isLoading.set(false);
  }
}
```

## 🎨 Clases de Utilidad SCSS

El archivo `styles.scss` incluye clases de utilidad para casos comunes:

```html
<!-- Avatar -->
<div class="skeleton-avatar skeleton-shimmer"></div>

<!-- Título -->
<div class="skeleton-title skeleton-pulse"></div>

<!-- Párrafo -->
<div class="skeleton-paragraph skeleton-shimmer"></div>
<div class="skeleton-paragraph skeleton-shimmer"></div>

<!-- Botón -->
<div class="skeleton-button skeleton-pulse"></div>

<!-- Tarjeta -->
<div class="skeleton-card skeleton-shimmer"></div>

<!-- Imagen -->
<div class="skeleton-image skeleton-wave"></div>
```

## 🎯 Propiedades de la Directiva

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `isLoading` | `boolean` | **requerido** | Estado de carga |
| `skeletonType` | `'shimmer' \| 'pulse' \| 'wave'` | `'shimmer'` | Tipo de animación |
| `skeletonShape` | `'rect' \| 'circle' \| 'text'` | `'rect'` | Forma del skeleton |
| `skeletonHeight` | `string \| null` | `null` | Altura personalizada |
| `skeletonWidth` | `string \| null` | `null` | Ancho personalizado |
| `skeletonBorderRadius` | `string \| null` | `null` | Border radius personalizado |
| `skeletonLines` | `number` | `1` | Número de líneas (para texto) |
| `skeletonAnimationDuration` | `string` | `'1.2s'` | Duración de la animación |
| `skeletonTheme` | `string \| null` | `null` | Color de tema personalizado |
| `skeletonGradient` | `boolean` | `true` | Habilitar efecto gradiente |

## 🎨 Variables CSS Personalizables

Puedes personalizar los colores globalmente en tu CSS:

```scss
:root {
  --skeleton-base-color: #e0e0e0;
  --skeleton-shine-color: #f5f5f5;
  --skeleton-dark-color: #d0d0d0;
  --skeleton-animation-duration: 1.2s;
  --skeleton-border-radius: 4px;
}

// Tema oscuro personalizado
@media (prefers-color-scheme: dark) {
  :root {
    --skeleton-base-color: #2a2a2a;
    --skeleton-shine-color: #3a3a3a;
    --skeleton-dark-color: #1a1a1a;
  }
}
```

## ♿ Accesibilidad

La directiva incluye automáticamente:

- `role="status"` cuando está cargando
- `aria-busy="true"` cuando está cargando
- `aria-live="polite"` para lectores de pantalla
- `aria-label="Loading content"` descripción del estado

## 🔧 Características Técnicas de Angular v20

- ✅ **Standalone directive**
- ✅ **Input signals** con alias
- ✅ **Computed signals** para lógica reactiva
- ✅ **Effects** para side effects
- ✅ **Dependency injection** con `inject()`
- ✅ **Host bindings** modernos
- ✅ **Type-safe** con TypeScript

## 📱 Responsive

Los estilos incluyen ajustes responsive automáticos para dispositivos móviles.

## 🎭 Modo Oscuro

Soporte automático para modo oscuro usando `prefers-color-scheme`.

## 💡 Tips y Mejores Prácticas

1. **Usa el tipo de animación apropiado**:

   - `shimmer`: Para contenido general (recomendado)
   - `pulse`: Para elementos pequeños o iconos
   - `wave`: Para efectos más dramáticos

2. **Mantén la forma consistente** con el contenido real

3. **Usa múltiples líneas** para texto largo

4. **Personaliza los colores** para que coincidan con tu tema

5. **Combina con transiciones** para una experiencia más suave

## 🐛 Troubleshooting

**El skeleton no se muestra:**

- Verifica que `isLoading` sea `true`
- Asegúrate de importar la directiva
- Revisa que los estilos SCSS estén incluidos

**La animación no funciona:**

- Verifica que el tipo de animación sea válido
- Revisa la consola por errores de CSS

**El contenido no se restaura:**

- Asegúrate de cambiar `isLoading` a `false`
- Verifica que no haya errores en la consola

## 📄 Licencia

Esta directiva es parte del proyecto demo de Angular v20.
