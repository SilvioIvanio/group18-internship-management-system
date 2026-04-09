/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let role = 'student';
let currentUser = null;

const USERS = {
    student: { name: 'Tjihezu Tjihozu', initials: 'TT', email: 'tjihezu@nust.na', roleName: 'Student', studentNo: '223127418', programme: 'BSc Computer Science', year: '3rd Year', faculty: 'Computing & Informatics' },
    employer: { name: 'Mr. H. Nakamhela', initials: 'HN', email: 'hr@namibiabreweries.com', roleName: 'Employer', company: 'Namibia Breweries Ltd', sector: 'FMCG' },
    ceu: { name: 'Ms. P. Shikongo', initials: 'PS', email: 'p.shikongo@nust.na', roleName: 'CEU Staff', dept: 'Cooperative Education Unit' },
    lecturer: { name: 'Dr. A. Tjihambuma', initials: 'AT', email: 'a.tjihambuma@nust.na', roleName: 'Lecturer', dept: 'Computing & Informatics' },
    management: { name: 'Prof. J. Amupolo', initials: 'JA', email: 'j.amupolo@nust.na', roleName: 'Management', dept: 'Deputy Vice Chancellor Academic' },
};

const NOTIFICATIONS = {
    student: [
        { id: 1, icon: '📓', type: 'blue', text: 'Your logbook entry <strong>Week 13</strong> is awaiting lecturer review.', time: 'Today, 09:14', read: false },
        { id: 2, icon: '📌', type: 'green', text: 'MTC Namibia application updated to <strong>Shortlisted</strong>. Congratulations!', time: 'Yesterday, 16:02', read: false },
        { id: 3, icon: '⭐', type: 'amber', text: 'Mid-term evaluation submitted by Mr. Nakamhela. Score: <strong>78/100</strong>.', time: '15 Mar 2025', read: false },
        { id: 4, icon: '✉️', type: 'blue', text: 'CEU has sent you a placement offer from <strong>Namibia Breweries Ltd</strong>.', time: '01 Feb 2025', read: true },
        { id: 5, icon: '❌', type: 'red', text: 'FNB Namibia application was unsuccessful. Keep applying!', time: '05 Mar 2025', read: true },
    ],
    employer: [
        { id: 1, icon: '👤', type: 'blue', text: 'New application from <strong>Dyrall Beukes</strong> for Systems Admin Intern.', time: '1 hour ago', read: false },
        { id: 2, icon: '✅', type: 'green', text: 'CEU has approved your vacancy <strong>Systems Admin Intern</strong>.', time: '2 days ago', read: false },
        { id: 3, icon: '📓', type: 'amber', text: '<strong>Tjihezu Tjihozu</strong> submitted 3 new logbook entries.', time: '3 days ago', read: true },
    ],
    ceu: [
        { id: 1, icon: '⏳', type: 'amber', text: '<strong>7 placements</strong> are pending your approval.', time: 'Today', read: false },
        { id: 2, icon: '🏢', type: 'blue', text: 'Namibia Breweries posted a new vacancy: <strong>IT Support Intern</strong>.', time: 'Yesterday', read: false },
        { id: 3, icon: '✅', type: 'green', text: 'Placement report for Semester 1 is ready for download.', time: '1 Mar 2025', read: true },
    ],
    lecturer: [
        { id: 1, icon: '📓', type: 'amber', text: '<strong>4 logbook entries</strong> are awaiting your review.', time: 'Today', read: false },
        { id: 2, icon: '⭐', type: 'blue', text: 'Reminder: Mid-term evaluations are due by <strong>30 May 2025</strong>.', time: 'Yesterday', read: false },
        { id: 3, icon: '✅', type: 'green', text: 'Logbook entry for Tjihezu (Week 12) approved successfully.', time: '3 days ago', read: true },
    ],
    management: [
        { id: 1, icon: '📊', type: 'blue', text: 'Semester 1 placement report is ready: <strong>82% placement rate</strong>.', time: 'Today', read: false },
        { id: 2, icon: '📈', type: 'green', text: 'New employer partnership signed: <strong>Standard Bank Namibia</strong>.', time: '2 days ago', read: true },
    ],
};

