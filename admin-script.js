// Check authentication status
console.log('🔵 admin-script.js loaded successfully');
let currentUser = null;

// Get supabase client
function getSupabase() {
  return window.supabaseClient;
}

// Wait for supabase to be ready
function waitForSupabase() {
  return new Promise((resolve) => {
    const checkSupabase = () => {
      if (window.supabaseClient) {
        resolve(window.supabaseClient);
      } else {
        setTimeout(checkSupabase, 100);
      }
    };
    checkSupabase();
  });
}

async function checkAuth() {
  const supabase = await waitForSupabase();
  
  if (!supabase) {
    document.getElementById('login-error').textContent = 'Supabase not configured. Please update config.js';
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    currentUser = user;
    showAdminPanel();
    loadData();
  } else {
    showLoginScreen();
  }
}

function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
}

function showAdminPanel() {
  console.log('showAdminPanel called');
  const loginScreen = document.getElementById('login-screen');
  const adminPanel = document.getElementById('admin-panel');
  
  console.log('Login screen element:', loginScreen);
  console.log('Admin panel element:', adminPanel);
  
  loginScreen.style.display = 'none';
  adminPanel.style.display = 'block';
  document.getElementById('user-email').textContent = currentUser.email;
  
  console.log('Display changed - login hidden, admin shown');
}

// Initialize everything after DOM and Supabase are ready
async function initializeAdmin() {
  console.log('🔵 initializeAdmin called');
  // Wait for Supabase
  console.log('🔵 Waiting for Supabase...');
  await waitForSupabase();
  console.log('🔵 Supabase ready!');
  
  // Setup event listeners
  console.log('🔵 Setting up event listeners...');
  setupEventListeners();
  console.log('🔵 Event listeners set up');
  
  // Check authentication
  console.log('🔵 Checking authentication...');
  checkAuth();
}

function setupEventListeners() {
  // Login form
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log('Attempting login with email:', email);
    
    const supabase = getSupabase();
    const errorEl = document.getElementById('login-error');
    
    if (!supabase) {
      console.error('Supabase not initialized');
      errorEl.textContent = 'Supabase not initialized. Please refresh the page.';
      return;
    }
    
    // Clear previous errors
    errorEl.textContent = 'Logging in...';
    errorEl.style.color = '#4a9eff';
    
    try {
      console.log('Calling supabase.auth.signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log('Login response:', { data, error });
      
      if (error) {
        console.error('Login error:', error);
        
        // Provide helpful error messages
        errorEl.style.color = '#e74c3c';
        if (error.message.includes('Invalid login credentials')) {
          errorEl.textContent = 'Invalid email or password. Please check your credentials.';
        } else if (error.message.includes('Email not confirmed')) {
          errorEl.textContent = 'Please confirm your email address before logging in.';
        } else if (error.message.includes('User not found')) {
          errorEl.textContent = 'User not found. Please create an account in Supabase dashboard.';
        } else {
          errorEl.textContent = error.message || 'Login failed. Please try again.';
        }
      } else {
        console.log('Login successful!', data.user);
        currentUser = data.user;
        console.log('Calling showAdminPanel...');
        showAdminPanel();
        console.log('Admin panel should be visible now');
        loadData();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      errorEl.textContent = 'An unexpected error occurred. Please check the console.';
    }
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    
    await supabase.auth.signOut();
    currentUser = null;
    showLoginScreen();
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
    });
  });

  // Artist form
  document.getElementById('artist-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const supabase = getSupabase();
    
    const artistData = {
      name: document.getElementById('artist-name').value,
      bio: document.getElementById('artist-bio').value,
      location: document.getElementById('artist-location').value,
      working_scope: document.getElementById('artist-scope').value,
      updated_at: new Date().toISOString()
    };
    
    const practiceData = {
      description: document.getElementById('practice-desc').value,
      updated_at: new Date().toISOString()
    };
    
    // Update artist
    const { data: existingArtist } = await supabase.from('artist').select('id').single();
    if (existingArtist) {
      await supabase.from('artist').update(artistData).eq('id', existingArtist.id);
    } else {
      await supabase.from('artist').insert([artistData]);
    }
    
    // Update practice
    const { data: existingPractice } = await supabase.from('practice').select('id').single();
    if (existingPractice) {
      await supabase.from('practice').update(practiceData).eq('id', existingPractice.id);
    } else {
      await supabase.from('practice').insert([practiceData]);
    }
    
    alert('Artist information saved successfully!');
  });

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const supabase = getSupabase();
    
    const contactData = {
      email: document.getElementById('contact-email').value,
      whatsapp: document.getElementById('contact-whatsapp').value,
      instagram: document.getElementById('contact-instagram').value,
      twitter: document.getElementById('contact-twitter').value,
      youtube: document.getElementById('contact-youtube').value,
      updated_at: new Date().toISOString()
    };
    
    const { data: existing } = await supabase.from('contact').select('id').single();
    if (existing) {
      await supabase.from('contact').update(contactData).eq('id', existing.id);
    } else {
      await supabase.from('contact').insert([contactData]);
    }
    
    alert('Contact information saved successfully!');
  });

  // Add work button
  document.getElementById('add-work').addEventListener('click', () => {
    showWorkModal();
  });

  // Add exhibition button
  document.getElementById('add-exhibition').addEventListener('click', () => {
    showExhibitionModal();
  });
}



