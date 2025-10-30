import { computed, Directive, effect, ElementRef, inject, input, Renderer2, signal } from '@angular/core';

/**
 * Advanced Skeleton Directive for Angular v20
 *
 * @description
 * Professional skeleton loader directive with multiple animation types,
 * customizable shapes, and advanced features using Angular v20 signals.
 *
 * @example
 * Basic usage:
 * <div skeleton [isLoading]="loading()"></div>
 *
 * Advanced usage:
 * <div skeleton
 *      [isLoading]="loading()"
 *      [skeletonType]="'shimmer'"
 *      [skeletonShape]="'circle'"
 *      [skeletonHeight]="'100px'"
 *      [skeletonWidth]="'100px'"
 *      [skeletonBorderRadius]="'8px'"
 *      [skeletonLines]="3"
 *      [skeletonAnimationDuration]="'1.5s'">
 * </div>
 */
@Directive({
    selector: '[skeleton]',
    host: {
        '[class.skeleton]': 'true',
        '[class.skeleton-active]': '$isLoading()',
        '[class.skeleton-shimmer]': '$isShimmer()',
        '[class.skeleton-pulse]': '$isPulse()',
        '[class.skeleton-wave]': '$isWave()',
        '[class.skeleton-circle]': '$isCircle()',
        '[class.skeleton-rect]': '$isRect()',
        '[class.skeleton-text]': '$isText()',
        '[attr.aria-busy]': '$isLoading()',
        '[attr.aria-live]': '"polite"',
        '[style.height]': '$computedHeight()',
        '[style.width]': '$computedWidth()',
        '[style.border-radius]': '$computedBorderRadius()',
        '[style.animation-duration]': '$animationDuration()',
    },
})
export class Skeleton {
    readonly #elementRef = inject(ElementRef);
    readonly #renderer = inject(Renderer2);

    // Input signals - Angular v20 modern approach
    $isLoading = input.required<boolean>({ alias: 'isLoading' });

    /**
     * Animation type: 'shimmer' | 'pulse' | 'wave'
     * @default 'shimmer'
     */
    $type = input<'shimmer' | 'pulse' | 'wave'>('shimmer', { alias: 'skeletonType' });

    /**
     * Shape type: 'rect' | 'circle' | 'text'
     * @default 'rect'
     */
    $shape = input<'rect' | 'circle' | 'text'>('rect', { alias: 'skeletonShape' });

    /**
     * Custom height for skeleton
     */
    $height = input<string | null>(null, { alias: 'skeletonHeight' });

    /**
     * Custom width for skeleton
     */
    $width = input<string | null>(null, { alias: 'skeletonWidth' });

    /**
     * Custom border radius
     */
    $borderRadius = input<string | null>(null, { alias: 'skeletonBorderRadius' });

    /**
     * Number of skeleton lines (for text type)
     * @default 1
     */
    $lines = input<number>(1, { alias: 'skeletonLines' });

    /**
     * Animation duration
     * @default '1.2s'
     */
    $animationDuration = input<string>('1.2s', { alias: 'skeletonAnimationDuration' });

    /**
     * Custom theme color
     */
    $themeColor = input<string | null>(null, { alias: 'skeletonTheme' });

    /**
     * Enable gradient effect
     * @default true
     */
    $gradient = input<boolean>(true, { alias: 'skeletonGradient' });

    // Computed signals for class bindings
    $isShimmer = computed(() => this.$type() === 'shimmer' && this.$isLoading());
    $isPulse = computed(() => this.$type() === 'pulse' && this.$isLoading());
    $isWave = computed(() => this.$type() === 'wave' && this.$isLoading());
    $isCircle = computed(() => this.$shape() === 'circle');
    $isRect = computed(() => this.$shape() === 'rect');
    $isText = computed(() => this.$shape() === 'text');

    // Computed styles
    $computedHeight = computed(() => {
        if (this.$height()) return this.$height();
        if (this.$shape() === 'circle') return '50px';
        if (this.$shape() === 'text') return '1em';
        return null;
    });

