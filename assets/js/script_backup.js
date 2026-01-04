'use strict';

/**
 * Main script for handling interactive elements
 * Note: Sidebar and navigation are initialized in loader.js
 */
document.addEventListener("DOMContentLoaded", function () {

  // Utility function to toggle element active state
  const elementToggleFunc = (elem) => { 
    if (elem) elem.classList.toggle("active"); 
  };

  // Testimonials modal elements
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // Modal toggle function
  const testimonialsModalFunc = () => {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  };

  // Initialize testimonials modal if elements exist
  if (testimonialsItem.length > 0 && modalContainer && modalImg && modalTitle && modalText) {
    // Add click event to all modal items
    testimonialsItem.forEach((item) => {
      item.addEventListener("click", function () {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");

        if (avatar && title && text) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
          modalTitle.textContent = title.textContent;
          modalText.textContent = text.textContent;
          testimonialsModalFunc();
        }
      });
    });

    // Add click event to modal close button and overlay
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", testimonialsModalFunc);
    }
    if (overlay) {
      overlay.addEventListener("click", testimonialsModalFunc);
    }
  }


  // Custom select dropdown elements
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  // Initialize select dropdown if element exists
  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // Filter function
  const filterFunc = (selectedValue) => {
    filterItems.forEach((item) => {
      if (selectedValue === "all") {
        item.classList.add("active");
      } else if (selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Add event listeners to select items
  if (selectItems.length > 0 && selectValue && select) {
    selectItems.forEach((item) => {
      item.addEventListener("click", function () {
        const selectedValue = this.textContent.toLowerCase();
        selectValue.textContent = this.textContent;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    });
  }

  // Add event listeners to filter buttons for large screens
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    filterBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        const selectedValue = this.textContent.toLowerCase();
        
        if (selectValue) {
          selectValue.textContent = this.textContent;
        }
        
        filterFunc(selectedValue);

        if (lastClickedBtn) {
          lastClickedBtn.classList.remove("active");
        }
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }



  // Contact form elements
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // Initialize form validation if elements exist
  if (form && formInputs.length > 0 && formBtn) {
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        // Check form validation
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  }



  // Note: Page navigation is initialized in loader.js after components are loaded
  // This prevents duplicate event listeners
});


