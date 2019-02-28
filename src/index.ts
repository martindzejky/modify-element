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
        throw new Error('You must pass in a root element to observe');
    }

    if (
        rootElement instanceof Element &&
        rootElement.nodeType === Node.ELEMENT_NODE
    ) {
        elements.start(rootElement);
    } else {
        throw new Error('You must pass in an element node');
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
        throw new Error('You must pass in a selector');
    }

    if (!callback || typeof callback !== 'function') {
        throw new Error('You must pass in a callback function');
    }

    elements.registerSelector(selector, callback);
}

/**
 * Remove the registered callback.
 *
 * @param selector Selector assign with the callback
 * @param callback Callback function to remove
 */
export function unregisterSelector(
    selector: CssSelector,
    callback: ElementCallback,
) {
    elements.unregisterSelector(selector, callback);
}