    $computedWidth = computed(() => {
        if (this.$width()) return this.$width();
        if (this.$shape() === 'circle') return '50px';
        return null;
    });

    $computedBorderRadius = computed(() => {
        if (this.$borderRadius()) return this.$borderRadius();
        if (this.$shape() === 'circle') return '50%';
        if (this.$shape() === 'text') return '4px';
        return null;
    });

    // Original content storage
    private originalContent = signal<HTMLElement | null>(null);
    private skeletonContainer = signal<HTMLElement | null>(null);

    constructor() {
        // Effect to handle loading state changes
        effect(() => {
            const isLoading = this.$isLoading();

            if (isLoading) {
                this.showSkeleton();
            } else {
                this.hideSkeleton();
            }
        });

        // Effect to apply custom theme
        effect(() => {
            const themeColor = this.$themeColor();
            if (themeColor && this.$isLoading()) {
                this.#renderer.setStyle(this.#elementRef.nativeElement, '--skeleton-color', themeColor);
            }
        });

        // Effect to handle multiple lines for text type
        effect(() => {
            const lines = this.$lines();
            const isText = this.$isText();
            const isLoading = this.$isLoading();

            if (isText && isLoading && lines > 1) {
                this.createMultipleLines(lines);
            }
        });
    }

    /**
     * Show skeleton and hide original content
     */
    private showSkeleton(): void {
        const element = this.#elementRef.nativeElement;

        // Store original content if not already stored
        if (!this.originalContent() && element.children.length > 0) {
            const content = this.#renderer.createElement('div');
            content.style.display = 'none';

            // Move all children to the content container
            while (element.firstChild) {
                this.#renderer.appendChild(content, element.firstChild);
            }

            this.#renderer.appendChild(element, content);
            this.originalContent.set(content);
        }

        // Add accessibility attributes
        this.#renderer.setAttribute(element, 'role', 'status');
        this.#renderer.setAttribute(element, 'aria-label', 'Loading content');
    }

    /**
     * Hide skeleton and show original content
     */
    private hideSkeleton(): void {
        const element = this.#elementRef.nativeElement;
        const originalContent = this.originalContent();
        const skeletonContainer = this.skeletonContainer();

        // Remove skeleton lines if they exist
        if (skeletonContainer) {
            this.#renderer.removeChild(element, skeletonContainer);
            this.skeletonContainer.set(null);
        }

        // Restore original content
        if (originalContent) {
            while (originalContent.firstChild) {
                this.#renderer.appendChild(element, originalContent.firstChild);
            }
            this.#renderer.removeChild(element, originalContent);
            this.originalContent.set(null);
        }

        // Remove accessibility attributes
        this.#renderer.removeAttribute(element, 'role');
        this.#renderer.removeAttribute(element, 'aria-label');
    }

    /**
     * Create multiple skeleton lines for text type
     */
    private createMultipleLines(count: number): void {
        const element = this.#elementRef.nativeElement;
        const existingContainer = this.skeletonContainer();

        // Remove existing container if it exists
        if (existingContainer) {
            this.#renderer.removeChild(element, existingContainer);
        }

        // Create new container
        const container = this.#renderer.createElement('div');
        this.#renderer.addClass(container, 'skeleton-lines-container');

        // Create lines
        for (let i = 0; i < count; i++) {
            const line = this.#renderer.createElement('div');
            this.#renderer.addClass(line, 'skeleton-line');

            // Make last line shorter for more natural look
            if (i === count - 1 && count > 1) {
                this.#renderer.setStyle(line, 'width', '80%');
            }

            // Add spacing between lines
            if (i > 0) {
                this.#renderer.setStyle(line, 'margin-top', '0.5em');
            }

            this.#renderer.appendChild(container, line);
        }

        this.#renderer.appendChild(element, container);
        this.skeletonContainer.set(container);
    }
}
