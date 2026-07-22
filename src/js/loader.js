document.addEventListener("DOMContentLoaded", () => {
  const prefix = window.rootPrefix || './';
  const isHome = window.isHomePage === true;
  
  const components = [
    { id: "faq-component", name: "faq.html" },
    { id: "navbar-component", name: "navbar.html" },
    { id: "marquee-component", name: "marquee.html" },
    { id: "services-component", name: "services.html" },
    { id: "footer-component", name: "footer.html" }
  ];

  function tryFetch(paths, index, resolve, reject) {
    if (index >= paths.length) {
      return reject(new Error("Failed to load component from all candidate paths"));
    }
    const currentPath = paths[index];
    fetch(currentPath)
      .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
      })
      .then(html => resolve({ html, path: currentPath }))
      .catch(() => tryFetch(paths, index + 1, resolve, reject));
  }

  function loadComponent(comp) {
    const el = document.getElementById(comp.id);
    if (!el) return;

    const candidatePaths = [
      prefix + "src/components/" + comp.name,
      "../../src/components/" + comp.name,
      "../src/components/" + comp.name,
      "./src/components/" + comp.name,
      "/src/components/" + comp.name,
      prefix + "Components/" + comp.name,
      "./Components/" + comp.name
    ];

    new Promise((resolve, reject) => tryFetch(candidatePaths, 0, resolve, reject))
      .then(({ html, path: usedPath }) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        
        // Adjust images inside components
        temp.querySelectorAll("img").forEach(img => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("http") && !src.startsWith("data:") && !src.startsWith("/")) {
            if (src.startsWith("./")) {
              img.setAttribute("src", prefix + src.slice(2));
            } else if (!src.startsWith("../")) {
              img.setAttribute("src", prefix + src);
            }
          }
        });
        
        // Adjust anchors inside components
        temp.querySelectorAll("a").forEach(a => {
          const href = a.getAttribute("href");
          if (href) {
            if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
              return;
            }
            
            const cleanHref = href.replace(/^\.\//, '').replace(/\/$/, '');
            
            if (cleanHref === '' || cleanHref === '.' || cleanHref === '..' || cleanHref === '../..' || cleanHref === 'index.html' || cleanHref === '../../index.html') {
              a.setAttribute("href", isHome ? "./index.html" : "../../index.html");
            } else if (cleanHref === 'about-us' || cleanHref === 'about' || cleanHref === 'about.html') {
              a.setAttribute("href", isHome ? "./src/pages/about.html" : "./about.html");
            } else if (cleanHref === 'services' || cleanHref === 'services.html') {
              a.setAttribute("href", isHome ? "./src/pages/services.html" : "./services.html");
            } else if (cleanHref === 'website-design' || cleanHref === 'website-design.html') {
              a.setAttribute("href", isHome ? "./src/pages/website-design.html" : "./website-design.html");
            } else if (cleanHref === 'software-solutions' || cleanHref === 'software-solutions.html') {
              a.setAttribute("href", isHome ? "./src/pages/software-solutions.html" : "./software-solutions.html");
            } else if (cleanHref === 'app-development' || cleanHref === 'app-development.html') {
              a.setAttribute("href", isHome ? "./src/pages/app-development.html" : "./app-development.html");
            } else if (cleanHref === 'ui-ux-design' || cleanHref === 'ui-ux-design.html') {
              a.setAttribute("href", isHome ? "./src/pages/ui-ux-design.html" : "./ui-ux-design.html");
            } else if (cleanHref === 'project' || cleanHref === 'project.html') {
              a.setAttribute("href", isHome ? "./src/pages/project.html" : "./project.html");
            } else if (cleanHref === 'pricing-plan' || cleanHref === 'pricing' || cleanHref === 'pricing.html') {
              a.setAttribute("href", isHome ? "./src/pages/pricing.html" : "./pricing.html");
            } else if (cleanHref === 'blog' || cleanHref === 'blog.html') {
              a.setAttribute("href", isHome ? "./src/pages/blog.html" : "./blog.html");
            } else if (cleanHref === 'contact-us' || cleanHref === 'contact' || cleanHref === 'contact-us.html') {
              a.setAttribute("href", isHome ? "./src/pages/contact-us.html" : "./contact-us.html");
            } else if (isHome) {
              if (!cleanHref.startsWith("src/pages/")) {
                a.setAttribute("href", "./src/pages/" + cleanHref + (cleanHref.endsWith(".html") ? "" : ".html"));
              }
            }
          }
        });
        
        // Inject updated HTML
        el.outerHTML = temp.innerHTML;
        
        const scripts = temp.querySelectorAll("script");
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          document.body.appendChild(newScript);
        });
      })
      .catch(err => console.error("Component load error for " + comp.name + ":", err));
  }

  components.forEach(loadComponent);
});

// ========================================================
// NATIVE FAIL-SAFE SCROLL ANIMATIONS ENGINE
// ========================================================
const observedElements = new WeakSet();

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      let animationClass = 'fadeIn'; // default animation fallback
      const settingsStr = element.getAttribute('data-settings');
      if (settingsStr) {
        try {
          const settings = JSON.parse(settingsStr);
          animationClass = settings.animation || settings._animation || 'fadeIn';
        } catch (e) {
          // ignore parsing errors
        }
      }
      
      element.classList.add('animated', animationClass);
      element.style.visibility = 'visible';
    }
  });
}, {
  threshold: 0.1
});

window.initScrollAnimations = function() {
  const animatedElements = document.querySelectorAll('.elementor-invisible, [data-settings*="animation"]');
  animatedElements.forEach(el => {
    if (!observedElements.has(el)) {
      observedElements.add(el);
      animationObserver.observe(el);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  window.initScrollAnimations();
  setTimeout(window.initScrollAnimations, 500);
  setTimeout(window.initScrollAnimations, 1500);
});
