// filepath: assets/js/loader.js
/**
 * Loads an HTML component into a specified container element
 * @param {string} elementId - The ID of the container element
 * @param {string} componentPath - The path to the component HTML file
 * @returns {Promise<boolean>} - Returns true if loaded successfully, false otherwise
 */
async function loadComponent(elementId, componentPath) {
  try {
    const container = document.getElementById(elementId);
    if (!container) {
      console.error(`Container element with ID "${elementId}" not found`);
      return false;
    }
    
    const res = await fetch(componentPath);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const html = await res.text();
    container.innerHTML = html;
    return true;
  } catch (error) {
    console.error(`Failed to load component from ${componentPath}:`, error);
    return false;
  }
}

/**
 * Initializes the sidebar toggle functionality
 */
function initializeSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", () => { 
      sidebar.classList.toggle('active');
    });
  } else {
    console.warn('Sidebar elements not found');
  }
}

/**
 * Initializes navigation link functionality
 */
function initializeNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  if (navigationLinks.length === 0 || pages.length === 0) {
    console.warn('Navigation elements not found');
    return;
  }

  // Add event listener to all navigation links
  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      const targetPage = this.innerHTML.toLowerCase();
      
      pages.forEach((page, pageIndex) => {
        if (targetPage === page.dataset.page) {
          page.classList.add("active");
          navigationLinks[pageIndex]?.classList.add("active");
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          page.classList.remove("active");
          navigationLinks[pageIndex]?.classList.remove("active");
        }
      });
    });
  });
}

/**
 * Main initialization function
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load sidebar and navbar first
    await Promise.all([
      loadComponent('sidebar-container', './components/sidebar.html'),
      loadComponent('navbar-container', './components/navbar.html')
    ]);
    
    // Initialize sidebar functionality after loading
    initializeSidebar();
    
    // Load other components in parallel for better performance
    await Promise.all([
      loadComponent('about-container', './components/about.html'),
      loadComponent('resume-container', './components/resume.html'),
      loadComponent('project-container', './components/project.html'),
      loadComponent('content-container', './components/content.html'),
      loadComponent('blog-container', './components/blog.html'),
      loadComponent('contact-container', './components/contact.html')
    ]);
    
    // Initialize navigation after all components are loaded
    initializeNavigation();
    
    // Show About section by default
    const aboutSection = document.querySelector('[data-page="about"]');
    const aboutNavLink = document.querySelector('[data-nav-link]');
    
    if (aboutSection) {
      aboutSection.classList.add('active');
    }
    if (aboutNavLink) {
      aboutNavLink.classList.add('active');
    }
    
    // --- CERTIFICATE SORTING ---
    const certList = document.querySelector('.cert-list');
    if (certList) {
      const certItems = Array.from(certList.children);
      certItems.sort((a, b) => {
        const dateA = new Date(a.querySelector('.cert-date')?.getAttribute('datetime') || 0);
        const dateB = new Date(b.querySelector('.cert-date')?.getAttribute('datetime') || 0);
        return dateB - dateA;
      });
      certItems.forEach(item => certList.appendChild(item));
    }
  } catch (error) {
    console.error('Error during page initialization:', error);
  }
});