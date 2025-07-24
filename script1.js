// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA button scroll functionality
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Apply Now button functionality
    const stickyApplyBtn = document.querySelector('.apply-now-btn');
    
    stickyApplyBtn.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        const headerHeight = header.offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Course card view button functionality
    const viewButtons = document.querySelectorAll('.view-button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseName = this.closest('.course-card').querySelector('.course-name').textContent;
            const courseType = this.classList.contains('medical') ? 'Medical' : 'IT';
            
            // Create a detailed modal or redirect to course details
            showCourseModal(courseName, courseType);
        });
    });

    // Course modal functionality
    function showCourseModal(courseName, courseType) {
        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${courseName}</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="course-type-badge ${courseType.toLowerCase()}">${courseType} Course</div>
                    <p><strong>Course Overview:</strong></p>
                    <p>This comprehensive ${courseName} program is designed to provide you with industry-relevant skills and certification.</p>
                    
                    <div class="course-features">
                        <h4>What You'll Learn:</h4>
                        <ul>
                            <li>Industry-standard practices and methodologies</li>
                            <li>Hands-on practical experience</li>
                            <li>Real-world case studies and projects</li>
                            <li>Certification preparation</li>
                        </ul>
                    </div>
                    
                    <div class="course-details-grid">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Duration: 2-6 months</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-laptop"></i>
                            <span>Mode: Online/Offline</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-certificate"></i>
                            <span>Certification: Industry Recognized</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>Batch Size: Limited seats</span>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="enroll-btn" onclick="scrollToContact()">Enroll Now</button>
                        <button class="info-btn" onclick="requestMoreInfo('${courseName}')">Request Info</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Scroll to contact function
    window.scrollToContact = function() {
        const contactSection = document.querySelector('#contact');
        const headerHeight = header.offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close any open modals
        const modals = document.querySelectorAll('.course-modal');
        modals.forEach(modal => modal.remove());
    };

    // Request more info function
    window.requestMoreInfo = function(courseName) {
        const contactForm = document.querySelector('.enquiry-form');
        const courseSelect = contactForm.querySelector('select');
        
        // Pre-fill the course selection
        for (let option of courseSelect.options) {
            if (option.text.includes(courseName)) {
                option.selected = true;
                break;
            }
        }
        
        scrollToContact();
    };

    // Form submission handling
    const enquiryForm = document.querySelector('.enquiry-form');
    
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        this.reset();
        
        // In a real implementation, you would send this data to your server
        console.log('Form submitted:', formObject);
    });

    // Success message function
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h4>Thank You!</h4>
                <p>Your enquiry has been submitted successfully. Our team will contact you within 24 hours.</p>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (document.body.contains(successMessage)) {
                document.body.removeChild(successMessage);
            }
        }, 5000);
    }

    // Lazy loading for images
    const images = document.querySelectorAll('.course-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Parallax effect for banner
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const banner = document.querySelector('.banner');
        const rate = scrolled * -0.3;
        
        if (banner) {
            banner.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animation on scroll for course cards
    const courseCards = document.querySelectorAll('.course-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    courseCards.forEach(card => {
        cardObserver.observe(card);
    });

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    featureCards.forEach(card => {
        featureObserver.observe(card);
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateCounter(target, finalNumber);
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Counter animation function
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
            }
        }, 40);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.course-modal');
            modals.forEach(modal => modal.remove());
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounced scroll handlers
    const debouncedScrollHandler = debounce(function() {
        // Any intensive scroll operations can be placed here
    }, 16); // ~60fps

    window.addEventListener('scroll', debouncedScrollHandler);

    // Social media links tracking
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('i').className;
            console.log(`Social media click: ${platform}`);
            // Here you could add analytics tracking
        });
    });

    // WhatsApp integration for quick contact
    function initWhatsAppIntegration() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add default message for WhatsApp
                const currentHref = this.getAttribute('href');
                if (!currentHref.includes('text=')) {
                    const message = encodeURIComponent('Hi! I am interested in learning more about Varaahi Coding Solutions courses. Please provide more information.');
                    this.setAttribute('href', currentHref + '?text=' + message);
                }
            });
        });
    }

    initWhatsAppIntegration();
});

// Additional utility functions

// Function to dynamically add more courses (for future extensibility)
function addCourse(courseData) {
    const coursesGrid = document.querySelector('.courses-grid');
    
    const courseCard = document.createElement('div');
    courseCard.className = `course-card ${courseData.type}`;
    
    courseCard.innerHTML = `
        <div class="course-image">
            <img src="${courseData.image}" alt="${courseData.name}">
            <div class="course-badge ${courseData.badgeType}">${courseData.badge}</div>
        </div>
        <div class="course-content">
            <h3 class="course-name">${courseData.name}</h3>
            <div class="course-details">
                <span class="duration"><i class="fas fa-clock"></i> ${courseData.duration}</span>
                <span class="mode"><i class="fas fa-laptop"></i> ${courseData.mode}</span>
            </div>
            <button class="view-button ${courseData.type}">View Details</button>
        </div>
    `;
    
    // Add event listener to the new view button
    const viewButton = courseCard.querySelector('.view-button');
    viewButton.addEventListener('click', function() {
        const courseName = this.closest('.course-card').querySelector('.course-name').textContent;
        const courseType = this.classList.contains('medical') ? 'Medical' : 'IT';
        showCourseModal(courseName, courseType);
    });
    
    coursesGrid.appendChild(courseCard);
}

