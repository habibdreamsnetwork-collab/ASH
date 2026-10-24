// ====== SETTINGS: change these to your real details ======
const WHATSAPP_NUMBER = "923332179161"; // country code + number, no + or spaces
const BUSINESS_NAME = "ASH Sofa Solution";
// ==========================================================

// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
}

// Highlight current page link
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === location.pathname.split("/").pop()) a.classList.add("active");
});

// Contact form -> sends the message to WhatsApp (same "direct message" idea)
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").trim();
    const phone = (data.get("phone") || "").trim();
    const email = (data.get("email") || "").trim();
    const product = data.get("product") || "General enquiry";
    const message = (data.get("message") || "").trim();

    if (!name || !phone || !message) {
      setStatus("Please fill name, phone and message.", true);
      return;
    }

    const text =
`New enquiry from ${BUSINESS_NAME} website
Name: ${name}
Phone: ${phone}
Email: ${email || "-"}
Interested in: ${product}

${message}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setStatus("Opening WhatsApp with your message...", false);
    form.reset();
  });
}

function setStatus(msg, isError) {
  const el = document.getElementById("form-status");
  if (!el) return;
  el.textContent = msg;
  el.style.color = isError ? "#8f0f12" : "#1b7f3b";
}
