// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling
const entryForm = document.getElementById('entryForm');
const formSuccess = document.getElementById('formSuccess');
const closeSuccess = document.getElementById('closeSuccess');

entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(entryForm);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'birthDate', 'country', 'entryDate', 'duration', 'purpose'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            isValid = false;
        }
    });
    
    if (!isValid) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }
    
    // Create email body
    const emailBody = `
Eintrittsantrag für Ayugistan

====================
Persönliche Daten:
====================
Vorname: ${data.firstName}
Nachname: ${data.lastName}
E-Mail: ${data.email}
Geburtsdatum: ${data.birthDate}
Herkunftsland: ${data.country}

====================
Reisedaten:
====================
Gewünschtes Eintrittsdatum: ${data.entryDate}
Aufenthaltsdauer: ${data.duration}
Grund des Besuchs: ${data.purpose}

====================
Zusätzliche Informationen:
====================
${data.message || 'Keine zusätzlichen Informationen'}

====================
Dieser Antrag wurde über das offizielle Ayugistan-Portal erstellt.
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:koyunfood.com?subject=Eintrittsantrag Ayugistan - ${data.firstName} ${data.lastName}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message
    entryForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    
    // Open email client after a short delay
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 1000);
});

// Close success message and reset form
closeSuccess.addEventListener('click', () => {
    formSuccess.classList.add('hidden');
    entryForm.classList.remove('hidden');
    entryForm.reset();
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Set minimum date for entry date to today
const entryDateInput = document.getElementById('entryDate');
if (entryDateInput) {
    const today = new Date().toISOString().split('T')[0];
    entryDateInput.setAttribute('min', today);
}

// Set maximum date for birth date (must be at least 18 years old)
const birthDateInput = document.getElementById('birthDate');
if (birthDateInput) {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    birthDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}

// Add hover effect to glass cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Console log for development
console.log('Ayugistan Portal loaded successfully');
