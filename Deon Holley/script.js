    document.getElementById("year").textContent = new Date().getFullYear();

// Basic interactivity: hamburger, filters, modal, simple accessibility

const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
const filters = document.querySelectorAll('.filter');
const gallery = document.getElementById('gallery');
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const bookBtn = document.getElementById('bookBtn');

document.getElementById('year').textContent = new Date().getFullYear();

// Toggle mobile nav
hamburger?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  if (mainNav.classList.contains('open')){
    mainNav.style.display = 'block';
  } else {
    mainNav.style.display = '';
  }
});

// Filter gallery
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    filterGallery(filter);
  });
});

function filterGallery(filter){
  const items = [...gallery.querySelectorAll('.item')];
  items.forEach(it => {
    const cat = it.dataset.category;
    if (filter === 'all' || cat === filter) {
      it.style.display = '';
      // small stagger animation
      it.style.opacity = '0';
      requestAnimationFrame(() => {
        it.style.transition = 'opacity .35s ease, transform .35s ease';
        it.style.opacity = '1';
        it.style.transform = 'translateY(0)';
      });
    } else {
      it.style.display = 'none';
      it.style.opacity = '0';
    }
  });
}

// Modal control
function openModal(){
  contactModal.setAttribute('aria-hidden','false');
  // Prevent background scroll
  document.body.style.overflow = 'hidden';
}
function closeModalFn(){
  contactModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
contactBtn?.addEventListener('click', openModal);
bookBtn?.addEventListener('click', openModal);
closeModal?.addEventListener('click', closeModalFn);
modalBackdrop?.addEventListener('click', closeModalFn);

// Close with Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModalFn();
});

// Simple lazy-loading for images to improve performance
document.addEventListener('DOMContentLoaded', () => {
  const imgs = [...document.querySelectorAll('.gallery img')];
  imgs.forEach(img => {
    img.loading = 'lazy';
  });
});


const form = document.getElementById("contactForm");
const submitBtn = document.querySelector("#contactForm button[type='submit']");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    showLoading();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        hideLoading();

        if (response.ok) {
            showSuccess();
            form.reset();
        } else {
            showError();
        }

    } catch (error) {
        hideLoading();
        showError();
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
});

/* SHOW LOADING */
function showLoading() {
    document.getElementById("loadingPopup").classList.add("show");
}

/* HIDE LOADING */
function hideLoading() {
    document.getElementById("loadingPopup").classList.remove("show");
}

/* SUCCESS */
function showSuccess() {
    const popup = document.getElementById("successPopup");
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
}

/* ERROR */
function showError() {
    const popup = document.getElementById("errorPopup");
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
}
