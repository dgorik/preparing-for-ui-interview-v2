/**
 * Configuration object for a Component instance.
 * 
 * @typeParam T - Custom properties to extend the base configuration.
 * 
 * @property root - The parent HTMLElement where the component will be mounted.
 * @property className - CSS class name(s) to apply to the component's root element.
 * @property listeners - Type-safe DOM event listeners mapped to their corresponding event types.
 * 
 * @example
 * ```typescript
 * const config: TComponentConfig<{ title: string }> = {
 *     root: document.getElementById('app')!,
 *     className: 'my-component',
 *     title: 'Hello World',
 *     listeners: {
 *         click: (event) => console.log('Clicked!', event.clientX),
 *         keydown: (event) => console.log('Key pressed:', event.key),
 *     }
 * };
 * ```
 */
export type TComponentConfig<T extends object> = T & {
    /** The parent HTMLElement where the component will be mounted */
    root: HTMLElement;
    /** CSS class name(s) to apply to the component's root element */
    className?: string;
};

/**
 * Interface defining the contract for a UI Component.
 * 
 * Components follow a lifecycle pattern:
 * 1. **Construction** - Component is instantiated with configuration
 * 2. **Initialization** (`init`) - Component prepares internal state
 * 3. **Rendering** (`render`) - Component mounts to the DOM
 * 4. **Effects** (`effect`) - Side effects and event listeners are registered
 * 5. **Destruction** (`destroy`) - Cleanup and unmount
 * 
 * @typeParam T - Custom configuration properties beyond the base `TComponentConfig`.
 */
export abstract class Component<T extends object> {
    /**
     * Creates a new component instance.
     * @param config - The configuration object containing root element, class names, and event listeners.
     */
    constructor(protected config: TComponentConfig<T>) { }

    /**
     * Initializes the component in memory without rendering to the DOM.
     * Use this to set up internal state, create element references, and prepare for rendering.
     * Called before `render()`.
     */
    init(): void {

    }

    /**
     * Renders the component to the DOM.
     * Mounts the component's HTML to the configured root element.
     * Should call `effect()` after mounting to register event listeners.
     */
    abstract render(): void;

    /**
     * Destroys the component and performs cleanup.
     * Removes the component from the DOM, unregisters event listeners,
     * and releases any held references to prevent memory leaks.
     */
    abstract destroy(): void;

    /**
     * Generates the HTML template string for the component.
     * @returns The HTML string representation of the component's content.
     */
    abstract toHTML(): string;

    /**
     * Registers side effects and event listeners.
     * Called after the component is mounted to the DOM.
     * Use this to attach DOM event listeners from the `listeners` config.
     */
    effect(): void {

    }
}