document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('amv_open_callback')?.addEventListener('click', e => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        document.getElementById('amv_callback_window')?.classList.toggle('active');
    })
})
