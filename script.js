// Load portfolio data from Supabase
async function loadPortfolioData() {
  // Wait for supabase client to be ready
  if (!window.supabaseClient) {
    console.warn('Supabase client not initialized. Please configure your credentials in config.js');
    return;
  }

  try {
    // Fetch artist data
    const { data: artist } = await window.supabaseClient
      .from('artist')
      .select('*')
      .single();

    // Fetch practice data
    const { data: practice } = await window.supabaseClient
      .from('practice')
      .select('*')
      .single();

    // Fetch contact data
    const { data: contact } = await window.supabaseClient
      .from('contact')
      .select('*')
      .single();

    // Fetch works
    const { data: works } = await window.supabaseClient
      .from('works')
      .select('*')
      .order('display_order', { ascending: true });

    // Fetch exhibitions
    const { data: exhibitions } = await window.supabaseClient
      .from('exhibitions')
      .select('*')
      .order('display_order', { ascending: true });

    populateContent({ artist, practice, contact, works, exhibitions });
  } catch (error) {
    console.error('Error loading data:', error);
    console.error('Make sure you have configured Supabase and created the database tables.');
  }
}

function populateContent(data) {
  if (!data.artist) return;

  // Update artist name
  const nameParts = data.artist.name.split(' ');
  document.querySelector('.artist-copy h2').innerHTML = `${nameParts[0]}<br>${nameParts[1] || ''}`;
  document.querySelector('.copyright').textContent = `© 2026 ${data.artist.name}. All rights reserved.`;
  
  // Update artist bio
  document.querySelector('.body-copy').textContent = data.artist.bio;
  document.querySelector('.location').innerHTML = `${data.artist.location}<br>${data.artist.working_scope}`;
  
  // Update practice
  if (data.practice) {
    document.querySelector('.practice h2').textContent = data.practice.description;
  }
  
  // Update contact
  if (data.contact) {
    document.querySelector('.contact-content a').href = `mailto:${data.contact.email}`;
    
    // Update WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
      if (data.contact.whatsapp) {
        const cleanNumber = data.contact.whatsapp.replace(/[^0-9]/g, '');
        whatsappBtn.href = `https://wa.me/${cleanNumber}`;
        whatsappBtn.style.display = 'flex';
        console.log('WhatsApp button enabled with number:', cleanNumber);
      } else {
        whatsappBtn.style.display = 'none';
        console.log('WhatsApp button hidden - no number provided');
      }
    } else {
      console.error('WhatsApp button element not found');
    }
    
    const socials = document.querySelectorAll('.socials');
    socials.forEach(socialGroup => {
      socialGroup.innerHTML = `
        <a href="${data.contact.instagram || '#'}" target="_blank" aria-label="Instagram" title="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a href="${data.contact.twitter || '#'}" target="_blank" aria-label="Twitter" title="Twitter/X">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </a>
        <a href="${data.contact.youtube || '#'}" target="_blank" aria-label="YouTube" title="YouTube">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
          </svg>
        </a>
      `;
    });
  }
  
  // Populate works
  if (data.works && data.works.length > 0) {
    const workGrid = document.querySelector('.work-grid');
    workGrid.innerHTML = data.works.map(work => `
      <article class="art-card ${work.is_large ? 'large' : ''} reveal">
        <div class="art-image" style="background-image:url('${work.image_url}')"></div>
        <div class="art-info">
          <h3>${work.title}</h3>
          <p>${work.year} &nbsp; / &nbsp; ${work.medium} &nbsp; / &nbsp; ${work.dimensions}</p>
        </div>
      </article>
    `).join('');
  }
  
  // Populate exhibitions
  if (data.exhibitions && data.exhibitions.length > 0) {
    const exhibitionList = document.querySelector('.exhibition-list');
    exhibitionList.innerHTML = data.exhibitions.map(ex => `
      <div>
        <strong>${ex.year}</strong>
        <span>${ex.title}<small>${ex.type} / ${ex.location}</small></span>
      </div>
    `).join('');
  }
  
  // Re-observe reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

const loader=document.querySelector('.loader');
const loaderImg=new Image();
loaderImg.src='images/asap-logo.png';
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),450));

const menu=document.querySelector('.mobile-menu');
const toggle=document.querySelector('.menu-toggle');
toggle.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
  toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
  document.body.style.overflow=open?'hidden':'';
});
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{
  menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.style.overflow='';
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'})}
  })
});

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
  // Wait for supabase to initialize with retries
  let retries = 0;
  const maxRetries = 20;
  
  const checkAndLoad = () => {
    if (window.supabaseClient) {
      console.log('Supabase ready, loading portfolio data');
      loadPortfolioData();
    } else if (retries < maxRetries) {
      retries++;
      console.log(`Waiting for Supabase... (attempt ${retries}/${maxRetries})`);
      setTimeout(checkAndLoad, 100);
    } else {
      console.error('Supabase failed to initialize after', maxRetries, 'attempts');
    }
  };
  
  checkAndLoad();
});
