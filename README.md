# 🌍 Reloj Mundial - Zonas Horarias

![Reloj Mundial](https://img.shields.io/badge/Reloj-Mundial-black?style=for-the-badge&logo=world&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Un reloj mundial interactivo que permite consultar la hora en diferentes ciudades del mundo con zona horaria personalizada, selector de ciudad, formato 12/24 horas, diferencia respecto a UTC y modo oscuro por defecto.

## ✨ Características

- 🌐 **Selector de ciudad**: Elige entre más de 40 ciudades de todo el mundo
- ⏰ **Formato de hora**: Cambia entre formato 12h y 24h con un interruptor
- 🌍 **Diferencia UTC**: Muestra la diferencia horaria respecto al Tiempo Universal Coordinado
- 🌙 **Modo oscuro**: Diseño elegante en blanco y negro por defecto
- 📱 **Responsive**: Se adapta perfectamente a dispositivos móviles y escritorio
- 🔄 **Actualización en tiempo real**: El reloj se actualiza cada segundo
- 🏙️ **Relojes adicionales**: Muestra la hora de 6 ciudades populares simultáneamente

## 📁 Estructura del Proyecto

```
github-page/
├── index.html          # 📄 Estructura principal de la página
├── styles.css          # 🎨 Estilos y diseño (modo oscuro)
├── script.js           # ⚡ Lógica del reloj y funcionalidades
└── README.md           # 📖 Documentación del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo con Flexbox y Grid, animaciones suaves
- **JavaScript ES6+**: Lógica de programación con manejo de fechas y zonas horarias
- **Google Fonts**: Tipografías Orbitron (para el reloj) y Roboto (para el texto)
- **API Intl.DateTimeFormat**: Para formateo de fechas y horas en diferentes zonas horarias

## 🚀 Cómo Funciona el Código

### 📄 index.html

La estructura HTML está organizada de la siguiente manera:

1. **Header**: Contiene el título principal y descripción
2. **Main**: 
   - **Controls**: Sección con el selector de ciudad y el interruptor de formato
   - **Clock Display**: Muestra el reloj principal con la ciudad seleccionada
   - **Additional Clocks**: Cuadrícula con relojes de ciudades populares
3. **Footer**: Información del autor y copyright

### 🎨 styles.css

El diseño se basa en un **modo oscuro por defecto** con solo colores negros y blancos:

- **Paleta de colores**: 
  - Fondo: `#000` (negro puro)
  - Texto: `#fff` (blanco puro)
  - Secundarios: `#111`, `#222`, `#333`, `#444`, `#666`, `#888`, `#ccc`
- **Tipografías**:
  - `Orbitron`: Para los números del reloj (aspecto digital)
  - `Roboto`: Para el texto general (legibilidad)
- **Diseño responsivo**:
  - Mobile-first approach
  - Breakpoints: 768px y 480px
  - Grid layout para los relojes adicionales

### ⚡ script.js

La lógica del reloj se divide en varias funciones clave:

#### 🏗️ Variables Globales
```javascript
let currentTimezone = 'America/New_York';  // Zona horaria actual
let is24HourFormat = false;               // Formato de hora
let updateInterval;                       // Intervalo de actualización
```

#### 🎯 Funciones Principales

1. **`startClock()`**: Inicia el reloj y establece el intervalo de actualización
2. **`updateClock()`**: Actualiza el reloj principal y los relojes adicionales
3. **`handleCityChange()`**: Maneja el cambio de ciudad seleccionada
4. **`handleFormatChange()`**: Maneja el cambio entre formato 12h/24h
5. **`updateCityInfo()`**: Actualiza el nombre de la ciudad y el offset UTC
6. **`createAdditionalClocks()`**: Crea los relojes adicionales en el DOM
7. **`updateAdditionalClocks()`**: Actualiza los relojes de ciudades populares

#### 🌐 Manejo de Zonas Horarias

El código utiliza la API `Intl.DateTimeFormat` para manejar zonas horarias:

```javascript
const timeOptions = {
    timeZone: currentTimezone,
    hour12: !is24HourFormat,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

const timeString = now.toLocaleTimeString('es-ES', timeOptions);
```

#### 🧮 Cálculo de Offset UTC

Para calcular la diferencia respecto a UTC:

```javascript
const now = new Date();
const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
const cityTime = new Date(utcTime.toLocaleString('en-US', { timeZone: currentTimezone }));
const offset = Math.round((cityTime - utcTime) / (1000 * 60 * 60));
```

## 🎮 Uso de la Aplicación

1. **Seleccionar una ciudad**: Usa el menú desplegable para elegir entre más de 40 ciudades
2. **Cambiar formato de hora**: Usa el interruptor para alternar entre 12h y 24h
3. **Ver información adicional**: 
   - Nombre de la ciudad seleccionada
   - Diferencia horaria respecto a UTC
   - Fecha actual en la ciudad seleccionada
4. **Consultar otros relojes**: La sección inferior muestra 6 ciudades populares con su hora local

## 📱 Diseño Responsivo

La aplicación se adapta a diferentes tamaños de pantalla:

- **Desktop**: Diseño completo con controles en línea y cuadrícula de 3 columnas
- **Tablet (768px)**: Controles apilados verticalmente, cuadrícula de 2 columnas
- **Mobile (480px)**: Diseño simplificado con una sola columna y fuentes más pequeñas

## 🚀 Despliegue en GitHub Pages

Para desplegar este proyecto en GitHub Pages:

1. **Crea un nuevo repositorio** en GitHub
2. **Sube los archivos** del proyecto
3. **Ve a Settings** > **Pages**
4. **Selecciona la rama** main/master y la carpeta / (root)
5. **Haz clic en Save** y espera unos minutos
6. **Tu sitio estará disponible** en: `https://[tu-usuario].github.io/[nombre-repositorio]`

## 🎨 Personalización

### Cambiar Ciudades Populares
Para modificar las ciudades que aparecen en la cuadrícula inferior, edita el array `popularCities` en `script.js`:

```javascript
const popularCities = [
    { timezone: 'Europe/London', name: 'Londres' },
    { timezone: 'Europe/Paris', name: 'París' },
    // ... añade o modifica ciudades
];
```

### Añadir Nuevas Ciudades
Para añadir más ciudades al selector, añade nuevas opciones en `index.html`:

```html
<option value="America/New_York">Nueva York, EE.UU.</option>
<option value="Europe/Madrid">Madrid, España</option>
<!-- ... añade más opciones -->
```

### Modificar Colores
Para personalizar los colores (aunque el diseño es blanco y negro por defecto), edita las variables en `styles.css`:

```css
body {
    background-color: #000;  /* Fondo negro */
    color: #fff;            /* Texto blanco */
}
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. **Haz Fork** del proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit tus cambios** (`git commit -m 'Add some AmazingFeature'`)
4. **Push a la rama** (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## 👨‍💻 Autor

**Creado con ❤️ por [maykolg](https://github.com/maykolg)**

- 🌐 GitHub: [https://github.com/maykolg](https://github.com/maykolg)
- 📧 Contacto: Crea un issue en el repositorio

## 🙏 Agradecimientos

- A la comunidad de desarrolladores web por sus recursos y herramientas
- A Google Fonts por las tipografías utilizadas
- A todos los usuarios que dan feedback y sugerencias para mejorar el proyecto

---

⭐ **Si te gusta este proyecto, no olvides darle una estrella en GitHub!** ⭐