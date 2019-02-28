import { Observer } from './observer';
import { ElementCallback } from './types/element-callback-type';
import { ElementDirectory } from './types/element-directory.type';
import { CssSelector } from './types/selector.type';

/**
 * Allows to observe elements using CSS selectors. Uses the Observer wrapper
 * to get all elements as they are added.
 */
export class Elements {
    private isObserving = false;
    private rootElement?: Element;

    private readonly registeredSelectors: ElementDirectory = {};
    private readonly observer = new Observer(this.observeHandler.bind(this));

    start(rootElement: Element) {
        if (!this.isObserving) {
            this.isObserving = true;
            this.rootElement = rootElement;

            this.queryAndApplyAllSelectors();
            this.observer.start(rootElement);
        }
    }

    stop() {
        if (this.isObserving) {
            this.observer.stop();
            this.isObserving = false;
        }
    }

    registerSelector(selector: CssSelector, callback: ElementCallback) {
        if (selector in this.registeredSelectors) {
            const callbackArray = this.registeredSelectors[selector];

            if (!callbackArray.includes(callback)) {
                callbackArray.push(callback);
                this.queryAndApplySelector(selector);
            }
        } else {
            this.registeredSelectors[selector] = [callback];
            this.queryAndApplySelector(selector);
        }
    }

    unregisterSelector(selector: CssSelector, callback: ElementCallback) {
        if (selector in this.registeredSelectors) {
            const callbackArray = this.registeredSelectors[selector];

            callbackArray.splice(callbackArray.indexOf(callback), 1);

            if (callbackArray.length === 0) {
                delete this.registeredSelectors[selector];
            }
        }
    }

    private observeHandler(node: Node, eventType: MutationRecordType) {
        if (eventType === 'childList') {
            if (document.readyState === 'loading') {
                // the document is still loading, it is sufficient to only
                // check the current node because its children are coming
                // next anyway
                this.checkNode(node);
            } else {
                this.checkNodeAndChildren(node);
            }
        } else {
            this.checkNodeAndChildren(node);
        }
    }

    private queryAndApplyAllSelectors() {
        Object.keys(this.registeredSelectors).forEach(selector =>
            this.queryAndApplySelector(selector),
        );
    }

    private queryAndApplySelector(selector: CssSelector) {
        if (
            !this.isObserving ||
            !this.rootElement ||
            !this.registeredSelectors[selector]
        ) {
            return;
        }

        try {
            const elements = this.rootElement.querySelectorAll(selector);

            elements.forEach(element => {
                this.registeredSelectors[selector].forEach(callback =>
                    callback(element),
                );
            });
        } catch (e) {}
    }

    /**
     * Recursively check the node and its children whether any of them
     * match any of the registered selectors.
     */
    private checkNodeAndChildren(node: Node) {
        this.checkNode(node);
        node.childNodes.forEach(child => this.checkNodeAndChildren(child));
    }

    /**
     * Check whether the node matches any of the registered selectors.
     */
    private checkNode(node: Node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        const element = node as Element;

        try {
            Object.keys(this.registeredSelectors).forEach(selector => {
                if (element.matches(selector)) {
                    this.registeredSelectors[selector].forEach(callback =>
                        callback(element),
                    );
                }
            });
        } catch (e) {}
    }
}
