document.addEventListener("DOMContentLoaded", () => {
  const prefix = window.rootPrefix || './';
  const components = [
    { id: "faq-component", file: prefix + "Components/faq.html" },
    { id: "navbar-component", file: prefix + "Components/navbar.html" },
    { id: "marquee-component", file: prefix + "Components/marquee.html" },
    { id: "services-component", file: prefix + "Components/services.html" },
    { id: "footer-component", file: prefix + "Components/footer.html" }
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
          // Re-evaluate script tags and update relative paths inside the loaded HTML
          const temp = document.createElement("div");
          temp.innerHTML = html;
          
          // Adjust images
          temp.querySelectorAll("img").forEach(img => {
            const src = img.getAttribute("src");
            if (src && !src.startsWith("http") && !src.startsWith("/") && !src.startsWith(".")) {
              img.setAttribute("src", prefix + src);
            }
          });
          
          // Adjust anchors
          temp.querySelectorAll("a").forEach(a => {
            const href = a.getAttribute("href");
            if (href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#") && !href.startsWith("javascript:")) {
              if (href === "." || href === "./") {
                a.setAttribute("href", prefix);
              } else {
                a.setAttribute("href", prefix + href);
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