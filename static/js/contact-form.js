/**
 * Contact Form Handling JavaScript
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        // Form validation
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset previous validation states
            resetValidation();
            
            // Get form elements
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission (in a real app, this would be an AJAX call)
                simulateSubmission();
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
    
    // Field validation function
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('is-invalid');
            return false;
        }
        
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('is-invalid');
                return false;
            }
        }
        
        field.classList.remove('is-invalid');
        return true;
    }
    
    // Reset validation states
    function resetValidation() {
        const invalidFields = contactForm.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => {
            field.classList.remove('is-invalid');
        });
    }
    
    // Simulate form submission
    function simulateSubmission() {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // In a real application, you would make an AJAX call here
            // For demonstration, we'll just show success message
            
            // Hide the form
            contactForm.style.opacity = '0.5';
            contactForm.style.pointerEvents = 'none';
            
            // Show success message
            successMessage.classList.remove('d-none');
            successMessage.classList.add('fade-in');
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.opacity = '1';
                contactForm.style.pointerEvents = 'auto';
                successMessage.classList.add('d-none');
                successMessage.classList.remove('fade-in');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
            
        }, 1500); // Simulate 1.5 second delay
    }
    
    // Add floating labels enhancement
    const floatingLabels = contactForm.querySelectorAll('.form-floating input, .form-floating textarea, .form-floating select');
    floatingLabels.forEach(input => {
        const label = input.parentElement.querySelector('label');
        
        input.addEventListener('focus', function() {
            label.style.color = 'var(--primary-color)';
            label.style.fontWeight = '500';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                label.style.color = '';
                label.style.fontWeight = '';
            }
        });
        
        // Set initial state
        if (input.value) {
            label.style.color = 'var(--primary-color)';
            label.style.fontWeight = '500';
        }
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
                } else {
                    value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
                }
            }
            
            e.target.value = value;
        });
    }
});