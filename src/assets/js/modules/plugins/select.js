const getTemplate = (data = [], placeholder, selectedId) => {
    let inputText = placeholder || '';

    const items = data.map(item => {
        let itemClass = '';

        if (item.id === selectedId) {
            inputText = item.value;
            itemClass = 'selected';
        }
        return `
            <li class="select__item ${itemClass}" data-type="item" data-id="${item.id}">${item.value}</li>
        `
    });

    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${inputText}</span>
            <span class="select__arrow"></span>
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `
}

export class Select {
    render() {
        const { data, placeholder } = this.options;
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId );
    }

    setup() {
        this.$el.addEventListener('click', this.cHandler);
        this.$value = this.$el.querySelector('[data-type="value"]');
    }

    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;

        this.cHandler = this.clickHandler.bind(this);

        this.render();
        this.setup();
    }

    clickHandler(e) {
        const { type } = e.target.dataset;

        if (type === 'input' || type === 'value') {
            this.toggle();
        } else if (type === 'item') {
            const id = e.target.dataset.id;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected');
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

        if(this.options.onSelect) {
            this.options.onSelect(this.current);
        }
        this.close();
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$el.classList.add('open');
    }

    close() {
        this.$el.classList.remove('open');
    }

    destroy() {
        this.$el.removeEventListener('click', this.cHandler);
        this.$el.innerHTML = '';
    }
}