// Load all data from Supabase
async function loadData() {
  await loadArtistData();
  await loadContactData();
  await renderWorks();
  await renderExhibitions();
}

// Load artist data
async function loadArtistData() {
  const supabase = getSupabase();
  const { data: artist } = await supabase.from('artist').select('*').single();
  const { data: practice } = await supabase.from('practice').select('*').single();
  
  if (artist) {
    document.getElementById('artist-name').value = artist.name || '';
    document.getElementById('artist-bio').value = artist.bio || '';
    document.getElementById('artist-location').value = artist.location || '';
    document.getElementById('artist-scope').value = artist.working_scope || '';
  }
  
  if (practice) {
    document.getElementById('practice-desc').value = practice.description || '';
  }
}

// Load contact data
async function loadContactData() {
  const supabase = getSupabase();
  const { data: contact } = await supabase.from('contact').select('*').single();
  
  if (contact) {
    document.getElementById('contact-email').value = contact.email || '';
    document.getElementById('contact-whatsapp').value = contact.whatsapp || '';
    document.getElementById('contact-instagram').value = contact.instagram || '';
    document.getElementById('contact-twitter').value = contact.twitter || '';
    document.getElementById('contact-youtube').value = contact.youtube || '';
  }
}

// Render works list
async function renderWorks() {
  const supabase = getSupabase();
  const { data: works } = await supabase
    .from('works')
    .select('*')
    .order('display_order', { ascending: true });
  
  const container = document.getElementById('works-list');
  container.innerHTML = works.map(work => `
    <div class="work-item">
      <div class="item-header">
        <div class="item-title">${work.title}</div>
        <div class="item-actions">
          <button class="btn-edit" onclick="editWork('${work.id}')">Edit</button>
          <button class="btn-delete" onclick="deleteWork('${work.id}')">Delete</button>
        </div>
      </div>
      <div class="item-details">
        ${work.year} / ${work.medium} / ${work.dimensions}<br>
        ${work.is_large ? 'Large display' : 'Regular display'}
      </div>
    </div>
  `).join('');
}

// Render exhibitions list
async function renderExhibitions() {
  const supabase = getSupabase();
  const { data: exhibitions } = await supabase
    .from('exhibitions')
    .select('*')
    .order('display_order', { ascending: true });
  
  const container = document.getElementById('exhibitions-list');
  container.innerHTML = exhibitions.map(ex => `
    <div class="exhibition-item">
      <div class="item-header">
        <div class="item-title">${ex.year} - ${ex.title}</div>
        <div class="item-actions">
          <button class="btn-edit" onclick="editExhibition('${ex.id}')">Edit</button>
          <button class="btn-delete" onclick="deleteExhibition('${ex.id}')">Delete</button>
        </div>
      </div>
      <div class="item-details">${ex.type} / ${ex.location}</div>
    </div>
  `).join('');
}

