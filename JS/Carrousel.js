document.addEventListener('DOMContentLoaded', () => {
    // 1. Colección centralizada de datos (Añade o quita proyectos aquí libremente)
    const proyectosData = [
        // --- CATEGORÍA RESIDENCIAL ---
        {
            category: 'residencial',
            title: 'Casa Arrescurrenaga',
            location: 'Tamaulipas',
            image: '../Recursos/Casas/Arrescurrenaga1.webp'
        },
        {
            category: 'residencial',
            title: 'Casa Montaño',
            location: 'Monterrey',
            image: '../Recursos/Casas/Montaño.webp'
        },
        {
            category: 'residencial',
            title: 'Casa Salaverry',
            location: 'Lima',
            image: '../Recursos/Casas/Salaverry.webp'
        },
        {
            category: 'residencial',
            title: 'Residencia Alfa',
            location: 'Ica',
            image: '../Recursos/Casas/Viviendafamiliares.webp'
        },

        // --- CATEGORÍA INDUSTRIAL / COMERCIAL ---
        {
            category: 'comercial',
            title: 'Edificio Centro',
            location: 'Ciudad De México',
            image: '../Recursos/Casas/Comercial1.webp'
        },
        {
            category: 'comercial',
            title: 'Edificio Sur',
            location: 'Monterrey',
            image: '../Recursos/Casas/Comercial2.webp'
        },
        {
            category: 'comercial',
            title: 'Edificio Capital',
            location: 'Lima',
            image: '../Recursos/Casas/Comercial3.webp'
        },

        // --- CATEGORÍA OBRAS PÚBLICAS ---
        {
            category: 'publicas',
            title: 'Obra Publica 2020',
            location: 'Aguas Calientes',
            image: '../Recursos/Casas/Obraspublicas1.webp'
        },
        {
            category: 'publicas',
            title: 'Obra Publica 2023',
            location: 'Sinaloa',
            image: '../Recursos/Casas/Obraspublicas2.webp'
        },
        {
            category: 'publicas',
            title: 'Obra Publica 2026',
            location: 'Lima',
            image: '../Recursos/Casas/Obraspublicas3.webp'
        },

        // --- CATEGORÍA INTERIORES ---
        {
            category: 'interiores',
            title: 'Cocina Integral',
            location: 'Lima, Perú',
            image: '../Recursos/Interiores/Interior1.webp'
        },
        {
            category: 'interiores',
            title: 'Sala Minimalista',
            location: 'Monterrey, México',
            image: '../Recursos/Interiores/Interior2.webp'
        },
        {
            category: 'interiores',
            title: 'Sala Integral',
            location: 'Lima, Perú',
            image: '../Recursos/Interiores/Interior3.webp'
        }
    ];

    // Sincronización automática de IDs en las tarjetas nativas base
    proyectosData.forEach((p, idx) => {
        if (!p.id) p.id = `native-card-${p.category}-${idx}`;
    });

    const tarjetasCustom = JSON.parse(localStorage.getItem('adminTarjetasPersonalizadas')) || [];
    const todasLasTarjetasUnificadas = [...proyectosData, ...tarjetasCustom];

    const listaNegraNativas = JSON.parse(localStorage.getItem('adminTarjetasNativasEliminadas')) || [];
    const tarjetasFinalesEfectivas = todasLasTarjetasUnificadas.filter(t => !listaNegraNativas.includes(t.id));

    const categoriasDefecto = [
        { titulo: 'Residencial', slug: 'residencial' },
        { titulo: 'Comercial', slug: 'comercial' },
        { titulo: 'Obras Públicas', slug: 'publicas' },
        { titulo: 'Interiores', slug: 'interiores' }
    ];

    const categoriasPersonalizadas = JSON.parse(localStorage.getItem('adminCategoriasPersonalizadas')) || [];
    const todasLasCategorias = [...categoriasDefecto, ...categoriasPersonalizadas];

    const contenedorPrincipal = document.getElementById('mis-proyectos');
    if (!contenedorPrincipal) return;

    todasLasCategorias.forEach(cat => {
        const proyectosFiltrados = tarjetasFinalesEfectivas.filter(p => p.category === cat.slug);
        const esPersonalizada = categoriasPersonalizadas.some(c => c.slug === cat.slug);
        if (proyectosFiltrados.length === 0 && !esPersonalizada) return;

        const section = document.createElement('section');
        section.classList.add('carrousel_container', 'scroll_fade');
        section.setAttribute('data-category', cat.slug);

        section.innerHTML = `
            <h2 class="carrousel_title">${cat.titulo}</h2>
            <div class="scene">
                <div class="carousel_track"></div>
            </div>
            <div class="dots_container"></div>
        `;
        contenedorPrincipal.appendChild(section);

        const track = section.querySelector('.carousel_track');
        const dotsContainer = section.querySelector('.dots_container');

        proyectosFiltrados.forEach((proyecto) => {
            let imagenAMostrar = proyecto.image;
            if (proyecto.id && !proyecto.id.startsWith('custom-card-')) {
                const imagenGuardada = localStorage.getItem('img-card-path-' + proyecto.id);
                if (imagenGuardada) imagenAMostrar = imagenGuardada;
            }

            const card = document.createElement('div');
            card.classList.add('card_3d');
            card.setAttribute('data-card-id', proyecto.id); 
            card.innerHTML = `
                <img src="${imagenAMostrar}" alt="${proyecto.title}">
                <div class="card_label">
                    <h3 class="card_label-title">${proyecto.title}</h3>
                    <p class="card_label-location">${proyecto.location}</p>
                </div>
            `;
            track.appendChild(card);
        });

        let elementosVisibles = obtenerElementosVisibles();
        let totalPasos = Math.max(1, Math.ceil(proyectosFiltrados.length / elementosVisibles));
        let pasoActual = 0;

        function construirControles() {
            dotsContainer.innerHTML = '';

            const arrowLeft = document.createElement('button');
            arrowLeft.classList.add('arrow_element', 'arrow_left');
            arrowLeft.innerHTML = '&#8592;';
            arrowLeft.type = 'button';
            arrowLeft.addEventListener('click', () => {
                if (pasoActual > 0) {
                    pasoActual--;
                    actualizarCarrusel(track, dotsContainer, pasoActual);
                }
            });
            dotsContainer.appendChild(arrowLeft);

            for (let i = 0; i < totalPasos; i++) {
                const dot = document.createElement('button');
                dot.classList.add('dot_element');
                if (i === pasoActual) dot.classList.add('is-active');
                dot.type = 'button';
                dot.addEventListener('click', () => {
                    pasoActual = i;
                    actualizarCarrusel(track, dotsContainer, pasoActual);
                });
                dotsContainer.appendChild(dot);
            }

            const arrowRight = document.createElement('button');
            arrowRight.classList.add('arrow_element', 'arrow_right');
            arrowRight.innerHTML = '&#8594;';
            arrowRight.type = 'button';
            arrowRight.addEventListener('click', () => {
                if (pasoActual < totalPasos - 1) {
                    pasoActual++;
                    actualizarCarrusel(track, dotsContainer, pasoActual);
                }
            });
            dotsContainer.appendChild(arrowRight);

            verificarLimitesFlechas(dotsContainer, pasoActual, totalPasos);
        }

        construirControles();

        window.addEventListener('resize', () => {
            elementosVisibles = obtenerElementosVisibles();
            const nuevoTotalPasos = Math.max(1, Math.ceil(proyectosFiltrados.length / elementosVisibles));

            if (nuevoTotalPasos !== totalPasos) {
                totalPasos = nuevoTotalPasos;
                if (pasoActual >= totalPasos) pasoActual = totalPasos - 1;
                if (pasoActual < 0) pasoActual = 0;
                construirControles();
                actualizarCarrusel(track, dotsContainer, pasoActual);
            }
        });
    });

    function obtenerElementosVisibles() {
        if (window.innerWidth <= 568) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function actualizarCarrusel(track, dotsContainer, indicePaso) {
        const elementoCard = track.querySelector('.card_3d');
        if (!elementoCard) return;

        const anchoCard = elementoCard.getBoundingClientRect().width;
        const gapEstilo = parseFloat(window.getComputedStyle(track).gap) || 0;
        const elementosVisibles = obtenerElementosVisibles();

        const desplazamiento = indicePaso * elementosVisibles * (anchoCard + gapEstilo);
        track.style.transform = `translateX(-${desplazamiento}px)`;

        const dots = dotsContainer.querySelectorAll('.dot_element');
        dots.forEach((dot, idx) => {
            if (indicePaso === idx) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });

        verificarLimitesFlechas(dotsContainer, indicePaso, dots.length);
    }

    function verificarLimitesFlechas(dotsContainer, pasoActual, totalPasos) {
        const btnIzquierdo = dotsContainer.querySelector('.arrow_left');
        const btnDerecho = dotsContainer.querySelector('.arrow_right');

        if (btnIzquierdo) {
            if (pasoActual === 0) {
                btnIzquierdo.style.opacity = '0.3';
                btnIzquierdo.style.cursor = 'not-allowed';
            } else {
                btnIzquierdo.style.opacity = '1';
                btnIzquierdo.style.cursor = 'pointer';
            }
        }

        if (btnDerecho) {
            if (pasoActual >= totalPasos - 1) {
                btnDerecho.style.opacity = '0.3';
                btnDerecho.style.cursor = 'not-allowed';
            } else {
                btnDerecho.style.opacity = '1';
                btnDerecho.style.cursor = 'pointer';
            }
        }
    }
});