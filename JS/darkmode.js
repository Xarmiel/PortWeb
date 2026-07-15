/* =====================================================
   darkmode.js — Toggle Modo Claro / Modo Oscuro
   Persiste la preferencia del usuario en localStorage.
   La clase se aplica en <html> para que funcione antes
   de que el navegador pinte el body (evita el flash).
   ===================================================== */

(function () {
    const STORAGE_KEY = 'portafolio-theme';
    const LIGHT_CLASS = 'light-mode';

    /* ---- 1. Aplica el tema ANTES de pintar (sin flash) ---- */
    if (localStorage.getItem(STORAGE_KEY) === 'light') {
        document.documentElement.classList.add(LIGHT_CLASS);
    }

    /* ---- 2. Configura el botón al cargar el DOM ---- */
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;

        actualizarIcono(btn);

        btn.addEventListener('click', () => {
            const isLight = document.documentElement.classList.toggle(LIGHT_CLASS);
            localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
            actualizarIcono(btn);
        });
    });

    function actualizarIcono(btn) {
        const isLight = document.documentElement.classList.contains(LIGHT_CLASS);
        btn.textContent = isLight ? '🌙' : '☀️';
        btn.title       = isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
        btn.setAttribute('aria-label', btn.title);
    }
})();
