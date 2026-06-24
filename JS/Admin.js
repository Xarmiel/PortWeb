document.addEventListener('DOMContentLoaded', () => {
    // Credenciales de acceso fijas
    const ADMIN_USER = "ArquiAdmin";
    const ADMIN_PASS = "Juve3d*";

    // Elementos del DOM
    const avatarBtn = document.getElementById('avatar-admin-btn');
    const modal = document.getElementById('admin-modal');
    const closeBtn = document.getElementById('close-admin-modal');
    const loginForm = document.getElementById('admin-login-form');
    const errorMsg = document.getElementById('login-error');
    const adminBar = document.getElementById('admin-bar');
    const logoutBtn = document.getElementById('btn-logout');

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
            if (localStorage.getItem('adminModeActive') === 'true') {
                alert("El Modo Administrador ya se encuentra activo.");
                return;
            }

            // Si está cerrado, abrimos el modal de login limpiando errores previos
            if (modal) {
                modal.style.display = 'flex';
                if (errorMsg) errorMsg.textContent = '';
                if (loginForm) loginForm.reset();
            }
        }
    });

    // 2. Procesar Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('admin-user').value.trim();
            const pass = document.getElementById('admin-pass').value.trim();

            if (user === ADMIN_USER && pass === ADMIN_PASS) {
                modal.style.display = 'none';

                // --- NUEVA LÍNEA: Guardamos que el modo admin está activo ---
                localStorage.setItem('adminModeActive', 'true');

                activarModoAdministrador();
            } else {
                errorMsg.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }

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
                        window.location.reload();
                    }
                }
            });
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
});