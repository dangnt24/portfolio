"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$("[data-year]").textContent = new Date().getFullYear();
const menu = $(".menu-toggle");
const nav = $("#main-nav");
const mobile = matchMedia("(max-width: 760px)");
function setMenu(open, restoreFocus = false) {
  menu.setAttribute("aria-expanded", String(open));
  menu.innerHTML = `Menu <span aria-hidden="true">${open ? "−" : "+"}</span>`;
  nav.hidden = mobile.matches && !open;
  if (restoreFocus) menu.focus();
}
function syncMenu() { menu.hidden = !mobile.matches; setMenu(false); }
syncMenu();
mobile.addEventListener("change", syncMenu);
menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", event => { if (event.target.closest("a") && mobile.matches) setMenu(false); });
document.addEventListener("click", event => { if (mobile.matches && !event.target.closest(".site-header")) setMenu(false); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && mobile.matches && menu.getAttribute("aria-expanded") === "true") setMenu(false, true); });
// This demo is local to the supplied machine. Hide it on public deployments.
if (!["localhost", "127.0.0.1", "[::1]", ""].includes(location.hostname)) $$(".local-demo").forEach(link => { link.hidden = true; });
const copyButton = $(".copy-email");
const announcement = $("[data-announcement]");
let copyReset;
copyButton.addEventListener("click", async () => {
  clearTimeout(copyReset);
  const emailLink = $(".email-link");
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(emailLink.textContent.trim());
    copyButton.textContent = "Đã sao chép ✓";
    announcement.textContent = "Đã sao chép địa chỉ email.";
  } catch {
    const range = document.createRange(); range.selectNodeContents(emailLink);
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    copyButton.textContent = "Nhấn Ctrl+C";
    announcement.textContent = "Đã chọn email. Dùng lệnh sao chép trên thiết bị của bạn.";
  }
  copyReset = setTimeout(() => { copyButton.textContent = "Sao chép ↗"; }, 3000);
});
const lightbox = $(".lightbox");
const lightboxImage = $("img", lightbox);
const closeButton = $(".lightbox-close");
let lightboxTrigger;
$$('[data-preview]').forEach(button => button.addEventListener("click", () => {
  if (typeof lightbox.showModal !== "function") { window.open(button.dataset.preview, "_blank", "noopener,noreferrer"); return; }
  lightboxTrigger = button;
  lightboxImage.src = button.dataset.preview;
  lightboxImage.alt = button.dataset.caption;
  $("#lightbox-caption").textContent = button.dataset.caption;
  lightbox.showModal(); document.body.classList.add("modal-open"); closeButton.focus();
}));
closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target !== lightbox) return;
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});
lightbox.addEventListener("close", () => { document.body.classList.remove("modal-open"); lightboxImage.removeAttribute("src"); lightboxTrigger?.focus(); });
if ("IntersectionObserver" in window) {
  const sectionNav = { home: null, work: "work", "case-study": "work", experience: "experience", about: "about", contact: "contact" };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const current = sectionNav[entry.target.id];
      $$("[data-nav]").forEach(link => { if (link.hash === `#${current}`) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current"); });
    });
  }, { rootMargin: "-12% 0px -60% 0px", threshold: 0 });
  $$("main > section").forEach(section => observer.observe(section));
}


// Keep the frame stable while changing screens. The lightbox opens the original.
const galleryShot = $(".gallery-image");
const galleryPhoto = $("img", galleryShot);
const galleryButtons = $$("[data-gallery-src]");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
galleryPhoto.addEventListener("load", () => {
  if (reducedMotion.matches || typeof galleryPhoto.animate !== "function") return;
  galleryPhoto.getAnimations().forEach(animation => animation.cancel());
  galleryPhoto.animate([{ opacity: .6 }, { opacity: 1 }], { duration: 240, easing: "ease-out" });
});
const galleryDescriptions = [
  "Xem ảnh phòng, giá thuê và diện tích trước khi lựa chọn.",
  "Không gian chào đón người thuê, với thông tin tìm phòng rõ ràng.",
  "Tập trung thông tin phòng, tiện nghi và chi phí trước khi quyết định.",
  "Cổng đăng nhập riêng cho chủ trọ, người quản lý và người thuê."
];
galleryButtons.forEach((button, index) => button.addEventListener("click", () => {
  if (button.getAttribute("aria-pressed") === "true") return;
  galleryButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  galleryShot.classList.toggle("is-home", button.dataset.galleryKind === "home");
  galleryShot.classList.toggle("is-detail", button.dataset.galleryKind === "detail");
  galleryPhoto.src = button.dataset.gallerySrc;
  galleryPhoto.alt = button.dataset.galleryAlt;
  galleryShot.dataset.preview = button.dataset.gallerySrc;
  galleryShot.dataset.caption = `DVP Home - ${button.dataset.galleryLabel}`;
  $("[data-gallery-title]").textContent = `DVP Home / ${button.dataset.galleryLabel}`;
  $(".gallery-counter").textContent = `${String(index + 1).padStart(2, "0")} / 04`;
  $(".gallery-caption").textContent = galleryDescriptions[index];
}));

let progressScheduled = false;
const progressBar = $(".reading-progress");
function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0})`;
  progressScheduled = false;
}
addEventListener("scroll", () => {
  if (!progressScheduled) {
    progressScheduled = true;
    requestAnimationFrame(updateReadingProgress);
  }
}, { passive: true });
addEventListener("resize", updateReadingProgress);
updateReadingProgress();


// Reveal a few content blocks once. They stay visible if JS or motion is unavailable.
if ("IntersectionObserver" in window) {
  const entrances = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) entry.target.classList.add("motion-enter");
      entrances.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
  $$(".work-intro, .featured-project, .architecture, .experience-row, .about-grid").forEach(element => entrances.observe(element));
  reducedMotion.addEventListener("change", event => {
    if (!event.matches) return;
    $$(".motion-enter").forEach(element => element.classList.remove("motion-enter"));
    galleryPhoto.getAnimations?.().forEach(animation => animation.cancel());
  });
}
