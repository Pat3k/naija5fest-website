// Naija5Fest Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Countdown Timer for Grand Finale
    const countdownElement = document.getElementById('countdown-days');
    if (countdownElement) {
        // Set the date for the Grand Finale (December 15, 2025)
        const finaleDate = new Date('December 15, 2025 00:00:00').getTime();
        
        // Update the countdown every day
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = finaleDate - now;
            
            // Calculate days
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            
            // Display the result
            countdownElement.textContent = days;
            
            // Update every 24 hours
            setTimeout(updateCountdown, 86400000);
        }
        
        // Initial call
        updateCountdown();
    }
    
    // Nigeria Map Interaction
    const nigeriaMap = document.getElementById('nigeria-map');
    const stateTooltip = document.getElementById('state-tooltip');
    
    if (nigeriaMap) {
        // Load the Nigeria SVG map
        fetch('images/nigeria-map.svg')
            .then(response => response.text())
            .then(svgContent => {
                nigeriaMap.innerHTML = svgContent;
                
                // Add event listeners to states
                const states = nigeriaMap.querySelectorAll('.state');
                states.forEach(state => {
                    state.addEventListener('mouseenter', showTooltip);
                    state.addEventListener('mouseleave', hideTooltip);
                });
            })
            .catch(error => {
                console.error('Error loading Nigeria map:', error);
                nigeriaMap.innerHTML = '<p>Map loading failed. Please refresh the page.</p>';
            });
    }
    
    // State data for the map
    const stateData = {
        'lagos': { name: 'Lagos', status: 'Active', teams: 20, slots: 12 },
        'ogun': { name: 'Ogun', status: 'Active', teams: 15, slots: 17 },
        'osun': { name: 'Osun', status: 'Active', teams: 12, slots: 20 },
        'oyo': { name: 'Oyo', status: 'Active', teams: 18, slots: 14 },
        'ondo': { name: 'Ondo', status: 'Active', teams: 10, slots: 22 },
        'abuja': { name: 'Abuja', status: 'Active', teams: 22, slots: 10 },
        'kaduna': { name: 'Kaduna', status: 'Active', teams: 14, slots: 18 },
        'kwara': { name: 'Kwara', status: 'Active', teams: 8, slots: 24 },
        'anambra': { name: 'Anambra', status: 'Active', teams: 16, slots: 16 },
        'enugu': { name: 'Enugu', status: 'Active', teams: 12, slots: 20 },
        'rivers': { name: 'Rivers', status: 'Active', teams: 19, slots: 13 },
        'abia': { name: 'Abia', status: 'Active', teams: 11, slots: 21 },
        'delta': { name: 'Delta', status: 'Active', teams: 15, slots: 17 },
        'edo': { name: 'Edo', status: 'Active', teams: 13, slots: 19 },
        'plateau': { name: 'Plateau', status: 'Active', teams: 9, slots: 23 },
        'ekiti': { name: 'Ekiti', status: 'Active', teams: 7, slots: 25 }
    };
    
    // Show tooltip on state hover
    function showTooltip(event) {
        const state = event.target;
        const stateId = state.id || state.getAttribute('data-state');
        
        if (stateId && stateData[stateId]) {
            const data = stateData[stateId];
            
            // Update tooltip content
            document.getElementById('tooltip-state').textContent = data.name;
            document.getElementById('tooltip-status').textContent = data.status;
            document.getElementById('tooltip-teams').textContent = data.teams;
            document.getElementById('tooltip-slots').textContent = `${data.slots} slots remaining`;
            
            // Position tooltip near the mouse
            const mapRect = nigeriaMap.getBoundingClientRect();
            const x = event.clientX - mapRect.left;
            const y = event.clientY - mapRect.top;
            
            stateTooltip.style.left = `${x + 10}px`;
            stateTooltip.style.top = `${y + 10}px`;
            stateTooltip.style.display = 'block';
            
            // Highlight the state
            state.classList.add('active');
        }
    }
    
    // Hide tooltip when mouse leaves state
    function hideTooltip(event) {
        stateTooltip.style.display = 'none';
        event.target.classList.remove('active');
    }
    
    // Registration Form Steps
    const registrationSteps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    // Product selection based on tournament month
    const tournamentMonthSelect = document.getElementById('tournament-month');
    const productSelection = document.querySelector('.product-selection');
    
    if (tournamentMonthSelect) {
        tournamentMonthSelect.addEventListener('change', function() {
            const selectedMonth = this.value;
            
            // Product data for each month
            const productData = {
                'january': {
                    name: "Rehau's Raha Cola - 6 Pack",
                    description: "Required for January tournament registration",
                    price: "₦15,000 + ₦4,600 processing fee",
                    image: "images/sponsors/rehau-product.png"
                },
                'february': {
                    name: "Fumman Drinks - Variety Pack",
                    description: "Required for February tournament registration",
                    price: "₦14,500 + ₦4,600 processing fee",
                    image: "images/sponsors/fumman-product.png"
                },
                'march': {
                    name: "SWAN Natural Mineral Water - 24 Pack",
                    description: "Required for March tournament registration",
                    price: "₦12,000 + ₦4,600 processing fee",
                    image: "images/sponsors/swan-product.png"
                },
                'april': {
                    name: "Captain Jack Rum - Premium Bottle",
                    description: "Required for April tournament registration",
                    price: "₦18,000 + ₦4,600 processing fee",
                    image: "images/sponsors/grand-oak-product.png"
                }
            };
            
            // Update product display
            if (productData[selectedMonth]) {
                const product = productData[selectedMonth];
                const productImage = productSelection.querySelector('.product-image');
                const productName = productSelection.querySelector('h4');
                const productDesc = productSelection.querySelector('p:not(.product-price)');
                const productPrice = productSelection.querySelector('.product-price');
                
                productImage.src = product.image;
                productImage.alt = product.name;
                productName.textContent = product.name;
                productDesc.textContent = product.description;
                productPrice.textContent = product.price;
            }
        });
    }
    
    // Next step button functionality
    if (nextButtons) {
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Find current active step
                let currentStepIndex = 0;
                stepContents.forEach((content, index) => {
                    if (content.classList.contains('active')) {
                        currentStepIndex = index;
                    }
                });
                
                // Hide current step
                stepContents[currentStepIndex].classList.remove('active');
                registrationSteps[currentStepIndex].classList.remove('active');
                registrationSteps[currentStepIndex].classList.add('completed');
                
                // Show next step
                const nextStepIndex = currentStepIndex + 1;
                if (nextStepIndex < stepContents.length) {
                    stepContents[nextStepIndex].classList.add('active');
                    registrationSteps[nextStepIndex].classList.add('active');
                    
                    // If this is the confirmation step, show confetti
                    if (nextStepIndex === 3) {
                        showConfetti();
                    }
                }
            });
        });
    }
    
    // Previous step button functionality
    if (prevButtons) {
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Find current active step
                let currentStepIndex = 0;
                stepContents.forEach((content, index) => {
                    if (content.classList.contains('active')) {
                        currentStepIndex = index;
                    }
                });
                
                // Hide current step
                stepContents[currentStepIndex].classList.remove('active');
                registrationSteps[currentStepIndex].classList.remove('active');
                
                // Show previous step
                const prevStepIndex = currentStepIndex - 1;
                if (prevStepIndex >= 0) {
                    stepContents[prevStepIndex].classList.add('active');
                    registrationSteps[prevStepIndex].classList.add('active');
                    registrationSteps[prevStepIndex].classList.remove('completed');
                }
            });
        });
    }
    
    // Complete registration button
    const completeRegistrationBtn = document.getElementById('complete-registration');
    if (completeRegistrationBtn) {
        completeRegistrationBtn.addEventListener('click', function() {
            alert('Thank you for registering for multiple tournaments! You will receive a confirmation email shortly.');
            
            // Reset form to first step
            stepContents.forEach(content => content.classList.remove('active'));
            registrationSteps.forEach(step => {
                step.classList.remove('active');
                step.classList.remove('completed');
            });
            
            stepContents[0].classList.add('active');
            registrationSteps[0].classList.add('active');
            
            // Reset form fields
            document.getElementById('team-name').value = '';
            document.getElementById('team-state').value = '';
            document.getElementById('captain-name').value = '';
            document.getElementById('captain-phone').value = '';
            document.getElementById('captain-email').value = '';
            document.getElementById('card-name').value = '';
            document.getElementById('card-number').value = '';
            document.getElementById('card-expiry').value = '';
            document.getElementById('card-cvv').value = '';
            
            // Scroll to top of registration section
            document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Tournament Structure Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you, ${name}! Your message has been sent. We will get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simulate subscription
            alert(`Thank you for subscribing to our newsletter with ${email}!`);
            
            // Reset form
            this.reset();
        });
    }
    
    // File Upload Preview
    const fileUpload = document.getElementById('team-logo');
    const fileName = document.querySelector('.file-name');
    
    if (fileUpload && fileName) {
        fileUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
    }
    
    // Confetti Animation for Registration Confirmation
    function showConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        
        // Clear any existing confetti
        confettiContainer.innerHTML = '';
        
        // Create confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random position
            confetti.style.left = `${Math.random() * 100}%`;
            
            // Random delay
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            
            // Random color
            const colors = ['#ffcc00', '#008751', '#ffffff', '#ff6b00', '#4caf50'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Add to container
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }
    
    // Scroll Animation
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize scroll animation check
    handleScrollAnimation();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});