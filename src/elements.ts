import { Observer } from './observer';
import { ElementCallback } from './types/element-callback-type';
import { ElementDirectory } from './types/element-directory.type';

/**
 * Allows to observe elements using CSS selectors. Uses the Observer wrapper
 * to get all elements as they are added.
 */
export class Elements {
    private isObserving = false;

    private readonly registeredSelectors: ElementDirectory = {};

    constructor(private observer: Observer) {}

    start() {
        if (!this.isObserving) {
            this.observer.start();
            this.isObserving = true;
            // TODO: query all registered selectors
        }
    }

    stop() {
        if (this.isObserving) {
            this.observer.stop();
            this.isObserving = false;
        }
    }

    registerSelector(selector: string, callback: ElementCallback) {
        if (selector in this.registeredSelectors) {
            const callbackArray = this.registeredSelectors[selector];

            if (!callbackArray.includes(callback)) {
                callbackArray.push(callback);
                // TODO: query selector to see if the element is already present
            }
        } else {
            this.registeredSelectors[selector] = [callback];
            // TODO: query selector to see if the element is already present
        }
    }

    unregisterSelector(selector: string, callback: ElementCallback) {
        if (selector in this.registeredSelectors) {
            const callbackArray = this.registeredSelectors[selector];

            callbackArray.splice(callbackArray.indexOf(callback), 1);

            if (callbackArray.length === 0) {
                delete this.registeredSelectors[selector];
            }
        }
    }
}
