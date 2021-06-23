import { DomListener } from "./DomListener"

export class GameComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners, options.docListeners)
        this.name = options.name || ''
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}