const SIDEBARS = {
    student: [
        { sec: 'Overview' }, { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
        { sec: 'Internships' }, { id: 'vacancies', icon: '🔍', label: 'Browse vacancies' }, { id: 'applications', icon: '📄', label: 'My applications' }, { id: 'placement', icon: '📌', label: 'My placement' },
        { sec: 'Records' }, { id: 'logbook', icon: '📓', label: 'Logbook' }, { id: 'documents', icon: '📁', label: 'Documents' },
        { sec: 'Account' }, { id: 'notifications', icon: '🔔', label: 'Notifications', badgeStyle: 'info' }, { id: 'profile', icon: '👤', label: 'My profile' }, { id: 'settings', icon: '⚙️', label: 'Settings' },
    ],
    employer: [
        { sec: 'Vacancies' }, { id: 'dashboard', icon: '🏠', label: 'Dashboard' }, { id: 'vaclist', icon: '📋', label: 'My vacancies' }, { id: 'postvac', icon: '➕', label: 'Post a vacancy' },
        { sec: 'People' }, { id: 'applicants', icon: '👥', label: 'Applicants' }, { id: 'interns', icon: '🎓', label: 'Active interns' }, { id: 'evaluate', icon: '⭐', label: 'Submit evaluation' },
        { sec: 'Account' }, { id: 'profile', icon: '🏢', label: 'Company profile' }, { id: 'settings', icon: '⚙️', label: 'Settings' },
    ],
    ceu: [
        { sec: 'Operations' }, { id: 'dashboard', icon: '🏠', label: 'Dashboard' }, { id: 'approvals', icon: '✅', label: 'Approvals' }, { id: 'placements', icon: '📌', label: 'All placements' },
        { sec: 'Directory' }, { id: 'students', icon: '🎓', label: 'Students' }, { id: 'employers2', icon: '🏢', label: 'Employers' }, { id: 'vacancies2', icon: '📋', label: 'Vacancies' },
        { sec: 'Admin' }, { id: 'accounts', icon: '👥', label: 'Manage accounts' }, { id: 'reports', icon: '📊', label: 'Reports' },
        { sec: 'Account' }, { id: 'profile', icon: '👤', label: 'My profile' }, { id: 'settings', icon: '⚙️', label: 'Settings' },
    ],
    lecturer: [
        { sec: 'My students' }, { id: 'dashboard', icon: '🏠', label: 'Dashboard' }, { id: 'mystudents', icon: '🎓', label: 'Student list' }, { id: 'logbookreview', icon: '📓', label: 'Logbook review' }, { id: 'evaluate', icon: '⭐', label: 'Submit evaluation' },
        { sec: 'Account' }, { id: 'notifications', icon: '🔔', label: 'Notifications', badgeStyle: 'info' }, { id: 'profile', icon: '👤', label: 'My profile' }, { id: 'settings', icon: '⚙️', label: 'Settings' },
    ],
    management: [
        { sec: 'Analytics' }, { id: 'dashboard', icon: '🏠', label: 'Dashboard' }, { id: 'analytics', icon: '📈', label: 'Analytics' }, { id: 'employers3', icon: '🏢', label: 'Employer directory' }, { id: 'reports2', icon: '📊', label: 'Strategic reports' },
        { sec: 'Account' }, { id: 'profile', icon: '👤', label: 'My profile' }, { id: 'settings', icon: '⚙️', label: 'Settings' },
    ],
};

/* ══════════════════════════════════════
   AUTH
══════════════════════════════════════ */
function switchTab(t) {
    document.querySelectorAll('.auth-tab').forEach(e => e.classList.remove('active'));
    document.getElementById('tab-' + t).classList.add('active');
    document.getElementById('form-login').style.display = t === 'login' ? '' : 'none';
    document.getElementById('form-register').style.display = t === 'register' ? '' : 'none';
}

function selRole(el) {
    document.querySelectorAll('.r-chip').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel'); role = el.dataset.role;
}

async function doLogin(){
  const email = document.getElementById('li-email').value;
  const password = document.getElementById('li-pass').value;

  if(!email || !password){
    toast('❌ Please enter your email and password.'); 
    return;
  }

  // Prepare data to send to PHP
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  try {
      // Send request to XAMPP backend
      let response = await fetch('api/login.php', {
          method: 'POST',
          body: formData
      });
      
      let result = await response.json();

      if(result.status === 'success') {
          toast('✅ Login successful!');
          role = result.user.role.toLowerCase();
          currentUser = result.user;
          bootApp();
      } else {
          toast('❌ ' + result.message);
      }
  } catch(error) {
      console.error(error);
      toast('❌ Server connection failed. Is XAMPP running?');
  }
}

async function doRegister() {
    const fname = document.getElementById('re-fname').value.trim();
    const lname = document.getElementById('re-lname').value.trim();
    const email = document.getElementById('re-email').value.trim();
    const pass = document.getElementById('re-pass').value;
    
    if (!fname || !lname || !email || !pass) { toast('❌ Please fill all fields.'); return; }
    const name = fname + ' ' + lname;

    let fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('password', pass);
    fd.append('role', role);
    fd.append('student_no', document.getElementById('re-student-no').value.trim());
    fd.append('programme', document.getElementById('re-programme').value);
    fd.append('year', document.getElementById('re-year').value);

    try {
        let res = await fetch('api/register.php', { method: 'POST', body: fd });
        let result = await res.json();
        if (result.status === 'success') {
            toast('✅ Account created! Please sign in.');
            setTimeout(() => switchTab('login'), 1500);
        } else {
            toast('❌ ' + result.message);
        }
    } catch(e) {
        toast('❌ Server connection failed.');
    }
}

function bootApp() {
    if (!currentUser) currentUser = USERS[role] || { name: 'Guest', email: 'guest@nust.na' };
    currentUser.initials = currentUser.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
    currentUser.roleName = role.charAt(0).toUpperCase() + role.slice(1);
    const u = currentUser;
    // populate topbar
    document.getElementById('tb-role').textContent = u.roleName;
    document.getElementById('tb-avatar').textContent = u.initials;
    document.getElementById('ud-name').textContent = u.name;
    document.getElementById('ud-email').textContent = u.email;
    document.getElementById('ud-role').textContent = u.roleName;
    // populate sidebar footer
    document.getElementById('sb-avatar').textContent = u.initials;
    document.getElementById('sb-name').textContent = u.name;
    document.getElementById('sb-role').textContent = u.roleName;
    // notification count
    const unread = (NOTIFICATIONS[role] || []).filter(n => !n.read).length;
    const nb = document.getElementById('notif-count');
    if (unread > 0) { nb.textContent = unread; nb.style.display = 'flex'; } else { nb.style.display = 'none'; }
    buildSidebar();
    buildNotifPanel();
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.add('on');
    showPage('dashboard');
}

function logout() {
    closeAllPanels();
    document.getElementById('app').classList.remove('on');
    document.getElementById('auth-screen').classList.remove('hidden');
    role = 'student';
    currentUser = null;
    document.querySelectorAll('.r-chip').forEach(c => c.classList.remove('sel'));
    document.querySelector('[data-role="student"]').classList.add('sel');
    setTimeout(() => { document.getElementById('main').innerHTML = ''; }, 300);
}

function confirmLogout() {
    closeDropdown();
    openModal({
        title: 'Sign out of DIMS?',
        sub: 'You will be returned to the sign-in screen.',
        body: `<div class="confirm-dialog"><div class="confirm-icon">🚪</div></div>`,
        actions: `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
             <button class="btn btn-danger" onclick="closeModal();logout()">Yes, sign out</button>`
    });
}

/* ══════════════════════════════════════
   SIDEBAR
══════════════════════════════════════ */
function buildSidebar() {
    const sb = document.getElementById('sb-scroll');
    sb.innerHTML = SIDEBARS[role].map(item => {
        if (item.sec) return `<div class="sb-sec">${item.sec}</div>`;
        const badgeCls = item.badgeStyle === 'info' ? 'nav-badge info' : 'nav-badge';
        return `<div class="nav-item" id="nav-${item.id}" onclick="showPage('${item.id}')">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
      ${item.badge ? `<span class="${badgeCls}">${item.badge}</span>` : ''}
    </div>`;
    }).join('');
}

function setNav(id) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const el = document.getElementById('nav-' + id);
    if (el) { el.classList.add('active'); el.scrollIntoView({ block: 'nearest' }) }
}

