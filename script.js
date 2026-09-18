const SITE_CONTENT = {
  aboutBio: "[TBD \u2014 OMBU COLLECTIVE BIO]",
  artists: [
    {
      name: "[ARTIST 01]",
      bio: "[TBD \u2014 SHORT BIO]",
      photo: "assets/artists/artist-01.jpg",
      links: {
        instagram: "[TBD]",
        soundcloud: "[TBD]",
        bandcamp: "[TBD]"
      }
    },
    {
      name: "[ARTIST 02]",
      bio: "[TBD \u2014 SHORT BIO]",
      photo: "assets/artists/artist-02.jpg",
      links: {
        instagram: "[TBD]",
        soundcloud: "[TBD]",
        bandcamp: "[TBD]"
      }
    },
    {
      name: "[ARTIST 03]",
      bio: "[TBD \u2014 SHORT BIO]",
      photo: "assets/artists/artist-03.jpg",
      links: {
        instagram: "[TBD]",
        soundcloud: "[TBD]",
        bandcamp: "[TBD]"
      }
    },
    {
      name: "[ARTIST 04]",
      bio: "[TBD \u2014 SHORT BIO]",
      photo: "assets/artists/artist-04.jpg",
      links: {
        instagram: "[TBD]",
        soundcloud: "[TBD]",
        bandcamp: "[TBD]"
      }
    }
  ],
  media: [
    "assets/photos/photo-01.jpg",
    "assets/photos/photo-02.jpg",
    "assets/photos/photo-03.jpg",
    "assets/photos/photo-04.jpg",
    "assets/photos/photo-05.jpg",
    "assets/photos/photo-06.jpg",
    "assets/photos/photo-07.jpg",
    "assets/photos/photo-08.jpg"
  ],
  social: {
    instagram: "[TBD]",
    soundcloud: "[TBD]",
    youtube: "[TBD]",
    bandcamp: "[TBD]"
  },
  contactEmail: "[TBD \u2014 EMAIL]"
};

const LABELS = {
  instagram: "Instagram",
  soundcloud: "SoundCloud",
  youtube: "YouTube",
  bandcamp: "Bandcamp"
};

const isKnownUrl = (value) => {
  if (!value || value.includes("[TBD]")) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const createExternalLink = (label, value, className = "") => {
  const hasUrl = isKnownUrl(value);
  const element = document.createElement(hasUrl ? "a" : "span");
  element.className = className || "profile-link";

  if (className === "listen-link") {
    const name = document.createElement("span");
    const status = document.createElement("span");
    name.textContent = label;
    status.textContent = hasUrl ? "Open" : "[TBD]";
    element.append(name, status);
  } else {
    element.textContent = hasUrl ? label : `${label} [TBD]`;
  }

  if (hasUrl) {
    element.href = value;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    element.setAttribute("aria-label", `${label} opens in a new tab`);
  } else {
    element.classList.add("is-disabled");
    element.setAttribute("aria-disabled", "true");
  }

  return element;
};

const createImage = (src, alt) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => image.classList.add("is-missing"), { once: true });
  return image;
};

const renderArtists = () => {
  const mount = document.querySelector("[data-artists]");
  if (!mount) return;

  const fragment = document.createDocumentFragment();

  SITE_CONTENT.artists.forEach((artist, index) => {
    const article = document.createElement("article");
    article.className = "artist reveal";

    const media = document.createElement("div");
    media.className = "artist-media";
    media.dataset.label = `Artist ${String(index + 1).padStart(2, "0")}`;
    media.append(createImage(artist.photo, `${artist.name} portrait placeholder`));

    const title = document.createElement("h3");
    title.textContent = artist.name;

    const bio = document.createElement("p");
    bio.textContent = artist.bio;

    const links = document.createElement("div");
    links.className = "profile-links";
    Object.entries(artist.links).forEach(([key, value]) => {
      links.append(createExternalLink(LABELS[key] || key, value));
    });

    article.append(media, title, bio, links);
    fragment.append(article);
  });

  mount.append(fragment);
};

const renderMedia = () => {
  const mount = document.querySelector("[data-media-gallery]");
  if (!mount) return;

  const fragment = document.createDocumentFragment();

  SITE_CONTENT.media.forEach((src, index) => {
    const figure = document.createElement("figure");
    figure.className = "media-item reveal";
    figure.dataset.label = `Photo ${String(index + 1).padStart(2, "0")}`;
    figure.append(createImage(src, `OMBU Collective media placeholder ${index + 1}`));
    fragment.append(figure);
  });

  mount.append(fragment);
};

const renderSocialLinks = () => {
  const listenMount = document.querySelector("[data-social-links]");
  const footerMount = document.querySelector("[data-footer-links]");

  Object.entries(SITE_CONTENT.social).forEach(([key, value]) => {
    const label = LABELS[key] || key;
    listenMount?.append(createExternalLink(label, value, "listen-link"));
    footerMount?.append(createExternalLink(label, value));
  });
};

const renderContact = () => {
  const contact = document.querySelector("[data-contact-link]");
  if (!contact) return;

  const email = SITE_CONTENT.contactEmail;
  contact.textContent = email;

  if (email && !email.includes("[TBD]") && email.includes("@")) {
    contact.href = `mailto:${email}`;
  } else {
    contact.removeAttribute("href");
    contact.classList.add("is-disabled");
  }
};

const renderAbout = () => {
  const about = document.querySelector("[data-about-bio]");
  if (about) about.textContent = SITE_CONTENT.aboutBio;
};

const initReveal = () => {
  const elements = document.querySelectorAll(".reveal");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
};

const initNavigation = () => {
  const header = document.querySelector("[data-header]");
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setScrolledState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.38 }
  );

  sections.forEach((section) => observer.observe(section));
};

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderArtists();
  renderMedia();
  renderSocialLinks();
  renderContact();
  initReveal();
  initNavigation();
});
