// Variables para los elementos del DOM
const temperatureInput = document.getElementById('temperature');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');

// Evento para habilitar o deshabilitar el botón "Convertir"
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', () => {
        if (temperatureInput.value && fromUnitSelect.value && toUnitSelect.value) {
            convertButton.disabled = false;
        } else {
            convertButton.disabled = true;
        }
    });
});

// Función para convertir comas en puntos
function normalizeInput(value) {
    return value.replace(',', '.'); // Reemplazar coma por punto
}

// Función para convertir la temperatura
function convertTemperature(value, fromUnit, toUnit) {
    let result;

    if (fromUnit === toUnit) {
        result = value; // No hay conversión si son las mismas unidades
    } else if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') {
            result = (value * 9/5) + 32;
        } else if (toUnit === 'kelvin') {
            result = value + 273.15;
        }
    } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') {
            result = (value - 32) * 5/9;
        } else if (toUnit === 'kelvin') {
            result = (value - 32) * 5/9 + 273.15;
        }
    } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') {
            result = value - 273.15;
        } else if (toUnit === 'fahrenheit') {
            result = (value - 273.15) * 9/5 + 32;
        }
    }

    return result.toFixed(2); // Devolver el resultado con 2 decimales
}

// Evento para manejar el envío del formulario y la conversión
document.getElementById('tempForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el recargado de la página

    // Normalizamos la entrada del usuario (comas a puntos)
    const temperature = parseFloat(normalizeInput(temperatureInput.value));
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    // Validar que la temperatura sea un número válido
    if (isNaN(temperature)) {
        resultDiv.textContent = 'Por favor, ingresa un valor de temperatura válido.';
        resultDiv.classList.add('show');  // Mostrar mensaje de error con la animación
        return;
    }

    // Realizar la conversión
    const convertedTemperature = convertTemperature(temperature, fromUnit, toUnit);

    // Mostrar el resultado y añadir la clase 'show' para activar la animación
    resultDiv.textContent = `${temperatureInput.value}° ${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} es igual a ${convertedTemperature}° ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}.`;
    resultDiv.classList.add('show');  // Añadir la clase 'show'
});