/* ══════════════════════════════════════
   ROUTER
══════════════════════════════════════ */
async function showPage(id) {
    setNav(id);
    closeAllPanels();
    const el = document.getElementById('main');
    const r = PAGES[role]?.[id];
    if (r) {
        el.innerHTML = '<div style="padding:40px;text-align:center;color:var(--muted)">Loading...</div>';
        try {
            el.innerHTML = await r();
        } catch (e) {
            console.error(e);
            el.innerHTML = '<div class="empty"><div class="empty-icon">⚠️</div><div class="empty-title">Error loading page</div><div class="empty-text">Failed to fetch data from server.</div></div>';
        }
    } else {
        el.innerHTML = `<div class="empty"><div class="empty-icon">🚧</div><div class="empty-title">Page not yet available</div><div class="empty-text">This feature is coming in the next sprint.</div></div>`;
    }
    setTimeout(() => { if (typeof initCharts === 'function') initCharts(); }, 50);
}

/* ══════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════ */
async function buildNotifPanel() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    try {
        let res = await fetch('api/notifications.php?user_id=' + currentUser.id);
        let items = (await res.json()).data || [];
        if (!items.length) { list.innerHTML = `<div class="np-empty">🎉<br>You're all caught up!</div>`; return; }
        list.innerHTML = items.map(n => `
        <div class="np-item ${n.is_read ? '' : 'unread'}" onclick="markRead(${n.id})">
          <div class="np-icon info">🔔</div>
          <div>
            <div class="np-text">${n.message}</div>
            <div class="np-time">${n.created_at}</div>
          </div>
        </div>`).join('');
    } catch (e) {
        list.innerHTML = `<div class="np-empty">⚠️<br>Failed to load</div>`;
    }
}

