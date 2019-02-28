import { ObserverCallback } from './types/observer-callback.type';

/**
 * MutationObserver wrapper class. Makes it easier to work with
 * the MutationObserver and is tailored to this library's specific case.
 */
export class Observer {
    private isObserving = false;
    private mutationObserverInstance: MutationObserver;

    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
    private readonly config = {
        childList: true,
        subtree: true,
        attributes: true,
    };

    constructor(private target: Node, private callback: ObserverCallback) {
        this.mutationObserverInstance = new MutationObserver(
            this.observerHandler.bind(this),
        );
    }

    start() {
        if (!this.isObserving) {
            this.mutationObserverInstance.observe(this.target, this.config);
            this.isObserving = true;
        }
    }

    stop() {
        if (this.isObserving) {
            this.mutationObserverInstance.disconnect();
            this.isObserving = false;
        }
    }

    private observerHandler(mutationsList: MutationRecord[]) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(addedNode => {
                    if (addedNode.nodeType === Node.ELEMENT_NODE) {
                        this.callback(addedNode, mutation.type);
                    }
                });
            } else if (mutation.type === 'attributes') {
                this.callback(mutation.target, mutation.type);
            }
        }
    }
}
