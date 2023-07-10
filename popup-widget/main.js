import {el, svg, mount} from "redom";

document.addEventListener('DOMContentLoaded', () => {
    const widget = new Widget(document.querySelector('.any-callback-wrapper'));
    // const widget = new Widget(el('h2', "Просто заголовок"))
})

class Widget {
    constructor(innerWindow) {
        if (!(innerWindow instanceof HTMLElement)) throw TypeError('Необходимо передать DOM-элемент');

        this.container = this.createWidgetLayout();
        mount(document.body, this.container);
        mount(document.querySelector('.a3t-popup__window'), innerWindow);

        this.isOpen = false;

        this.toggleBtn.addEventListener('click', () => this.handlerToggleBtn());
        this.closeBtn.addEventListener('click', () => this.handlerCloseBtn());
        this.shadow.addEventListener('click', () => this.handlerOutClick());
    }

    get isOpen() {
        return this._isOpen
    }

    set isOpen(bool) {
        if (bool === this._isOpen) return;

        this._isOpen = bool;

        if (this._isOpen) {
            this.openModal();
            document.addEventListener('keydown', e => this.handlerEscape(e), {once: true});
        }
        if (!this._isOpen) {
            this.closeModal()
            document.removeEventListener('keydown', e => this.handlerEscape(e));
        }
    }

    openModal() {
        this.container.classList.add('is-open');
        this.toggleBtn.classList.add('active');
        this.container.querySelector('#a3t_popup_window').classList.add('active');

    }

    closeModal() {
        this.container.classList.remove('is-open');
        this.toggleBtn.classList.remove('active');
        this.container.querySelector('#a3t_popup_window').classList.remove('active');

    }

    handlerToggleBtn() {
        this.isOpen = !this.isOpen
    }

    handlerCloseBtn() {
        this.isOpen = false
    }

    handlerEscape(event) {
        if (!this.isOpen) return;
        if (event.key === "Escape") this.isOpen = false
    }

    handlerOutClick() {
        this.isOpen = false
    }

    createWidgetLayout() {
        this.toggleBtn = el('button.a3t-popup__btn_open', {type: "button"}, [
            svg(
                'svg.icon_open_a3t', {width: "28px", viewBox: "0 0 18.6 17.5"},
                svg('path', {d: "M3.7 17.5v-4.8H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h14.6c1.1 0 2 .9 2 2v8.8c0 1.1-.9 2-2 2H9l-5.3 4.7zM2 1c-.6 0-1 .4-1 1v8.8c0 .5.4 1 1 1h2.8v3.5l3.8-3.5h8c.5 0 1-.4 1-1V2c0-.5-.4-1-1-1H2z"})
            ),
            svg(
                'svg.icon_close_a3t', {width: "16px", height: "16px", viewBox: "0 0 23 23"},
                svg('g', {stroke: "none", strokeWidth: "1", fill: "#000", fillRule: "evenodd"},
                    svg('rect', {
                        transform: "translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) ",
                        x: "10.3137085",
                        y: "-3.6862915",
                        width: "2",
                        height: "30"
                    }),
                    svg('rect', {
                        transform: "translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) ",
                        x: "10.3137085",
                        y: "-3.6862915",
                        width: "2",
                        height: "30"
                    })
                )
            )
        ]);
        this.closeBtn = el('button.btn btn_close-a3t', {type: "button"}, "Закрыть");
        this.shadow = el('div.a3t-popup__shadow');

        return el('div.a3t-popup',
            [
                el('div.a3t-popup__btn-wrapper', this.toggleBtn),
                el('div.a3t-popup__window-wrapper',
                    el('div.a3t-popup__window', {id: "a3t_popup_window"},
                        this.closeBtn
                    )
                ),
                this.shadow
            ]
        )
    }
}

