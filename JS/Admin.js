document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    // Credenciales de acceso fijas
    const ADMIN_USER = "ArquiAdmin";
    const ADMIN_PASS = "Juve3d*";

    // Elementos del DOM
=======
    const admin_user = "ArquiAdmin";
    const admin_pass = "Juve3d*";

    // --- ELEMENTOS DEL DOM PARA CONTROL DEL MODAL ---
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
    const avatarBtn = document.getElementById('avatar-admin-btn');
    const modal = document.getElementById('admin-modal');
    const closeBtn = document.getElementById('close-admin-modal');
    const loginForm = document.getElementById('admin-login-form');
    const errorMsg = document.getElementById('login-error');
    const adminBar = document.getElementById('admin-bar');
    const logoutBtn = document.getElementById('btn-logout');

<<<<<<< HEAD
    cargarCambiosGuardados();

    const modoAdminActivo = localStorage.getItem('adminModeActive');
    if (modoAdminActivo === 'true') {
        activarModoAdministrador();
    }

    // 1. Abrir y Cerrar Modal
    if (avatarBtn) {
        avatarBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            errorMsg.textContent = '';
            loginForm.reset();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    document.addEventListener('keydown', (e) => {
        // Verificamos si se presionó la combinación Ctrl + Shift + A (insensible a mayúsculas)
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault(); // Evita comportamientos por defecto del navegador

            // Si el modo admin ya está activo, no hace falta loguearse de nuevo
=======
    // --- ATAJO DE TECLADO: Ctrl + Shift + A ---
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault(); 

>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
            if (localStorage.getItem('adminModeActive') === 'true') {
                alert("El Modo Administrador ya se encuentra activo.");
                return;
            }

<<<<<<< HEAD
            // Si está cerrado, abrimos el modal de login limpiando errores previos
=======
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
            if (modal) {
                modal.style.display = 'flex';
                if (errorMsg) errorMsg.textContent = '';
                if (loginForm) loginForm.reset();
            }
        }
    });

<<<<<<< HEAD
    // 2. Procesar Login
