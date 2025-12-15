const AppState = {
    currentStep: 1,
    quoteData: {
        origin: 'Paine',
        destination: '',
        address: '',
        weight: '',
        routeType: 'fast',
        distance: 0,
        duration: 0,
        basePrice: 0,
        totalPrice: 0
    },
    
    nextStep: function() {
        if (this.currentStep < 3) {
            this.currentStep++;
            this.updateUI();
        }
    },
    
    prevStep: function() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    },
    
    updateUI: function() {
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === this.currentStep) {
                step.classList.add('active');
            }
        });
        
        window.location.href = this.currentStep === 1 ? 'index.html' : `step${this.currentStep}.html`;
    },
    
    saveQuoteData: function(data) {
        this.quoteData = { ...this.quoteData, ...data };
        localStorage.setItem('quoteData', JSON.stringify(this.quoteData));
    },
    
    loadQuoteData: function() {
        const savedData = localStorage.getItem('quoteData');
        if (savedData) {
            this.quoteData = JSON.parse(savedData);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AppState.loadQuoteData();
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('next-btn')) {
            AppState.nextStep();
        } else if (e.target.classList.contains('prev-btn')) {
            AppState.prevStep();
        }
    });
});