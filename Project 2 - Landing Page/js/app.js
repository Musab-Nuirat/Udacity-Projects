// Select the required elements
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const scrollToTopButton = document.getElementById('scrollToTop');

// Build the navigation menu
const buildNav = () => {
    sections.forEach(section => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
        navbarList.appendChild(navItem);
    });
};

// Helper function to determine if a section is in the viewport
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight;
};

// Set active section and corresponding nav link
const setActiveSection = () => {
    sections.forEach(section => {
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (isInViewport(section)) {
            section.classList.add('your-active-class');
            navLink.classList.add('active');
        } else {
            section.classList.remove('your-active-class');
            navLink.classList.remove('active');
        }
    });
};

// Smooth scroll to section on nav item click
navbarList.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'A') {
        document.querySelector(event.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }
});

// Show or hide the scroll-to-top button based on scroll position
const handleScrollToTopButton = () => {
    if (window.scrollY > 500) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
};

// Scroll to top on button click
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hide navbar when not scrolling
let scrollTimeout;
const hideNavbarOnIdle = () => {
    document.querySelector('.navbar').style.display = 'block';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.querySelector('.navbar').style.display = 'none';
    }, 2000);
};

// Event listeners
window.addEventListener('scroll', () => {
    setActiveSection();
    handleScrollToTopButton();
    hideNavbarOnIdle();
});

// Initial setup
document.addEventListener('DOMContentLoaded', buildNav);
