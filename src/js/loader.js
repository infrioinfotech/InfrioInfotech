document.addEventListener("DOMContentLoaded", () => {
  const prefix = window.rootPrefix || './';
  const isHome = window.isHomePage === true;
  
  const components = [
    { id: "faq-component", file: prefix + "src/components/faq.html" },
    { id: "navbar-component", file: prefix + "src/components/navbar.html" },
    { id: "marquee-component", file: prefix + "src/components/marquee.html" },
    { id: "services-component", file: prefix + "src/components/services.html" },
    { id: "footer-component", file: prefix + "src/components/footer.html" }
  ];

  components.forEach(comp => {
    const el = document.getElementById(comp.id);
    if (el) {
      fetch(comp.file)
        .then(res => {
          if (!res.ok) throw new Error("Failed to load " + comp.file);
          return res.text();
        })
        .then(html => {
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
        .catch(err => console.error(err));
    }
  });
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
