"use strict";

// EDIT HERE. Keep placeholders until you have real contact details and URLs.
// CV_URL may be relative, for example: assets/Nguyen-Thanh-Dang-CV.pdf
const CONFIG = Object.freeze({
  EMAIL: "YOUR_EMAIL",
  GITHUB_URL: "YOUR_GITHUB_URL",
  LINKEDIN_URL: "YOUR_LINKEDIN_URL",
  CV_URL: "YOUR_CV_URL",
  NHATRO_DEMO_URL: "YOUR_NHATRO_DEMO_URL",
  NHATRO_CODE_URL: "YOUR_NHATRO_CODE_URL",
  PROJECT_STATUS: "ACTIVE DEVELOPMENT",
  PROJECT_CURRENT: "Currently rebuilding and deploying the system.",
  PROJECT_NEXT: "[ADD PROJECT DETAILS: the next development milestone]"
});

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const isConfigured = value => typeof value === "string" && value.trim() !== "" && !value.startsWith("YOUR_");

function getSafeURL(value, allowRelative = false) {
  if (!isConfigured(value)) return null;
  try {
    const url = new URL(value, document.baseURI);
    if (url.protocol === "https:" || url.protocol === "http:") {
      if (allowRelative || /^https?:\/\//i.test(value)) return url;
    }
    // A local CV also works when opening index.html directly.
    if (allowRelative && url.protocol === "file:" && !/^[a-z][a-z\d+.-]*:/i.test(value)) return url;
  } catch { /* Invalid URLs remain unavailable. */ }
  return null;
}

// Bind real links only. Placeholders never become href values.
$$('[data-config-link]').forEach(link => {
  const key = link.dataset.configLink;
  const url = getSafeURL(CONFIG[key], key === "CV_URL");
  if (!url) return;
  link.href = url.href;
  link.removeAttribute("aria-disabled");
  link.removeAttribute("role");
  link.removeAttribute("title");
  if (key === "CV_URL") link.setAttribute("download", "");
  if (url.origin !== location.origin) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

$('[data-project-status]').textContent = CONFIG.PROJECT_STATUS;
$('[data-project-current]').textContent = CONFIG.PROJECT_CURRENT;
const next = $('[data-project-next]');
next.textContent = CONFIG.PROJECT_NEXT;
next.classList.toggle("editor-note", CONFIG.PROJECT_NEXT.startsWith("[ADD"));
$('[data-year]').textContent = new Date().getFullYear();

const emailLink = $('[data-email-link]');
const copyButton = $('.copy-email');
const contactNote = $('[data-contact-note]');
const announcement = $('[data-announcement]');
const email = CONFIG.EMAIL.trim();
if (isConfigured(email) && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
  emailLink.textContent = email;
  emailLink.href = `mailto:${email}`;
  emailLink.removeAttribute("aria-disabled");
  emailLink.removeAttribute("role");
  copyButton.disabled = false;
  copyButton.removeAttribute("title");
  contactNote.textContent = "Send an email or copy the address.";
}
let copyReset;
copyButton.addEventListener("click", async () => {
  clearTimeout(copyReset);
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(email);
    copyButton.textContent = "Copied ✓";
    announcement.textContent = "Email address copied.";
  } catch {
    // Clipboard can be unavailable for file:// or insecure HTTP contexts.
    const range = document.createRange();
    range.selectNodeContents(emailLink);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    contactNote.textContent = "Email selected. Use your device’s Copy command.";
    announcement.textContent = contactNote.textContent;
  }
  copyReset = setTimeout(() => { copyButton.textContent = "Copy ↗"; }, 2500);
});

// Mobile navigation stays visible if JavaScript is unavailable.
const menuButton = $('.menu-toggle');
const nav = $('#main-nav');
const mobileQuery = matchMedia("(max-width: 600px)");
function setMenu(open, returnFocus = false) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.innerHTML = `Menu <span aria-hidden="true">${open ? "−" : "+"}</span>`;
  nav.hidden = mobileQuery.matches && !open;
  if (returnFocus) menuButton.focus();
}
function syncMenu() {
  menuButton.hidden = !mobileQuery.matches;
  setMenu(false);
}
syncMenu();
mobileQuery.addEventListener("change", syncMenu);
menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", event => {
  if (event.target.closest("a") && mobileQuery.matches) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && mobileQuery.matches && menuButton.getAttribute("aria-expanded") === "true") setMenu(false, true);
});
document.addEventListener("click", event => {
  if (mobileQuery.matches && !event.target.closest(".site-header")) setMenu(false);
});

// CSS handles smooth anchor scrolling and prefers-reduced-motion.
// The observer covers intervening sections, keeping navigation meaningful.
if ("IntersectionObserver" in window) {
  const sectionNav = new Map([
    ["home", null], ["work", "work"], ["case-study", "work"],
    ["experience", "experience"], ["stack", "experience"],
    ["about", "about"], ["contact", "contact"]
  ]);
  const activeObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const activeID = sectionNav.get(entry.target.id);
      $$('[data-nav]').forEach(link => {
        if (link.hash === `#${activeID}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
  $$('main > section').forEach(section => activeObserver.observe(section));

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    $$('.section-intro, .experience-row, .stack-row').forEach(element => revealObserver.observe(element));
  }
}

// Missing images keep the designed placeholder. Adding a file requires no code edits.
$$('.screen').forEach(figure => {
  const image = $('img', figure);
  const button = $('.screen-open', figure);
  const fallback = $('.screen-placeholder', figure);
  function updateImage() {
    const loaded = image.complete && image.naturalWidth > 0;
    image.hidden = !loaded;
    fallback.hidden = loaded;
    button.disabled = !loaded || typeof $('.lightbox').showModal !== "function";
    $('[data-screen-state]', figure).textContent = loaded ? "PRODUCT SCREENSHOT" : "AWAITING SCREENSHOT";
  }
  image.addEventListener("load", updateImage);
  image.addEventListener("error", updateImage);
  updateImage();
});

const lightbox = $('.lightbox');
const lightboxImage = $('img', lightbox);
const closeButton = $('.lightbox-close');
let lightboxTrigger = null;
$$('.screen-open').forEach(button => button.addEventListener("click", () => {
  const image = $('img', button);
  if (!image.naturalWidth || typeof lightbox.showModal !== "function") return;
  lightboxTrigger = button;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  $('.lightbox-caption').textContent = image.alt;
  lightbox.showModal();
  document.body.classList.add("modal-open");
  closeButton.focus();
}));
closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});
lightbox.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  lightboxImage.removeAttribute("src");
  lightboxTrigger?.focus();
});
