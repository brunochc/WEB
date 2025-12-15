// Variables globales para el mapa y autocompletado
let map;
let directionsService;
let directionsRenderer;
let autocomplete;
let marker;
let selectedPlace = null;
const paineLocation = { lat: -33.8075, lng: -70.7256 }; // Coordenadas de Paine

// Lista de comunas de la Región Metropolitana
const comunasRM = [
    "Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", 
    "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", 
    "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", 
    "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", 
    "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", 
    "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", 
    "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", 
    "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", 
    "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", 
    "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", 
    "Tiltil", "Vitacura"
];

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el formulario
    initForm();
    
    // Inicializar el mapa (la función initMap será llamada por la API de Google Maps)
    loadGoogleMapsAPI();
});

function initForm() {
    // Llenar select de comunas
    const destinoSelect = document.getElementById('destination-commune');
    comunasRM.forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        destinoSelect.appendChild(option);
    });
    
    // Configurar autocompletado de direcciones
    const direccionInput = document.getElementById('destination-address');
    autocomplete = new google.maps.places.Autocomplete(direccionInput, {
        types: ['address'],
        componentRestrictions: { country: 'cl' },
        fields: ['geometry', 'formatted_address', 'address_components']
    });
    
    autocomplete.addListener('place_changed', onPlaceChanged);
    
    // Manejar envío del formulario
    document.getElementById('quote-form').addEventListener('submit', function(e) {
        e.preventDefault();
        calculateQuote();
    });
    
    // Botones de controles del mapa
    document.getElementById('select-on-map').addEventListener('click', activateMapSelection);
    document.getElementById('clear-selection').addEventListener('click', clearMapSelection);
}

function loadGoogleMapsAPI() {
    // Verificar si la API ya está cargada
    if (window.google && window.google.maps) {
        initMap();
        return;
    }
    
    // Crear script para cargar la API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places,directions&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function initMap() {
    // Crear mapa
    map = new google.maps.Map(document.getElementById("map"), {
        center: paineLocation,
        zoom: 12,
        styles: getMapDarkStyle(),
        disableDefaultUI: true,
        zoomControl: true
    });
    
    // Marcador de Paine
    new google.maps.Marker({
        position: paineLocation,
        map: map,
        title: "Base de Operaciones (Paine)",
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
    });
    
    // Inicializar servicios de direcciones
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: '#3498DB',
            strokeOpacity: 0.8,
            strokeWeight: 5
        }
    });
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    
    if (!place.geometry) {
        alert("No se encontró la dirección. Por favor, seleccione una opción de la lista.");
        return;
    }
    
    selectedPlace = place;
    updateMapWithSelectedPlace();
    
    // Actualizar comuna seleccionada si coincide
    const addressComponents = place.address_components;
    const communeComponent = addressComponents.find(comp => 
        comp.types.includes('sublocality') || comp.types.includes('locality'));
    
    if (communeComponent) {
        const communeSelect = document.getElementById('destination-commune');
        const communeName = communeComponent.long_name;
        
        // Buscar si la comuna está en nuestra lista
        const foundCommune = comunasRM.find(c => 
            c.toLowerCase() === communeName.toLowerCase());
        
        if (foundCommune) {
            communeSelect.value = foundCommune;
        }
    }
}

function updateMapWithSelectedPlace() {
    if (!selectedPlace || !selectedPlace.geometry) return;
    
    // Centrar mapa en la ubicación seleccionada
    map.setCenter(selectedPlace.geometry.location);
    map.setZoom(16);
    
    // Limpiar marcador anterior
    if (marker) {
        marker.setMap(null);
    }
    
    // Agregar nuevo marcador
    marker = new google.maps.Marker({
        position: selectedPlace.geometry.location,
        map: map,
        draggable: true,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
    });
    
    // Escuchar movimiento del marcador
    marker.addListener('dragend', function() {
        reverseGeocode(marker.getPosition());
    });
}

function activateMapSelection() {
    alert("Haz clic en el mapa para seleccionar el destino");
    map.setOptions({ draggableCursor: 'crosshair' });
    
    // Escuchar un solo clic en el mapa
    const clickListener = google.maps.event.addListenerOnce(map, 'click', function(event) {
        map.setOptions({ draggableCursor: '' });
        handleMapClick(event.latLng);
    });
}

function handleMapClick(latLng) {
    // Crear o mover marcador
    if (!marker) {
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: true,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }
        });
        
        marker.addListener('dragend', function() {
            reverseGeocode(marker.getPosition());
        });
    } else {
        marker.setPosition(latLng);
    }
    
    // Centrar el mapa
    map.panTo(latLng);
    
    // Obtener dirección
    reverseGeocode(latLng);
}

function reverseGeocode(latLng) {
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ location: latLng }, function(results, status) {
        if (status === "OK" && results[0]) {
            document.getElementById('destination-address').value = results[0].formatted_address;
            selectedPlace = {
                geometry: { location: latLng },
                formatted_address: results[0].formatted_address,
                address_components: results[0].address_components
            };
            
            // Actualizar comuna seleccionada si coincide
            const addressComponents = results[0].address_components;
            const communeComponent = addressComponents.find(comp => 
                comp.types.includes('sublocality') || comp.types.includes('locality'));
            
            if (communeComponent) {
                const communeSelect = document.getElementById('destination-commune');
                const communeName = communeComponent.long_name;
                const foundCommune = comunasRM.find(c => 
                    c.toLowerCase() === communeName.toLowerCase());
                
                if (foundCommune) {
                    communeSelect.value = foundCommune;
                }
            }
        }
    });
}

