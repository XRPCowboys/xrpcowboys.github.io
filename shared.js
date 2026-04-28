/* ============================================================
   XRPCOWBOYS — Shared Auth Script
   Add to every page with:
   <script src="shared.js"></script>
   Place it AFTER the supabase CDN script tag
   © 2018–2026 Twin BlockChain Technologies LLC
   ============================================================ */

(async function() {
  if (typeof supabase === 'undefined') return;

  const sb = supabase.createClient(
    'https://fbngrpissakvjelrcfaf.supabase.co',
    'sb_publishable__lAiK0hWnTs6gr7BSL8qAQ_40zk3KLU'
  );

  const { data: { session } } = await sb.auth.getSession();

  // Desktop nav elements
  const navMessages = document.getElementById('nav-messages-btn');
  const navProfile  = document.getElementById('nav-profile-btn');
  const navLogin    = document.getElementById('nav-login-btn');
  const navJoin     = document.getElementById('nav-join-btn');
  const navLogout   = document.getElementById('nav-logout-btn');

  // Mobile menu elements
  const mobMessages = document.getElementById('mob-messages-btn');
  const mobProfile  = document.getElementById('mob-profile-btn');
  const mobLogin    = document.getElementById('mob-login-btn');
  const mobJoin     = document.getElementById('mob-join-btn');
  const mobLogout   = document.getElementById('mob-logout-btn');

  if (session) {
    // ── LOGGED IN ──
    if (navMessages) navMessages.style.display = 'inline-block';
    if (navProfile)  navProfile.style.display  = 'inline-block';
    if (navLogin)    navLogin.style.display     = 'none';
    if (navLogout)   navLogout.style.display    = 'inline-block';
    if (mobMessages) mobMessages.style.display  = 'block';
    if (mobProfile)  mobProfile.style.display   = 'block';
    if (mobLogin)    mobLogin.style.display      = 'none';
    if (mobLogout)   mobLogout.style.display     = 'block';

    // Hide the Join button when logged in
    if (navJoin) navJoin.style.display = 'none';
    if (mobJoin) mobJoin.style.display = 'none';

    // Wire up logout buttons
    const logoutFn = function(e) {
      e.preventDefault();
      sb.auth.signOut().then(() => { window.location.href = 'index.html'; });
    };
    if (navLogout) navLogout.onclick = logoutFn;
    if (mobLogout) mobLogout.onclick = logoutFn;

  } else {
    // ── LOGGED OUT ──
    if (navMessages) navMessages.style.display = 'none';
    if (navProfile)  navProfile.style.display  = 'none';
    if (navLogin)    navLogin.style.display     = 'inline-block';
    if (navLogout)   navLogout.style.display    = 'none';
    if (navJoin)     navJoin.style.display      = 'inline-block';
    if (mobMessages) mobMessages.style.display  = 'none';
    if (mobProfile)  mobProfile.style.display   = 'none';
    if (mobLogin)    mobLogin.style.display      = 'block';
    if (mobLogout)   mobLogout.style.display     = 'none';
    if (mobJoin)     mobJoin.style.display       = 'block';
  }
})();
