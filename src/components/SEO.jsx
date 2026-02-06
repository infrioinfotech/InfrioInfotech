import { useEffect } from 'react';

const DOMAIN = 'https://infrioinfotech.qzz.io';

function ensureTag(selector, createFn) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = createFn();
    document.head.appendChild(tag);
  }
  return tag;
}

function setMetaName(name, content) {
  const tag = ensureTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  });
  tag.setAttribute('content', content || '');
}

function setMetaProperty(property, content) {
  const tag = ensureTag(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', property);
    return el;
  });
  tag.setAttribute('content', content || '');
}

function setCanonical(href) {
  const tag = ensureTag('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  });
  tag.setAttribute('href', href || DOMAIN);
}

function setJsonLd(id, data) {
  const selector = `script[type="application/ld+json"][data-id="${id}"]`;
  const tag = ensureTag(selector, () => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-id', id);
    return el;
  });
  tag.textContent = JSON.stringify(data);
}

const SEO = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  robots = 'index,follow',
  jsonLd = [],
}) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaName('description', description);

    const canonicalUrl = canonical || DOMAIN;
    setCanonical(canonicalUrl);

    const finalOgTitle = ogTitle || title || 'Infrio Infotech';
    const finalOgDesc = ogDescription || description || 'IT services and software solutions by Infrio Infotech.';
    const finalOgUrl = ogUrl || canonicalUrl;
    const finalOgImage = ogImage || `${DOMAIN}/infrio/Logo.png`;

    setMetaProperty('og:type', 'website');
    setMetaProperty('og:title', finalOgTitle);
    setMetaProperty('og:description', finalOgDesc);
    setMetaProperty('og:image', finalOgImage);
    setMetaProperty('og:url', finalOgUrl);

    setMetaName('twitter:card', twitterCard);
    setMetaName('twitter:title', finalOgTitle);
    setMetaName('twitter:description', finalOgDesc);
    setMetaName('twitter:image', finalOgImage);

    setMetaName('robots', robots);

    jsonLd.forEach((item, idx) => {
      setJsonLd(`jsonld-${idx}`, item);
    });
  }, [
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    robots,
    jsonLd,
  ]);

  return null;
};

export default SEO;