async function markRead(id) {
    await buildNotifPanel();
    await updateNotifBadge();
}

async function markAllRead() {
    toast('✅ All notifications marked as read.');
    await buildNotifPanel();
    await updateNotifBadge();
}

async function updateNotifBadge() {
    try {
        let res = await fetch('api/notifications.php?user_id=' + currentUser.id);
        let items = (await res.json()).data || [];
        const unread = items.filter(n => !n.is_read).length;
        const nb = document.getElementById('notif-count');
        if (nb) {
            if (unread > 0) { nb.textContent = unread; nb.style.display = 'flex'; } 
            else { nb.style.display = 'none'; }
        }
        
        // Dynamically clear/update any sidebar nav badges that represent notifications
        document.querySelectorAll('.nav-badge.info').forEach(b => {
            b.textContent = unread > 0 ? unread : '';
            b.style.display = unread > 0 ? 'inline-flex' : 'none';
        });
    } catch(e) {}
}

function toggleNotifPanel() {
    const p = document.getElementById('notif-panel');
    const o = document.getElementById('panel-overlay');
    const open = p.classList.contains('open');
    closeAllPanels();
    if (!open) { p.classList.add('open'); o.classList.add('on'); }
}

function closeNotifPanel() { document.getElementById('notif-panel').classList.remove('open'); document.getElementById('panel-overlay').classList.remove('on'); }

/* ══════════════════════════════════════
   USER DROPDOWN
══════════════════════════════════════ */
function toggleUserDropdown() {
    const d = document.getElementById('user-dropdown');
    const open = d.classList.contains('open');
    closeAllPanels();
    if (!open) { d.classList.add('open'); document.getElementById('panel-overlay').classList.add('on'); }
}
function closeDropdown() { document.getElementById('user-dropdown').classList.remove('open'); }

function closeAllPanels() {
    document.getElementById('notif-panel').classList.remove('open');
    document.getElementById('user-dropdown').classList.remove('open');
    document.getElementById('panel-overlay').classList.remove('on');
}