=======
    // --- EVENTOS BASE DE APERTURA Y CIERRE DEL MODAL ---
    if (avatarBtn) {
        avatarBtn.addEventListener('click', () => {
            if (localStorage.getItem('adminModeActive') === 'true') {
                alert("El Modo Administrador ya se encuentra activo.");
                return;
            }
            if (modal) modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // --- PROCESAMIENTO DEL LOGIN ---
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('admin-user').value.trim();
            const pass = document.getElementById('admin-pass').value.trim();

<<<<<<< HEAD
            if (user === ADMIN_USER && pass === ADMIN_PASS) {
                modal.style.display = 'none';

                // --- NUEVA LÍNEA: Guardamos que el modo admin está activo ---
                localStorage.setItem('adminModeActive', 'true');

                activarModoAdministrador();
            } else {
                errorMsg.textContent = "Usuario o contraseña incorrectos.";
=======
            if (user === 'ArquiAdmin' && pass === 'Juve3d*') {
                localStorage.setItem('adminModeActive', 'true');
                if (modal) modal.style.display = 'none';
                activarModoAdministrador();
                alert("¡Sesión iniciada correctamente como Administrador!");
                window.location.reload(); 
            } else {
                if (errorMsg) errorMsg.textContent = "Usuario o contraseña incorrectos.";
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
            }
        });
    }

<<<<<<< HEAD
    // 3. Activar la edición en vivo
    function activarModoAdministrador() {
        if (adminBar) adminBar.style.display = 'block';
        document.body.style.paddingTop = '45px'; // Evita que la barra tape el header

        // --- BLOQUE DE ENLACES ACTUALIZADO CON EXCEPCIÓN ---
        const enlaces = document.querySelectorAll('a');
        enlaces.forEach(enlace => {
            // EXCEPCIONES: No bloqueamos los links del panel superior ni los de la sidebar
            if (enlace.closest('#admin-bar') || enlace.closest('.sidebar')) return;

            enlace.addEventListener('click', bloquearEnlacesModoAdmin);
        });

        // Identificamos textos editables agregándoles identificadores únicos sobre la marcha
        const elementosEditables = document.querySelectorAll('p, h1, h2, h3, td, th, .card_label-title, .card_label-location');
        
        elementosEditables.forEach((elemento, indice) => {
            if (elemento.closest('.sidebar') || elemento.closest('#admin-bar')) return;

            elemento.classList.add('admin-editable');

            // Creamos un ID único basado en la página actual y su orden para saber dónde guardarlo
            const idUnico = window.location.pathname + '-texto-' + indice;
            elemento.setAttribute('data-admin-id', idUnico);

            elemento.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                elemento.contentEditable = "true";
                elemento.focus();
            });

            // Al hacer clic fuera, capturamos el nuevo texto y lo mandamos a localStorage
            elemento.addEventListener('blur', () => {
                elemento.contentEditable = "false";
                localStorage.setItem(idUnico, elemento.innerHTML.trim());
            });
        });

        // Modificación de imágenes
        const imagenes = document.querySelectorAll('main img, .card_image img, .card_3d img');
        imagenes.forEach((img, indice) => {
            if (img.closest('.sidebar')) return;

            img.classList.add('admin-editable');
            const idUnicoImg = window.location.pathname + '-img-' + indice;
            img.setAttribute('data-admin-img-id', idUnicoImg);

            img.addEventListener('dblclick', (e) => {
                e.stopPropagation(); // Evita que se activen enlaces o animaciones del contenedor
                e.preventDefault();

                // Creamos un menú interactivo con prompts
                const opcion = prompt(
                    "Opciones de imagen:\n" +
                    "1. Subir/Cargar una imagen desde tu PC\n" +
                    "2. Cambiar por ruta de texto (URL)\n" +
                    "3. Eliminar/Restaurar imagen por defecto\n\n" +
                    "Escribe el número de la opción (1, 2 o 3):"
                );

                if (opcion === "1") {
                    // --- OPCIÓN 1: SUBIR ARCHIVO LOCAL ---
                    // Creamos un input de tipo archivo invisible "al vuelo"
                    const inputArchivo = document.createElement('input');
                    inputArchivo.type = 'file';
                    inputArchivo.accept = 'image/*'; // Solo imágenes

                    inputArchivo.onchange = () => {
                        const archivo = inputArchivo.files[0];
                        if (archivo) {
                            const lector = new FileReader();
                            lector.onload = function (eventoLector) {
                                const resultadoBase64 = eventoLector.target.result;
                                
                                // Aplicamos la imagen local convertida a texto en pantalla
                                img.setAttribute('src', resultadoBase64);
                                // La guardamos de forma permanente en localStorage
                                localStorage.setItem(idUnicoImg, resultadoBase64);
                            };
                            lector.readAsDataURL(archivo); // Convierte el archivo real a texto base64
                        }
                    };
                    inputArchivo.click(); // Abre la ventana nativa de Windows/Mac para elegir el archivo

                } else if (opcion === "2") {
                    // --- OPCIÓN 2: CAMBIAR POR RUTA DE TEXTO ---
                    const nuevaRuta = prompt("Ingresa la ruta de la nueva imagen (ejemplo: ../Recursos/Casas/nueva.png):", img.getAttribute('src'));
                    if (nuevaRuta !== null && nuevaRuta.trim() !== "") {
                        const rutaLimpia = nuevaRuta.trim();
                        img.setAttribute('src', rutaLimpia);
                        localStorage.setItem(idUnicoImg, rutaLimpia);
                    }

                } else if (opcion === "3") {
                    // --- OPCIÓN 3: ELIMINAR CAMBIO / RESTAURAR POR DEFECTO ---
                    const confirmar = confirm("¿Quieres eliminar la imagen personalizada y restaurar la original del código HTML?");
                    if (confirmar) {
                        // Borramos el registro específico de esta imagen de la memoria
                        localStorage.removeItem(idUnicoImg);
                        alert("Imagen restaurada. Se mostrará el cambio al recargar o navegar.");
=======
    // --- PROCESAMIENTO DEL LOGOUT ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminModeActive');
            alert("Modo Administrador desactivado.");
            window.location.reload();
        });
    }

    // --- FUNCIÓN CENTRAL: EDICIÓN Y GESTIÓN EN VIVO ---
    function activarModoAdministrador() {
        if (adminBar) adminBar.style.display = 'block';
        document.body.style.paddingTop = '45px'; 

        // --- BOTÓN 1: Agregar Categoría ---
        if (adminBar && !document.getElementById('btn-add-category')) {
            const btnAddCategory = document.createElement('button');
            btnAddCategory.id = 'btn-add-category';
            btnAddCategory.textContent = '+ Agregar Categoría';
            btnAddCategory.style.marginLeft = '20px';
            btnAddCategory.style.background = '#0284c7';
            btnAddCategory.style.color = 'white';
            btnAddCategory.style.border = 'none';
            btnAddCategory.style.padding = '3px 10px';
            btnAddCategory.style.borderRadius = '4px';
            btnAddCategory.style.cursor = 'pointer';

            btnAddCategory.addEventListener('click', () => {
                const nombreNuevaCat = prompt("Ingresa el nombre de la nueva categoría (Ej: Hoteles, Sustentable):");
                if (nombreNuevaCat && nombreNuevaCat.trim() !== "") {
                    const nombreLimpio = nombreNuevaCat.trim();
                    const slugCat = nombreLimpio.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

                    let categories = JSON.parse(localStorage.getItem('adminCategoriasPersonalizadas')) || [];
                    if (categories.some(c => c.slug === slugCat)) {
                        alert("Esta categoría ya existe.");
                        return;
                    }

                    categories.push({ titulo: nombreLimpio, slug: slugCat });
                    localStorage.setItem('adminCategoriasPersonalizadas', JSON.stringify(categories));
                    alert(`Categoría "${nombreLimpio}" añadida con éxito.`);
                    window.location.reload();
                }
            });
            adminBar.insertBefore(btnAddCategory, logoutBtn);
        }

        // --- BOTÓN 2: Eliminar Categoría ---
        if (adminBar && !document.getElementById('btn-delete-category')) {
            const btnDeleteCategory = document.createElement('button');
            btnDeleteCategory.id = 'btn-delete-category';
            btnDeleteCategory.textContent = '× Eliminar Categoría';
            btnDeleteCategory.style.marginLeft = '10px';
            btnDeleteCategory.style.background = '#e11d48';
            btnDeleteCategory.style.color = 'white';
            btnDeleteCategory.style.border = 'none';
            btnDeleteCategory.style.padding = '3px 10px';
            btnDeleteCategory.style.borderRadius = '4px';
            btnDeleteCategory.style.cursor = 'pointer';

            btnDeleteCategory.addEventListener('click', () => {
                const slugEliminar = prompt("Escribe el nombre exacto de la categoría personalizada que deseas borrar:");
                if (slugEliminar) {
                    const slugLimpio = slugEliminar.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
                    
                    const nativas = ['residencial', 'comercial', 'publicas', 'interiores'];
                    if (nativas.includes(slugLimpio)) {
                        alert("Por seguridad, no puedes eliminar las categorías nativas del código base.");
                        return;
                    }

                    let categories = JSON.parse(localStorage.getItem('adminCategoriasPersonalizadas')) || [];
                    const inicialLength = categories.length;
                    categories = categories.filter(c => c.slug !== slugLimpio);

                    if (categories.length === inicialLength) {
                        alert("No se encontró ninguna categoría personalizada con ese identificador.");
                    } else {
                        localStorage.setItem('adminCategoriasPersonalizadas', JSON.stringify(categories));
                        
                        let cards = JSON.parse(localStorage.getItem('adminTarjetasPersonalizadas')) || [];
                        cards = cards.filter(t => t.category !== slugLimpio);
                        localStorage.setItem('adminTarjetasPersonalizadas', JSON.stringify(cards));

                        alert("Categoría y sus proyectos eliminados del registro.");
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
                        window.location.reload();
                    }
                }
            });
<<<<<<< HEAD
        });
    }
    // FUNCIÓN AUXILIAR: Detiene la navegación por completo
    function bloquearEnlacesModoAdmin(e) {
        e.preventDefault();
    }

    // 4. Buscar e inyectar los cambios guardados automáticamente al abrir la página
    function cargarCambiosGuardados() {
        // Restaurar textos
        const textosPaguina = document.querySelectorAll('p, h1, h2, h3, td, th, .card_label-title, .card_label-location');
        textosPaguina.forEach((elemento, indice) => {
            const idUnico = window.location.pathname + '-texto-' + indice;
            const textoGuardado = localStorage.getItem(idUnico);
            if (textoGuardado) {
                elemento.innerHTML = textoGuardado;
            }
        });

        // Restaurar imágenes
        const imagenesPaguina = document.querySelectorAll('main img, .card_image img, .card_3d img');
        imagenesPaguina.forEach((img, indice) => {
            const idUnicoImg = window.location.pathname + '-img-' + indice;
            const rutaGuardada = localStorage.getItem(idUnicoImg);
            if (rutaGuardada) {
                img.setAttribute('src', rutaGuardada);
            }
        });
    }

    // 5. Salir del modo administrador
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (adminBar) adminBar.style.display = 'none';
            document.body.style.paddingTop = '0px';

            const editables = document.querySelectorAll('.admin-editable');
            editables.forEach(el => {
                el.contentEditable = "false";
                el.classList.remove('admin-editable');
            });

            // --- ESTA ES LA LÍNEA QUE FALTA: Borramos el estado para que no se reactive ---
            localStorage.removeItem('adminModeActive');

            alert("Modo administrador cerrado.");
            window.location.reload();
        });
    }
