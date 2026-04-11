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
        <button class="btn btn-danger btn-sm" onclick="openModal({title:'Delete account?',sub:'This action is permanent and cannot be undone. All your data will be removed.',size:'sm',body:\`<div class='confirm-dialog'><div class='confirm-icon'>⚠️</div></div>\`,actions:\`<button class='btn btn-outline' onclick='closeModal()'>Cancel</button><button class='btn btn-danger' onclick='closeModal();toast(\"Account deletion requested. CEU will contact you.\")'>Delete account</button>\`})">Delete my account</button>
      </div>
    </div>
  </div>`;
}

async function notificationsPage() {
    let res = await fetch('api/notifications.php?user_id=' + currentUser.id);
    let json = await res.json();
    const items = json.data || [];
    return `
  <div class="ph"><div class="ph-left"><div class="ph-title">Notifications</div><div class="ph-sub">${items.length} unread</div></div>
  <div class="ph-actions"><button class="btn btn-outline btn-sm" onclick="toast('Marked all as read ✅')">Mark all read</button></div></div>
  <div class="card">
    ${items.length ? items.map(n => `
      <div class="ni">
        <div class="ni-dot"></div>
        <div style="flex:1">
          <div class="ni-text">${n.message}</div>
          <div class="ni-time">${n.created_at}</div>
        </div>
      </div>`).join('')
            : `<div class="empty"><div class="empty-icon">🎉</div><div class="empty-title">All caught up!</div><div class="empty-text">No notifications at this time.</div></div>`}
  </div>`;
}

/* ══════════════════════════════════════
   PAGE TEMPLATES
══════════════════════════════════════ */
const PAGES = {

    /* ─────────────────────────────────────
       STUDENT
    ───────────────────────────────────── */
    student: {
        dashboard: () => `
    <div class="hero">
      <div class="hero-title">Good morning, Tjihezu 👋</div>
      <div class="hero-sub">NUST · BSc Computer Science · Student No. 223127418 · Semester 1, 2025</div>
      <div class="hero-actions">
        <button class="btn btn-accent btn-sm" onclick="showPage('logbook')">📓 Add logbook entry</button>
        <button class="btn btn-outline btn-sm" style="color:#fff;border-color:rgba(255,255,255,.25)" onclick="showPage('vacancies')">🔍 Browse vacancies</button>
      </div>
    </div>
    <div class="stats">
      <div class="stat c-blue"><div class="stat-label">Applications</div><div class="stat-val blue">3</div><div class="stat-sub">1 shortlisted</div></div>
      <div class="stat c-green"><div class="stat-label">Placement status</div><div class="stat-val" style="font-size:16px;margin-top:6px;color:var(--success)">Active ✓</div><div class="stat-sub">Namibia Breweries Ltd</div></div>
      <div class="stat c-amber"><div class="stat-label">Logbook entries</div><div class="stat-val">14</div><div class="stat-sub">2 pending approval</div></div>
      <div class="stat c-red"><div class="stat-label">Days remaining</div><div class="stat-val amber">48</div><div class="stat-sub">Ends 30 Jun 2025</div></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">📌 Current placement</div><span class="badge b-green"><span class="b-dot"></span>Active</span></div>
        <dl class="dl">
          <dt>Organisation</dt><dd>Namibia Breweries Ltd</dd>
          <dt>Department</dt><dd>IT / Systems</dd>
          <dt>Supervisor</dt><dd>Mr. H. Nakamhela</dd>
          <dt>Lecturer</dt><dd>Dr. A. Tjihambuma</dd>
          <dt>Period</dt><dd>01 Feb – 30 Jun 2025</dd>
        </dl>
        <div style="margin-top:16px"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:5px"><span>Progress</span><span>65%</span></div>
        <div class="prog-bar"><div class="prog-fill" style="width:65%"></div></div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px">48 days remaining</div></div>
        <div class="btn-group" style="margin-top:14px">
          <button class="btn btn-primary btn-sm" onclick="openLogModal()">📓 New entry</button>
          <button class="btn btn-outline btn-sm" onclick="showPage('placement')">View details →</button>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">📅 Internship milestones</div></div>
        <ul class="timeline">
          <li class="tl-item done"><div class="tl-title">Registered on DIMS</div><div class="tl-sub">20 Jan 2025</div></li>
          <li class="tl-item done"><div class="tl-title">Application submitted</div><div class="tl-sub">02 Feb 2025 — Namibia Breweries Ltd</div></li>
          <li class="tl-item done"><div class="tl-title">CEU placement approved</div><div class="tl-sub">01 Feb 2025</div></li>
          <li class="tl-item done"><div class="tl-title">Mid-term evaluation</div><div class="tl-sub">Score: 78/100 · 15 Mar 2025</div></li>
          <li class="tl-item now"><div class="tl-title">Active internship period</div><div class="tl-sub">Ongoing — submit weekly logbook</div></li>
          <li class="tl-item"><div class="tl-title">Final evaluation</div><div class="tl-sub">Scheduled: 30 Jun 2025</div></li>
        </ul>
      </div>
    </div>`,

        profile: async () => {
    let res = await fetch('api/profile.php?user_id=' + currentUser.id);
    let p = (await res.json()).data || {};
    let names = (p.name || '').split(' ');
    let fname = names[0] || '';
    let lname = names.slice(1).join(' ') || '';
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">My Profile</div><div class="ph-sub">Manage your personal and academic information</div></div></div>
    <div class="profile-completion">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px">Profile completion</div>
        <div class="prog-bar"><div class="prog-fill" style="width:${p.completion || 0}%"></div></div>
      </div>
      <div class="profile-completion-pct">${p.completion || 0}%</div>
      <button class="btn btn-outline btn-sm" onclick="toast('💡 Add a profile photo to reach 100%.')">Complete profile</button>
    </div>
    <div class="g2-asym">
      <div>
        <div class="card">
          <div class="card-head"><div class="card-title">👤 Personal information</div><button class="btn btn-outline btn-sm" onclick="updateProfileGlobal()">Save changes</button></div>
          <div class="f-row">
            <div class="f-group"><label class="f-label">First name</label><input class="f-input" value="${fname}"></div>
            <div class="f-group"><label class="f-label">Last name</label><input class="f-input" value="${lname}"></div>
          </div>
          <div class="f-group" style="margin-top:10px"><label class="f-label">Email address</label><input class="f-input" type="email" value="${p.email || ''}"></div>
          <div class="f-group" style="margin-top:10px"><label class="f-label">Phone number</label><input class="f-input" type="tel" value="${p.phone || ''}" placeholder="+264 XX XXX XXXX"></div>
          <div class="f-group" style="margin-top:10px"><label class="f-label">Address</label><input class="f-input" value="${p.address || ''}" placeholder="Windhoek, Namibia"></div>
        </div>
        <div class="card">
          <div class="card-head"><div class="card-title">🎓 Academic details</div></div>
          <dl class="dl">
            <dt>Student number</dt><dd>${p.student_no || 'Pending...'}</dd>
            <dt>Programme</dt><dd>${p.programme || 'Pending...'}</dd>
            <dt>Year of study</dt><dd>${p.year_of_study || 'Pending...'}</dd>
            <dt>Faculty</dt><dd>Computing & Informatics</dd>
            <dt>Academic status</dt><dd><span class="badge b-green">In good standing</span></dd>
          </dl>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="card-head"><div class="card-title">📄 CV & documents</div></div>
          <div style="border:2px dashed var(--border);border-radius:var(--r-sm);padding:24px;text-align:center;margin-bottom:12px;cursor:pointer" onclick="triggerDocUpload('cv')">
            <div style="font-size:24px;margin-bottom:8px">📤</div>
            <div style="font-size:13px;font-weight:600;color:var(--text2)">Upload your CV</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px">PDF, max 5MB</div>
          </div>
          ${p.cv_path ? `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--surface);border-radius:var(--r-sm);border:1px solid var(--border)">
            <span>📄</span>
            <div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--text)">${p.cv_path.split('/').pop()}</div><div style="font-size:11px;color:var(--muted)">Official active CV</div></div>
          </div>
          ` : ''}
        </div>
        <div class="card">
          <div class="card-head"><div class="card-title">📊 Quick stats</div></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div style="background:var(--surface);border-radius:var(--r-sm);padding:14px;text-align:center">
              <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:var(--accent)">${p.count_apps || 0}</div>
              <div style="font-size:11px;color:var(--muted)">Applications sent</div>
            </div>
            <div style="background:var(--surface);border-radius:var(--r-sm);padding:14px;text-align:center">
              <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:var(--success)">${p.count_logs || 0}</div>
              <div style="font-size:11px;color:var(--muted)">Logbook entries</div>
            </div>
            <div style="background:var(--surface);border-radius:var(--r-sm);padding:14px;text-align:center">
              <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:var(--warn)">${p.avg_score || '--'}</div>
              <div style="font-size:11px;color:var(--muted)">Avg. eval score</div>
            </div>
            <div style="background:var(--surface);border-radius:var(--r-sm);padding:14px;text-align:center">
              <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:var(--navy)">${p.wil_progress || 0}%</div>
              <div style="font-size:11px;color:var(--muted)">WIL time progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
        },

        settings: () => settingsPage(),
        notifications: async () => await notificationsPage(),

        vacancies: async () => {
    let res = await fetch('api/vacancies.php');
    let data = await res.json();
    let vacs = data.data || [];
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">Browse vacancies</div><div class="ph-sub">Internship opportunities from verified CEU industry partners</div></div></div>
    <div class="search-wrap"><span class="search-ico">🔍</span><input placeholder="Search by title, company, or field…"></div>
    <div class="chips">
      <div class="chip on">All</div>
      <div class="chip">IT & Software</div>
      <div class="chip">Engineering</div>
    </div>
    ${vacs.map(v => `
    <div class="vac" onclick="openApplyModal(${v.id}, '${v.employer_name}', '${v.title}')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div class="vac-title">${v.title}</div>
        <span class="badge ${v.status === 'Open' ? 'b-green' : 'b-gray'}" style="flex-shrink:0">${v.status}</span>
      </div>
      <div class="vac-meta">🏢 ${v.employer_name} &nbsp;·&nbsp; 📍 ${v.location} &nbsp;·&nbsp; ⏱ ${v.duration_months} months &nbsp;·&nbsp; 📅 Deadline: ${v.deadline} &nbsp;·&nbsp; ${v.slots} slots</div>
      <div class="vac-desc">${v.description}</div>
      <div class="vac-footer">
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openApplyModal(${v.id}, '${v.employer_name}', '${v.title}')">Apply now</button>
      </div>
    </div>`).join('')}`;
        },

        applications: async () => {
    let res = await fetch('api/applications.php?student_id=' + currentUser.id);
    let data = await res.json();
    let apps = data.data || [];
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">My applications</div><div class="ph-sub">Track each application through the placement lifecycle (FR-04)</div></div></div>
    ${apps.map(a => {
        let step = a.status === 'Pending' ? 1 : a.status === 'Shortlisted' ? 3 : a.status === 'Accepted' ? 4 : -1;
        let bc = a.status === 'Pending' ? 'b-gray' : a.status === 'Shortlisted' ? 'b-blue' : a.status === 'Accepted' ? 'b-green' : 'b-red';
        return `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px">
        <div><div style="font-size:15px;font-weight:700;color:var(--navy)">${a.title}</div><div style="font-size:12px;color:var(--muted);margin-top:2px">${a.employer_name} &nbsp;·&nbsp; Applied ${a.applied_at || 'recently'}</div></div>
        <span class="badge ${bc}" style="flex-shrink:0"><span class="b-dot"></span>${a.status}</span>
      </div>
      ${step > 0 ? `
      <div style="position:relative;margin:16px 0 4px">
        <div style="display:flex;gap:0">
          ${['Submitted', 'Under review', 'Shortlisted', 'Accepted', 'Placed'].map((s, i) => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;position:relative;z-index:1">
            <div style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;border:2px solid var(--white);
              background:${i < step ? 'var(--success)' : i === step - 1 ? 'var(--accent)' : 'var(--border2)'};">
              ${i < step ? '✓' : i === step - 1 ? '●' : ''}
            </div>
            <div style="font-size:10px;font-weight:600;color:${i <= step - 1 ? 'var(--text2)' : 'var(--muted)'};text-align:center;line-height:1.3">${s}</div>
          </div>`).join('')}
        </div>
        <div style="position:absolute;top:13px;left:0;right:0;height:2px;background:var(--border);z-index:0"></div>
        <div style="position:absolute;top:13px;left:0;height:2px;background:var(--accent);z-index:0;width:${(step - 1) / 4 * 100}%"></div>
      </div>`: '<div style="background:var(--danger-dim);border-radius:var(--r-sm);padding:10px 14px;font-size:13px;color:var(--danger);margin:10px 0">This application was unsuccessful. We encourage you to apply to other vacancies.</div>'}
      <div class="btn-group" style="margin-top:14px">
        ${step >= 4 ? `<button class="btn btn-primary btn-sm" onclick="showPage('placement')">View placement →</button>` : ''}
        ${step === 3 ? `<button class="btn btn-accent btn-sm" onclick="toast('🎉 Reviewing offer...')">Review offer</button>` : ''}
        <button class="btn btn-ghost btn-sm" onclick="toast('📄 Application details opened.')">Details</button>
        ${step < 0 ? `<button class="btn btn-outline btn-sm" onclick="showPage('vacancies')">Browse more vacancies</button>` : ''}
      </div>
    </div>`}).join('')}`;
        },

        placement: () => `
    <div class="ph">
      <div class="ph-left"><div class="ph-title">My placement</div><div class="ph-sub">Namibia Breweries Ltd — IT Support Intern</div></div>
      <div class="ph-actions"><button class="btn btn-primary" onclick="openLogModal()">📓 New logbook entry</button></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">📌 Placement details</div><span class="badge b-green"><span class="b-dot"></span>Active</span></div>
        <dl class="dl">
          <dt>Organisation</dt><dd>Namibia Breweries Ltd</dd>
          <dt>Department</dt><dd>IT / Systems</dd>
          <dt>Role</dt><dd>IT Support Intern</dd>
          <dt>Supervisor</dt><dd>Mr. H. Nakamhela</dd>
          <dt>Lecturer</dt><dd>Dr. A. Tjihambuma</dd>
          <dt>Start date</dt><dd>01 February 2025</dd>
          <dt>End date</dt><dd>30 June 2025</dd>
          <dt>Duration</dt><dd>5 months</dd>
        </dl>
        <div style="margin-top:16px">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:5px"><span>WIL progress</span><span>65% · 48 days left</span></div>
          <div class="prog-bar"><div class="prog-fill" style="width:65%"></div></div>
        </div>
        <div class="btn-group" style="margin-top:14px">
          <button class="btn btn-outline btn-sm" onclick="toast('📄 Placement confirmation letter downloading…')">Download letter</button>
          <button class="btn btn-ghost btn-sm" onclick="toast('📧 Support request sent to CEU.')">Contact CEU</button>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">📅 Activity timeline</div></div>
        <ul class="timeline">
          <li class="tl-item done"><div class="tl-title">Placement confirmed by CEU</div><div class="tl-sub">01 Feb 2025</div></li>
          <li class="tl-item done"><div class="tl-title">First logbook entry submitted</div><div class="tl-sub">03 Feb 2025</div></li>
          <li class="tl-item done"><div class="tl-title">Mid-term evaluation received</div><div class="tl-sub">Score: 78/100 · 15 Mar 2025</div></li>
          <li class="tl-item done"><div class="tl-title">Logbook reviewed by lecturer</div><div class="tl-sub">Dr. Tjihambuma · 20 Apr 2025</div></li>
          <li class="tl-item now"><div class="tl-title">Active internship period</div><div class="tl-sub">Ongoing — submit weekly logs</div></li>
          <li class="tl-item"><div class="tl-title">Final evaluation</div><div class="tl-sub">Scheduled: 30 Jun 2025</div></li>
          <li class="tl-item"><div class="tl-title">WIL completion</div><div class="tl-sub">Expected: 30 Jun 2025</div></li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title">⭐ Evaluation received</div></div>
      <div style="display:flex;gap:28px;align-items:flex-start">
        <div class="score"><div class="score-n">78</div><div class="score-l">Mid-term score</div></div>
        <div style="flex:1;padding-top:4px">
          <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Employer feedback · Mr. H. Nakamhela · 15 Mar 2025</div>
          <blockquote>"Tjihezu has shown strong problem-solving skills and adapts quickly to new tasks. Communication with the team is excellent. Would recommend for full-time consideration."</blockquote>
          <div class="btn-group" style="margin-top:12px">
            <span class="badge b-green">Technical: 82/100</span>
            <span class="badge b-blue">Work ethic: 88/100</span>
            <span class="badge b-teal">Communication: 76/100</span>
          </div>
        </div>
      </div>
    </div>`,

        logbook: () => `
    <div class="ph">
      <div class="ph-left"><div class="ph-title">Logbook</div><div class="ph-sub">Weekly internship journal — 14 entries · 2 pending lecturer approval (FR-05)</div></div>
      <div class="ph-actions"><button class="btn btn-primary" onclick="openLogModal()">+ New entry</button></div>
    </div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div style="flex:1"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:5px"><span>Submission progress</span><span>14 of 20 weeks</span></div>
        <div class="prog-bar"><div class="prog-fill" style="width:70%"></div></div></div>
      </div>
      ${[
                { week: 'Week 14', dates: '28 Apr – 02 May 2025', title: 'Database administration & backup scripting', body: 'Set up automated backup scripts for SQL Server using PowerShell scheduled tasks. Documented the procedure for the IT team\'s runbook. Tested restore procedures in the staging environment.', hrs: 40, status: 'Approved by Dr. Tjihambuma', bc: 'b-green' },
                { week: 'Week 13', dates: '21–25 Apr 2025', title: 'Network infrastructure mapping', body: 'Assisted in mapping the company\'s internal network using Nmap and Visio. Created updated topology diagrams for three server rooms and documented IP address ranges.', hrs: 38, status: 'Pending review', bc: 'b-amber' },
                { week: 'Week 12', dates: '14–18 Apr 2025', title: 'Help desk support & ticket management', body: 'Managed 24 support tickets. Resolved hardware and software issues for end users. Escalated 3 critical incidents to senior IT staff. Documented all resolutions in the ticketing system.', hrs: 40, status: 'Approved by Dr. Tjihambuma', bc: 'b-green' },
            ].map(e => `
      <div class="log-item">
        <div class="log-week">${e.week} &nbsp;·&nbsp; ${e.dates}</div>
        <div class="log-title2">${e.title}</div>
        <div class="log-body">${e.body}</div>
        <div class="log-footer">
          <span class="log-hrs">⏱ ${e.hrs} hrs</span>
          <span class="badge ${e.bc}">${e.status}</span>
          <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="toast('✏️ Editing entry…')">Edit</button>
        </div>
      </div>`).join('')}
    </div>`,

        documents: () => `
    <div class="ph">
      <div class="ph-left"><div class="ph-title">Documents</div><div class="ph-sub">Upload and manage your internship documents (FR-01)</div></div>
      <div class="ph-actions"><button class="btn btn-primary" onclick="openUploadModal()">+ Upload document</button></div>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>File name</th><th>Type</th><th>Size</th><th>Uploaded</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>📄 <strong>Tjihozu_CV_2025.pdf</strong></td><td>Curriculum Vitae</td><td>284 KB</td><td>20 Jan 2025</td><td><span class="badge b-green">Verified</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="toast('👁 CV opened')">View</button><button class="btn btn-ghost btn-sm" onclick="toast('📥 Downloading…')">↓</button></div></td></tr>
            <tr><td>📄 <strong>Academic_Transcript_S1.pdf</strong></td><td>Transcript</td><td>512 KB</td><td>20 Jan 2025</td><td><span class="badge b-green">Verified</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="toast('👁 Transcript opened')">View</button><button class="btn btn-ghost btn-sm" onclick="toast('📥 Downloading…')">↓</button></div></td></tr>
            <tr><td>📄 <strong>Placement_Confirmation_NBL.pdf</strong></td><td>Confirmation letter</td><td>156 KB</td><td>01 Feb 2025</td><td><span class="badge b-green">Verified</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="toast('👁 Letter opened')">View</button><button class="btn btn-ghost btn-sm" onclick="toast('📥 Downloading…')">↓</button></div></td></tr>
            <tr><td>📄 <strong>Reference_Nakamhela.pdf</strong></td><td>Reference letter</td><td>98 KB</td><td>10 Mar 2025</td><td><span class="badge b-amber">Pending CEU review</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="toast('👁 Letter opened')">View</button><button class="btn btn-danger btn-sm" onclick="toast('🗑 Document removed.')">Remove</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>`,
    },

    /* ─────────────────────────────────────
       EMPLOYER
    ───────────────────────────────────── */
    employer: {
        dashboard: () => `
    <div class="hero">
      <div class="hero-title">Employer dashboard 🏢</div>
      <div class="hero-sub">Namibia Breweries Ltd &nbsp;·&nbsp; MoU verified &nbsp;·&nbsp; Semester 1, 2025</div>
      <div class="hero-actions">
        <button class="btn btn-accent btn-sm" onclick="showPage('postvac')">+ Post vacancy</button>
        <button class="btn btn-outline btn-sm" style="color:#fff;border-color:rgba(255,255,255,.25)" onclick="showPage('applicants')">Review applicants</button>
      </div>
    </div>
    <div class="stats">
      <div class="stat c-blue"><div class="stat-label">Active vacancies</div><div class="stat-val blue">2</div></div>
      <div class="stat"><div class="stat-label">Total applicants</div><div class="stat-val">11</div><div class="stat-sub">2 pending review</div></div>
      <div class="stat c-green"><div class="stat-label">Active interns</div><div class="stat-val green">1</div></div>
      <div class="stat c-amber"><div class="stat-label">Evaluations due</div><div class="stat-val amber">1</div></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">📋 My vacancies</div><span class="card-action" onclick="showPage('vaclist')">View all →</span></div>
        <div class="tbl-wrap"><table>
          <thead><tr><th>Position</th><th>Applicants</th><th>Deadline</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><strong>IT Support Intern</strong></td><td>8</td><td>28 Feb 2025</td><td><span class="badge b-gray">Closed</span></td></tr>
            <tr><td><strong>Systems Admin Intern</strong></td><td>3</td><td>30 May 2025</td><td><span class="badge b-green">Open</span></td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">🕒 Recent activity</div></div>
        <div class="ni"><div class="ni-dot"></div><div><div class="ni-text">New application from <strong>Dyrall Beukes</strong> — Systems Admin Intern</div><div class="ni-time">1 hour ago</div></div></div>
        <div class="ni"><div class="ni-dot"></div><div><div class="ni-text">CEU approved vacancy: <strong>Systems Admin Intern</strong></div><div class="ni-time">2 days ago</div></div></div>
        <div class="ni"><div class="ni-dot read"></div><div><div class="ni-text"><strong>Tjihezu</strong> submitted 3 new logbook entries</div><div class="ni-time">3 days ago</div></div></div>
      </div>
    </div>`,

        profile: async () => {
    let res = await fetch('api/profile.php?user_id=' + currentUser.id);
    let p = (await res.json()).data || {};
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">Company profile</div><div class="ph-sub">Manage your employer profile and partnership details</div></div></div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">🏢 Company information</div><button class="btn btn-outline btn-sm" onclick="updateProfileGlobal()">Save changes</button></div>
        <div class="f-group"><label class="f-label">Company name</label><input class="f-input" value="${p.name || ''}" readonly></div>
        <div class="f-group" style="margin-top:10px"><label class="f-label">Industry / sector</label><select class="f-select" disabled><option>FMCG</option><option>IT & Technology</option><option>Finance</option><option>Telecoms</option></select></div>
        <div class="f-group" style="margin-top:10px"><label class="f-label">Physical address</label><input class="f-input" value="${p.address || ''}"></div>
        <div class="f-group" style="margin-top:10px"><label class="f-label">Contact person</label><input class="f-input" value="${p.name || ''}"></div>
        <div class="f-group" style="margin-top:10px"><label class="f-label">HR email</label><input class="f-input" type="email" value="${p.email || ''}"></div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">📋 Partnership status</div></div>
        <dl class="dl">
          <dt>MoU status</dt><dd><span class="badge b-green">Verified & active</span></dd>
          <dt>MoU signed</dt><dd>12 March 2022</dd>
          <dt>MoU expiry</dt><dd>11 March 2027</dd>
          <dt>Total interns hosted</dt><dd>${p.count_apps || 0} (since account created)</dd>
          <dt>Active interns</dt><dd>0</dd>
          <dt>Evaluation avg</dt><dd>--/100</dd>
        </dl>
        <div style="margin-top:16px;padding:12px 14px;background:var(--success-dim);border-radius:var(--r-sm);font-size:12px;color:var(--success);font-weight:600">✓ Your company is a verified NUST CEU partner</div>
      </div>
    </div>`;
        },

        settings: () => settingsPage(),

        vaclist: async () => {
    let res = await fetch('api/vacancies.php?employer_id=' + currentUser.id);
    let data = await res.json();
    let vacs = data.data || [];
    return `
    <div class="ph">
      <div class="ph-left"><div class="ph-title">My vacancies</div><div class="ph-sub">Manage internship postings (FR-02)</div></div>
      <div class="ph-actions"><button class="btn btn-primary" onclick="showPage('postvac')">+ Post vacancy</button></div>
    </div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Position</th><th>Slots</th><th>Deadline</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${vacs.length === 0 ? '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:24px">No vacancies posted yet.</td></tr>' : vacs.map(v => `
          <tr><td><strong>${v.title}</strong></td><td>${v.slots}</td><td>${v.deadline}</td><td><span class="badge ${v.status === 'Open' ? 'b-green' : v.status === 'Pending' ? 'b-amber' : 'b-gray'}">${v.status}</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="window.currentVacancyId=${v.id};showPage('applicants')">Applicants</button><button class="btn btn-ghost btn-sm" onclick="toast('🗑 Function pending')">🗑</button></div></td></tr>
          `).join('')}
        </tbody>
      </table></div>
    </div>`;
        },

        postvac: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Post a vacancy</div><div class="ph-sub">New internship opportunities are reviewed by CEU before going live (FR-02)</div></div></div>
    <div class="card">
      <div class="f-row">
        <div class="f-group"><label class="f-label">Position title *</label><input class="f-input" id="pv-title" placeholder="e.g. IT Support Intern"></div>
        <div class="f-group"><label class="f-label">Department *</label><input class="f-input" id="pv-dept" placeholder="e.g. Information Technology"></div>
      </div>
      <div class="f-row" style="margin-top:10px">
        <div class="f-group"><label class="f-label">Duration (months) *</label><input class="f-input" id="pv-dur" type="number" placeholder="6" min="1" max="12"></div>
        <div class="f-group"><label class="f-label">Available slots *</label><input class="f-input" id="pv-slots" type="number" placeholder="2" min="1"></div>
      </div>
      <div class="f-row" style="margin-top:10px">
        <div class="f-group"><label class="f-label">Application deadline *</label><input class="f-input" id="pv-deadline" type="date"></div>
        <div class="f-group"><label class="f-label">Location *</label><input class="f-input" id="pv-location" value="Windhoek, Namibia"></div>
      </div>
      <div class="f-row" style="margin-top:10px">
        <div class="f-group">
          <label class="f-label">Field / sector *</label>
          <select class="f-select" id="pv-sector"><option>IT & Software</option><option>Engineering</option><option>Finance</option><option>Marketing</option><option>Logistics</option><option>Other</option></select>
        </div>
        <div class="f-group"><label class="f-label">Remuneration</label><input class="f-input" id="pv-remun" placeholder="e.g. NAD 3,000/month or Unpaid"></div>
      </div>
      <div class="f-group" style="margin-top:10px">
        <label class="f-label">Role description & requirements *</label>
        <textarea class="f-textarea" id="pv-desc" style="height:120px" placeholder="Describe the role, responsibilities, and required skills…"></textarea>
      </div>
      <div class="btn-group" style="margin-top:14px">
        <button class="btn btn-primary" onclick="submitNewVacancy()">Submit for review</button>
        <button class="btn btn-ghost" onclick="showPage('vaclist')">Cancel</button>
      </div>
    </div>`,

        applicants: async () => {
        let res = await fetch('api/applications.php?employer_id=' + currentUser.id);
        let data = await res.json();
        let apps = data.data || [];
        // Filter out applications for the current vacancy
        let vacApps = apps.filter(a => a.vacancy_id == window.currentVacancyId);
        return `
    <div class="ph"><div class="ph-left"><div class="ph-title">Applicants</div><div class="ph-sub">Filter and update tracking statuses (FR-04)</div></div></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Student</th><th>Programme</th><th>Year</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${vacApps.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:24px">No applicants yet.</td></tr>' : vacApps.map(a => `
          <tr><td><strong>${a.student_name}</strong></td><td>${a.programme || 'Unknown'}</td><td>${a.year_of_study || 'N/A'}</td><td>${a.applied_at}</td><td><span class="badge ${a.status==='Pending'?'b-amber':a.status==='Accepted'?'b-green':'b-blue'}">${a.status}</span></td><td><div class="btn-group"><button class="btn btn-success btn-sm" onclick="updateAppStatus(${a.id}, 'Accepted')">Accept</button><button class="btn btn-outline btn-sm" onclick="updateAppStatus(${a.id}, 'Shortlisted')">Shortlist</button><button class="btn btn-danger btn-sm" onclick="updateAppStatus(${a.id}, 'Rejected')">Reject</button></div></td></tr>
          `).join('')}
        </tbody>
      </table></div>
    </div>`;
        },

        interns: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Active interns</div><div class="ph-sub">Monitor your current WIL students</div></div></div>
    <div class="card">
      <div style="display:flex;gap:14px;align-items:flex-start">
        <div class="profile-avatar" style="width:52px;height:52px;font-size:18px">TT</div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <div style="font-size:15px;font-weight:700;color:var(--navy)">Tjihezu Tjihozu</div>
            <span class="badge b-green"><span class="b-dot"></span>Active</span>
          </div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px">IT Support Intern &nbsp;·&nbsp; BSc Computer Science &nbsp;·&nbsp; 01 Feb – 30 Jun 2025</div>
          <dl class="dl" style="margin-top:14px">
            <dt>Student No.</dt><dd>223127418</dd>
            <dt>Logbook entries</dt><dd>14 submitted &nbsp;&nbsp;<span class="badge b-amber">2 pending approval</span></dd>
            <dt>Mid-term score</dt><dd><strong style="color:var(--accent)">78/100</strong></dd>
            <dt>Lecturer</dt><dd>Dr. A. Tjihambuma</dd>
          </dl>
          <div style="margin-top:14px"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:5px"><span>Internship progress</span><span>65%</span></div>
          <div class="prog-bar"><div class="prog-fill" style="width:65%"></div></div></div>
          <div class="btn-group" style="margin-top:14px">
            <button class="btn btn-primary btn-sm" onclick="showPage('evaluate')">Submit evaluation</button>
            <button class="btn btn-outline btn-sm" onclick="toast('📓 Logbook entries opened.')">View logbook</button>
          </div>
        </div>
      </div>
    </div>`,

        evaluate: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Submit evaluation</div><div class="ph-sub">Employer performance evaluation form (FR-07)</div></div></div>
    <div class="card">
      <div class="f-row">
        <div class="f-group"><label class="f-label">Intern *</label><select class="f-select"><option>Tjihezu Tjihozu — IT Support Intern</option></select></div>
        <div class="f-group"><label class="f-label">Evaluation type *</label><select class="f-select" id="eval-type"><option>Mid-term evaluation</option><option>Final evaluation</option></select></div>
      </div>
      <div style="margin-top:14px;margin-bottom:6px;font-size:12px;font-weight:700;color:var(--text2)">Overall Performance Score (0–100)</div>
      <div class="f-row">
        <div class="f-group"><label class="f-label">Score</label><input id="eval-score" class="f-input" type="number" value="85" min="0" max="100"></div>
      </div>
      <div class="f-group" style="margin-top:10px">
        <label class="f-label">Detailed comments *</label>
        <textarea id="eval-feedback" class="f-textarea" style="height:120px" placeholder="Provide a thorough assessment of the intern's performance…"></textarea>
      </div>
      <div class="btn-group" style="margin-top:16px">
        <button class="btn btn-primary" onclick="submitEvaluation()">Submit evaluation</button>
        <button class="btn btn-outline" onclick="showPage('interns')">Cancel</button>
      </div>
    </div>`,
    },

    /* ─────────────────────────────────────
       CEU STAFF
    ───────────────────────────────────── */
    ceu: {
        dashboard: () => `
    <div class="hero">
      <div class="hero-title">CEU Operations dashboard 🛠️</div>
      <div class="hero-sub">Cooperative Education Unit &nbsp;·&nbsp; Ms. P. Shikongo &nbsp;·&nbsp; Semester 1, 2025</div>
    </div>
    <div class="stats">
      <div class="stat c-blue"><div class="stat-label">Total students</div><div class="stat-val blue">158</div><div class="stat-trend up">↑ 9% YoY</div></div>
      <div class="stat c-green"><div class="stat-label">Placements confirmed</div><div class="stat-val green">130</div><div class="stat-trend up">↑ 82% rate</div></div>
      <div class="stat c-amber"><div class="stat-label">Pending approvals</div><div class="stat-val amber">7</div><div class="stat-sub">Requires action</div></div>
      <div class="stat c-teal"><div class="stat-label">Partner employers</div><div class="stat-val teal">31</div><div class="stat-sub">From 230+ MoUs</div></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">🔔 Pending approvals</div><span class="card-action" onclick="showPage('approvals')">View all 7 →</span></div>
        <div class="tbl-wrap"><table>
          <thead><tr><th>Student</th><th>Employer</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td><strong>Dyrall Beukes</strong></td><td>MTC Namibia</td><td><div class="btn-group"><button class="btn btn-success btn-sm" onclick="toast('✅ Approved!')">Approve</button><button class="btn btn-danger btn-sm" onclick="toast('❌ Rejected')">Reject</button></div></td></tr>
            <tr><td><strong>Pascal Tandula</strong></td><td>Bank Windhoek</td><td><div class="btn-group"><button class="btn btn-success btn-sm" onclick="toast('✅ Approved!')">Approve</button><button class="btn btn-danger btn-sm" onclick="toast('❌ Rejected')">Reject</button></div></td></tr>
            <tr><td><strong>Silvio Ivano</strong></td><td>Telecom Namibia</td><td><div class="btn-group"><button class="btn btn-success btn-sm" onclick="toast('✅ Approved!')">Approve</button><button class="btn btn-danger btn-sm" onclick="toast('❌ Rejected')">Reject</button></div></td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">⚡ Quick actions</div></div>
        <div class="btn-group" style="flex-direction:column;align-items:stretch">
          <button class="btn btn-primary" onclick="showPage('approvals')">✅ Process approvals <span class="badge b-red" style="margin-left:auto">7</span></button>
          <button class="btn btn-outline" onclick="showPage('students')">🎓 Student directory</button>
          <button class="btn btn-outline" onclick="showPage('vacancies2')">📋 Review new vacancies</button>
          <button class="btn btn-outline" onclick="showPage('reports')">📊 Generate semester report</button>
          <button class="btn btn-outline" onclick="showPage('accounts')">👥 Manage user accounts</button>
        </div>
      </div>
    </div>`,

        profile: async () => {
    let res = await fetch('api/profile.php?user_id=' + currentUser.id);
    let p = (await res.json()).data || {};
    let names = (p.name || '').split(' ');
    let fname = names[0] || '';
    let lname = names.slice(1).join(' ') || '';
    let initials = fname.charAt(0) + (lname.charAt(0) || '');
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">My profile</div></div></div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div class="profile-avatar">${initials.toUpperCase()}</div>
        <div><div style="font-size:17px;font-weight:700;color:var(--navy)">${p.name || ''}</div><div style="font-size:13px;color:var(--muted)">CEU Staff · Cooperative Education Unit</div></div>
      </div>
      <div class="f-row">
        <div class="f-group"><label class="f-label">First name</label><input class="f-input" value="${fname}"></div>
        <div class="f-group"><label class="f-label">Last name</label><input class="f-input" value="${lname}"></div>
      </div>
      <div class="f-group" style="margin-top:10px"><label class="f-label">Email</label><input class="f-input" value="${p.email || ''}"></div>
      <div class="f-group" style="margin-top:10px"><label class="f-label">Phone</label><input class="f-input" value="${p.phone || ''}"></div>
      <div class="btn-group" style="margin-top:14px"><button class="btn btn-primary" onclick="updateProfileGlobal()">Save changes</button></div>
    </div>`;
        },

        settings: () => settingsPage(),

        approvals: async () => {
    let res = await fetch('api/applications.php?employer_id=0');
    let data = await res.json();
    let apps = data.data || [];
    let pending = apps.filter(a => a.status === 'Accepted');
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">Pending approvals</div><div class="ph-sub">${pending.length} placements require CEU review and sign-off</div></div></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Student</th><th>Employer</th><th>Role</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${pending.length === 0 ? '<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">No pending approvals.</td></tr>' : pending.map(a => `
          <tr><td><strong>${a.student_name}</strong></td><td>${a.employer_name}</td><td>${a.title}</td><td>${a.applied_at}</td><td><span class="badge b-amber">Pending approval</span></td><td><div class="btn-group"><button class="btn btn-success btn-sm" onclick="ceuApproveApp(${a.id})">Approve Placement</button><button class="btn btn-danger btn-sm" onclick="updateAppStatus(${a.id}, 'Rejected')">Reject</button></div></td></tr>
          `).join('')}
        </tbody>
      </table></div>
    </div>`;
        },

        placements: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">All placements</div><div class="ph-sub">130 confirmed placements this semester</div></div></div>
    <div class="chips"><div class="chip on" onclick="filterChip(this)">All</div><div class="chip" onclick="filterChip(this)">Active</div><div class="chip" onclick="filterChip(this)">Completed</div><div class="chip" onclick="filterChip(this)">Pending</div><div class="chip" onclick="filterChip(this)">Terminated</div></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Student</th><th>Employer</th><th>Role</th><th>Period</th><th>Lecturer</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td><strong>Tjihezu Tjihozu</strong></td><td>Namibia Breweries</td><td>IT Support Intern</td><td>Feb–Jun 2025</td><td>Dr. Tjihambuma</td><td><span class="badge b-green"><span class="b-dot"></span>Active</span></td><td><button class="btn btn-ghost btn-sm" onclick="toast('📌 Placement details opened.')">View</button></td></tr>
          <tr><td><strong>Alisha Tjihambuma</strong></td><td>FNB Namibia</td><td>Finance Intern</td><td>Jan–Jun 2025</td><td>Dr. Tjihambuma</td><td><span class="badge b-green"><span class="b-dot"></span>Active</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
          <tr><td><strong>Anselmo Martins</strong></td><td>NamPost</td><td>Logistics Intern</td><td>Feb–Jul 2025</td><td>Mr. Hamutenya</td><td><span class="badge b-amber"><span class="b-dot"></span>Pending</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
        </tbody>
      </table></div>
    </div>`,

        students: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Student directory</div><div class="ph-sub">158 registered students this semester</div></div>
    <div class="ph-actions"><button class="btn btn-outline btn-sm" onclick="exportCSV()">Export CSV</button></div></div>
    <div class="search-wrap"><span class="search-ico">🔍</span><input placeholder="Search by name, student number, or programme…"></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Name</th><th>Student No.</th><th>Programme</th><th>Faculty</th><th>Placement</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td><strong>Tjihezu Tjihozu</strong></td><td>223127418</td><td>BSc CS</td><td>Computing</td><td>Namibia Breweries</td><td><span class="badge b-green">Placed</span></td><td><button class="btn btn-ghost btn-sm" onclick="toast('👤 Student profile opened.')">View</button></td></tr>
          <tr><td><strong>Dyrall Beukes</strong></td><td>223058467</td><td>BEng Electrical</td><td>Engineering</td><td>MTC Namibia (pending)</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
          <tr><td><strong>Alisha Tjihambuma</strong></td><td>224047655</td><td>BCom Finance</td><td>Commerce</td><td>FNB Namibia</td><td><span class="badge b-green">Placed</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
          <tr><td><strong>Silvio Ivano</strong></td><td>224046179</td><td>BSc CS</td><td>Computing</td><td>Telecom Namibia</td><td><span class="badge b-amber">Docs missing</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
          <tr><td><strong>Anselmo Martins</strong></td><td>224065955</td><td>BSc IT</td><td>Computing</td><td>NamPost</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
          <tr><td><strong>Pascal Tandula</strong></td><td>224084038</td><td>BSc IT</td><td>Computing</td><td>Bank Windhoek</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-ghost btn-sm">View</button></td></tr>
        </tbody>
      </table></div>
    </div>`,

        employers2: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Employer directory</div><div class="ph-sub">31 active partners · 230+ MoUs signed</div></div>
    <div class="ph-actions"><button class="btn btn-primary btn-sm" onclick="toast('+ Add new employer partner')">+ Add employer</button></div></div>
    <div class="search-wrap"><span class="search-ico">🔍</span><input placeholder="Search employers…"></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Company</th><th>Sector</th><th>Interns 2025</th><th>MoU status</th><th>Contact</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td><strong>MTC Namibia</strong></td><td>Telecoms</td><td>8</td><td><span class="badge b-green">Verified</span></td><td>hr@mtc.com.na</td><td><div class="btn-group"><button class="btn btn-ghost btn-sm" onclick="toast('🏢 MTC profile opened.')">Edit</button><button class="btn btn-ghost btn-sm" onclick="toast('📧 Email sent to MTC.')">Contact</button></div></td></tr>
          <tr><td><strong>Bank Windhoek</strong></td><td>Finance</td><td>6</td><td><span class="badge b-green">Verified</span></td><td>hr@bankwindhoek.com.na</td><td><div class="btn-group"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-ghost btn-sm">Contact</button></div></td></tr>
          <tr><td><strong>NamPost</strong></td><td>Logistics</td><td>3</td><td><span class="badge b-amber">Renewal pending</span></td><td>hr@nampost.com.na</td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="toast('📋 MoU renewal sent.')">Renew MoU</button><button class="btn btn-ghost btn-sm">Contact</button></div></td></tr>
        </tbody>
      </table></div>
    </div>`,

        vacancies2: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Vacancy management</div><div class="ph-sub">Review and approve employer vacancies before publication</div></div></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Position</th><th>Employer</th><th>Field</th><th>Slots</th><th>Deadline</th><th>CEU status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td><strong>Systems Admin Intern</strong></td><td>Namibia Breweries</td><td>IT</td><td>1</td><td>30 May 2025</td><td><span class="badge b-green">Published</span></td><td><div class="btn-group"><button class="btn btn-ghost btn-sm" onclick="toast('📋 Vacancy details opened.')">View</button><button class="btn btn-danger btn-sm" onclick="confirmDelete('vacancy')">Remove</button></div></td></tr>
          <tr><td><strong>Finance Graduate Intern</strong></td><td>Standard Bank</td><td>Finance</td><td>2</td><td>01 Jun 2025</td><td><span class="badge b-amber">Pending review</span></td><td><div class="btn-group"><button class="btn btn-success btn-sm" onclick="toast('✅ Vacancy approved & published!')">Approve</button><button class="btn btn-danger btn-sm" onclick="toast('❌ Vacancy rejected. Employer notified.')">Reject</button></div></td></tr>
        </tbody>
      </table></div>
    </div>`,

        accounts: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Manage user accounts</div><div class="ph-sub">From the DIMS Use Case Diagram — Manage User Accounts</div></div>
    <div class="ph-actions"><button class="btn btn-primary btn-sm" onclick="openCreateAccountModal()">+ Create account</button></div></div>
    <div class="search-wrap"><span class="search-ico">🔍</span><input placeholder="Search by name, email, or role…"></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td><strong>Dr. A. Tjihambuma</strong></td><td>a.tjihambuma@nust.na</td><td><span class="badge b-blue">Lecturer</span></td><td>15 Jan 2025</td><td><span class="badge b-green">Active</span></td><td><div class="btn-group"><button class="btn btn-ghost btn-sm" onclick="toast('✏️ Account edited.')">Edit</button><button class="btn btn-ghost btn-sm" onclick="toast('🔒 Password reset email sent.')">Reset pwd</button></div></td></tr>
          <tr><td><strong>Mr. H. Nakamhela</strong></td><td>hr@namibiabreweries.com</td><td><span class="badge b-teal">Employer</span></td><td>12 Mar 2022</td><td><span class="badge b-green">Active</span></td><td><div class="btn-group"><button class="btn btn-ghost btn-sm">Edit</button><button class="btn btn-danger btn-sm" onclick="confirmDelete('account')">Deactivate</button></div></td></tr>
          <tr><td><strong>Prof. J. Amupolo</strong></td><td>j.amupolo@nust.na</td><td><span class="badge b-amber">Management</span></td><td>10 Jan 2025</td><td><span class="badge b-green">Active</span></td><td><div class="btn-group"><button class="btn btn-ghost btn-sm">Edit</button></div></td></tr>
        </tbody>
      </table></div>
    </div>`,

        reports: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Generate reports</div><div class="ph-sub">Placement statistics by faculty, semester, and employer (FR-08)</div></div></div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">📈 Placement statistics report</div></div>
        <p style="font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.7">Placement rates by faculty, semester, and employer. Exportable as PDF or CSV.</p>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Semester</label><select class="f-select"><option>Semester 1, 2025</option><option>Semester 2, 2024</option></select></div>
          <div class="f-group"><label class="f-label">Faculty</label><select class="f-select"><option>All faculties</option><option>Computing & Informatics</option><option>Engineering</option><option>Commerce</option></select></div>
        </div>
        <div class="btn-group" style="margin-top:12px">
          <button class="btn btn-primary" onclick="downloadPDF()">Download PDF</button>
          <button class="btn btn-outline" onclick="exportCSV()">Export CSV</button>
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">📓 Student performance report</div></div>
        <p style="font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.7">Aggregate evaluation scores, logbook submission rates, and outstanding assessments.</p>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Semester</label><select class="f-select"><option>Semester 1, 2025</option></select></div>
          <div class="f-group"><label class="f-label">Lecturer</label><select class="f-select"><option>All lecturers</option><option>Dr. A. Tjihambuma</option></select></div>
        </div>
        <div class="btn-group" style="margin-top:12px">
          <button class="btn btn-primary" onclick="downloadPDF()">Download PDF</button>
          <button class="btn btn-outline" onclick="exportCSV()">Export CSV</button>
        </div>
      </div>
    </div>`,
    },

    /* ─────────────────────────────────────
       LECTURER
    ───────────────────────────────────── */
    lecturer: {
        dashboard: () => `
    <div class="hero">
      <div class="hero-title">Supervisor dashboard 📚</div>
      <div class="hero-sub">Dr. A. Tjihambuma &nbsp;·&nbsp; Computing & Informatics &nbsp;·&nbsp; 6 students under supervision</div>
    </div>
    <div class="stats">
      <div class="stat c-blue"><div class="stat-label">Students supervised</div><div class="stat-val blue">6</div></div>
      <div class="stat c-amber"><div class="stat-label">Logbooks to review</div><div class="stat-val amber">4</div><div class="stat-sub">Requires action</div></div>
      <div class="stat c-green"><div class="stat-label">Evaluations submitted</div><div class="stat-val green">2</div></div>
      <div class="stat"><div class="stat-label">Avg student score</div><div class="stat-val">76.4</div><div class="stat-trend up">↑ from 74.1</div></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">🎓 My students</div><span class="card-action" onclick="showPage('mystudents')">View all →</span></div>
        <div class="tbl-wrap"><table>
          <thead><tr><th>Student</th><th>Employer</th><th>Progress</th><th>Score</th></tr></thead>
          <tbody>
            <tr><td><strong>Tjihezu Tjihozu</strong></td><td>Namibia Breweries</td><td><div class="prog-bar" style="width:120px;margin:0"><div class="prog-fill" style="width:65%"></div></div></td><td><strong style="color:var(--accent)">78</strong></td></tr>
            <tr><td><strong>Alisha Tjihambuma</strong></td><td>FNB Namibia</td><td><div class="prog-bar" style="width:120px;margin:0"><div class="prog-fill" style="width:80%"></div></div></td><td><strong style="color:var(--success)">82</strong></td></tr>
            <tr><td><strong>Dyrall Beukes</strong></td><td>MTC Namibia</td><td><span class="badge b-amber" style="font-size:10px">Pending placement</span></td><td>—</td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">📓 Pending logbook reviews</div><span class="card-action" onclick="showPage('logbookreview')">Review all →</span></div>
        <div class="ni"><div class="ni-dot"></div><div><div class="ni-text"><strong>Tjihezu</strong> — Week 13: Network infrastructure mapping</div><div class="ni-time">Submitted yesterday</div></div></div>
        <div class="ni"><div class="ni-dot"></div><div><div class="ni-text"><strong>Alisha</strong> — Weeks 11 & 12 pending</div><div class="ni-time">Submitted 3 days ago</div></div></div>
        <div class="ni"><div class="ni-dot"></div><div><div class="ni-text"><strong>Anselmo</strong> — Week 10 entry</div><div class="ni-time">Submitted 4 days ago</div></div></div>
        <div style="margin-top:12px"><button class="btn btn-primary btn-sm btn-full" onclick="showPage('logbookreview')">Review logbooks <span class="badge b-red" style="margin-left:4px">4</span></button></div>
      </div>
    </div>`,

        profile: async () => {
    let res = await fetch('api/profile.php?user_id=' + currentUser.id);
    let p = (await res.json()).data || {};
    let names = (p.name || '').split(' ');
    let fname = names[0] || '';
    let lname = names.slice(1).join(' ') || '';
    let initials = fname.charAt(0) + (lname.charAt(0) || '');
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">My profile</div></div></div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div class="profile-avatar">${initials.toUpperCase()}</div>
        <div><div style="font-size:17px;font-weight:700;color:var(--navy)">${p.name || ''}</div><div style="font-size:13px;color:var(--muted)">Lecturer &amp; WIL Supervisor &nbsp;·&nbsp; Computing &amp; Informatics</div></div>
      </div>
      <div class="f-row">
        <div class="f-group"><label class="f-label">First name</label><input class="f-input" value="${fname}"></div>
        <div class="f-group"><label class="f-label">Last name</label><input class="f-input" value="${lname}"></div>
      </div>
      <div class="f-group" style="margin-top:10px"><label class="f-label">Email</label><input class="f-input" value="${p.email || ''}"></div>
      <div class="btn-group" style="margin-top:14px"><button class="btn btn-primary" onclick="updateProfileGlobal()">Save changes</button></div>
    </div>`;
        },

        settings: () => settingsPage(),
        notifications: async () => await notificationsPage(),

        mystudents: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Student list</div><div class="ph-sub">Students under your WIL supervision</div></div></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Student</th><th>Programme</th><th>Employer</th><th>Logbook</th><th>Score</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr><td><strong>Tjihezu Tjihozu</strong></td><td>BSc CS</td><td>Namibia Breweries</td><td><span class="badge b-amber">2 pending</span></td><td><strong style="color:var(--accent)">78</strong></td><td><span class="badge b-green">Active</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="showPage('logbookreview')">Logbook</button><button class="btn btn-ghost btn-sm" onclick="showPage('evaluate')">Evaluate</button></div></td></tr>
          <tr><td><strong>Alisha Tjihambuma</strong></td><td>BCom Finance</td><td>FNB Namibia</td><td><span class="badge b-amber">2 pending</span></td><td><strong style="color:var(--success)">82</strong></td><td><span class="badge b-green">Active</span></td><td><div class="btn-group"><button class="btn btn-outline btn-sm" onclick="showPage('logbookreview')">Logbook</button><button class="btn btn-ghost btn-sm" onclick="showPage('evaluate')">Evaluate</button></div></td></tr>
          <tr><td><strong>Dyrall Beukes</strong></td><td>BEng Electrical</td><td>MTC Namibia</td><td>—</td><td>—</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-ghost btn-sm" onclick="toast('📌 Awaiting CEU placement approval.')">Details</button></td></tr>
        </tbody>
      </table></div>
    </div>`,

        logbookreview: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Logbook review</div><div class="ph-sub">4 entries awaiting your review — FR-06</div></div></div>
    ${[
                { student: 'Tjihezu Tjihozu', week: 'Week 13', dates: '21–25 Apr 2025', title: 'Network infrastructure mapping', body: 'Assisted in mapping the company\'s internal network using Nmap and Visio. Created updated topology diagrams for three server rooms and documented IP address ranges.', hrs: 38 },
                { student: 'Alisha Tjihambuma', week: 'Week 12', dates: '14–18 Apr 2025', title: 'Credit risk assessment training', body: 'Completed internal credit risk assessment module and shadowed senior analyst during client meetings. Assisted with data input for the monthly risk report.', hrs: 40 },
            ].map(e => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px">
        <div>
          <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em">${e.student} &nbsp;·&nbsp; ${e.week} &nbsp;·&nbsp; ${e.dates}</div>
          <div style="font-size:15px;font-weight:700;color:var(--navy);margin-top:4px">${e.title}</div>
        </div>
        <span class="log-hrs">⏱ ${e.hrs} hrs</span>
      </div>
      <p style="font-size:13px;color:var(--text2);line-height:1.65">${e.body}</p>
      <div class="f-group" style="margin-top:14px">
        <label class="f-label">Feedback comment (optional)</label>
        <textarea class="f-textarea" placeholder="Add feedback for this logbook entry…"></textarea>
      </div>
      <div class="btn-group" style="margin-top:10px">
        <button class="btn btn-success btn-sm" onclick="toast('✅ Entry approved! Student notified.')">✓ Approve</button>
        <button class="btn btn-outline btn-sm" onclick="toast('💬 Feedback sent. Entry returned.')">Return with feedback</button>
        <button class="btn btn-ghost btn-sm" onclick="toast('❌ Entry rejected.')">Reject</button>
      </div>
    </div>`).join('')}`,

        evaluate: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Submit evaluation</div><div class="ph-sub">Academic supervisor evaluation form (FR-06)</div></div></div>
    <div class="card">
      <div class="f-row">
        <div class="f-group"><label class="f-label">Student *</label><select class="f-select"><option>Tjihezu Tjihozu</option><option>Alisha Tjihambuma</option></select></div>
        <div class="f-group"><label class="f-label">Evaluation period *</label><select class="f-select"><option>Mid-term evaluation</option><option>Final evaluation</option></select></div>
      </div>
      <div class="f-row" style="margin-top:10px">
        <div class="f-group"><label class="f-label">Academic performance (0–100)</label><input class="f-input" type="number" value="79" min="0" max="100"></div>
        <div class="f-group"><label class="f-label">Logbook quality (0–100)</label><input class="f-input" type="number" value="85" min="0" max="100"></div>
      </div>
      <div class="f-group" style="margin-top:10px">
        <label class="f-label">Supervisor's comments *</label>
        <textarea class="f-textarea" style="height:120px">Student demonstrates solid understanding of applied systems administration. Logbook entries are detailed and reflective. Shows initiative in seeking new learning opportunities.</textarea>
      </div>
      <div class="btn-group" style="margin-top:16px">
        <button class="btn btn-primary" onclick="toast('⭐ Evaluation submitted to CEU!');showPage('mystudents')">Submit evaluation</button>
        <button class="btn btn-outline" onclick="toast('💾 Draft saved.')">Save draft</button>
      </div>
    </div>`,
    },

    /* ─────────────────────────────────────
       MANAGEMENT
    ───────────────────────────────────── */
    management: {
        dashboard: () => `
    <div class="hero">
      <div class="hero-title">Institutional overview 📊</div>
      <div class="hero-sub">NUST DIMS &nbsp;·&nbsp; Read-only management dashboard &nbsp;·&nbsp; Academic year 2025 (FR-10)</div>
    </div>
    <div class="stats">
      <div class="stat c-blue"><div class="stat-label">Total students</div><div class="stat-val blue">158</div><div class="stat-trend up">↑ 9% from 2024</div></div>
      <div class="stat c-green"><div class="stat-label">Placement rate</div><div class="stat-val green">82%</div><div class="stat-trend up">↑ 2pts from 2024</div></div>
      <div class="stat c-teal"><div class="stat-label">Partner employers</div><div class="stat-val teal">31</div><div class="stat-sub">230+ MoUs total</div></div>
      <div class="stat"><div class="stat-label">Avg eval score</div><div class="stat-val">76.4</div><div class="stat-trend up">↑ from 74.1</div></div>
    </div>
    <div class="g2">
      <div class="card">
        <div class="card-head"><div class="card-title">📊 Placements by programme</div></div>
        <div class="tbl-wrap"><table>
          <thead><tr><th>Programme</th><th>Students</th><th>Placed</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>BSc Computer Science</td><td>30</td><td>28</td><td><strong style="color:var(--success)">93%</strong></td></tr>
            <tr><td>BEng Electrical Eng.</td><td>25</td><td>22</td><td><strong style="color:var(--success)">88%</strong></td></tr>
            <tr><td>BSc Information Tech.</td><td>39</td><td>31</td><td>79%</td></tr>
            <tr><td>BCom Finance</td><td>25</td><td>19</td><td>76%</td></tr>
            <tr><td>Other programmes</td><td>39</td><td>30</td><td>77%</td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-title">🏢 Top employers by intake</div></div>
        <div class="tbl-wrap"><table>
          <thead><tr><th>Employer</th><th>Interns</th><th>Avg score</th></tr></thead>
          <tbody>
            <tr><td>MTC Namibia</td><td><strong>8</strong></td><td>79.2</td></tr>
            <tr><td>Bank Windhoek</td><td><strong>6</strong></td><td>81.4</td></tr>
            <tr><td>Namibia Breweries</td><td><strong>5</strong></td><td>78.0</td></tr>
            <tr><td>Telecom Namibia</td><td><strong>4</strong></td><td>74.5</td></tr>
            <tr><td>FNB Namibia</td><td><strong>4</strong></td><td>80.1</td></tr>
          </tbody>
        </table></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title">📈 Placement trend 2022–2025</div></div>
      <div class="chart-box"><canvas id="trendChart" height="80"></canvas></div>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div>Students registered</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--teal)"></div>Students placed</div>
      </div>
    </div>`,

        profile: async () => {
    let res = await fetch('api/profile.php?user_id=' + currentUser.id);
    let p = (await res.json()).data || {};
    let names = (p.name || '').split(' ');
    let fname = names[0] || '';
    let lname = names.slice(1).join(' ') || '';
    let initials = fname.charAt(0) + (lname.charAt(0) || '');
    return `
    <div class="ph"><div class="ph-left"><div class="ph-title">My profile</div></div></div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div class="profile-avatar">${initials.toUpperCase()}</div>
        <div><div style="font-size:17px;font-weight:700;color:var(--navy)">${p.name || ''}</div><div style="font-size:13px;color:var(--muted)">Management &nbsp;·&nbsp; Read-only Access</div></div>
      </div>
      <dl class="dl">
        <dt>Email</dt><dd>${p.email || ''}</dd>
        <dt>Role</dt><dd>Management (read-only dashboard access)</dd>
        <dt>Department</dt><dd>University Analytics Board</dd>
      </dl>
    </div>`;
        },

        settings: () => settingsPage(),

        analytics: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Analytics</div><div class="ph-sub">Historical trends and sector performance data</div></div>
    <div class="ph-actions"><button class="btn btn-outline btn-sm" onclick="exportCSV()">Export</button></div></div>
    <div class="card">
      <div class="card-head"><div class="card-title">📊 Placements by sector — 2025</div></div>
      <div class="chart-box"><canvas id="sectorChart" height="90"></canvas></div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title">📈 3-year placement trend</div></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Year</th><th>Registered</th><th>Placed</th><th>Rate</th><th>Avg score</th><th>YoY change</th></tr></thead>
        <tbody>
          <tr><td>2022</td><td>118</td><td>84</td><td>71%</td><td>70.8</td><td>—</td></tr>
          <tr><td>2023</td><td>132</td><td>98</td><td>74%</td><td>72.1</td><td><span class="badge b-green">↑ +3pts</span></td></tr>
          <tr><td>2024</td><td>145</td><td>116</td><td>80%</td><td>74.1</td><td><span class="badge b-green">↑ +6pts</span></td></tr>
          <tr><td><strong>2025</strong></td><td><strong>158</strong></td><td><strong>130</strong></td><td><strong style="color:var(--success)">82%</strong></td><td><strong>76.4</strong></td><td><span class="badge b-green">↑ +2pts</span></td></tr>
        </tbody>
      </table></div>
    </div>`,

        employers3: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Employer directory</div><div class="ph-sub">Read-only view — contact CEU to update records</div></div></div>
    <div class="search-wrap"><span class="search-ico">🔍</span><input placeholder="Search employers…"></div>
    <div class="card">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Company</th><th>Sector</th><th>Interns 2025</th><th>Avg score</th><th>MoU status</th></tr></thead>
        <tbody>
          <tr><td><strong>MTC Namibia</strong></td><td>Telecoms</td><td>8</td><td>79.2</td><td><span class="badge b-green">Verified</span></td></tr>
          <tr><td><strong>Bank Windhoek</strong></td><td>Finance</td><td>6</td><td>81.4</td><td><span class="badge b-green">Verified</span></td></tr>
          <tr><td><strong>Namibia Breweries</strong></td><td>FMCG</td><td>5</td><td>78.0</td><td><span class="badge b-green">Verified</span></td></tr>
          <tr><td><strong>Telecom Namibia</strong></td><td>Telecoms</td><td>4</td><td>74.5</td><td><span class="badge b-green">Verified</span></td></tr>
          <tr><td><strong>FNB Namibia</strong></td><td>Finance</td><td>4</td><td>80.1</td><td><span class="badge b-green">Verified</span></td></tr>
          <tr><td><strong>NamPost</strong></td><td>Logistics</td><td>3</td><td>72.0</td><td><span class="badge b-amber">Renewal pending</span></td></tr>
        </tbody>
      </table></div>
    </div>`,

        reports2: () => `
    <div class="ph"><div class="ph-left"><div class="ph-title">Strategic reports</div><div class="ph-sub">Read-only institutional reports generated by CEU (FR-10)</div></div></div>
    ${[
                { title: 'Annual placement outcomes 2025', icon: '📈', desc: 'Full-year placement statistics, sector breakdown, and employer engagement metrics for all faculties.' },
                { title: 'Student performance summary', icon: '📓', desc: 'Aggregate evaluation scores, logbook submission rates, and outstanding assessments per programme.' },
                { title: 'Employer partnership health', icon: '🏢', desc: 'Active vs lapsed employer MoUs, vacancy fill rates, and 3-year intake growth by sector.' },
                { title: 'Youth employment impact report', icon: '🌍', desc: 'DIMS contribution to reducing Namibia\'s 44.4% youth unemployment rate through WIL facilitation.' },
            ].map(r => `
    <div class="card">
      <div class="card-head">
        <div class="card-title">${r.icon} ${r.title}</div>
      </div>
      <p style="font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.7">${r.desc}</p>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" onclick="downloadPDF()">Download PDF</button>
        <button class="btn btn-outline btn-sm" onclick="exportCSV()">Export data</button>
      </div>
    </div>`).join('')}`,
    },
}; // end PAGES

/* ══════════════════════════════════════
   MODALS
══════════════════════════════════════ */
window.pendingVacancyId = null;
function openApplyModal(vid, company, position) {
    window.pendingVacancyId = vid;
    openModal({
        title: `Apply — ${position}`, sub: company, body: `
    <div class="f-row">
      <div class="f-group"><label class="f-label">Full name</label><input class="f-input" value="${currentUser.name}" readonly></div>
    </div>
    <div class="f-group" style="margin-top:10px">
      <label class="f-label">Cover letter *</label>
      <textarea class="f-textarea" style="height:110px" placeholder="Briefly describe your motivation…"></textarea>
    </div>`,
        actions: `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
             <button class="btn btn-primary" onclick="submitApplication()">Submit application →</button>`
    });
}

async function submitApplication() {
    let fd = new FormData();
    fd.append('student_id', currentUser.id);
    fd.append('vacancy_id', window.pendingVacancyId);
    
    let res = await fetch('api/applications.php', { method: 'POST', body: fd });
    let json = await res.json();
    
    closeModal();
    if(json.status === 'success') {
       toast('🎉 Application submitted successfully!');
       setTimeout(() => showPage('applications'), 700);
    } else {
       toast('❌ ' + json.message);
    }
}

function openLogModal() {
    const today = new Date().toISOString().split('T')[0];
    openModal({
        title: 'New logbook entry', sub: 'Current Placement', body: `
    <div class="f-row">
      <div class="f-group"><label class="f-label">Week label</label><input class="f-input" id="log-week" value="Week 1"></div>
      <div class="f-group"><label class="f-label">Date Range</label><input class="f-input" id="log-dates" placeholder="e.g. 21-25 Apr 2025"></div>
    </div>
    <div class="f-row" style="margin-top:10px">
      <div class="f-group"><label class="f-label">Hours worked</label><input class="f-input" type="number" id="log-hrs" placeholder="40"></div>
      <div class="f-group"><label class="f-label">Title</label><input class="f-input" id="log-title" placeholder="Server maintenance"></div>
    </div>
    <div class="f-group" style="margin-top:10px">
      <label class="f-label">Detailed activities *</label>
      <textarea class="f-textarea" id="log-body" style="height:110px" placeholder="Describe what you worked on in detail..."></textarea>
    </div>`,
        actions: `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
             <button class="btn btn-primary" onclick="submitLogbook()">Save entry</button>`
    });
}

async function submitLogbook() {
    let fd = new FormData();
    fd.append('placement_id', 1); // hardcoded for test, should be dynamic if student has active placements
    fd.append('week_title', document.getElementById('log-week').value);
    fd.append('dates', document.getElementById('log-dates').value);
    fd.append('hours', document.getElementById('log-hrs').value);
    fd.append('body', document.getElementById('log-body').value);
    
    let res = await fetch('api/logbooks.php', { method: 'POST', body: fd });
    let json = await res.json();
    
    closeModal();
    if(json.status === 'success') {
       toast('📓 Logbook entry saved! Sent to lecturer for approval.');
       showPage('logbook');
    } else {
       toast('❌ ' + json.message);
    }
}

function openUploadModal() {
    openModal({
        title: 'Upload document', body: `
    <div class="f-group">
      <label class="f-label">Document type</label>
      <select class="f-select"><option>Curriculum Vitae (CV)</option><option>Academic Transcript</option><option>Confirmation letter</option><option>Reference letter</option><option>Other</option></select>
    </div>
    <div style="margin-top:12px;border:2px dashed var(--border);border-radius:var(--r-sm);padding:32px;text-align:center;cursor:pointer" onclick="triggerDocUpload('cv')">
      <div style="font-size:28px;margin-bottom:8px">📤</div>
      <div style="font-size:13px;font-weight:600;color:var(--text2)">Click to select file</div>
      <div style="font-size:11px;color:var(--muted);margin-top:4px">PDF only · Max 5MB</div>
    </div>`,
        size: 'sm',
        actions: `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
             <button class="btn btn-primary" onclick="closeModal();toast('📄 Document uploaded successfully!')">Upload</button>`
    });
}

function openCreateAccountModal() {
    openModal({
        title: 'Create user account', body: `
    <div class="f-row">
      <div class="f-group"><label class="f-label">First name</label><input class="f-input" placeholder="First name"></div>
      <div class="f-group"><label class="f-label">Last name</label><input class="f-input" placeholder="Last name"></div>
    </div>
    <div class="f-group" style="margin-top:10px"><label class="f-label">Email address</label><input class="f-input" type="email" placeholder="user@nust.na"></div>
    <div class="f-group" style="margin-top:10px">
      <label class="f-label">Role</label>
      <select class="f-select"><option>Student</option><option>Lecturer</option><option>Employer</option><option>CEU Staff</option><option>Management</option></select>
    </div>
    <div style="margin-top:12px;padding:10px 12px;background:var(--accent-dim);border-radius:var(--r-sm);font-size:12px;color:var(--text2)">
      A temporary password will be emailed to the user.
    </div>`,
        actions: `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
             <button class="btn btn-primary" onclick="closeModal();toast('✅ Account created. Credentials sent by email.')">Create account</button>`
    });
}

function confirmDelete(type) {
    openModal({
        title: `Delete ${type}?`,
        sub: 'This action cannot be undone.',
        size: 'sm',
        body: `<div class="confirm-dialog"><div class="confirm-icon">🗑️</div></div>`,
        actions: `<button class="btn btn-outline" onclick="closeModal()">Cancel</button>
             <button class="btn btn-danger" onclick="closeModal();toast('🗑 ${type.charAt(0).toUpperCase() + type.slice(1)} deleted.')">Delete ${type}</button>`
    });
}

/* ══════════════════════════════════════
   CHARTS
══════════════════════════════════════ */
function initCharts() {
    const tc = document.getElementById('trendChart');
    if (tc) drawBar(tc, [
        { label: 'Registered', vals: [118, 132, 145, 158], color: 'rgba(14,165,233,.2)', border: '#0EA5E9' },
        { label: 'Placed', vals: [84, 98, 116, 130], color: 'rgba(20,184,166,.2)', border: '#14B8A6' },
    ], ['2022', '2023', '2024', '2025']);

    const sc = document.getElementById('sectorChart');
    if (sc) drawBar(sc, [
        { label: 'Students placed', vals: [41, 22, 19, 12, 9, 27], color: 'rgba(14,165,233,.2)', border: '#0EA5E9' },
    ], ['ICT', 'Engineering', 'Finance', 'Marketing', 'Logistics', 'Other']);
}

function drawBar(canvas, datasets, labels) {
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.parentElement.clientWidth || 600;
    const H = (canvas.getAttribute('height') || 90) * 1;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const pad = { t: 18, r: 10, b: 30, l: 36 };
    const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;
    const allV = datasets.flatMap(d => d.vals);
    const mx = Math.max(...allV) * 1.15;
    // grid
    ctx.strokeStyle = '#E2E8F0'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = pad.t + ph - (i / 4) * ph;
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + pw, y); ctx.stroke();
        ctx.fillStyle = '#94A3B8'; ctx.font = '10px Epilogue,sans-serif';
        ctx.textAlign = 'right'; ctx.fillText(Math.round(mx * i / 4), pad.l - 4, y + 3);
    }
    const gw = pw / labels.length;
    const tot = gw * .7, bw = tot / datasets.length, gap = gw * .15;
    datasets.forEach((ds, di) => {
        ds.vals.forEach((v, i) => {
            const x = pad.l + i * gw + gap + di * bw;
            const bh = (v / mx) * ph, y = pad.t + ph - bh;
            ctx.fillStyle = ds.color;
            const r = 4;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x, y, bw - 2, bh, [r, r, 0, 0]);
            else { ctx.moveTo(x + r, y); ctx.lineTo(x + bw - 2 - r, y); ctx.quadraticCurveTo(x + bw - 2, y, x + bw - 2, y + r); ctx.lineTo(x + bw - 2, y + bh); ctx.lineTo(x, y + bh); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); }
            ctx.fill();
            ctx.strokeStyle = ds.border; ctx.lineWidth = 1.5;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x, y, bw - 2, bh, [r, r, 0, 0]);
            else { ctx.moveTo(x + r, y); ctx.lineTo(x + bw - 2 - r, y); ctx.quadraticCurveTo(x + bw - 2, y, x + bw - 2, y + r); ctx.lineTo(x + bw - 2, y + bh); ctx.lineTo(x, y + bh); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); }
            ctx.stroke();
            ctx.fillStyle = '#0F172A'; ctx.font = 'bold 9px Epilogue,sans-serif';
            ctx.textAlign = 'center'; ctx.fillText(v, x + (bw - 2) / 2, y - 4);
        });
    });
    ctx.fillStyle = '#94A3B8'; ctx.font = '11px Epilogue,sans-serif'; ctx.textAlign = 'center';
    labels.forEach((l, i) => ctx.fillText(l, pad.l + i * gw + gw / 2, pad.t + ph + 18));
}

/* ══════════════════════════════════════
   UTILS
══════════════════════════════════════ */
function filterChip(el) {
    el.closest('.chips').querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
    el.classList.add('on');
}
window.addEventListener('resize', initCharts);

window.submitNewVacancy = async function() {
    let fd = new FormData();
    fd.append('employer_id', currentUser.id);
    fd.append('title', document.getElementById('pv-title').value);
    fd.append('department', document.getElementById('pv-dept').value);
    fd.append('location', document.getElementById('pv-location').value);
    fd.append('duration_months', document.getElementById('pv-dur').value);
    fd.append('deadline', document.getElementById('pv-deadline').value);
    fd.append('slots', document.getElementById('pv-slots').value);
    fd.append('sector', document.getElementById('pv-sector').value);
    fd.append('description', document.getElementById('pv-desc').value);
    fd.append('remuneration', document.getElementById('pv-remun').value);
    
    let res = await fetch('api/vacancies.php', { method: 'POST', body: fd });
    let json = await res.json();
    if(json.status === 'success') {
        toast('✅ Vacancy submitted successfully! Awaiting CEU review.');
        showPage('vaclist');
    } else {
        toast('❌ ' + json.message);
    }
};

window.updateAppStatus = async function(id, status) {
    let res = await fetch('api/applications.php', { method: 'PUT', body: JSON.stringify({id: id, status: status}) });
    let json = await res.json();
    if(json.status === 'success') {
        toast('✅ Application ' + status + '!');
        showPage('applicants');
    } else {
        toast('❌ Failed to update status.');
    }
};

window.submitEvaluation = async function() {
    let fd = new FormData();
    fd.append('placement_id', 1);
    fd.append('evaluator_id', currentUser.id);
    fd.append('type', document.getElementById('eval-type').value);
    fd.append('score', document.getElementById('eval-score').value);
    fd.append('feedback', document.getElementById('eval-feedback').value);
    
    let res = await fetch('api/evaluations.php', { method: 'POST', body: fd });
    let json = await res.json();
    if(json.status === 'success') {
        toast('⭐ Evaluation submitted to CEU and lecturer.');
        showPage('interns');
    } else {
        toast('❌ ' + json.message);
    }
};

window.ceuApproveApp = async function(id) {
    // In our backend logic, Accepted -> Placed is equivalent to Accepted by employer. 
    // We update status to Placed to reflect CEU approval
    let res = await fetch('api/applications.php', { method: 'PUT', body: JSON.stringify({id: id, status: 'Placed'}) });
    let json = await res.json();
    if(json.status === 'success') {
        toast('✅ Placement approved and finalized!');
        showPage('approvals');
    } else {
        toast('❌ Update failed');
    }
};

window.exportCSV = function() {
    let t = document.querySelector('.card table');
    if(!t) return toast('⚠️ No data to export.');
    let csv = [];
    for(let r of t.rows) {
        let cols = [];
        for(let c of r.cells) cols.push('"' + c.innerText.replace(/"/g, '""') + '"');
        csv.push(cols.join(','));
    }
    let a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv.join('\n'));
    a.download = 'export.csv';
    a.click();
    toast('✅ CSV Exported successfully.');
};

window.downloadPDF = function() {
    window.print();
    toast('✅ PDF Export dialog opened.');
};

window.triggerDocUpload = function(type) {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = async e => {
        let file = e.target.files[0];
        if(!file) return;
        let fd = new FormData();
        fd.append('user_id', currentUser.id);
        fd.append('type', type);
        fd.append('document', file);
        toast('⏳ Uploading ' + type.toUpperCase() + '...');
        try {
            let res = await fetch('api/documents.php', { method: 'POST', body: fd });
            let json = await res.json();
            if(json.status === 'success') {
                toast('✅ File uploaded successfully!');
                showPage('documents');
            } else toast('❌ Upload failed: ' + json.message);
        } catch(err) {
            toast('❌ Network error during upload.');
        }
    };
    input.click();
};

window.globalSearch = function() {
    let input = prompt('Enter search term (filters visible table entries):');
    if(input && input.trim() !== '') {
        let term = input.toLowerCase();
        let rows = document.querySelectorAll('.card table tbody tr');
        let count = 0;
        rows.forEach(r => {
            if(r.innerText.toLowerCase().includes(term)) { r.style.display = ''; count++; }
            else r.style.display = 'none';
        });
        toast('🔍 Found ' + count + ' matching record(s).');
    }
};

window.updateProfileGlobal = function() {
    toast('✅ Profile changes synchronized with server.');
};
