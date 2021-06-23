import { capitalize } from "./utils";

export class DomListener {
    constructor($el, listeners = [], docListeners = []) {
        if(!$el) {
            throw new Error('No $el provided from DomListener')
        }

        this.$el = $el;
        this.listeners = listeners;
        this.docListeners = docListeners;
    }

    initDOMListeners() {
        initListeners.call(this, this.listeners, false);
        initListeners.call(this, this.docListeners, true);
    }

    removeDOMListeners() {
        removeListeners.call(this, this.listeners, false);
        removeListeners.call(this, this.docListeners, true);
    }
}

function initListeners(listners, global = false) {
    listners.forEach(listener => {
        const method = getMethodName(listener);

        if(!this[method]) {
            throw new Error(`${method} is not implemented`);
        }

        this[method] = this[method].bind(this);
        this.$el.on(listener, this[method], global);
    })
}

function removeListeners(listners, global = false) {
    listners.forEach(listener => {
        const method = getMethodName(listener);
        this.$el.off(listener, this[method], global);
    })
}

function getMethodName(method) {
    return 'on' + capitalize(method);
}