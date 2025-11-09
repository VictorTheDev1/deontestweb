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

// Initial layout: show all
filterGallery('all');
