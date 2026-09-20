// Load artist data
async function loadAboutData() {
  if (!window.supabaseClient) {
    console.warn('Supabase not initialized');
    return;
  }

  try {
    const { data: artist } = await window.supabaseClient.from('artist').select('*').single();
    const { data: practice } = await window.supabaseClient.from('practice').select('*').single();
    const { data: contact } = await window.supabaseClient.from('contact').select('*').single();

    if (artist) {
      const nameParts = artist.name.split(' ');
      document.getElementById('artist-name').innerHTML = `${nameParts[0]}<br>${nameParts[1] || ''}`;
      document.getElementById('artist-bio').textContent = artist.bio;
      document.getElementById('artist-location').innerHTML = `${artist.location}<br>${artist.working_scope}`;
      document.getElementById('footer-name').textContent = artist.name;
      document.querySelector('.copyright').textContent = `© 2026 ${artist.name}. All rights reserved.`;
      document.title = `About - ${artist.name}`;
    }

    if (practice) {
      document.getElementById('practice-desc').textContent = practice.description;
    }

    if (contact) {
      // Update WhatsApp button
      const whatsappBtn = document.getElementById('whatsapp-btn');
      if (whatsappBtn && contact.whatsapp) {
        const cleanNumber = contact.whatsapp.replace(/[^0-9]/g, '');
        whatsappBtn.href = `https://wa.me/${cleanNumber}`;
        whatsappBtn.style.display = 'flex';
      }
      
      const socials = document.querySelectorAll('.socials');
      socials.forEach(group => {
        group.innerHTML = `
          <a href="${contact.instagram || '#'}" target="_blank" aria-label="Instagram" title="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="${contact.twitter || '#'}" target="_blank" aria-label="Twitter" title="Twitter/X">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>
          <a href="${contact.youtube || '#'}" target="_blank" aria-label="YouTube" title="YouTube">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
          </a>
        `;
      });
    }

    // Trigger reveal animations
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Loader
const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 450));

// Mobile menu
const menu = document.querySelector('.mobile-menu');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

// Reveal animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Load data
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => loadAboutData(), 100);
});
