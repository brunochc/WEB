// Efecto de carga suave
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Efecto adicional para el contenido principal
document.querySelector('.content-overlay').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

document.querySelector('.content-overlay').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// Cambio de color en el footer al hacer hover
document.querySelector('footer').addEventListener('mouseenter', function() {
    this.style.backgroundColor = 'rgba(0, 36, 50, 0.7)';
});

document.querySelector('footer').addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
});