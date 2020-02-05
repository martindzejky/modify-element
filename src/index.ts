import { Elements } from './elements';
import { ElementCallback } from './types/element-callback-type';
import { CssSelector } from './types/selector.type';

const elements = new Elements();

/**
 * Start observing the root element. This applies all registered
 * selectors and starts the MutationObserver.
 *
 * @param rootElement Root element to observe
 */
export function start(rootElement: Element) {
    if (!rootElement) {
        throw new TypeError(
            'rootElement parameter is required. You must pass in an element to observe.',
        );
    }

    if (
        rootElement instanceof Element &&
        rootElement.nodeType === Node.ELEMENT_NODE
    ) {
        elements.start(rootElement);
    } else {
        throw new TypeError(
            `rootElement must be an element. You passed in: ${typeof rootElement}.`,
        );
    }
}

/**
 * Stop observing the root element.
 */
export function stop() {
    elements.stop();
}

/**
 * Register a new selector and a callback function. The callback will
 * be called whenever a new element matching the selector appears in the DOM.
 *
 * @param selector Selector matching the target element
 * @param callback Callback function to call with the element
 */
export function registerSelector(
    selector: CssSelector,
    callback: ElementCallback,
) {
    if (!selector) {
        throw new TypeError(
            'selector is required. How else do you want to select an element?',
        );
    }

    if (!callback || typeof callback !== 'function') {
        throw new TypeError(
            `callback function is required. You passed in: ${typeof callback}.`,
        );
    }

    elements.registerSelector(selector, callback);
}

/**
 * Remove the registered callback.
 *
 * @param selector Selector assigned with the callback
 * @param callback Callback function to remove
 */
export function unregisterSelector(
    selector: CssSelector,
    callback: ElementCallback,
) {
    if (!selector) {
        throw new TypeError(
            'selector is required to unregister the correct callback.',
        );
    }

    if (!callback || typeof callback !== 'function') {
        throw new TypeError(
            `callback function is required. You passed in: ${typeof callback}.`,
        );
    }

    elements.unregisterSelector(selector, callback);
}
