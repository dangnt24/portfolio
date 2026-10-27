"use strict";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$("[data-year]").textContent = new Date().getFullYear();
const menu = $(".menu-toggle");
const nav = $("#main-nav");
const mobile = matchMedia("(max-width: 600px)");
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