function clearMapSelection() {
    if (directionsRenderer) {
        directionsRenderer.setMap(null);
    }
    if (marker) {
        marker.setMap(null);
    }
    document.getElementById('destination-address').value = '';
    document.getElementById('destination-commune').value = '';
    selectedPlace = null;
    
    // Centrar mapa en Paine
    map.setCenter(paineLocation);
    map.setZoom(12);
}

function calculateQuote() {
    if (!selectedPlace) {
        alert("Por favor seleccione una dirección de destino");
        return;
    }
    
    const weight = parseInt(document.getElementById('weight').value) || 0;
    const routeType = document.querySelector('input[name="route-type"]:checked').value;
    const packageType = document.getElementById('package-type').value;
    
    if (weight > 650) {
        alert('El peso máximo permitido es 650 kg');
        return;
    }
    
    // Mostrar loader
    const submitBtn = document.querySelector('#quote-form [type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader"></div> Calculando...';
    
    // Configurar solicitud de ruta
    const request = {
        origin: paineLocation,
        destination: selectedPlace.geometry.location,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
            departureTime: new Date(Date.now() + 1000 * 60 * 5), // 5 minutos en el futuro
            trafficModel: routeType === 'fast' ? 'bestguess' : 'pessimistic'
        },
        provideRouteAlternatives: false
    };
    
    // Calcular ruta
    directionsService.route(request, function(response, status) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Calcular Cotización →';
        
        if (status === "OK") {
            // Mostrar la ruta en el mapa
            directionsRenderer.setDirections(response);
            
            const route = response.routes[0];
            const distance = route.legs[0].distance.value / 1000; // en km
            const duration = route.legs[0].duration.value / 60; // en minutos
            
            // Calcular precio
            const priceInfo = calculatePrice(distance, duration, weight, packageType, routeType);
            
            // Mostrar resultados
            showQuoteResults(distance, duration, priceInfo);
            
            // Guardar datos en el estado de la aplicación
            AppState.saveQuoteData({
                destination: document.getElementById('destination-commune').value,
                address: document.getElementById('destination-address').value,
                weight: weight,
                routeType: routeType,
                packageType: packageType,
                distance: distance,
                duration: duration,
                basePrice: priceInfo.basePrice,
                totalPrice: priceInfo.totalPrice
            });
        } else {
            alert("No se pudo calcular la ruta: " + status);
        }
    });
}

function calculatePrice(distance, duration, weight, packageType, routeType) {
    // Precio base por km
    let basePricePerKm = 800;
    
    // Ajustes por tipo de ruta
    if (routeType === 'fast') {
        basePricePerKm *= 1.15; // 15% más por autopistas
    }
    
    // Calcular precio base
    let basePrice = distance * basePricePerKm;
    
    // Recargo por peso (sobre 300kg)
    let weightSurcharge = 0;
    if (weight > 300) {
        weightSurcharge = (weight - 300) * 200;
    }
    
    // Recargo por tipo de paquete
    let packageSurcharge = 0;
    switch (packageType) {
        case 'fragile':
            packageSurcharge = basePrice * 0.2; // 20% más
            break;
        case 'perishable':
            packageSurcharge = basePrice * 0.15; // 15% más
            break;
        case 'furniture':
            packageSurcharge = basePrice * 0.1; // 10% más
            break;
    }
    
    // Calcular total
    const totalPrice = basePrice + weightSurcharge + packageSurcharge;
    
    return {
        basePrice: Math.round(basePrice),
        weightSurcharge: Math.round(weightSurcharge),
        packageSurcharge: Math.round(packageSurcharge),
        totalPrice: Math.round(totalPrice),
        distance: distance,
        duration: duration
    };
}

function showQuoteResults(distance, duration, priceInfo) {
    // Obtener plantilla de resultados
    const template = document.getElementById('quote-results-template');
    const resultsElement = template.content.cloneNode(true);
    
    // Actualizar valores
    resultsElement.getElementById('result-distance').textContent = distance.toFixed(1) + ' km';
    resultsElement.getElementById('result-duration').textContent = Math.ceil(duration) + ' min';
    resultsElement.getElementById('result-base-price').textContent = '$' + priceInfo.basePrice.toLocaleString('es-CL');
    resultsElement.getElementById('result-weight-surcharge').textContent = '$' + priceInfo.weightSurcharge.toLocaleString('es-CL');
    resultsElement.getElementById('result-total').textContent = '$' + priceInfo.totalPrice.toLocaleString('es-CL');
    
    // Insertar después del formulario
    const formCard = document.querySelector('.step-content .card:first-child');
    formCard.insertAdjacentElement('afterend', resultsElement);
    
    // Ocultar formulario
    document.getElementById('quote-form').style.display = 'none';
    
    // Manejar botón de editar
    document.getElementById('edit-quote').addEventListener('click', function() {
        document.getElementById('quote-form').style.display = 'block';
        resultsElement.remove();
    });
}

function getMapDarkStyle() {
    return [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
        }
    ];
}