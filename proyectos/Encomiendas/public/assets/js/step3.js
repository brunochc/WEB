document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de la cotización
    loadQuoteSummary();
    
    // Configurar formulario
    setupForm();
    
    // Configurar métodos de pago
    setupPaymentMethods();
    
    // Configurar modal de confirmación
    setupConfirmationModal();
});

function loadQuoteSummary() {
    const quote = AppState.quoteData;
    
    // Mostrar resumen de cotización
    document.getElementById('summary-destination').textContent = quote.destination;
    document.getElementById('summary-address').textContent = quote.address;
    document.getElementById('summary-distance').textContent = quote.distance.toFixed(1) + ' km';
    document.getElementById('summary-duration').textContent = Math.ceil(quote.duration) + ' min';
    document.getElementById('summary-weight').textContent = quote.weight + ' kg';
    document.getElementById('summary-total').textContent = '$' + quote.totalPrice.toLocaleString('es-CL');
    
    // Cargar datos guardados si existen
    loadSavedData();
}

function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('customerData')) || {};
    
    if (savedData.name) document.getElementById('customer-name').value = savedData.name;
    if (savedData.email) document.getElementById('customer-email').value = savedData.email;
    if (savedData.phone) document.getElementById('customer-phone').value = savedData.phone;
    if (savedData.rut) document.getElementById('customer-rut').value = savedData.rut;
    if (savedData.notes) document.getElementById('customer-notes').value = savedData.notes;
}

function setupForm() {
    const form = document.getElementById('customer-form');
    
    // Validación en tiempo real
    form.addEventListener('input', function(e) {
        validateField(e.target);
        saveFormData();
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processPayment();
        }
    });
    
    // Validar RUT chileno
    document.getElementById('customer-rut').addEventListener('blur', function() {
        if (!validateRUT(this.value)) {
            showError(this, 'Por favor ingrese un RUT válido');
        }
    });
}

function validateField(field) {
    if (field.required && !field.value.trim()) {
        showError(field, 'Este campo es requerido');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(field.value)) {
        showError(field, 'Ingrese un correo electrónico válido');
        return false;
    }
    
    if (field.id === 'customer-phone' && !isValidPhone(field.value)) {
        showError(field, 'Ingrese un número de teléfono válido');
        return false;
    }
    
    clearError(field);
    return true;
}

function validateForm() {
    let isValid = true;
    const form = document.getElementById('customer-form');
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validar RUT si tiene valor
    const rutField = document.getElementById('customer-rut');
    if (rutField.value && !validateRUT(rutField.value)) {
        showError(rutField, 'Por favor ingrese un RUT válido');
        isValid = false;
    }
    
    return isValid;
}

function saveFormData() {
    const customerData = {
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        rut: document.getElementById('customer-rut').value,
        notes: document.getElementById('customer-notes').value
    };
    
    localStorage.setItem('customerData', JSON.stringify(customerData));
}

function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            document.getElementById('card-payment-form').style.display = 
                this.value === 'card' ? 'block' : 'none';
            document.getElementById('transfer-payment-form').style.display = 
                this.value === 'transfer' ? 'block' : 'none';
        });
    });
}

function processPayment() {
    const submitBtn = document.getElementById('submit-payment');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader"></div> Procesando...';
    
    // Simular procesamiento de pago (en producción usar API real)
    setTimeout(() => {
        // Generar número de seguimiento aleatorio
        const trackingNumber = 'FL-' + Math.floor(100000 + Math.random() * 900000);
        
        // Guardar reserva en el estado
        AppState.saveReservation({
            ...AppState.quoteData,
            customer: {
                name: document.getElementById('customer-name').value,
                email: document.getElementById('customer-email').value,
                phone: document.getElementById('customer-phone').value,
                rut: document.getElementById('customer-rut').value,
                notes: document.getElementById('customer-notes').value
            },
            paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
            trackingNumber: trackingNumber,
            date: new Date().toISOString()
        });
        
        // Mostrar confirmación
        showConfirmation(trackingNumber);
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirmar y Pagar →';
    }, 2000);
}

function setupConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    const closeBtn = document.querySelector('.close-modal');
    const finishBtn = document.getElementById('finish-process');
    
    closeBtn.addEventListener('click', closeModal);
    finishBtn.addEventListener('click', finishProcess);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showConfirmation(trackingNumber) {
    const modal = document.getElementById('confirmation-modal');
    document.getElementById('tracking-number').textContent = trackingNumber;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

function finishProcess() {
    // Limpiar datos temporales
    localStorage.removeItem('customerData');
    
    // Redirigir a página de inicio o confirmación
    window.location.href = 'confirmation.html';
}

// Funciones de validación
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?\d{8,12}$/.test(phone.replace(/\s/g, ''));
}

function validateRUT(rut) {
    // Validación básica de RUT chileno
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) return false;
    
    // Limpiar RUT
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    
    // Calcular DV esperado
    let sum = 0;
    let multiplier = 2;
    
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body.charAt(i)) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const expectedDv = 11 - (sum % 11);
    const dvStr = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();
    
    return dvStr === dv;
}

function showError(field, message) {
    clearError(field);
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(error);
}

function clearError(field) {
    field.classList.remove('error');
    
    const error = field.parentNode.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}