/* ══════════════════════════════════════
   MODAL
══════════════════════════════════════ */
function openModal({ title, sub, body, actions, size }) {
    document.getElementById('modal-title').textContent = title || '';
    const subEl = document.getElementById('modal-sub');
    if (sub) { subEl.textContent = sub; subEl.style.display = ''; } else { subEl.style.display = 'none'; }
    document.getElementById('modal-body').innerHTML = body || '';
    document.getElementById('modal-actions').innerHTML = actions || '';
    const box = document.getElementById('modal-box');
    box.className = 'modal' + (size ? ' ' + size : '');
    document.getElementById('modal-bg').classList.add('open');
}
function closeModal() { document.getElementById('modal-bg').classList.remove('open'); }
function closeBgModal(e) { if (e.target === document.getElementById('modal-bg')) closeModal(); }

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
let toastTimer;
function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('on'), 3500);
}

/* ══════════════════════════════════════
   SHARED PAGES
══════════════════════════════════════ */
function settingsPage() {
    return `
  <div class="ph"><div class="ph-left"><div class="ph-title">Settings</div><div class="ph-sub">Manage your account preferences and security</div></div></div>
  <div class="g2">
    <div>
      <div class="card">
        <div class="settings-section">
          <div class="settings-section-title">Account information</div>
          <div class="f-group"><label class="f-label">Full name</label><input class="f-input" value="${USERS[role].name}"></div>
          <div class="f-group"><label class="f-label">Email address</label><input class="f-input" type="email" value="${USERS[role].email}"></div>
          <div class="f-group"><label class="f-label">Phone number</label><input class="f-input" type="tel" placeholder="+264 XX XXX XXXX"></div>
          <div class="btn-group" style="margin-top:8px"><button class="btn btn-primary btn-sm" onclick="toast('✅ Profile updated successfully.')">Save changes</button></div>
        </div>
      </div>
      <div class="card">
        <div class="settings-section">
          <div class="settings-section-title">Change password</div>
          <div class="f-group"><label class="f-label">Current password</label><input class="f-input" type="password" placeholder="••••••••"></div>
          <div class="f-group"><label class="f-label">New password</label><input class="f-input" type="password" placeholder="Min. 8 characters"></div>
          <div class="f-group"><label class="f-label">Confirm new password</label><input class="f-input" type="password" placeholder="Repeat new password"></div>
          <div class="btn-group" style="margin-top:8px"><button class="btn btn-primary btn-sm" onclick="toast('🔒 Password changed successfully.')">Update password</button></div>
        </div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="settings-section">
          <div class="settings-section-title">Notifications</div>
          <div class="settings-row"><div><div class="settings-row-label">Email notifications</div><div class="settings-row-desc">Receive updates via email</div></div><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
          <div class="settings-row"><div><div class="settings-row-label">SMS alerts</div><div class="settings-row-desc">Critical placement updates via SMS</div></div><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
          <div class="settings-row"><div><div class="settings-row-label">Logbook reminders</div><div class="settings-row-desc">Weekly reminder to submit entries</div></div><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
          <div class="settings-row"><div><div class="settings-row-label">Application status updates</div><div class="settings-row-desc">Notify when applications change status</div></div><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        </div>
      </div>
      <div class="card">
        <div class="settings-section">
          <div class="settings-section-title">Security (NFR-01)</div>
          <div class="settings-row"><div><div class="settings-row-label">Two-factor authentication</div><div class="settings-row-desc">Require OTP on each sign-in</div></div><button class="toggle" onclick="this.classList.toggle('on');toast(this.classList.contains('on')?'🔐 2FA enabled':'2FA disabled')"></button></div>
          <div class="settings-row"><div><div class="settings-row-label">Active sessions</div><div class="settings-row-desc">1 active session (this device)</div></div><button class="btn btn-outline btn-sm" onclick="toast('✅ Other sessions signed out.')">Sign out others</button></div>
        </div>
      </div>
      <div class="card">
        <div class="settings-section-title" style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px">Danger zone</div>
