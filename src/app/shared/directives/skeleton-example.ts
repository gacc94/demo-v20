import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Skeleton } from './skeleton';

/**
 * Componente de ejemplo para demostrar el uso de la directiva Skeleton
 * Este componente muestra diferentes casos de uso y configuraciones
 */
@Component({
    selector: 'app-skeleton-example',
    standalone: true,
    imports: [CommonModule, Skeleton],
    template: `
    <div class="skeleton-examples">
      <h1>Skeleton Directive - Ejemplos</h1>

      <!-- Control de carga -->
      <div class="controls">
        <button (click)="toggleLoading()">
          {{ isLoading() ? 'Mostrar Contenido' : 'Mostrar Skeleton' }}
        </button>
      </div>

      <!-- Ejemplo 1: Shimmer básico -->
      <section class="example-section">
        <h2>1. Shimmer Animation (Por defecto)</h2>
        <div skeleton
             [isLoading]="isLoading()"
             [skeletonType]="'shimmer'"
             [skeletonHeight]="'100px'"
             class="example-box">
          <p>Este es el contenido real que se muestra cuando no está cargando.</p>
        </div>
      </section>

      <!-- Ejemplo 2: Pulse Animation -->
      <section class="example-section">
        <h2>2. Pulse Animation</h2>
        <div skeleton
             [isLoading]="isLoading()"
             [skeletonType]="'pulse'"
             [skeletonHeight]="'100px'"
             class="example-box">
          <p>Animación de pulso para un efecto más sutil.</p>
        </div>
      </section>

      <!-- Ejemplo 3: Wave Animation -->
      <section class="example-section">
        <h2>3. Wave Animation</h2>
        <div skeleton
             [isLoading]="isLoading()"
             [skeletonType]="'wave'"
             [skeletonHeight]="'100px'"
             class="example-box">
          <p>Animación de onda para un efecto más dramático.</p>
        </div>
      </section>

      <!-- Ejemplo 4: Círculo (Avatar) -->
      <section class="example-section">
        <h2>4. Forma de Círculo (Avatar)</h2>
        <div class="avatar-container">
          <div skeleton
               [isLoading]="isLoading()"
               [skeletonShape]="'circle'"
               [skeletonHeight]="'80px'"
               [skeletonWidth]="'80px'"
               class="avatar">
            <img src="https://i.pravatar.cc/80" alt="Avatar">
          </div>
          <div class="avatar-info">
            <h3 skeleton
                [isLoading]="isLoading()"
                [skeletonShape]="'text'"
                [skeletonWidth]="'150px'">
              John Doe
            </h3>
            <p skeleton
               [isLoading]="isLoading()"
               [skeletonShape]="'text'"
               [skeletonWidth]="'200px'">
              john.doe@example.com
            </p>
          </div>
        </div>
      </section>

      <!-- Ejemplo 5: Múltiples líneas de texto -->
      <section class="example-section">
        <h2>5. Múltiples Líneas de Texto</h2>
        <div skeleton
             [isLoading]="isLoading()"
             [skeletonShape]="'text'"
             [skeletonLines]="5">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            Duis aute irure dolor in reprehenderit in voluptate velit esse.
            Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
      </section>

      <!-- Ejemplo 6: Tarjeta de Producto -->
      <section class="example-section">
        <h2>6. Tarjeta de Producto Completa</h2>
        <div class="product-card">
          <!-- Imagen -->
          <div skeleton
               [isLoading]="isLoading()"
               [skeletonType]="'shimmer'"
               [skeletonHeight]="'200px'"
               [skeletonBorderRadius]="'12px'"
               class="product-image">
            <img src="https://picsum.photos/300/200" alt="Product">
          </div>

          <!-- Título -->
          <h3 skeleton
              [isLoading]="isLoading()"
              [skeletonShape]="'text'"
              [skeletonHeight]="'24px'"
              class="product-title">
            Producto Increíble
          </h3>

          <!-- Descripción -->
          <p skeleton
             [isLoading]="isLoading()"
             [skeletonShape]="'text'"
             [skeletonLines]="3"
             class="product-description">
            Esta es una descripción detallada del producto que muestra
            todas las características y beneficios que ofrece al usuario.
            Perfecto para cualquier ocasión.
          </p>

          <!-- Precio -->
          <div skeleton
               [isLoading]="isLoading()"
               [skeletonWidth]="'100px'"
               [skeletonHeight]="'32px'"
               [skeletonBorderRadius]="'8px'"
               class="product-price">
            <span class="price">$99.99</span>
          </div>

          <!-- Botón -->
          <button skeleton
                  [isLoading]="isLoading()"
                  [skeletonHeight]="'40px'"
                  [skeletonBorderRadius]="'8px'"
                  class="product-button">
            Agregar al Carrito
          </button>
        </div>
      </section>

      <!-- Ejemplo 7: Lista de Items -->
      <section class="example-section">
        <h2>7. Lista de Items</h2>
        <div class="item-list">
          @for (item of [1, 2, 3]; track item) {
            <div class="list-item">
              <div skeleton
                   [isLoading]="isLoading()"
                   [skeletonShape]="'circle'"
                   [skeletonHeight]="'50px'"
                   [skeletonWidth]="'50px'"
                   class="item-icon">
                <div class="icon">📦</div>
              </div>
              <div class="item-content">
                <h4 skeleton
                    [isLoading]="isLoading()"
                    [skeletonShape]="'text'"
                    [skeletonWidth]="'180px'">
                  Item {{ item }}
                </h4>
                <p skeleton
                   [isLoading]="isLoading()"
                   [skeletonShape]="'text'"
                   [skeletonLines]="2">
                  Descripción del item con información relevante.
                </p>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Ejemplo 8: Personalización Avanzada -->
      <section class="example-section">
        <h2>8. Personalización Avanzada</h2>
        <div skeleton
             [isLoading]="isLoading()"
             [skeletonType]="'shimmer'"
             [skeletonHeight]="'150px'"
             [skeletonWidth]="'100%'"
             [skeletonBorderRadius]="'16px'"
             [skeletonAnimationDuration]="'2s'"
             [skeletonTheme]="'#e3f2fd'"
             class="custom-skeleton">
          <div class="custom-content">
            <h3>Contenido Personalizado</h3>
            <p>Con tema azul claro y animación más lenta</p>
          </div>
        </div>
      </section>

      <!-- Ejemplo 9: Grid de Tarjetas -->
      <section class="example-section">
        <h2>9. Grid de Tarjetas</h2>
        <div class="card-grid">
          @for (card of [1, 2, 3, 4]; track card) {
            <div class="grid-card">
              <div skeleton
                   [isLoading]="isLoading()"
                   [skeletonHeight]="'120px'"
                   [skeletonBorderRadius]="'8px'"
                   class="card-image">
                <img src="https://picsum.photos/200/120?random={{ card }}" alt="Card">
              </div>
              <h4 skeleton
                  [isLoading]="isLoading()"
                  [skeletonShape]="'text'">
                Tarjeta {{ card }}
              </h4>
            </div>
          }
        </div>
      </section>
    </div>
  `,
    styles: [
        `
            .skeleton-examples {
                max-width: 1200px;
                margin: 0 auto;
                padding: 2rem;
                font-family: 'Poppins', sans-serif;
            }

            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 2rem;
            }

            .controls {
                text-align: center;
                margin-bottom: 3rem;
            }

            button {
                padding: 12px 24px;
                font-size: 16px;
                background-color: #1976d2;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.3s;
                font-family: 'Poppins', sans-serif;

                &:hover {
                    background-color: #1565c0;
                }
            }

            .example-section {
                margin-bottom: 3rem;
                padding: 2rem;
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

                h2 {
                    color: #1976d2;
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                }
            }

            .example-box {
                padding: 2rem;
                background: #f5f5f5;
                border-radius: 8px;
            }

            .avatar-container {
                display: flex;
                align-items: center;
                gap: 1rem;

                .avatar {
                    flex-shrink: 0;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }

                .avatar-info {
                    flex: 1;

                    h3 {
                        margin: 0 0 0.5rem 0;
                    }

                    p {
                        margin: 0;
                        color: #666;
                    }
                }
            }

            .product-card {
                max-width: 400px;
                padding: 1.5rem;
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 12px;

                .product-image {
                    margin-bottom: 1rem;

                    img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                        border-radius: 12px;
                    }
                }

                .product-title {
                    margin: 1rem 0;
                    font-size: 1.5rem;
                }

                .product-description {
                    margin: 1rem 0;
                    color: #666;
                    line-height: 1.6;
                }

                .product-price {
                    margin: 1rem 0;

                    .price {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #1976d2;
                    }
                }

                .product-button {
                    width: 100%;
                    margin-top: 1rem;
                }
            }

            .item-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .list-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 1rem;
                    background: #f9f9f9;
                    border-radius: 8px;

                    .item-icon {
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                    }

                    .item-content {
                        flex: 1;

                        h4 {
                            margin: 0 0 0.5rem 0;
                        }

                        p {
                            margin: 0;
                            color: #666;
                            line-height: 1.5;
                        }
                    }
                }
            }

            .custom-skeleton {
                .custom-content {
                    padding: 2rem;
                    text-align: center;

                    h3 {
                        margin: 0 0 1rem 0;
                        color: #1976d2;
                    }

                    p {
                        margin: 0;
                        color: #666;
                    }
                }
            }

            .card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1.5rem;

                .grid-card {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                    transition:
                        transform 0.3s,
                        box-shadow 0.3s;

                    &:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }

                    .card-image {
                        img {
                            width: 100%;
                            height: 120px;
                            object-fit: cover;
                        }
                    }

                    h4 {
                        padding: 1rem;
                        margin: 0;
                        font-size: 1rem;
                    }
                }
            }

            @media (max-width: 768px) {
                .skeleton-examples {
                    padding: 1rem;
                }

                .example-section {
                    padding: 1rem;
                }

                .card-grid {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }
            }
        `,
    ],
})
export class SkeletonExampleComponent {
    isLoading = signal(true);

    toggleLoading() {
        this.isLoading.update((value) => !value);
    }
}
