// Get references to essential DOM elements
const navbarList = document.getElementById('navbar_list');
const sections = document.querySelectorAll('section');
const scrollToTopButton = document.getElementById('scrollToTop');
const menuToggle = document.getElementById('menu-toggle');

// Toggle navbar visibility on mobile
menuToggle.addEventListener('click', () => {
    navbarList.classList.toggle('active');
});

// Close navbar when clicking on a link in mobile view
navbarList.addEventListener('click', (event) => {
    if (event.target.nodeName === 'A') { // if the clicked was anchor <a>
        navbarList.classList.remove('active');
    }
});

/**
 * @description Creates and appends a navigation link for each section dynamically.
 * Uses document fragment for performance optimization.
 */
const buildNav = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${section.id}" class="menu_link">${section.dataset.nav}</a>`;
        fragment.appendChild(navItem);
    });
    navbarList.appendChild(fragment);
};

/**
 * @description Checks if the provided section is currently in the viewport.
 * @param {HTMLElement} section - The section element to check.
 * @returns {boolean} - Returns true if the section is in viewport, else false.
 */
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    const buffer = 200; // Buffer in pixels before removing active state
    return (rect.top >= -buffer && rect.top < window.innerHeight - buffer); 
};

/**
 * @description Sets an active state on the section and navigation link that are in the viewport.
 */
function setActiveSection () {
    sections.forEach(section => {
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (isInViewport(section)) {
            section.classList.add('active-section');
            navLink.classList.add('active');
        } else {
            section.classList.remove('active-section');
            navLink.classList.remove('active');
        }
    });
}

/**
 * @description Smoothly scrolls to a section when its corresponding nav link is clicked.
 */
navbarList.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName === 'A') {
        document.querySelector(event.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }
});

/**
 * @description Shows the scroll-to-top button based on the scroll position.
 */
function handleScrollToTopButton () {
    if (window.scrollY > 500) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}

/**
 * @description Scrolls the window back to the top when the scroll-to-top button is clicked.
 */
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/**
 * @description Hides the navigation bar if the user stops scrolling.
 * The navbar reappears when the user resumes scrolling.
 */
let scrollTimeout;
function hideNavbarOnIdle () {
    document.querySelector('.navbar').style.display = 'block';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.querySelector('.navbar').style.display = 'none';
    }, 2000);
}

// Event listeners to manage active section, scroll-to-top button, and navbar visibility
window.addEventListener('scroll', () => {
    setActiveSection();
    handleScrollToTopButton();
    hideNavbarOnIdle();
});

// Initial setup to build the navigation menu
document.addEventListener('DOMContentLoaded', buildNav);
