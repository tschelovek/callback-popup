document.addEventListener('DOMContentLoaded', () => {

    // document.getElementById('amv_open_callback')?.addEventListener('click', e => {
    //     e.preventDefault();
    //     e.currentTarget.classList.toggle('active');
    //     document.getElementById('amv_callback_window')?.classList.toggle('active');
    // })

    class Widget {
        constructor(container) {
            this.container = container;
            this.toggleBtn = container.querySelector('#amv_open_callback');
            this.isOpen = false;

            this.toggleBtn.addEventListener('click', () => this.handlerToggleBtn());
            container.querySelector('.btn_close-amw').addEventListener('click', () => this.handlerCloseBtn());
        }

        get isOpen() {
            return this._isOpen
        }

        set isOpen(bool) {
            if ( bool === this._isOpen) return;

            this._isOpen = bool;

            if (this._isOpen) {
                this.openModal();
                document.addEventListener('keydown', e => this.handlerEscape(e))
            }
            if (!this._isOpen) {
                this.closeModal()
                document.removeEventListener('keydown', e => this.handlerEscape(e))
            }
        }

        openModal() {
            this.toggleBtn.classList.add('active');
            this.container.querySelector('#amv_callback_window').classList.add('active');
            this.container.querySelector('.callback__shadow').classList.add('active');
        }

        closeModal() {
            this.toggleBtn.classList.remove('active');
            this.container.querySelector('#amv_callback_window').classList.remove('active');
            this.container.querySelector('.callback__shadow').classList.remove('active');
        }

        handlerToggleBtn() {
            this.isOpen = !this.isOpen
        }

        handlerCloseBtn() {
            this.isOpen = false
        }

        handlerEscape(event) {
            if (event.key === "Escape") this.isOpen = false
        }
    }

    const widget = new Widget(document.querySelector('.callback_amv'))

})
