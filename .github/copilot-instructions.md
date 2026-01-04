# GitHub Copilot Instructions for Portfolio Website

## Architecture Overview

This is a **component-based single-page portfolio website** using vanilla JavaScript with dynamic content loading. The architecture splits a monolithic HTML file into modular components for better maintainability.

### Core Architecture Pattern

- **Main Entry**: [index.html](../index.html) serves as a minimal shell with empty container divs
- **Component Loading**: [assets/js/loader.js](../assets/js/loader.js) dynamically fetches and injects HTML components at runtime
- **Event Management**: [assets/js/script.js](../assets/js/script.js) handles all interactive behaviors (navigation, filtering, modals)
- **Legacy Reference**: `index_backup.html` contains the original monolithic structure (preserved for reference)

### Component System

All UI components live in `/components/` and are loaded via `fetch()`:

```javascript
// Pattern: loader.js dynamically injects components
await loadComponent("about-container", "./components/about.html");
await loadComponent("resume-container", "./components/resume.html");
```

**Available Components** (each is a self-contained `<article>` with `data-page` attribute):

- `sidebar.html` - Profile info, social links, contact details
- `navbar.html` - Main navigation buttons
- `about.html`, `resume.html`, `project.html`, `content.html`, `blog.html`, `contact.html` - Content sections

**Navigation Pattern**: Button text in `navbar.html` must match the `data-page` value in the corresponding component for navigation to work. See [loader.js#L20-L36](../assets/js/loader.js).

## Critical Data Attributes

This codebase relies heavily on **data attributes** for JavaScript behavior binding. Never remove or modify these without understanding their purpose:

| Attribute                                         | Purpose                                        | Location                 |
| ------------------------------------------------- | ---------------------------------------------- | ------------------------ |
| `data-page="section-name"`                        | Identifies content sections for navigation     | All component articles   |
| `data-nav-link`                                   | Navigation buttons that trigger page switching | navbar.html              |
| `data-sidebar` / `data-sidebar-btn`               | Mobile sidebar toggle functionality            | sidebar.html, index.html |
| `data-filter-item` / `data-filter-btn`            | Project filtering by category                  | project.html             |
| `data-testimonials-item`                          | Modal trigger for testimonials                 | about.html               |
| `data-form` / `data-form-input` / `data-form-btn` | Contact form validation                        | contact.html             |

## Key Workflows

### Adding a New Section

1. Create new component in `/components/new-section.html` with structure:

   ```html
   <article class="new-section" data-page="new-section" id="new-section">
     <header><h2 class="h2 article-title">Title</h2></header>
     <!-- content -->
   </article>
   ```

2. Add container div in [index.html](../index.html):

   ```html
   <div id="new-section-container"></div>
   ```

3. Load component in [loader.js](../assets/js/loader.js) `DOMContentLoaded` handler:

   ```javascript
   await loadComponent(
     "new-section-container",
     "./components/new-section.html"
   );
   ```

4. Add navigation button to [components/navbar.html](../components/navbar.html):

   ```html
   <li class="navbar-item">
     <button class="navbar-link" data-nav-link>New Section</button>
   </li>
   ```

5. The button text ("New Section") **must match** the `data-page` value when lowercased for navigation to work.

### Debugging Navigation Issues

If clicking a nav button doesn't show the section:

1. Check button text in `navbar.html` matches `data-page` in the component (case-insensitive)
2. Verify the component was loaded in `loader.js`
3. Check browser console for fetch errors (404s indicate wrong path)
4. Ensure the component's `<article>` has both `data-page` and `id` attributes

### Testing Locally

Simply open [index.html](../index.html) in a browser with a local server (components load via fetch, which requires HTTP protocol):

```powershell
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js (if http-server installed)
npx http-server -p 8000
```

Navigate to `http://localhost:8000`

## Project Conventions

### File Naming

- Components: kebab-case HTML files in `/components/`
- Assets: organized in `/assets/{css,js,images}/`
- Standalone pages: Individual HTML files in root (e.g., `Analog-filter-design.html`, `machine-learning.html`) are **self-contained full pages** with their own inline sidebar/navbar HTML (not using component system). These are for deep-linked content from project items.

### CSS Architecture

- Single stylesheet: [assets/css/style.css](../assets/css/style.css) (2258 lines)
- Uses CSS custom properties (`:root` variables) for theming
- Mobile-first responsive design with breakpoints

### JavaScript Patterns

- No frameworks - vanilla ES6+ JavaScript
- Event delegation via data attributes
- Async component loading with `async/await`
- State management through CSS classes (`.active` toggles visibility)

### Backup Pattern

Files with `_backup` suffix (e.g., `index_backup.html`, `about_backup.html`) represent previous versions before componentization. These are **reference only** - changes should go in the active files.

## Common Modifications

### Updating Profile Information

Edit [components/sidebar.html](../components/sidebar.html) - name, title, social links, contact details.

### Adding Projects

Add new `<li>` with `data-filter-item` and `data-category` to [components/project.html](../components/project.html). Categories: `"finance and trading"`, `"machine learning"`, `"medical image analysis"`, etc.

Project items link to standalone HTML pages (e.g., `visualTrading.html`) which are self-contained pages with duplicated sidebar/navbar structure.

### Adding Content/Teaching Materials

Similar to projects, add items to [components/content.html](../components/content.html) with `data-filter-item` and `data-category="teaching"`. Content section uses the same filtering system as projects.

### Modifying Styles

All styles in [assets/css/style.css](../assets/css/style.css). Use existing CSS variables for consistency:

- Colors: `--onyx`, `--orange-yellow-crayola`, `--white-1`, etc.
- Typography: `--fs-1` through `--fs-8`, `--fw-300` through `--fw-600`

### Analytics

- Google Tag Manager (GTM-TNQ669G7)
- Google Analytics (UA-197040608-1)
- Tags are in [index.html](../index.html) `<head>` and before `</body>`

## External Dependencies

- **Ionicons v5.5.2**: Icon library loaded via CDN
- **Font Awesome 5.15.4**: Additional icons (graduation cap, RSS)
- **Google Fonts**: Poppins font family
- **No build tools**: Pure client-side rendering, no npm/webpack/bundlers

## Important Notes

- **Navigation dependency**: The navigation system matches button text to `data-page` values via `innerHTML.toLowerCase()` - this tight coupling means button text MUST match section names
- **Component loading order matters**: Sidebar and navbar load first, then other components, then navigation initializes
- **Active state**: "About" section displays by default via `.active` class added in [loader.js#L61-L64](../assets/js/loader.js)
- **Dual script files**: Both `loader.js` (component loading) and `script.js` (interactivity) are required
- **Filtering pattern reuse**: The same data-attribute-based filtering pattern is used in both `project.html` and `content.html` components - when adding filters, ensure button text matches category values (case-insensitive)
- **Standalone page duplication**: Standalone HTML pages (project detail pages) contain duplicated sidebar/navbar markup inline rather than using components - updates to profile info must be made in both `components/sidebar.html` AND individual standalone pages
