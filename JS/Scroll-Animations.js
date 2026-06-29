document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimados = document.querySelectorAll('.scroll_fade');
    const opcionesObservador = {
        root: null,        
        threshold: 0.10,   
        rootMargin: '0px 0px -50px 0px'
    };
    const observadorScroll = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('is-visible');
            } else {
                entrada.target.classList.remove('is-visible');
            }
        });
    }, opcionesObservador);

    elementosAnimados.forEach(elemento => observadorScroll.observe(elemento));
});