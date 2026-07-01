document.addEventListener('DOMContentLoaded', () => {
    // 1. Colección centralizada de datos (Añade o quita proyectos aquí libremente)
    const proyectosData = [
        // --- CATEGORÍA RESIDENCIAL ---
        {
            category: 'residencial',
            title: 'Casa Arrescurrenaga',
            location: 'Tamaulipas',
            image: '../Recursos/Casas/Arrescurrenaga1.png'
        },
        {
            category: 'residencial',
            title: 'Casa Montaño',
            location: 'Monterrey',
            image: '../Recursos/Casas/Montaño.png'
        },
        {
            category: 'residencial',
            title: 'Casa Salaverry',
            location: 'Lima',
            image: '../Recursos/Casas/Salaverry.png'
        },
        {
            category: 'residencial',
            title: 'Residencia Alfa',
            location: 'Ica',
            image: '../Recursos/Casas/Viviendafamiliares.png'
        },

        // --- CATEGORÍA INDUSTRIAL / COMERCIAL ---
        {
            category: 'comercial',
            title: 'Edificio Centro',
            location: 'Ciudad De México',
            image: '../Recursos/Casas/Comercial1.png'
        },
        {
            category: 'comercial',
            title: 'Edificio Sur',
            location: 'Monterrey',
            image: '../Recursos/Casas/Comercial2.png'
        },
        {
            category: 'comercial',
            title: 'Edificio Capital',
            location: 'Lima',
            image: '../Recursos/Casas/Comercial3.png'
        },

        // --- CATEGORÍA OBRAS PÚBLICAS ---
        {
            category: 'publicas',
            title: 'Obra Publica 2020',
            location: 'Aguas Calientes',
            image: '../Recursos/Casas/Obraspublicas1.png'
        },
        {
            category: 'publicas',
            title: 'Obra Publica 2023',
            location: 'Sinaloa',
            image: '../Recursos/Casas/Obraspublicas2.png'
        },
        {
            category: 'publicas',
            title: 'Obra Publica 2026',
            location: 'Lima',
            image: '../Recursos/Casas/Obraspublicas3.png'
        },

        // --- CATEGORÍA INTERIORES ---
        {
            category: 'interiores',
            title: 'Cocina Integral',
            location: 'Lima, Perú',
            image: '../Recursos/Interiores/Interior1.png'
        },
        {
            category: 'interiores',
            title: 'Sala Minimalista',
            location: 'Monterrey, México',
            image: '../Recursos/Interiores/Interior2.png'
        },
        {
            category: 'interiores',
            title: 'Sala Integral',
            location: 'Lima, Perú',
            image: '../Recursos/Interiores/Interior3.png'
        }
    ];

    // 2. Inicializar los carruseles de la página
    const contenedores = document.querySelectorAll('.carrousel_container');

    contenedores.forEach(contenedor => {
        const categoria = contenedor.getAttribute('data-category');
        const track = contenedor.querySelector('.carousel_track');
        const dotsContainer = contenedor.querySelector('.dots_container');

        // Filtrar los proyectos pertenecientes a esta sección
        const proyectosFiltrados = proyectosData.filter(p => p.category === categoria);

        if (proyectosFiltrados.length === 0) return;

        // Renderizar las tarjetas dentro del track
        proyectosFiltrados.forEach((proyecto) => {
            const card = document.createElement('div');
            card.classList.add('card_3d');
            card.innerHTML = `
                <img src="${proyecto.image}" alt="${proyecto.title}">
                <div class="card_label">
                    <h3 class="card_label-title">${proyecto.title}</h3>
                    <p class="card_label-location">${proyecto.location}</p>
                </div>
            `;
            track.appendChild(card);
        });

        // Configuración inicial de navegación
        let elementosVisibles = obtenerElementosVisibles();
        let totalPasos = Math.ceil(proyectosFiltrados.length / elementosVisibles);
        let pasoActual = 0;

        // Función interna para construir los controles (Flechas + Puntos)
        function construirControles() {
            dotsContainer.innerHTML = ''; // Limpiamos controles previos

            // 1. Flecha Izquierda (Anterior)
            const arrowLeft = document.createElement('button');
            arrowLeft.classList.add('arrow_element', 'arrow_left');
            arrowLeft.innerHTML = '&#8592;'; // Código HTML para flecha izquierda (←)
            arrowLeft.type = 'button';
            arrowLeft.addEventListener('click', () => {
                if (pasoActual > 0) {
                    pasoActual--;
                    actualizarCarrusel(track, dotsContainer, pasoActual);
                }
            });
            dotsContainer.appendChild(arrowLeft);

            // 2. Generar puntos de navegación (Dots) intermedios
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

            // 3. Flecha Derecha (Siguiente)
            const arrowRight = document.createElement('button');
            arrowRight.classList.add('arrow_element', 'arrow_right');
            arrowRight.innerHTML = '&#8594;'; // Código HTML para flecha derecha (→)
            arrowRight.type = 'button';
            arrowRight.addEventListener('click', () => {
                if (pasoActual < totalPasos - 1) {
                    pasoActual++;
                    actualizarCarrusel(track, dotsContainer, pasoActual);
                }
            });
            dotsContainer.appendChild(arrowRight);
            
            // Validamos deshabilitar flechas en los límites iniciales
            verificarLimitesFlechas(dotsContainer, pasoActual, totalPasos);
        }

        // Construir por primera vez
        construirControles();

        // Escuchar cambios de tamaño de pantalla para recalcular
        window.addEventListener('resize', () => {
            elementosVisibles = obtenerElementosVisibles();
            const nuevoTotalPasos = Math.ceil(proyectosFiltrados.length / elementosVisibles);

            if (nuevoTotalPasos !== totalPasos) {
                totalPasos = nuevoTotalPasos;
                if (pasoActual >= totalPasos) pasoActual = totalPasos - 1;
                if (pasoActual < 0) pasoActual = 0;
                
                construirControles();
                actualizarCarrusel(track, dotsContainer, pasoActual);
            }
        });
    });

    // Función para calcular cuántos elementos entran en la pantalla actual según el CSS
    function obtenerElementosVisibles() {
        if (window.innerWidth <= 568) return 1;
        if (window.innerWidth <= 968) return 2;
        return 3;
    }

    // Función para ejecutar el desplazamiento físico y alternar los estados activos
    function actualizarCarrusel(track, dotsContainer, indicePaso) {
        const elementoCard = track.querySelector('.card_3d');
        if (!elementoCard) return;

        const anchoCard = elementoCard.getBoundingClientRect().width;
        const gapEstilo = parseFloat(window.getComputedStyle(track).gap) || 0;
        const elementosVisibles = obtenerElementosVisibles();

        const desplazamiento = indicePaso * elementosVisibles * (anchoCard + gapEstilo);
        track.style.transform = `translateX(-${desplazamiento}px)`;

        // Cambiar estado visual del punto activo
        const dots = dotsContainer.querySelectorAll('.dot_element');
        dots.forEach((dot, idx) => {
            if (indicePaso === idx) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });

        // Actualizar el estado visual de deshabilitado en las flechas laterales
        const totalPasos = dots.length;
        verificarLimitesFlechas(dotsContainer, indicePaso, totalPasos);
    }

    // Función auxiliar para añadir o quitar clases visuales de bloqueo a las flechas
    function verificarLimitesFlechas(dotsContainer, pasoActual, totalPasos) {
        const btnIzquierdo = dotsContainer.querySelector('.arrow_left');
        const btnDerecho = dotsContainer.querySelector('.arrow_right');

        if (btnIzquierdo) {
            if (pasoActual === 0) {
                btnIzquierdo.classList.add('arrow_disabled');
                btnIzquierdo.style.opacity = '0.3';
                btnIzquierdo.style.cursor = 'not-allowed';
            } else {
                btnIzquierdo.classList.remove('arrow_disabled');
                btnIzquierdo.style.opacity = '1';
                btnIzquierdo.style.cursor = 'pointer';
            }
        }

        if (btnDerecho) {
            if (pasoActual >= totalPasos - 1) {
                btnDerecho.classList.add('arrow_disabled');
                btnDerecho.style.opacity = '0.3';
                btnDerecho.style.cursor = 'not-allowed';
            } else {
                btnDerecho.classList.remove('arrow_disabled');
                btnDerecho.style.opacity = '1';
                btnDerecho.style.cursor = 'pointer';
            }
        }
    }
});