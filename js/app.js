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