async function showWorkModal(workId = null) {
  const supabase = getSupabase();
  let work = null;
  if (workId) {
    const { data } = await supabase.from('works').select('*').eq('id', workId).single();
    work = data;
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${work ? 'Edit Work' : 'Add New Work'}</h3>
        <button class="btn-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      <form id="work-form">
        <label>Title:<input type="text" id="work-title" value="${work?.title || ''}" required></label>
        <label>Year:<input type="text" id="work-year" value="${work?.year || ''}" required></label>
        <label>Medium:<input type="text" id="work-medium" value="${work?.medium || ''}" required></label>
        <label>Dimensions:<input type="text" id="work-dimensions" value="${work?.dimensions || ''}" required></label>
        
        <label>
          Upload Image:
          <input type="file" id="work-image-file" accept="image/*">
          <small style="display:block;margin-top:5px;color:#77736b;">Or use URL below</small>
        </label>
        
        <label>Image URL (optional):<input type="url" id="work-image-url" value="${work?.image_url || ''}" placeholder="Leave empty if uploading file"></label>
        
        ${work?.image_url ? `<div style="margin:10px 0;"><img src="${work.image_url}" style="max-width:200px;max-height:200px;object-fit:cover;" alt="Current image"></div>` : ''}
        
        <label>Display Order:<input type="number" id="work-order" value="${work?.display_order || 0}" required></label>
        <label class="checkbox-label">
          <input type="checkbox" id="work-large" ${work?.is_large ? 'checked' : ''}>
          Display as large image
        </label>
        <button type="submit" class="btn-save" id="save-work-btn">Save Work</button>
        <div id="upload-status" style="margin-top:10px;font-size:13px;"></div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('work-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const supabase = getSupabase();
    const submitBtn = document.getElementById('save-work-btn');
    const statusDiv = document.getElementById('upload-status');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';
    
    try {
      let imageUrl = document.getElementById('work-image-url').value;
      const imageFile = document.getElementById('work-image-file').files[0];
      
      // If file is uploaded, upload to Supabase Storage
      if (imageFile) {
        statusDiv.textContent = 'Uploading image...';
        statusDiv.style.color = '#171614';
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `works/${fileName}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
        statusDiv.textContent = 'Image uploaded successfully!';
        statusDiv.style.color = 'green';
      }
      
      if (!imageUrl) {
        alert('Please either upload an image or provide an image URL');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Work';
        return;
      }
      
      const workData = {
        title: document.getElementById('work-title').value,
        year: document.getElementById('work-year').value,
        medium: document.getElementById('work-medium').value,
        dimensions: document.getElementById('work-dimensions').value,
        image_url: imageUrl,
        display_order: parseInt(document.getElementById('work-order').value),
        is_large: document.getElementById('work-large').checked,
        updated_at: new Date().toISOString()
      };
      
      if (work) {
        await supabase.from('works').update(workData).eq('id', workId);
      } else {
        await supabase.from('works').insert([{ ...workData, created_at: new Date().toISOString() }]);
      }
      
      alert('Work saved successfully!');
      await renderWorks();
      modal.remove();
      
    } catch (error) {
      console.error('Error saving work:', error);
      statusDiv.textContent = `Error: ${error.message}`;
      statusDiv.style.color = 'red';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Save Work';
    }
  });
}

async function editWork(id) {
  await showWorkModal(id);
}

async function deleteWork(id) {
  if (confirm('Are you sure you want to delete this work?')) {
    const supabase = getSupabase();
    await supabase.from('works').delete().eq('id', id);
    await renderWorks();
  }
}

async function showExhibitionModal(exId = null) {
  const supabase = getSupabase();
  let ex = null;
  if (exId) {
    const { data } = await supabase.from('exhibitions').select('*').eq('id', exId).single();
    ex = data;
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${ex ? 'Edit Exhibition' : 'Add New Exhibition'}</h3>
        <button class="btn-close" onclick="this.closest('.modal').remove()">×</button>
      </div>
      <form id="exhibition-form">
        <label>Year:<input type="text" id="ex-year" value="${ex?.year || ''}" required></label>
        <label>Title:<input type="text" id="ex-title" value="${ex?.title || ''}" required></label>
        <label>Type:<input type="text" id="ex-type" value="${ex?.type || ''}" required></label>
        <label>Location:<input type="text" id="ex-location" value="${ex?.location || ''}" required></label>
        <label>Display Order:<input type="number" id="ex-order" value="${ex?.display_order || 0}" required></label>
        <button type="submit" class="btn-save">Save Exhibition</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('exhibition-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const supabase = getSupabase();
    
    const exData = {
      year: document.getElementById('ex-year').value,
      title: document.getElementById('ex-title').value,
      type: document.getElementById('ex-type').value,
      location: document.getElementById('ex-location').value,
      display_order: parseInt(document.getElementById('ex-order').value),
      updated_at: new Date().toISOString()
    };
    
    if (ex) {
      await supabase.from('exhibitions').update(exData).eq('id', exId);
    } else {
      await supabase.from('exhibitions').insert([{ ...exData, created_at: new Date().toISOString() }]);
    }
    
    alert('Exhibition saved successfully!');
    await renderExhibitions();
    modal.remove();
  });
}

async function editExhibition(id) {
  await showExhibitionModal(id);
}

async function deleteExhibition(id) {
  if (confirm('Are you sure you want to delete this exhibition?')) {
    const supabase = getSupabase();
    await supabase.from('exhibitions').delete().eq('id', id);
    await renderExhibitions();
  }
}

// Initialize when page loads
console.log('🔵 Initializing admin panel...');
if (document.readyState === 'loading') {
  console.log('🔵 DOM still loading, adding event listener');
  document.addEventListener('DOMContentLoaded', initializeAdmin);
} else {
  // DOM already loaded
  console.log('🔵 DOM already loaded, initializing now');
  initializeAdmin();
}
