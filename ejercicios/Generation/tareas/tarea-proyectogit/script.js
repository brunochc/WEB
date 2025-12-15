document.addEventListener('DOMContentLoaded', function() {
    const celsiusInput = document.getElementById('celsius-input');
    const convertBtn = document.getElementById('convert-btn');
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error-message');
    
    // Función principal de conversión
    function convertTemperature() {
        // Obtener y validar el valor de entrada
        const inputValue = celsiusInput.value.trim();
        
        // Verificar si el campo está vacío
        if (inputValue === '') {
            showError('Por favor, ingresa una temperatura en Celsius.');
            return;
        }
        
        // Verificar si es un número válido
        const celsius = parseFloat(inputValue);
        if (isNaN(celsius)) {
            showError('Error: Debes ingresar un número válido.');
            return;
        }
        
        // Si es válido, ocultar cualquier mensaje de error previo
        hideError();
        
        // Realizar las conversiones
        const fahrenheit = convertToFahrenheit(celsius);
        const kelvin = convertToKelvin(celsius);
        
        // Mostrar los resultados
        displayResults(celsius, fahrenheit, kelvin);
    }
    
    // Convertir Celsius a Fahrenheit
    function convertToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    
    // Convertir Celsius a Kelvin
    function convertToKelvin(celsius) {
        return celsius + 273.15;
    }
    
    // Mostrar resultados en el DOM
    function displayResults(celsius, fahrenheit, kelvin) {
        resultsDiv.innerHTML = `
            <div class="result-card">
                <h3>Grados Celsius:</h3>
                <div class="result-value">${celsius.toFixed(2)} °C</div>
            </div>
            <div class="result-card">
                <h3>Grados Fahrenheit:</h3>
                <div class="result-value">${fahrenheit.toFixed(2)} °F</div>
            </div>
            <div class="result-card">
                <h3>Grados Kelvin:</h3>
                <div class="result-value">${kelvin.toFixed(2)} K</div>
            </div>
        `;
    }
    
    // Mostrar mensaje de error
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.classList.add('error');
        resultsDiv.innerHTML = '';
    }
    
    // Ocultar mensaje de error
    function hideError() {
        errorDiv.classList.add('hidden');
        errorDiv.classList.remove('error');
        errorDiv.textContent = '';
    }
    
    // Event listeners
    convertBtn.addEventListener('click', convertTemperature);
    
    celsiusInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertTemperature();
        }
    });
    
    // Permitir solo números, punto y signo negativo
    celsiusInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9.-]/g, '');
        
        // Permitir solo un punto decimal
        if ((this.value.match(/\./g) || []).length > 1) {
            this.value = this.value.slice(0, -1);
        }
        
        // Permitir solo un signo negativo al principio
        if (this.value.includes('-') && this.value.indexOf('-') > 0) {
            this.value = this.value.replace(/-/g, '');
        }
    });
});