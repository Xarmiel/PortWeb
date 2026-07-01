let map;
const ubicacionEstudio = { lat: 25.448826354447046, lng: -100.9588299531782 };

function createCenterControl(map) {
    const controlButton = document.createElement("button");
    controlButton.classList.add("map-center-button");
    controlButton.textContent = "Centrar Mapa";
    controlButton.type = "button";
    controlButton.addEventListener("click", () => {
        map.setCenter(ubicacionEstudio);
        map.setZoom(17);
    });
    return controlButton;
}

function initMap() {
    const estilosDelMapa = [
        // Fondo general
        { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#E9E9E9" }] },
        // Edificios residenciales (Relleno sólido)
        { featureType: "landscape.man_made", elementType: "geometry.fill", stylers: [{ color: "#B4BDC7" }, { visibility: "on" }] },
        { featureType: "landscape.man_made", elementType: "geometry.stroke", stylers: [{ color: "#CDD7E3" }, { weight: 1 }] },
        // Negocios / POIs
        { featureType: "poi", elementType: "geometry.fill", stylers: [{ color: "#F0E1CF" }, { visibility: "on" }] },
        { featureType: "poi", elementType: "geometry.stroke", stylers: [{ color: "#95E3AC" }, { weight: 1 }] },
        // Calles
        { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#FFFFFF" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#9EA9B4" }, { weight: 1 }] }
    ];

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: ubicacionEstudio,
        styles: estilosDelMapa,
        // Eliminamos mapTypeId para que los estilos no tengan conflictos
        disableDefaultUI: false 
    });

    new google.maps.Marker({
        position: ubicacionEstudio,
        map: map,
        title: "Juve 3D Studio",
        animation: google.maps.Animation.DROP
    });

    const centerControlDiv = document.createElement("div");
    centerControlDiv.appendChild(createCenterControl(map));
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

window.initMap = initMap;