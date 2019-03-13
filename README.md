# modify-element

Allows you to easily modify HTML elements on websites.
A small utility library to simplify working with the `MutationObserver` browser API.

## Usage

You register a CSS selector and a callback function. When started, the callback function
will be called when any element matching the selector appears in the DOM. Suitable for
static websites as well as dynamic web apps.

1. Import or copy-paste the script to your code
1. Register your selector and callback using `ModifyElement.registerSelector`
1. Start the observer using `ModifyElement.start`

## API

The library exports a single global variable called `ModifyElement` which provides the public API.

### `ModifyElement.registerSelector`

Register a new selector and a callback function. The callback will
be called whenever a new element matching the selector appears in the DOM.

- `selector` Selector matching the target element
- `callback` Callback function to call with the element

### `ModifyElement.unregisterSelector`

Remove the registered callback.

- `selector` Selector assigned with the callback 
- `callback` Callback function to remove

### `ModifyElement.start`

Start observing the root element. This applies all registered
selectors and starts the MutationObserver.

- `rootElement` Root element to observe, usually this can be `document.documentElement`

### `ModifyElement.stop`

Stop observing the root element.
