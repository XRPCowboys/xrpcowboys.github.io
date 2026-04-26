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
  const navProfile  = document.getElementById('nav-profile-btn');
  const navLogin    = document.getElementById('nav-login-btn');
  const navJoin     = document.getElementById('nav-join-btn');

  // Mobile menu elements
  const mobProfile  = document.getElementById('mob-profile-btn');
  const mobLogin    = document.getElementById('mob-login-btn');
  const mobJoin     = document.getElementById('mob-join-btn');

  if (session) {
    // ── LOGGED IN ──
    // Show My Profile, hide Login
    if (navProfile) navProfile.style.display = 'inline-block';
    if (navLogin)   navLogin.style.display   = 'none';
    if (mobProfile) mobProfile.style.display = 'block';
    if (mobLogin)   mobLogin.style.display   = 'none';

    // Replace JOIN button with LOG OUT
    if (navJoin) {
      navJoin.textContent = 'Log Out';
      navJoin.href = '#';
      navJoin.setAttribute('style', 'background:linear-gradient(135deg,#f5d060,#c9921a)!important;color:#080808!important;padding:6px 18px!important;border-radius:999px!important;font-family:Oswald,sans-serif!important;font-size:0.72rem!important;font-weight:600!important;letter-spacing:0.15em!important;text-transform:uppercase!important;text-decoration:none!important;border:none!important;cursor:pointer!important;');
      navJoin.onclick = function(e) {
        e.preventDefault();
        sb.auth.signOut().then(() => { window.location.href = 'index.html'; });
      };
    }

    // Mobile join → Log Out
    if (mobJoin) {
      mobJoin.textContent = '✦ Log Out';
      mobJoin.href = '#';
      mobJoin.onclick = function(e) {
        e.preventDefault();
        sb.auth.signOut().then(() => { window.location.href = 'index.html'; });
      };
    }

  } else {
    // ── LOGGED OUT ──
    if (navProfile) navProfile.style.display = 'none';
    if (navLogin)   navLogin.style.display   = 'inline-block';
    if (mobProfile) mobProfile.style.display = 'none';
    if (mobLogin)   mobLogin.style.display   = 'block';
  }
})();