// Function to filter courses (for future enhancement)
function filterCourses(category) {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const courseName = card.querySelector('.course-name').textContent.toLowerCase();
        const courseType = card.classList.contains('medical') ? 'medical' : 'tech';
        
        if (category === 'all' || 
            category === courseType || 
            courseName.includes(category.toLowerCase())) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to handle newsletter subscription (if added in future)
function handleNewsletterSubscription(email) {
    console.log('Newsletter subscription:', email);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'newsletter-success';
    successMessage.textContent = 'Thank you for subscribing to our newsletter!';
    
    // Add styling and show message
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
            document.body.removeChild(successMessage);
        }
    }, 4000);
}

// CSS for additional animations and modal styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-gold) !important;
        outline-offset: 2px !important;
    }
    
    .course-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .modal-header h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--dark-text);
        font-family: 'Poppins', sans-serif;
    }
    
    .close-modal {
        font-size: 2rem;
        cursor: pointer;
        color: var(--light-text);
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: var(--primary-blue);
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .course-type-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        margin-bottom: 1.5rem;
    }
    
    .course-type-badge.medical {
        background: var(--secondary-green);
        color: white;
    }
    
    .course-type-badge.it {
        background: var(--primary-blue);
        color: white;
    }
    
    .course-features {
        margin: 1.5rem 0;
    }
    
    .course-features h4 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 1rem;
        font-family: 'Poppins', sans-serif;
    }
    
    .course-features ul {
        list-style: none;
        padding-left: 0;
    }
    
    .course-features li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--light-text);
    }
    
    .course-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--secondary-green);
        font-weight: bold;
    }
    
    .course-details-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: var(--light-bg);
        border-radius: 8px;
    }
    
    .detail-item i {
        color: var(--primary-blue);
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .enroll-btn, .info-btn {
        flex: 1;
        padding: 1rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .enroll-btn {
        background: var(--primary-blue);
        color: white;
    }
    
    .enroll-btn:hover {
        background: #1e3a8a;
        transform: translateY(-2px);
    }
    
    .info-btn {
        background: var(--accent-gold);
        color: white;
    }
    
    .info-btn:hover {
        background: #B8860B;
        transform: translateY(-2px);
    }
    
    .success-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: fadeIn 0.3s ease-out;
        max-width: 400px;
        width: 90%;
    }
    
    .success-content {
        padding: 2rem;
        text-align: center;
    }
    
    .success-content i {
        font-size: 3rem;
        color: var(--secondary-green);
        margin-bottom: 1rem;
    }
    
    .success-content h4 {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 0.5rem;
        font-family: 'Poppins', sans-serif;
    }
    
    .success-content p {
        color: var(--light-text);
        line-height: 1.6;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 1rem;
        }
        
        .modal-header, .modal-body {
            padding: 1.5rem;
        }
        
        .course-details-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(additionalStyles);

// schedule section 
function filterCourses(type) {
      const cards = document.querySelectorAll('.calendar-card');
      const buttons = document.querySelectorAll('.toggle-buttons button');

      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      cards.forEach(card => {
        if (type === 'all') {
          card.style.display = 'block';
        } else {
          card.style.display = card.classList.contains(type) ? 'block' : 'none';
        }
      });
    }

function toggleView() {
      alert("Toggle View Clicked (This can be extended to a calendar layout or list view)");
    }

// gallery section 
  const scrollWrapper = document.getElementById('scrollWrapper');
  const slides = document.querySelectorAll('.slide');
  let scrollSpeed = 1.5;

  function scrollContinuously() {
    if (scrollWrapper.scrollLeft >= scrollWrapper.scrollWidth - scrollWrapper.clientWidth) {
      scrollWrapper.scrollLeft = 0; // loop back to start
    } else {
      scrollWrapper.scrollLeft += scrollSpeed;
    }
    requestAnimationFrame(scrollContinuously);
  }

  scrollContinuously(); // Start scrolling

  // Lightbox Functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');

  function openLightbox(src, type) {
    lightbox.style.display = 'flex';
    if (type === 'image') {
      lightboxContent.innerHTML = `
        <button class="close-btn" onclick="closeLightbox()">×</button>
        <img src="${src}" alt="Full View">`;
    } else {
      lightboxContent.innerHTML = `
        <button class="close-btn" onclick="closeLightbox()">×</button>
        <video id="popupVideo" src="${src}" controls autoplay style="max-height: 80vh;"></video>`;
      setTimeout(() => {
        const video = document.getElementById('popupVideo');
        if (video) video.muted = false;
      }, 100);
    }
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxContent.innerHTML = '';
  }