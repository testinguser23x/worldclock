// Configuración de ciudades populares para mostrar en la cuadrícula
const popularCities = [
    { timezone: 'Europe/London', name: 'Londres' },
    { timezone: 'Europe/Paris', name: 'París' },
    { timezone: 'Asia/Tokyo', name: 'Tokio' },
    { timezone: 'America/Los_Angeles', name: 'Los Ángeles' },
    { timezone: 'Asia/Shanghai', name: 'Shanghái' },
    { timezone: 'Australia/Sydney', name: 'Sídney' }
];

// Variables globales
let currentTimezone = 'America/New_York';
let is24HourFormat = false;
let updateInterval;

// Elementos del DOM
const citySelector = document.getElementById('city-selector');
const formatToggle = document.getElementById('format-toggle');
const cityNameElement = document.getElementById('city-name');
const utcOffsetElement = document.getElementById('utc-offset');
const currentTimeElement = document.getElementById('current-time');
const currentDateElement = document.getElementById('current-date');
const clocksGrid = document.getElementById('clocks-grid');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Establecer valores iniciales
    citySelector.value = currentTimezone;
    formatToggle.checked = is24HourFormat;
    
    // Agregar event listeners
    citySelector.addEventListener('change', handleCityChange);
    formatToggle.addEventListener('change', handleFormatChange);
    
    // Iniciar el reloj
    startClock();
    
    // Crear relojes adicionales
    createAdditionalClocks();
});

// Manejar cambio de ciudad
function handleCityChange(event) {
    currentTimezone = event.target.value;
    updateClock();
}

// Manejar cambio de formato
function handleFormatChange(event) {
    is24HourFormat = event.target.checked;
    updateClock();
}

// Iniciar el reloj
function startClock() {
    updateClock();
    updateInterval = setInterval(updateClock, 1000);
}

// Actualizar el reloj principal
function updateClock() {
    const now = new Date();
    const timeOptions = {
        timeZone: currentTimezone,
        hour12: !is24HourFormat,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateOptions = {
        timeZone: currentTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    // Formatear hora y fecha
    const timeString = now.toLocaleTimeString('es-ES', timeOptions);
    const dateString = now.toLocaleDateString('es-ES', dateOptions);
    
    // Actualizar elementos del DOM
    currentTimeElement.textContent = timeString;
    currentDateElement.textContent = dateString;
    
    // Actualizar nombre de la ciudad y offset UTC
    updateCityInfo();
    
    // Actualizar relojes adicionales
    updateAdditionalClocks();
}

// Actualizar información de la ciudad
function updateCityInfo() {
    const selectedOption = citySelector.options[citySelector.selectedIndex];
    const cityName = selectedOption.text;
    
    cityNameElement.textContent = cityName;
    
    // Calcular offset UTC
    const now = new Date();
    const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const cityTime = new Date(utcTime.toLocaleString('en-US', { timeZone: currentTimezone }));
    const offset = Math.round((cityTime - utcTime) / (1000 * 60 * 60));
    
    // Formatear offset UTC
    let offsetString = 'UTC';
    if (offset >= 0) {
        offsetString += '+' + offset;
    } else {
        offsetString += offset;
    }
    
    utcOffsetElement.textContent = offsetString;
}

// Crear relojes adicionales
function createAdditionalClocks() {
    clocksGrid.innerHTML = '';
    
    popularCities.forEach(city => {
        const clockElement = document.createElement('div');
        clockElement.className = 'mini-clock';
        clockElement.innerHTML = `
            <h4>${city.name}</h4>
            <div class="mini-time" id="time-${city.timezone}">00:00:00</div>
            <div class="mini-date" id="date-${city.timezone}">Cargando...</div>
            <div class="mini-offset" id="offset-${city.timezone}">UTC+0</div>
        `;
        clocksGrid.appendChild(clockElement);
    });
}

// Actualizar relojes adicionales
function updateAdditionalClocks() {
    const now = new Date();
    
    popularCities.forEach(city => {
        const timeOptions = {
            timeZone: city.timezone,
            hour12: !is24HourFormat,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const dateOptions = {
            timeZone: city.timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        
        const timeElement = document.getElementById(`time-${city.timezone}`);
        const dateElement = document.getElementById(`date-${city.timezone}`);
        const offsetElement = document.getElementById(`offset-${city.timezone}`);
        
        if (timeElement && dateElement && offsetElement) {
            const timeString = now.toLocaleTimeString('es-ES', timeOptions);
            const dateString = now.toLocaleDateString('es-ES', dateOptions);
            
            timeElement.textContent = timeString;
            dateElement.textContent = dateString;
            
            // Calcular offset UTC
            const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            const cityTime = new Date(utcTime.toLocaleString('en-US', { timeZone: city.timezone }));
            const offset = Math.round((cityTime - utcTime) / (1000 * 60 * 60));
            
            // Formatear offset UTC
            let offsetString = 'UTC';
            if (offset >= 0) {
                offsetString += '+' + offset;
            } else {
                offsetString += offset;
            }
            
            offsetElement.textContent = offsetString;
        }
    });
}

// Función para formatear el offset UTC
function formatUTCOffset(offset) {
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.floor((Math.abs(offset) % 1) * 60);
    
    let result = 'UTC';
    result += offset >= 0 ? '+' : '-';
    result += hours.toString().padStart(2, '0');
    
    if (minutes > 0) {
        result += ':' + minutes.toString().padStart(2, '0');
    }
    
    return result;
}

// Función para obtener el nombre de la ciudad a partir del timezone
function getCityName(timezone) {
    const option = Array.from(citySelector.options).find(opt => opt.value === timezone);
    return option ? option.text : 'Ciudad desconocida';
}

// Función para limpiar intervalos al salir de la página
window.addEventListener('beforeunload', function() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});

// Función para manejar el modo oscuro (ya está por defecto en el CSS)
function toggleDarkMode() {
    // Esta función está aquí para futuras expansiones
    // Por ahora, el modo oscuro es el predeterminado
    console.log('Modo oscuro activado por defecto');
}

// Inicializar modo oscuro
toggleDarkMode();