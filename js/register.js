import { updateCartBadge } from "./cart.js";

document.addEventListener('DOMContentLoaded',()=>{
    updateCartBadge();
    const form = document.getElementById(`register-form`);
    form.addEventListener(`submit`,(e)=>{
        e.preventDefault();
        clearErrors();
        const fullname = document.getElementById(`fullname`).value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const terms = document.getElementById('terms').checked;
        let isValid = true;

        if (fullname === '') {
        showError('fullname', 'Please enter your full name.');
        isValid = false;
        } else if (fullname.length < 3) {
        showError('fullname', 'Full name must be at least 3 characters.');
        isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
        showError('email', 'Please enter your email address.');
        isValid = false;
        } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
        }

        if (password === '') {
        showError('password', 'Please enter a password.');
        isValid = false;
        } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters.');
        isValid = false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (phone === '') {
        showError('phone', 'Please enter your phone number.');
        isValid = false;
        } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid 10-digit phone number.');
        isValid = false;
        }

        if (!terms) {
        showError('terms', 'You must agree to the Terms and Conditions.');
        isValid = false;
        }

        if (isValid) {
        const successAlert = document.getElementById('success-alert');
        successAlert.classList.remove('d-none');
        form.reset();
        
        setTimeout(() => {
            successAlert.classList.add('d-none');
        }, 4000);
    }
    });
    function showError(fieldId, message) {
        const errorEl = document.getElementById(`${fieldId}-error`);
        const inputEl = document.getElementById(fieldId);
        
        if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('d-none');
        }
        
        if (inputEl && fieldId !== 'terms') {
        inputEl.classList.add('is-invalid');
        }
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-msg');
        errorMessages.forEach(el => {
        el.classList.add('d-none');
        el.textContent = '';
        });

        const inputs = document.querySelectorAll('.form-control, .form-check-input');
        inputs.forEach(el => {
        el.classList.remove('is-invalid');
        });
    }

});