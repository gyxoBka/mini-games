class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' 
            ? document.querySelector(selector) 
            : selector;
    }

    on(eventType, callback, global = false) {
        if (global) {
            document.addEventListener(eventType, callback);
            return
        }

        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback, global = false) {
        if (global) {
            document.addEventListener(eventType, callback);
            return
        }
        
        this.$el.removeEventListener(eventType, callback);
    }

    insertHTML(type, HTML) {
        this.$el.insertAdjacentHTML(type, HTML)
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }

        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
    }

    appendTo(node, parent) {
        if (node instanceof Dom) {
            node = node.$el
        }

        parent = this.$el.querySelector(parent)

        if (Element.prototype.append) {
            parent.append(node)
        } else {
            parent.appendChild(node)
        }

        return parent;
    }

    css(prop, value) {
        this.$el.style[prop] = value;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName);

    if(className) {
        el.classList.add(className);
    }

    return $(el);
}