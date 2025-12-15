document.addEventListener('DOMContentLoaded', function() {
    // Animación para los features
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 100);
    });
});