=======
            adminBar.insertBefore(btnDeleteCategory, logoutBtn);
        }

        // --- GESTIÓN 3: Añadir Tarjetas (Cards) por Doble Clic en Títulos ---
        const titulosSecciones = document.querySelectorAll('.carrousel_title');
        titulosSecciones.forEach(titulo => {
            const contenedorSection = titulo.closest('.carrousel_container');
            if (!contenedorSection) return;
            const slugCategoria = contenedorSection.getAttribute('data-category');

            titulo.style.cursor = 'pointer';
            titulo.title = "Doble clic para añadir un proyecto a esta sección";

            titulo.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                const confirmar = confirm(`¿Deseas añadir un nuevo proyecto a la sección "${titulo.textContent}"?`);
                if (confirmar) {
                    const tituloProyecto = prompt("Nombre del nuevo proyecto:");
                    if (!tituloProyecto || tituloProyecto.trim() === "") return;
                    
                    const ubicacionProyecto = prompt("Ubicación (Ciudad, País):");
                    if (!ubicacionProyecto || ubicacionProyecto.trim() === "") return;

                    const rutaImagen = prompt("Ruta de la imagen (o deja vacío para subirla haciendo doble clic en la foto luego):");
                    const imagenFinal = (rutaImagen && rutaImagen.trim() !== "") ? rutaImagen.trim() : '../Recursos/Casas/Viviendafamiliares.png';

                    let tarjetasCreadas = JSON.parse(localStorage.getItem('adminTarjetasPersonalizadas')) || [];
                    
                    const nuevaTarjeta = {
                        id: 'custom-card-' + Date.now(), 
                        category: slugCategoria,
                        title: tituloProyecto.trim(),
                        location: ubicacionProyecto.trim(),
                        image: imagenFinal
                    };

                    tarjetasCreadas.push(nuevaTarjeta);
                    localStorage.setItem('adminTarjetasPersonalizadas', JSON.stringify(tarjetasCreadas));
                    alert("Proyecto añadido con éxito.");
                    window.location.reload();
                }
            });
        });

        // --- GESTIÓN 4: Inyectar Botón Físico "X" para Eliminar Tarjetas (Cards) ---
        const tarjetasVisibles = document.querySelectorAll('.card_3d, .card');
        tarjetasVisibles.forEach(tarjeta => {
            // Verificar que no tenga un botón "X" previo
            if (tarjeta.querySelector('.admin-delete-btn')) return;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'admin-delete-btn';
            deleteBtn.textContent = '×';
            
            // Estilos incrustados para la X flotante sobre la tarjeta
            deleteBtn.style.position = 'absolute';
            deleteBtn.style.top = '10px';
            deleteBtn.style.right = '10px';
            deleteBtn.style.background = 'rgba(225, 29, 72, 0.9)';
            deleteBtn.style.color = 'white';
            deleteBtn.style.border = 'none';
            deleteBtn.style.width = '28px';
            deleteBtn.style.height = '28px';
            deleteBtn.style.borderRadius = '50%';
            deleteBtn.style.fontSize = '18px';
            deleteBtn.style.fontWeight = 'bold';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.zIndex = '100';
            deleteBtn.style.display = 'flex';
            deleteBtn.style.alignItems = 'center';
            deleteBtn.style.justifyContent = 'center';
            deleteBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            deleteBtn.title = "Eliminar esta tarjeta";

            // Evento de eliminación al presionar la X
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                const tituloCard = tarjeta.querySelector('.card_label-title, .card_title')?.textContent || "este proyecto";
                const confirmarBorrado = confirm(`¿Estás seguro de que deseas eliminar permanentemente el proyecto "${tituloCard}"?`);
                
                if (confirmarBorrado) {
                    const cardIdAttr = tarjeta.getAttribute('data-card-id');

                    if (cardIdAttr && cardIdAttr.startsWith('custom-card-')) {
                        let tarjetasCreadas = JSON.parse(localStorage.getItem('adminTarjetasPersonalizadas')) || [];
                        tarjetasCreadas = tarjetasCreadas.filter(t => t.id !== cardIdAttr);
                        localStorage.setItem('adminTarjetasPersonalizadas', JSON.stringify(tarjetasCreadas));
                    } else {
                        let tarjetasEliminadasNativas = JSON.parse(localStorage.getItem('adminTarjetasNativasEliminadas')) || [];
                        if (cardIdAttr && !tarjetasEliminadasNativas.includes(cardIdAttr)) {
                            tarjetasEliminadasNativas.push(cardIdAttr);
                            localStorage.setItem('adminTarjetasNativasEliminadas', JSON.stringify(tarjetasEliminadasNativas));
                        }
                    }
                    alert("Proyecto eliminado con éxito.");
                    window.location.reload();
                }
            });

            // Forzar posición relativa en la tarjeta para anclar la X perfectamente
            tarjeta.style.position = 'relative';
            tarjeta.appendChild(deleteBtn);
        });

        // --- INTERACCIÓN 5: Doble clic en imágenes para cambiar la ruta o subir archivo ---
        const imagenesTarjetas = document.querySelectorAll('.card_3d img, .card_image img, .intro_image img');
        imagenesTarjetas.forEach((img) => {
            img.style.cursor = 'pointer';
            
            img.addEventListener('dblclick', (e) => {
                e.stopPropagation(); 
                e.preventDefault();

                const tarjetaPadre = img.closest('.card_3d, .card');
                const cardIdAttr = tarjetaPadre ? tarjetaPadre.getAttribute('data-card-id') : 'static-img-' + img.src.substring(img.src.lastIndexOf('/')+1);

                const opcion = prompt(
                    "Selecciona una opción para modificar la imagen:\n" +
                    "1. Ingresar una ruta de texto (URL o ruta local)\n" +
                    "2. Subir un archivo desde la PC\n" +
                    "3. Restaurar imagen original"
                );

                if (opcion === "1") {
                    const nuevaRuta = prompt("Ingresa la URL o ruta local de la imagen:", img.getAttribute('src'));
                    if (nuevaRuta && nuevaRuta.trim() !== "") {
                        guardarCambioImagen(cardIdAttr, nuevaRuta.trim(), img);
                    }
                } 
                else if (opcion === "2") {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    
                    fileInput.addEventListener('change', (event) => {
                        const archivo = event.target.files[0];
                        if (archivo) {
                            const lector = new FileReader();
                            lector.onload = function(eResult) {
                                const base64Image = eResult.target.result;
                                guardarCambioImagen(cardIdAttr, base64Image, img);
                            };
                            lector.readAsDataURL(archivo);
                        }
                    });
                    fileInput.click();
                } 
                else if (opcion === "3") {
                    if (confirm("¿Estás seguro de que deseas restaurar la imagen original?")) {
                        restaurarImagenOriginal(cardIdAttr, img);
                    }
                }
            });
        });

        function guardarCambioImagen(cardId, nuevaRuta, elementoImg) {
            if (!cardId) return;
            if (cardId.startsWith('custom-card-')) {
                let tarjetasCreadas = JSON.parse(localStorage.getItem('adminTarjetasPersonalizadas')) || [];
                tarjetasCreadas = tarjetasCreadas.map(t => {
                    if (t.id === cardId) t.image = nuevaRuta;
                    return t;
                });
                localStorage.setItem('adminTarjetasPersonalizadas', JSON.stringify(tarjetasCreadas));
            } else {
                localStorage.setItem('img-card-path-' + cardId, nuevaRuta);
            }
            elementoImg.src = nuevaRuta;
            alert("Imagen guardada con éxito.");
        }

        function restaurarImagenOriginal(cardId, elementoImg) {
            if (!cardId) return;
            if (cardId.startsWith('custom-card-')) {
                let tarjetasCreadas = JSON.parse(localStorage.getItem('adminTarjetasPersonalizadas')) || [];
                tarjetasCreadas = tarjetasCreadas.map(t => {
                    if (t.id === cardId) t.image = '../Recursos/Casas/Viviendafamiliares.png';
                    return t;
                });
                localStorage.setItem('adminTarjetasPersonalizadas', JSON.stringify(tarjetasCreadas));
                elementoImg.src = '../Recursos/Casas/Viviendafamiliares.png';
            } else {
                localStorage.removeItem('img-card-path-' + cardId);
                alert("Imagen restaurada. Recargando...");
                window.location.reload();
                return;
            }
            alert("Imagen restaurada con éxito.");
        }

        // --- GESTIÓN 6: Bloquear interacciones y enlaces externos de forma estricta ---
        const todosLosEnlaces = document.querySelectorAll('a, .card_image a, .card_content a');
        todosLosEnlaces.forEach(enlace => {
            if (enlace.closest('#admin-bar') || enlace.closest('.sidebar')) return;
            
            // Bloquea redirecciones accidentales como presionar una card de index hacia projects
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // --- GESTIÓN 7: Volver a hacer TODO el texto de la web editable de forma global ---
        const selectoresGlobalesTexto = 'h1, h2, h3, p, td, th, span:not(.filter_trigger-text):not(.sidebar_text)';
        const elementosEditables = document.querySelectorAll(selectoresGlobalesTexto);
        
        elementosEditables.forEach((elemento, indice) => {
            if (elemento.closest('.sidebar') || elemento.closest('#admin-bar') || elemento.querySelector('svg') || elemento.className.includes('admin-delete-btn')) return;
            
            elemento.classList.add('admin-editable');
            const idUnico = window.location.pathname + '-global-txt-' + indice;
            elemento.setAttribute('data-admin-id', idUnico);

            const textoGuardado = localStorage.getItem(idUnico);
            if (textoGuardado) {
                elemento.textContent = textoGuardado;
            }

            elemento.addEventListener('click', (e) => {
                if (localStorage.getItem('adminModeActive') === 'true') {
                    e.stopPropagation();
                    e.preventDefault();
                    elemento.contentEditable = "true";
                    elemento.focus();
                }
            });

            elemento.addEventListener('blur', () => {
                elemento.contentEditable = "false";
                const textoLimpio = elemento.textContent.trim();
                
                if (textoLimpio !== "") {
                    localStorage.setItem(idUnico, textoLimpio);
                } else {
                    elemento.textContent = "Texto Modificable";
                    localStorage.setItem(idUnico, elemento.textContent);
                }
            });
            
            elemento.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    elemento.blur();
                }
            });
        });
    }

    if (localStorage.getItem('adminModeActive') === 'true') {
        activarModoAdministrador();
    }
>>>>>>> 99de1acae9536b3ccc8a0241bf414d068982732b
});