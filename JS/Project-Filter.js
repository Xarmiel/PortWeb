document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("filter-dropdown");
    const trigger = document.getElementById("filter-trigger");
    const triggerText = trigger ? trigger.querySelector(".filter_trigger-text") : null;
<<<<<<< HEAD
    const chips = document.querySelectorAll(".filter_chip");
    const sections = document.querySelectorAll("[data-category]");

    if (!dropdown || !trigger || !chips.length || !sections.length) return;

    const FADE_MS = 180;
    let activeFilter = "todos";

    function applyFilter(category) {
        // Obtenemos el contenedor padre común de todas las secciones
=======
    const chipsContainer = document.querySelector(".filter_options");

    if (!dropdown || !trigger || !chipsContainer) return;

    const FADE_MS = 180;

    const categoriasPersonalizadas = JSON.parse(localStorage.getItem('adminCategoriasPersonalizadas')) || [];
    
    categoriasPersonalizadas.forEach(cat => {
        if (!chipsContainer.querySelector(`[data-filter="${cat.slug}"]`)) {
            const nuevoChip = document.createElement('button');
            nuevoChip.type = 'button';
            nuevoChip.classList.add('filter_chip');
            nuevoChip.setAttribute('data-filter', cat.slug);
            nuevoChip.textContent = cat.titulo;
            chipsContainer.appendChild(nuevoChip);
        }
    });

    const chips = document.querySelectorAll(".filter_chip");

    function applyFilter(category) {
        const sections = document.querySelectorAll("[data-category]");
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
        const contenedorPadre = document.getElementById("mis-proyectos");

        sections.forEach((section) => {
            const matches = category === "todos" || section.dataset.category === category;

            if (matches) {
                if (section.classList.contains("filter_hidden")) {
                    section.classList.remove("filter_hidden");
                    section.style.opacity = "0";
                    requestAnimationFrame(() => {
                        section.style.opacity = "1";
                    });
                }
<<<<<<< HEAD
                
                // --- NUEVA LÓGICA DE REORDENAMIENTO ---
                // Si seleccionamos una categoría específica (que no sea "todos"), 
                // movemos de inmediato esa sección al principio del contenedor.
=======

>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
                if (category !== "todos" && contenedorPadre) {
                    contenedorPadre.prepend(section);
                }
            } else {
                section.style.opacity = "0";
                window.setTimeout(() => {
                    section.classList.add("filter_hidden");
                }, FADE_MS);
            }
        });

<<<<<<< HEAD
        // --- OPCIONAL: Restaurar orden original al seleccionar "Todos" ---
        // Si el usuario vuelve a presionar "Todos", es ideal restablecer el orden 
        // natural de la maquetación basándonos en un array fijo de categorías.
        if (category === "todos" && contenedorPadre) {
            const ordenOriginal = ["residencial", "comercial", "publicas", "interiores"];
=======
        if (category === "todos" && contenedorPadre) {
            const ordenOriginal = ["residencial", "comercial", "publicas", "interiores"];
            categoriasPersonalizadas.forEach(c => ordenOriginal.push(c.slug));

>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
            ordenOriginal.forEach(cat => {
                const seccionCorrespondiente = contenedorPadre.querySelector(`[data-category="${cat}"]`);
                if (seccionCorrespondiente) {
                    contenedorPadre.appendChild(seccionCorrespondiente);
                }
            });
        }
    }

    function closeDropdown() {
        dropdown.classList.remove("is-open");
    }
<<<<<<< HEAD
=======

>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
    trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.classList.toggle("is-open");
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((c) => c.classList.remove("is-active"));
            chip.classList.add("is-active");

<<<<<<< HEAD
            activeFilter = chip.dataset.filter;
            if (triggerText) triggerText.textContent = chip.textContent;
            applyFilter(activeFilter);

=======
            const activeFilter = chip.dataset.filter;
            if (triggerText) triggerText.textContent = chip.textContent;
            
            applyFilter(activeFilter);
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
            closeDropdown();
        });
    });
});