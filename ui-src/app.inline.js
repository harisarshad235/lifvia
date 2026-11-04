// GENERATED from public/index.html by scripts/extract-inline-js.py


    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    };
  

// ---- next inline <script> ----


    if (window.location.hostname === 'paisaflow.harisarshad.site' || window.location.hostname === 'paisaflow-pkr.pages.dev') {
      window.location.replace('https://lifvia.harisarshad.site' + window.location.pathname + window.location.search + window.location.hash);
    }
    localStorage.removeItem('PAISAFLOW_PKR_STATE_V1');

    const TOKEN_KEY = 'PAISAFLOW_AUTH_TOKEN_V2';
    const USER_KEY = 'PAISAFLOW_AUTH_USER_V2';
    const THEME_KEY = 'PAISAFLOW_THEME_PREF';
    const API_BASE = (window.location.protocol === 'capacitor:' || window.location.protocol === 'file:' || (window.location.hostname === 'localhost' && !window.location.port))
      ? 'https://lifvia.harisarshad.site'
      : '';

    let currentUser = null;
    let authToken = localStorage.getItem(TOKEN_KEY) || null;
    let activeTab = 'dashboard';
    let currentPromptContext = null;

    // =========================================================================
    // THEME ENGINE (LIGHT & DARK MODE)
    // =========================================================================
    const SUN_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    const MOON_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

    function applyTheme(theme) {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      const metaTheme = document.getElementById('meta-theme-color');
      if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0E0E10' : '#F1F1EC');

      const nextIcon = theme === 'dark' ? SUN_SVG : MOON_SVG;
      const nextLabel = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

      const authIcon = document.getElementById('auth-theme-icon');
      const authLabel = document.getElementById('auth-theme-label');
      if (authIcon) authIcon.innerHTML = nextIcon;
      if (authLabel) authLabel.textContent = nextLabel;

      const headerIcon = document.getElementById('header-theme-icon');
      const headerLabel = document.getElementById('header-theme-label');
      if (headerIcon) headerIcon.innerHTML = nextIcon;
      if (headerLabel) headerLabel.textContent = nextLabel;

      document.querySelectorAll('.brand-logo').forEach(img => {
        img.src = theme === 'light' ? '/logo-light.svg' : '/logo.svg';
      });

      localStorage.setItem(THEME_KEY, theme);
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme`);
    }

    // Initialize saved theme immediately
    applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

    // =========================================================================
    // SONNER-STYLE TOAST FEEDBACK
    // =========================================================================
    function showToast(message) {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const el = document.createElement('div');
      el.className = 'toast-item';
      el.innerHTML = `
        <span class="w-2 h-2 rounded-full flex-shrink-0" style="background: var(--accent);"></span>
        <span>${message}</span>
      `;
      container.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = 'opacity 160ms ease, transform 160ms ease';
        setTimeout(() => el.remove(), 170);
      }, 2600);
    }

    function getFreshState() {
      return {
        accounts: [],
        categories: [
          { id: 'cat-inc-1', name: 'Salary & Income', type: 'income', budgeted: 0, target: 0 },
          { id: 'cat-exp-1', name: 'Groceries & Supermarkets', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-2', name: 'Rent & Housing', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-3', name: 'Electricity, Gas & Utilities', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-4', name: 'Fuel & Transport', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-5', name: 'Dining Out & Food Delivery', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-6', name: 'Internet & Mobile', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-7', name: 'Zakat & Charity', type: 'expense', budgeted: 0, target: 0 },
          { id: 'cat-exp-8', name: 'Healthcare & Personal', type: 'expense', budgeted: 0, target: 0 }
        ],
        transactions: [],
        friends: [],
        splits: [],
        goals: [],
        investments: [],
        subscriptions: []
      };
    }

    let state = getFreshState();

    function formatPKR(num) {
      const n = Number(num) || 0;
      const sign = n < 0 ? '-' : '';
      return sign + 'Rs. ' + Math.abs(Math.round(n)).toLocaleString('en-PK');
    }

    function getUserStorageKey() {
      return currentUser ? `PAISAFLOW_USER_STATE_${currentUser.id}` : 'PAISAFLOW_GUEST';
    }

    // =========================================================================
    // AUTHENTICATION & SESSION HANDLERS
    // =========================================================================
    function setAuthMode(mode) {
      const loginForm = document.getElementById('login-form');
      const regForm = document.getElementById('register-form');
      const loginBtn = document.getElementById('tab-btn-login');
      const regBtn = document.getElementById('tab-btn-register');
      document.getElementById('auth-error').classList.add('hidden');

      if (mode === 'login') {
        loginForm.classList.remove('hidden');
        regForm.classList.add('hidden');
        loginBtn.style.background = 'var(--lime)';
        loginBtn.style.color = 'var(--on-lime)';
        regBtn.style.background = 'transparent';
        regBtn.style.color = 'var(--text-muted)';
      } else {
        loginForm.classList.add('hidden');
        regForm.classList.remove('hidden');
        regBtn.style.background = 'var(--lime)';
        regBtn.style.color = 'var(--on-lime)';
        loginBtn.style.background = 'transparent';
        loginBtn.style.color = 'var(--text-muted)';
      }
    }
    setAuthMode('login');

    function showAuthError(msg) {
      const el = document.getElementById('auth-error');
      el.textContent = msg;
      el.classList.remove('hidden');
    }

    async function handleAuthSubmit(e, action) {
      e.preventDefault();
      document.getElementById('auth-error').classList.add('hidden');

      const payload = { action };
      if (action === 'register') {
        payload.name = document.getElementById('reg-name').value.trim();
        payload.email = document.getElementById('reg-email').value.trim();
        payload.password = document.getElementById('reg-password').value;
      } else {
        payload.email = document.getElementById('login-email').value.trim();
        payload.password = document.getElementById('login-password').value;
      }

      try {
        const res = await fetch(API_BASE + '/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          return showAuthError(data.error || 'Authentication failed. Please check your credentials.');
        }

        authToken = data.token;
        currentUser = data.user;
        state = data.state || getFreshState();

        localStorage.setItem(TOKEN_KEY, authToken);
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
        localStorage.setItem(getUserStorageKey(), JSON.stringify(state));

        enterAuthenticatedApp();
        showToast(`Welcome, ${currentUser.name}`);
      } catch (err) {
        showAuthError('Unable to reach server: ' + err.message);
      }
    }

    function enterAuthenticatedApp() {
      document.getElementById('auth-screen').classList.add('hidden');
      document.getElementById('logout-screen').classList.add('hidden');
      document.getElementById('app-shell').classList.remove('hidden');

      document.getElementById('sidebar-user-name').textContent = currentUser.name;
      document.getElementById('sidebar-user-email').textContent = currentUser.email;
      renderProfileUI();

      switchTab('dashboard');
      renderAll();
    }

    // =========================================================================
    // PROFILE: AVATAR, DETAILS, PASSWORD, ACCOUNT DELETION
    // =========================================================================
    let pendingAvatar; // undefined = unchanged, null = removed, string = new data URL

    function escapeHTML(str) {
      return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function getInitials(name) {
      const parts = String(name || '?').trim().split(/\s+/).filter(Boolean);
      return ((parts[0]?.[0] || '?') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
    }

    function avatarMarkup(src, name, sizePx) {
      const fontSize = Math.max(11, Math.round(sizePx * 0.38));
      if (src) {
        return `<img src="${src}" alt="${escapeHTML(name)}" class="w-full h-full rounded-full object-cover" style="border: 1px solid var(--border-strong);" />`;
      }
      return `<span class="w-full h-full rounded-full flex items-center justify-center font-bold select-none" style="background: var(--accent-soft); color: var(--accent); border: 1px solid var(--accent-border); font-size: ${fontSize}px;">${escapeHTML(getInitials(name))}</span>`;
    }

    function renderProfileUI() {
      if (!currentUser) return;
      document.querySelectorAll('.avatar-slot').forEach(el => {
        el.innerHTML = avatarMarkup(currentUser.avatar, currentUser.name, Number(el.dataset.size) || 36);
      });
      const display = document.getElementById('sidebar-user-display');
      if (display) display.textContent = currentUser.name;
      document.getElementById('sidebar-user-name').textContent = currentUser.name;
      const mobileName = document.getElementById('mobile-greeting-name');
      if (mobileName) mobileName.textContent = (currentUser.name || '').trim().split(/\s+/)[0] || 'there';
      document.getElementById('sidebar-user-email').textContent = currentUser.email;
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    }

    function renderProfilePreview() {
      const src = pendingAvatar === undefined ? currentUser.avatar : pendingAvatar;
      const name = document.getElementById('pf-name').value || currentUser.name;
      document.getElementById('profile-avatar-preview').innerHTML = avatarMarkup(src, name, 80);
      document.getElementById('profile-heading-name').textContent = name;
      document.getElementById('profile-remove-photo').classList.toggle('hidden', !src);
    }

    function openProfileModal() {
      if (!currentUser) return;
      pendingAvatar = undefined;
      document.getElementById('pf-name').value = currentUser.name || '';
      document.getElementById('pf-email').value = currentUser.email || '';
      document.getElementById('pf-phone').value = currentUser.phone || '';
      document.getElementById('pw-current').value = '';
      document.getElementById('pw-new').value = '';
      document.getElementById('profile-error').classList.add('hidden');
      document.getElementById('password-error').classList.add('hidden');
      const since = currentUser.created_at ? new Date(currentUser.created_at).toLocaleDateString('en-PK', { month: 'long', year: 'numeric' }) : '—';
      document.getElementById('profile-member-since').textContent = `Member since ${since}`;
      renderProfilePreview();
      document.getElementById('pf-name').oninput = renderProfilePreview;
      const modal = document.getElementById('profile-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    // Downscale to a 256px square JPEG so it stays small in D1 and loads instantly
    function resizeImageToDataURL(file, size = 256) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Could not read file'));
        reader.onload = () => {
          const img = new Image();
          img.onerror = () => reject(new Error('Unsupported image format'));
          img.onload = () => {
            const side = Math.min(img.width, img.height);
            const sx = (img.width - side) / 2;
            const sy = (img.height - side) / 2;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      });
    }

    async function handleProfilePhoto(event) {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      if (!file.type.startsWith('image/')) return showToast('Please choose an image file');
      if (file.size > 15 * 1024 * 1024) return showToast('Image is too large (max 15 MB)');
      try {
        pendingAvatar = await resizeImageToDataURL(file);
        renderProfilePreview();
        showToast('Photo ready — tap "Save changes" to apply');
      } catch (err) {
        showToast(err.message);
      }
    }

    function removeProfilePhoto() {
      pendingAvatar = null;
      renderProfilePreview();
    }

    async function authAction(payload) {
      const res = await fetch(API_BASE + '/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      return data;
    }

    async function saveProfile(e) {
      e.preventDefault();
      const errEl = document.getElementById('profile-error');
      const btn = document.getElementById('profile-save-btn');
      errEl.classList.add('hidden');
      btn.disabled = true;
      btn.textContent = 'Saving…';
      try {
        const data = await authAction({
          action: 'updateProfile',
          name: document.getElementById('pf-name').value.trim(),
          email: document.getElementById('pf-email').value.trim(),
          phone: document.getElementById('pf-phone').value.trim(),
          avatar: pendingAvatar === undefined ? (currentUser.avatar || null) : pendingAvatar
        });
        currentUser = data.user;
        pendingAvatar = undefined;
        renderProfileUI();
        closeModal('profile-modal');
        showToast('Profile updated');
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Save changes';
      }
    }

    async function changePassword(e) {
      e.preventDefault();
      const errEl = document.getElementById('password-error');
      errEl.classList.add('hidden');
      try {
        await authAction({
          action: 'changePassword',
          currentPassword: document.getElementById('pw-current').value,
          newPassword: document.getElementById('pw-new').value
        });
        document.getElementById('pw-current').value = '';
        document.getElementById('pw-new').value = '';
        showToast('Password updated — other devices were signed out');
      } catch (err) {
        errEl.textContent = err.message;
        errEl.classList.remove('hidden');
      }
    }

    async function deleteUserAccount() {
      const confirmText = prompt('This permanently deletes your profile and ALL ledger data.\n\nEnter your password to confirm:');
      if (!confirmText) return;
      try {
        await authAction({ action: 'deleteAccount', password: confirmText });
        localStorage.removeItem(getUserStorageKey());
        closeModal('profile-modal');
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        authToken = null;
        currentUser = null;
        state = getFreshState();
        document.getElementById('app-shell').classList.add('hidden');
        document.getElementById('auth-screen').classList.remove('hidden');
        setAuthMode('register');
        showToast('Your account has been deleted');
      } catch (err) {
        showToast(err.message);
      }
    }

    async function logoutUser() {
      try {
        if (authToken) {
          await fetch(API_BASE + '/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify({ action: 'logout', token: authToken })
          });
        }
      } catch (e) {}

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      authToken = null;
      currentUser = null;
      state = getFreshState();

      document.getElementById('app-shell').classList.add('hidden');
      document.getElementById('auth-screen').classList.add('hidden');
      document.getElementById('logout-screen').classList.remove('hidden');
    }

    function showAuthFromLogout(mode) {
      document.getElementById('logout-screen').classList.add('hidden');
      document.getElementById('auth-screen').classList.remove('hidden');
      setAuthMode(mode);
    }

    async function checkInitialSession() {
      if (!authToken) {
        document.getElementById('auth-screen').classList.remove('hidden');
        return;
      }
      try {
        const res = await fetch(API_BASE + '/api/auth', {
          headers: { 'Authorization': 'Bearer ' + authToken }
        });
        if (!res.ok) throw new Error('Invalid session');
        const data = await res.json();
        if (!data.user) throw new Error('No user');
        currentUser = data.user;

        const stateRes = await fetch(API_BASE + '/api/state', {
          headers: { 'Authorization': 'Bearer ' + authToken }
        });
        if (stateRes.ok) {
          const remoteState = await stateRes.json();
          if (remoteState && Array.isArray(remoteState.categories)) {
            state = remoteState;
          } else {
            state = getFreshState();
          }
        }
        enterAuthenticatedApp();
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        authToken = null;
        currentUser = null;
        document.getElementById('auth-screen').classList.remove('hidden');
      }
    }

    async function persistToCloudD1() {
      if (!authToken) return;
      const badge = document.getElementById('sync-status-badge');
      try {
        const res = await fetch(API_BASE + '/api/state', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          body: JSON.stringify(state)
        });
        if (res.ok && badge) {
          badge.innerHTML = `<span class="w-2 h-2 rounded-full" style="background: var(--accent);"></span><span>Cloudflare D1 Synced</span>`;
        }
      } catch (e) {
        if (badge) {
          badge.innerHTML = `<span class="w-2 h-2 rounded-full" style="background: var(--warning);"></span><span>Saved Locally (Offline)</span>`;
        }
      }
    }

    function saveState() {
      if (currentUser) {
        localStorage.setItem(getUserStorageKey(), JSON.stringify(state));
      }
      persistToCloudD1();
      renderAll();
    }

    function clearAllMyData() {
      if (confirm('Reset your entire ledger back to Rs. 0?')) {
        state = getFreshState();
        saveState();
        showToast('Workspace reset to Rs. 0');
      }
    }

    // =========================================================================
    // UI RENDERING
    // =========================================================================
    function switchTab(tab) {
      activeTab = tab;
      document.body.dataset.tab = tab;
      document.querySelectorAll('.tab-panel').forEach(el => el.classList.add('hidden'));
      document.getElementById(`tab-${tab}`).classList.remove('hidden');
      const mainEl = document.querySelector('#app-shell main');
      if (mainEl) mainEl.scrollTop = 0;

      document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(btn => {
        if (btn.dataset.tab === tab) {
          btn.classList.add('active');
          if (btn.classList.contains('mobile-nav-item') && btn.scrollIntoView) btn.scrollIntoView({ inline: 'center', block: 'nearest' });
        } else {
          btn.classList.remove('active');
        }
      });

      const titles = {
        dashboard: ['Dashboard', 'Track your cash flow. Simulate your tomorrow.'],
        simulator: ['What-If Simulator', '12-month cash runway & life choice projection engine'],
        accounts: ['Accounts & Wallets', 'Manage bank accounts, digital wallets, cash, and credit cards'],
        transactions: ['Transactions & CSV', 'Search, filter, import, and export all income, expenses, and transfers'],
        budgets: ['Envelope Budgets', 'Zero-based monthly category envelopes with overspend protection'],
        splits: ['Bill Splitter', 'Track shared group bills, roommate balances, and 1-click settlements'],
        goals: ['Savings Goals', 'Track dedicated sinking funds with automatic progress calculation'],
        wealth: ['Net Worth & Bills', 'Track assets, unrealized gains, and recurring monthly bills']
      };
      document.getElementById('page-title').textContent = titles[tab][0];
      document.getElementById('page-subtitle').textContent = titles[tab][1];
      if (tab === 'simulator') renderSimulator();
    }

    function getCategorySpent(catName) {
      return state.transactions
        .filter(t => t.type === 'expense' && t.category === catName)
        .reduce((s, t) => s + Number(t.amount), 0);
    }

    function renderAll() {
      const onboarding = document.getElementById('dashboard-onboarding');
      if (state.accounts.length === 0) {
        onboarding.classList.remove('hidden');
      } else {
        onboarding.classList.add('hidden');
      }

      const liquidTotal = state.accounts.reduce((s, a) => s + Number(a.balance), 0);
      const investTotal = state.investments.reduce((s, i) => s + Number(i.currentValue), 0);
      const netWorth = liquidTotal + investTotal;

      document.getElementById('sidebar-networth').textContent = formatPKR(netWorth);

      const monthIncome = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
      const monthExpense = state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
      const totalBudgeted = state.categories.filter(c => c.type === 'expense').reduce((s, c) => s + Number(c.budgeted), 0);
      const readyToAssign = monthIncome - totalBudgeted;
      const splitNet = state.friends.reduce((s, f) => s + Number(f.balance), 0);

      document.getElementById('kpi-liquid').textContent = formatPKR(liquidTotal);
      document.getElementById('kpi-income').textContent = formatPKR(monthIncome);
      const savRate = monthIncome > 0 ? Math.round(((monthIncome - monthExpense) / monthIncome) * 100) : 0;
      document.getElementById('kpi-savings-rate').textContent = `Savings Rate: ${savRate}%`;
      document.getElementById('kpi-expense').textContent = formatPKR(monthExpense);
      const budgetPct = totalBudgeted > 0 ? Math.round((monthExpense / totalBudgeted) * 100) : 0;
      document.getElementById('kpi-budget-used').textContent = `${budgetPct}% of ${formatPKR(totalBudgeted)} budget`;
      document.getElementById('kpi-rta').textContent = formatPKR(readyToAssign);
      document.getElementById('kpi-splits').textContent = (splitNet > 0 ? '+' : '') + formatPKR(splitNet);
      document.getElementById('kpi-splits-sub').textContent = splitNet > 0 ? 'Friends owe you net' : splitNet < 0 ? 'You owe friends net' : 'All settled up';

      renderDashboardAlerts();
      renderCharts();
      renderDashboardLists();
      populateFilterAndModalSelects();
      renderTransactions();
      renderBudgets(readyToAssign);
      renderAccounts();
      renderSplits();
      renderGoals();
      renderWealth();
      renderSimulator();
    }

    // =========================================================================
    // "WHAT-IF" LIFE & CASH RUNWAY SIMULATOR ENGINE
    // =========================================================================
    const simState = {
      incomeDelta: 0,
      expenseDelta: 0,
      oneTimeHit: 0,
      investmentShift: 0,
      presetName: 'Baseline'
    };

    function getSimulatorBaseline() {
      // S_0: Sum of all active manual liquid accounts tracked by the user
      const S0 = state.accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0);

      // F_base = Average Monthly Income - Average Monthly Expenses
      const monthBuckets = new Set();
      let totalInc = 0;
      let totalExp = 0;
      state.transactions.forEach(t => {
        if (t.type === 'income' || t.type === 'expense') {
          const ym = String(t.date || '').slice(0, 7);
          if (ym) monthBuckets.add(ym);
          if (t.type === 'income') totalInc += Number(t.amount || 0);
          if (t.type === 'expense') totalExp += Number(t.amount || 0);
        }
      });
      const numMonths = Math.max(1, monthBuckets.size);
      const avgIncome = Math.round(totalInc / numMonths);
      const avgExpense = Math.round(totalExp / numMonths);
      const F_base = avgIncome - avgExpense;

      return { S0, F_base, avgIncome, avgExpense, accountCount: state.accounts.length };
    }

    function updateSimParam(key, rawValue) {
      const val = Number(rawValue) || 0;
      simState[key] = key === 'oneTimeHit' || key === 'investmentShift' ? Math.max(0, val) : val;
      simState.presetName = 'Custom';
      syncSimInputs();
      renderSimulator();
    }

    function syncSimInputs() {
      const map = [
        ['incomeDelta', 'sim-income-slider', 'sim-income-num'],
        ['expenseDelta', 'sim-expense-slider', 'sim-expense-num'],
        ['oneTimeHit', 'sim-onetime-slider', 'sim-onetime-num'],
        ['investmentShift', 'sim-invest-slider', 'sim-invest-num']
      ];
      map.forEach(([key, sliderId, numId]) => {
        const s = document.getElementById(sliderId);
        const n = document.getElementById(numId);
        if (s && document.activeElement !== s) s.value = simState[key];
        if (n && document.activeElement !== n) n.value = simState[key];
      });
    }

    function applySimPreset(preset) {
      const { S0 } = getSimulatorBaseline();
      // Adapt preset scale if user has small balances vs standard PKR balances
      const isSmallScale = S0 > 0 && S0 < 10000;
      if (preset === 'new-job') {
        simState.incomeDelta = isSmallScale ? 1500 : 45000;
        simState.expenseDelta = isSmallScale ? 300 : 8000;
        simState.oneTimeHit = 0;
        simState.investmentShift = isSmallScale ? 400 : 12000;
        simState.presetName = 'New Job';
      } else if (preset === 'move-home') {
        simState.incomeDelta = 0;
        simState.expenseDelta = isSmallScale ? 500 : 25000;
        simState.oneTimeHit = isSmallScale ? 1500 : Math.min(150000, Math.max(30000, Math.round(S0 * 0.45)));
        simState.investmentShift = 0;
        simState.presetName = 'Move Home';
      } else if (preset === 'big-purchase') {
        simState.incomeDelta = 0;
        simState.expenseDelta = isSmallScale ? 250 : 6000;
        simState.oneTimeHit = isSmallScale ? 2500 : Math.min(250000, Math.max(40000, Math.round(S0 * 0.65)));
        simState.investmentShift = 0;
        simState.presetName = 'Big Purchase';
      }
      syncSimInputs();
      renderSimulator();
      showToast(`Simulated "${simState.presetName}" scenario`);
    }

    function resetSimulator() {
      simState.incomeDelta = 0;
      simState.expenseDelta = 0;
      simState.oneTimeHit = 0;
      simState.investmentShift = 0;
      simState.presetName = 'Baseline';
      syncSimInputs();
      renderSimulator();
      showToast('Simulator reset to baseline');
    }

    function renderSimulator() {
      const panel = document.getElementById('tab-simulator');
      if (!panel) return;

      const { S0, F_base, accountCount } = getSimulatorBaseline();
      const { incomeDelta, expenseDelta, oneTimeHit, investmentShift, presetName } = simState;

      // Update Baseline Readout
      const accCountEl = document.getElementById('sim-accounts-count');
      if (accCountEl) accCountEl.textContent = `${accountCount} Account${accountCount === 1 ? '' : 's'}`;
      const baseS0El = document.getElementById('sim-base-s0');
      if (baseS0El) baseS0El.textContent = formatPKR(S0);
      const baseFlowEl = document.getElementById('sim-base-flow');
      if (baseFlowEl) {
        baseFlowEl.textContent = `${F_base >= 0 ? '+' : ''}${formatPKR(F_base)}/mo`;
        baseFlowEl.style.color = F_base >= 0 ? 'var(--accent)' : 'var(--danger)';
      }

      const presetTag = document.getElementById('sim-active-preset-tag');
      if (presetTag) presetTag.textContent = presetName;

      // Update Slider Value Captions
      const incBadge = document.getElementById('sim-income-badge');
      if (incBadge) incBadge.textContent = `${incomeDelta >= 0 ? '+' : ''}${formatPKR(incomeDelta)} / mo`;
      const expBadge = document.getElementById('sim-expense-badge');
      if (expBadge) expBadge.textContent = `${expenseDelta >= 0 ? '+' : ''}${formatPKR(expenseDelta)} / mo`;
      const oneBadge = document.getElementById('sim-onetime-badge');
      if (oneBadge) oneBadge.textContent = `-${formatPKR(oneTimeHit)} upfront`;
      const invBadge = document.getElementById('sim-invest-badge');
      if (invBadge) invBadge.textContent = `${formatPKR(investmentShift)} / mo`;

      // 12-Month Projection Engine
      // Baseline[m] = S_0 + (m * F_base)
      // Simulated[m] = (S_0 - oneTimeHit) + (m * (F_base + incomeDelta - expenseDelta - investmentShift))
      const F_sim = F_base + incomeDelta - expenseDelta - investmentShift;
      const monthlyDelta = F_sim - F_base;

      const baselineSeries = [];
      const simulatedSeries = [];
      let depletionMonth = null; // First month m (0..12) where Simulated[m] <= 0

      for (let m = 0; m <= 12; m++) {
        const bVal = S0 + (m * F_base);
        const sVal = (S0 - oneTimeHit) + (m * F_sim);
        baselineSeries.push(bVal);
        simulatedSeries.push(sVal);
        if (depletionMonth === null && sVal <= 0 && (S0 > 0 || oneTimeHit > 0 || F_sim < 0)) {
          depletionMonth = m;
        }
      }

      // Compute exact runway months
      let runwayMonths = 12.5; // 12+ months default
      const startAfterHit = S0 - oneTimeHit;
      if (startAfterHit <= 0 && (oneTimeHit > 0 || F_sim < 0)) {
        runwayMonths = 0;
      } else if (F_sim < 0) {
        runwayMonths = startAfterHit / Math.abs(F_sim);
      } else if (S0 === 0 && F_sim === 0 && oneTimeHit === 0) {
        runwayMonths = 12.5;
      }

      // Runway Badge Classification
      let badgeHTML = '';
      let runwayTitle = '';
      let runwaySub = '';
      if (runwayMonths >= 12) {
        badgeHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style="background: rgba(16, 185, 129, 0.14); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.35);">
          <span class="w-2 h-2 rounded-full" style="background: #10B981;"></span>
          Safe Runway (12+ Months)
        </span>`;
        runwayTitle = '12+ Months';
        runwaySub = F_sim >= 0
          ? `Cash-flow positive (${F_sim >= 0 ? '+' : ''}${formatPKR(F_sim)}/mo)`
          : `Reserve lasts ~${Math.floor(runwayMonths)} months at current burn`;
      } else if (runwayMonths >= 3) {
        const mRounded = Math.max(3, Math.round(runwayMonths * 10) / 10);
        badgeHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.38);">
          <span class="w-2 h-2 rounded-full" style="background: #F59E0B;"></span>
          Caution (3 to 6 Months)
        </span>`;
        runwayTitle = `${mRounded} Months`;
        runwaySub = `Reserve depletes in Month ${depletionMonth ?? Math.ceil(runwayMonths)}`;
      } else {
        const mRounded = Math.max(0, Math.round(runwayMonths * 10) / 10);
        badgeHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style="background: rgba(244, 63, 94, 0.15); color: #F43F5E; border: 1px solid rgba(244, 63, 94, 0.38);">
          <span class="w-2 h-2 rounded-full" style="background: #F43F5E;"></span>
          Critical (&lt; 3 Months)
        </span>`;
        runwayTitle = mRounded === 0 ? '0 Months (Immediate)' : `${mRounded} Months`;
        runwaySub = depletionMonth === 0
          ? 'One-time hit exceeds starting liquid balance!'
          : `Reserve runs out in Month ${depletionMonth ?? Math.ceil(runwayMonths)}`;
      }

      // Populate Mobile Sticky Bar & Desktop Runway Header
      const mobVal = document.getElementById('sim-mobile-runway-value');
      const mobBadge = document.getElementById('sim-mobile-runway-badge');
      const mobM12 = document.getElementById('sim-mobile-m12-balance');
      if (mobVal) mobVal.textContent = runwayTitle;
      if (mobBadge) mobBadge.innerHTML = badgeHTML;
      if (mobM12) {
        mobM12.textContent = formatPKR(simulatedSeries[12]);
        mobM12.style.color = simulatedSeries[12] >= 0 ? '#06B6D4' : '#F43F5E';
      }

      const deskMonths = document.getElementById('sim-desktop-runway-months');
      const deskSub = document.getElementById('sim-runway-subtext');
      const deskBadge = document.getElementById('sim-desktop-runway-badge');
      if (deskMonths) deskMonths.textContent = runwayTitle;
      if (deskSub) deskSub.textContent = runwaySub;
      if (deskBadge) deskBadge.innerHTML = badgeHTML;

      // Populate 3 Comparison KPIs
      const kpiNet = document.getElementById('sim-kpi-monthly-net');
      const kpiDelta = document.getElementById('sim-kpi-monthly-delta');
      const kpiBase12 = document.getElementById('sim-kpi-m12-base');
      const kpiSim12 = document.getElementById('sim-kpi-m12-sim');
      const kpiDiff12 = document.getElementById('sim-kpi-m12-diff');

      if (kpiNet) {
        kpiNet.textContent = `${F_sim >= 0 ? '+' : ''}${formatPKR(F_sim)} / mo`;
        kpiNet.style.color = F_sim >= 0 ? '#10B981' : '#F43F5E';
      }
      if (kpiDelta) {
        kpiDelta.textContent = `${monthlyDelta >= 0 ? '+' : ''}${formatPKR(monthlyDelta)}/mo vs. current path`;
      }
      if (kpiBase12) kpiBase12.textContent = formatPKR(baselineSeries[12]);
      if (kpiSim12) {
        kpiSim12.textContent = formatPKR(simulatedSeries[12]);
        kpiSim12.style.color = simulatedSeries[12] >= 0 ? '#06B6D4' : '#F43F5E';
      }
      const m12Variance = simulatedSeries[12] - baselineSeries[12];
      if (kpiDiff12) {
        kpiDiff12.textContent = `${m12Variance >= 0 ? '+' : ''}${formatPKR(m12Variance)} vs. baseline`;
        kpiDiff12.style.color = m12Variance >= 0 ? '#10B981' : '#F43F5E';
      }

      const invAcc = document.getElementById('sim-invest-accumulated');
      if (invAcc) invAcc.textContent = `Extra Invested (12m): ${formatPKR(investmentShift * 12)}`;

      // Render Dual-Line SVG Chart (Months 0..12)
      const chartContainer = document.getElementById('sim-chart-container');
      if (chartContainer) {
        const allVals = [...baselineSeries, ...simulatedSeries, 0];
        const minVal = Math.min(...allVals);
        const maxVal = Math.max(...allVals, 1000);
        const span = Math.max(maxVal - minVal, 1000);

        const W = 680;
        const H = 240;
        const padL = 62;
        const padR = 20;
        const padT = 20;
        const padB = 34;
        const plotW = W - padL - padR;
        const plotH = H - padT - padB;

        const xFor = m => padL + (m / 12) * plotW;
        const yFor = v => padT + plotH - ((v - minVal) / span) * plotH;

        const zeroY = yFor(0);
        const basePoints = baselineSeries.map((v, m) => `${xFor(m).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');
        const simPoints = simulatedSeries.map((v, m) => `${xFor(m).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');
        const areaPoints = `${xFor(0).toFixed(1)},${zeroY.toFixed(1)} ${simPoints} ${xFor(12).toFixed(1)},${zeroY.toFixed(1)}`;

        const simLineColor = simulatedSeries[12] < 0 ? '#F43F5E' : '#06B6D4';

        // Y-axis grid ticks (4 levels)
        let gridLines = '';
        for (let i = 0; i <= 3; i++) {
          const val = minVal + (span * (i / 3));
          const y = yFor(val);
          const shortLabel = Math.abs(val) >= 1000 ? `${Math.round(val / 1000)}k` : Math.round(val);
          gridLines += `
            <line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--border-subtle)" stroke-width="1" />
            <text x="${padL - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end" fill="var(--text-muted)" font-size="10" font-family="JetBrains Mono, monospace">${shortLabel}</text>
          `;
        }

        // Month labels & data dots
        let xLabelsAndDots = '';
        for (let m = 0; m <= 12; m++) {
          const cx = xFor(m).toFixed(1);
          const bY = yFor(baselineSeries[m]).toFixed(1);
          const sY = yFor(simulatedSeries[m]).toFixed(1);
          const isDepleted = simulatedSeries[m] <= 0 && m === depletionMonth;
          const dotColor = simulatedSeries[m] < 0 ? '#F43F5E' : '#06B6D4';
          xLabelsAndDots += `
            <text x="${cx}" y="${H - 10}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="JetBrains Mono, monospace">M${m}</text>
            <circle cx="${cx}" cy="${bY}" r="3" fill="#10B981">
              <title>Month ${m} Current Path: ${formatPKR(baselineSeries[m])}</title>
            </circle>
            <circle cx="${cx}" cy="${sY}" r="${isDepleted ? 5.5 : 3.8}" fill="${dotColor}" stroke="var(--bg-surface)" stroke-width="1.5">
              <title>Month ${m} New Life Path: ${formatPKR(simulatedSeries[m])}</title>
            </circle>
          `;
        }

        chartContainer.innerHTML = `
          <svg viewBox="0 0 ${W} ${H}" class="w-full h-56 overflow-visible">
            <defs>
              <linearGradient id="simAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${simLineColor}" stop-opacity="0.22" />
                <stop offset="100%" stop-color="${simLineColor}" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            ${gridLines}
            <!-- Zero Reserve Threshold Line -->
            <line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${W - padR}" y2="${zeroY.toFixed(1)}" stroke="#F43F5E" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.65" />
            <!-- Area under Simulated Curve -->
            <polygon points="${areaPoints}" fill="url(#simAreaGrad)" />
            <!-- Current Path (Baseline) -->
            <polyline fill="none" stroke="#10B981" stroke-width="2.2" stroke-dasharray="6 4" stroke-linecap="round" stroke-linejoin="round" points="${basePoints}" />
            <!-- New Life Path (Simulated) -->
            <polyline fill="none" stroke="${simLineColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${simPoints}" />
            ${xLabelsAndDots}
          </svg>
        `;
      }

      // Render Month 1..12 Trajectory Table
      const tbody = document.getElementById('sim-table-body');
      if (tbody) {
        const rowsHTML = [];
        for (let m = 1; m <= 12; m++) {
          const bVal = baselineSeries[m];
          const sVal = simulatedSeries[m];
          const diff = sVal - bVal;
          const isZero = sVal <= 0;
          rowsHTML.push(`
            <tr>
              <td class="py-2 px-4 font-semibold">Month ${m}</td>
              <td class="py-2 px-4 text-right" style="color: var(--text-secondary);">${formatPKR(bVal)}</td>
              <td class="py-2 px-4 text-right font-bold" style="color: ${isZero ? '#F43F5E' : '#06B6D4'};">${formatPKR(sVal)}</td>
              <td class="py-2 px-4 text-right" style="color: ${diff >= 0 ? '#10B981' : '#F43F5E'};">${diff >= 0 ? '+' : ''}${formatPKR(diff)}</td>
              <td class="py-2 px-4 text-right">
                ${isZero
                  ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold" style="background: rgba(244,63,94,0.15); color: #F43F5E;">Depleted</span>`
                  : `<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold" style="background: rgba(16,185,129,0.12); color: #10B981;">Solvent</span>`}
              </td>
            </tr>
          `);
        }
        tbody.innerHTML = rowsHTML.join('');
      }
    }

    function renderDashboardAlerts() {
      const alerts = [];
      state.categories.filter(c => c.type === 'expense').forEach(c => {
        const spent = getCategorySpent(c.name);
        if (c.budgeted > 0 && spent > c.budgeted) {
          alerts.push(`<div class="px-4 py-2.5 rounded-xl text-xs flex items-center justify-between" style="background: var(--danger-soft); color: var(--danger); border: 1px solid var(--danger);">
            <span><strong>Overspend Alert:</strong> Envelope <em>${c.name}</em> exceeded its budget by <strong class="mono">${formatPKR(spent - c.budgeted)}</strong>.</span>
            <button onclick="switchTab('budgets')" class="underline font-semibold">Cover Overspending</button>
          </div>`);
        }
      });
      document.getElementById('dashboard-alerts').innerHTML = alerts.join('');
    }

    function renderCharts() {
      const now = new Date();
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleString('en-US', { month: 'short' });
        const inc = state.transactions
          .filter(t => t.type === 'income' && String(t.date).startsWith(ym))
          .reduce((s, t) => s + Number(t.amount), 0);
        const exp = state.transactions
          .filter(t => t.type === 'expense' && String(t.date).startsWith(ym))
          .reduce((s, t) => s + Number(t.amount), 0);
        months.push({ label, inc, exp });
      }

      const maxVal = Math.max(...months.map(m => Math.max(m.inc, m.exp)), 1);
      document.getElementById('cashflow-chart').innerHTML = months.map(m => {
        const incH = m.inc > 0 ? Math.max(6, Math.round((m.inc / maxVal) * 150)) : 3;
        const expH = m.exp > 0 ? Math.max(6, Math.round((m.exp / maxVal) * 150)) : 3;
        return `<div class="flex-1 flex flex-col items-center gap-2">
          <div class="w-full flex items-end justify-center gap-1.5 h-36">
            <div title="Income: ${formatPKR(m.inc)}" style="height:${incH}px; background: ${m.inc > 0 ? 'var(--accent)' : 'var(--border-subtle)'};" class="w-4 sm:w-5 rounded-t transition-all"></div>
            <div title="Expense: ${formatPKR(m.exp)}" style="height:${expH}px; background: ${m.exp > 0 ? 'var(--danger)' : 'var(--border-subtle)'};" class="w-4 sm:w-5 rounded-t transition-all"></div>
          </div>
          <span class="text-[11px] font-medium" style="color: var(--text-muted);">${m.label}</span>
        </div>`;
      }).join('');

      const expCats = state.categories
        .filter(c => c.type === 'expense')
        .map(c => ({ name: c.name, spent: getCategorySpent(c.name) }))
        .filter(c => c.spent > 0)
        .sort((a, b) => b.spent - a.spent);
      const totalExp = expCats.reduce((s, c) => s + c.spent, 0) || 1;

      document.getElementById('category-breakdown-list').innerHTML = expCats.slice(0, 6).map(c => {
        const pct = Math.round((c.spent / totalExp) * 100);
        return `<div>
          <div class="flex justify-between text-xs mb-1">
            <span class="truncate pr-2 font-medium">${c.name}</span>
            <span class="mono font-semibold">${formatPKR(c.spent)} <span style="color: var(--text-muted);">(${pct}%)</span></span>
          </div>
          <div class="w-full h-2 rounded-full overflow-hidden" style="background: var(--bg-subtle);">
            <div class="h-full rounded-full" style="width:${pct}%; background: var(--accent);"></div>
          </div>
        </div>`;
      }).join('') || `<p class="text-xs py-8 text-center" style="color: var(--text-muted);">No expenses logged yet.</p>`;
    }

    function renderDashboardGoalCard() {
      const card = document.getElementById('dashboard-goal-card');
      if (!card) return;
      const goals = (state.goals || []).filter(g => Number(g.target) > 0);
      if (!goals.length) { card.classList.add('hidden'); return; }
      const pctOf = g => Math.min(100, Math.round((Number(g.saved) || 0) / Number(g.target) * 100));
      const open = goals.filter(g => pctOf(g) < 100);
      const pool = open.length ? open : goals;
      const g = pool.reduce((best, cur) => pctOf(cur) > pctOf(best) ? cur : best, pool[0]);
      const pct = pctOf(g);
      document.getElementById('dash-goal-name').textContent = g.name;
      document.getElementById('dash-goal-amounts').textContent = `${formatPKR(g.saved)} of ${formatPKR(g.target)}`;
      document.getElementById('dash-goal-pct').textContent = pct + '%';
      document.getElementById('dash-goal-bar').style.width = pct + '%';
      card.classList.remove('hidden');
    }

    function renderDashboardLists() {
      renderDashboardGoalCard();
      const recent = [...state.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
      document.getElementById('dashboard-recent-tx').innerHTML = recent.map(t => `
        <div class="py-3 flex items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3 min-w-0">
            <span class="tx-avatar ${t.type === 'income' ? 'income' : ''}">${escapeHTML(getInitials(String(t.payee || '?')))}</span>
            <div class="min-w-0">
              <div class="font-semibold text-[13px] truncate">${t.payee}</div>
              <div class="text-[11px]" style="color: var(--text-muted);">${t.category} • ${t.date}</div>
            </div>
          </div>
          <div class="mono font-semibold flex-shrink-0" style="color: ${t.type === 'income' ? 'var(--accent)' : 'var(--danger)'};">
            ${t.type === 'income' ? '+' : '-'}${formatPKR(t.amount)}
          </div>
        </div>
      `).join('') || `<p class="text-xs py-6 text-center" style="color: var(--text-muted);">No transactions logged yet.</p>`;

      document.getElementById('dashboard-upcoming-bills').innerHTML = state.subscriptions.map(s => `
        <div class="py-2.5 flex items-center justify-between text-xs">
          <div>
            <div class="font-semibold">${s.name}</div>
            <div class="text-[11px]" style="color: var(--text-muted);">Due Day ${s.dueDay} • ${s.cycle}</div>
          </div>
          <div class="flex items-center gap-2.5">
            <span class="mono font-semibold" style="color: var(--warning);">${formatPKR(s.amount)}</span>
            <button onclick="paySubscription('${s.id}')" class="btn btn-secondary py-1 px-2 text-[11px]">Pay & Log</button>
          </div>
        </div>
      `).join('') || `<p class="text-xs py-6 text-center" style="color: var(--text-muted);">No recurring bills added yet.</p>`;
    }

    function populateFilterAndModalSelects() {
      const accOpts = state.accounts.map(a => `<option value="${a.id}">${a.name} (${formatPKR(a.balance)})</option>`).join('');
      document.getElementById('tx-account').innerHTML = accOpts;
      document.getElementById('tr-from').innerHTML = accOpts;
      document.getElementById('tr-to').innerHTML = state.accounts.map((a, i) => `<option value="${a.id}" ${i === 1 ? 'selected' : ''}>${a.name}</option>`).join('');

      const filterAcc = document.getElementById('tx-filter-account');
      const curAccVal = filterAcc.value || 'all';
      filterAcc.innerHTML = `<option value="all">All Accounts</option>` + state.accounts.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
      filterAcc.value = curAccVal;

      const catOpts = state.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
      document.getElementById('tx-category').innerHTML = catOpts;

      const filterCat = document.getElementById('tx-filter-category');
      const curCatVal = filterCat.value || 'all';
      filterCat.innerHTML = `<option value="all">All Categories</option>` + catOpts;
      filterCat.value = curCatVal;
    }

    function renderTransactions() {
      const q = (document.getElementById('tx-search')?.value || '').toLowerCase();
      const fType = document.getElementById('tx-filter-type')?.value || 'all';
      const fAcc = document.getElementById('tx-filter-account')?.value || 'all';
      const fCat = document.getElementById('tx-filter-category')?.value || 'all';

      const rows = [...state.transactions]
        .filter(t => {
          if (fType !== 'all' && t.type !== fType) return false;
          if (fAcc !== 'all' && t.accountId !== fAcc) return false;
          if (fCat !== 'all' && t.category !== fCat) return false;
          if (q && !(`${t.payee} ${t.category}`).toLowerCase().includes(q)) return false;
          return true;
        })
        .sort((a, b) => b.date.localeCompare(a.date));

      const mobileList = document.getElementById('tx-mobile-list');
      if (mobileList) {
        mobileList.innerHTML = rows.map(t => {
          const acc = state.accounts.find(a => a.id === t.accountId);
          const amtColor = t.type === 'income' ? 'var(--accent)' : t.type === 'transfer' ? 'var(--text-primary)' : 'var(--danger)';
          const amtSign = t.type === 'income' ? '+' : t.type === 'expense' ? '-' : '⇄ ';
          return `<div class="p-3.5 flex items-center justify-between gap-3">
            <div class="min-w-0 flex-1 space-y-1">
              <div class="font-semibold truncate">${t.payee}</div>
              <div class="flex flex-wrap items-center gap-1.5 text-[11px]" style="color: var(--text-muted);">
                <span class="mono">${t.date}</span>
                <span>•</span>
                <span class="px-1.5 py-0.5 rounded font-medium" style="background: var(--bg-subtle); color: var(--text-secondary);">${t.category}</span>
                <span>•</span>
                <span class="truncate">${acc ? acc.name : 'Account'}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <span class="mono font-bold text-xs" style="color: ${amtColor};">${amtSign}${formatPKR(t.amount)}</span>
              <button onclick="deleteTransaction('${t.id}')" class="text-[11px] font-medium px-2 py-0.5 rounded" style="background: var(--danger-soft); color: var(--danger);">Delete</button>
            </div>
          </div>`;
        }).join('') || `<div class="py-8 px-4 text-center" style="color: var(--text-muted);">No transactions found. Tap <strong>"Log Entry"</strong> to record a transaction.</div>`;
      }

      document.getElementById('tx-table-body').innerHTML = rows.map(t => {
        const acc = state.accounts.find(a => a.id === t.accountId);
        return `<tr>
          <td class="py-3 px-4 mono" style="color: var(--text-muted);">${t.date}</td>
          <td class="py-3 px-4 font-semibold">${t.payee}</td>
          <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[11px] font-medium" style="background: var(--bg-subtle); color: var(--text-secondary);">${t.category}</span></td>
          <td class="py-3 px-4" style="color: var(--text-secondary);">${acc ? acc.name : 'Account'}</td>
          <td class="py-3 px-4 text-right mono font-semibold" style="color: ${t.type === 'income' ? 'var(--accent)' : t.type === 'transfer' ? 'var(--text-primary)' : 'var(--danger)'};">
            ${t.type === 'income' ? '+' : t.type === 'expense' ? '-' : '⇄ '}${formatPKR(t.amount)}
          </td>
          <td class="py-3 px-4 text-right">
            <button onclick="deleteTransaction('${t.id}')" class="text-xs font-medium hover:underline" style="color: var(--danger);">Delete</button>
          </td>
        </tr>`;
      }).join('') || `<tr><td colspan="6" class="py-8 text-center" style="color: var(--text-muted);">No transactions found. Click <strong>"Log Entry"</strong> to record a transaction.</td></tr>`;
    }

    function renderBudgets(readyToAssign) {
      const banner = document.getElementById('budget-rta-banner');
      banner.textContent = `${formatPKR(readyToAssign)} Ready to Assign`;
      banner.style.color = readyToAssign >= 0 ? 'var(--accent)' : 'var(--danger)';

      const expCategories = state.categories.filter(c => c.type === 'expense');

      const budgetMobile = document.getElementById('budget-mobile-list');
      if (budgetMobile) {
        budgetMobile.innerHTML = expCategories.map(c => {
          const spent = getCategorySpent(c.name);
          const avail = c.budgeted - spent;
          const pct = c.budgeted > 0 ? Math.min(100, Math.round((spent / c.budgeted) * 100)) : (spent > 0 ? 100 : 0);
          const barColor = avail < 0 ? 'var(--danger)' : pct > 85 ? 'var(--warning)' : 'var(--accent)';
          return `<div class="p-3.5 space-y-2.5">
            <div class="flex items-center justify-between gap-2">
              <div class="min-w-0 flex-1">
                <div class="font-semibold truncate">${c.name}</div>
                <div class="text-[11px] mono mt-0.5" style="color: var(--text-muted);">
                  Spent: <span style="color: var(--text-secondary);">${formatPKR(spent)}</span> • Avail: <strong style="color: ${avail < 0 ? 'var(--danger)' : 'var(--accent)'};">${formatPKR(avail)}</strong>
                </div>
              </div>
              <div class="flex flex-col items-end flex-shrink-0">
                <span class="text-[10px] font-medium mb-0.5" style="color: var(--text-muted);">Assigned (PKR)</span>
                <input type="number" value="${c.budgeted}" aria-label="Assigned budget for ${c.name}" onchange="updateCategoryBudget('${c.id}', this.value)"
                  class="input-field text-right mono w-28 py-1 px-2 text-xs" />
              </div>
            </div>
            <div>
              <div class="w-full h-2 rounded-full overflow-hidden" style="background: var(--bg-subtle);">
                <div class="h-full rounded-full transition-all" style="width:${pct}%; background: ${barColor};"></div>
              </div>
              <div class="text-[10px] mt-1" style="color: var(--text-muted);">${pct}% used ${avail < 0 ? '• Overbudget' : ''}</div>
            </div>
          </div>`;
        }).join('');
      }

      document.getElementById('budget-table-body').innerHTML = expCategories
        .map(c => {
          const spent = getCategorySpent(c.name);
          const avail = c.budgeted - spent;
          const pct = c.budgeted > 0 ? Math.min(100, Math.round((spent / c.budgeted) * 100)) : (spent > 0 ? 100 : 0);
          const barColor = avail < 0 ? 'var(--danger)' : pct > 85 ? 'var(--warning)' : 'var(--accent)';
          return `<tr>
            <td class="py-3.5 px-4 font-semibold">${c.name}</td>
            <td class="py-3.5 px-4 text-right">
              <input type="number" value="${c.budgeted}" aria-label="Assigned budget for ${c.name}" onchange="updateCategoryBudget('${c.id}', this.value)"
                class="input-field text-right mono w-28 inline-block py-1 px-2" />
            </td>
            <td class="py-3.5 px-4 text-right mono" style="color: var(--text-secondary);">${formatPKR(spent)}</td>
            <td class="py-3.5 px-4 text-right mono font-semibold" style="color: ${avail < 0 ? 'var(--danger)' : 'var(--accent)'};">
              ${formatPKR(avail)}
            </td>
            <td class="py-3.5 px-4">
              <div class="w-full h-2 rounded-full overflow-hidden" style="background: var(--bg-subtle);">
                <div class="h-full rounded-full transition-all" style="width:${pct}%; background: ${barColor};"></div>
              </div>
              <div class="text-[10px] mt-1" style="color: var(--text-muted);">${pct}% used ${avail < 0 ? '• Overbudget' : ''}</div>
            </td>
          </tr>`;
        }).join('');
    }

    function renderAccounts() {
      document.getElementById('accounts-grid').innerHTML = state.accounts.map(a => `
        <div class="surface-card p-5 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded" style="background: var(--bg-subtle); color: var(--text-secondary);">${a.type}</span>
              <h3 class="text-base font-bold mt-2">${a.name}</h3>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openPromptModal('adjustAccount', '${a.id}')" class="text-xs font-medium hover:underline" style="color: var(--accent);">Adjust</button>
              <button onclick="deleteAccount('${a.id}')" aria-label="Delete account ${a.name}" class="text-xs px-1.5 py-0.5 rounded hover:opacity-75" style="color: var(--text-muted);">✕</button>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t flex items-baseline justify-between" style="border-color: var(--border-subtle);">
            <span class="text-xs" style="color: var(--text-muted);">Current Balance</span>
            <span class="text-lg font-bold mono" style="color: ${a.balance >= 0 ? 'var(--accent)' : 'var(--danger)'};">${formatPKR(a.balance)}</span>
          </div>
        </div>
      `).join('') || `
        <div class="md:col-span-3 surface-card p-8 text-center space-y-3">
          <p class="text-xs" style="color: var(--text-muted);">No bank accounts or wallets added yet.</p>
          <button onclick="openPromptModal('account')" class="btn btn-primary">+ Add Your First Account</button>
        </div>
      `;
    }

    function renderSplits() {
      document.getElementById('split-friends-list').innerHTML = state.friends.map(f => `
        <div class="surface-elevated p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-semibold">${f.name}</div>
            <div class="text-[11px]" style="color: ${f.balance > 0 ? 'var(--accent)' : f.balance < 0 ? 'var(--danger)' : 'var(--text-muted)'};">
              ${f.balance > 0 ? `Owes you ${formatPKR(f.balance)}` : f.balance < 0 ? `You owe ${formatPKR(Math.abs(f.balance))}` : 'Settled up'}
            </div>
          </div>
          ${f.balance !== 0 ? `<button onclick="settleFriend('${f.id}')" class="btn btn-secondary py-1 px-2.5 text-[11px]">Settle Up</button>` : ''}
        </div>
      `).join('') || `<p class="text-xs py-4 text-center" style="color: var(--text-muted);">Click "+ Person" to add friends or roommates.</p>`;

      document.getElementById('split-bills-list').innerHTML = state.splits.map(s => `
        <div class="py-3 flex items-center justify-between text-xs">
          <div>
            <div class="font-semibold">${s.desc}</div>
            <div class="text-[11px]" style="color: var(--text-muted);">${s.date} • Paid by <strong>${s.payer}</strong> • Split with: ${(s.participants || []).join(', ')}</div>
          </div>
          <div class="text-right">
            <div class="mono font-semibold">Total: ${formatPKR(s.total)}</div>
            <div class="text-[11px] mono" style="color: var(--accent);">${formatPKR(s.sharePerPerson)} / person</div>
          </div>
        </div>
      `).join('') || `<p class="text-xs py-6 text-center" style="color: var(--text-muted);">No shared bills logged yet.</p>`;
    }

    function renderGoals() {
      const goals = state.goals || [];
      const summary = document.getElementById('goals-summary');
      if (summary) {
        const totalTarget = goals.reduce((n, g) => n + (Number(g.target) || 0), 0);
        const totalSaved = goals.reduce((n, g) => n + (Number(g.saved) || 0), 0);
        const overall = totalTarget > 0 ? Math.min(100, Math.round(totalSaved / totalTarget * 100)) : 0;
        summary.classList.toggle('hidden', !goals.length);
        document.getElementById('goals-summary-count').textContent = goals.length + (goals.length === 1 ? ' goal' : ' goals');
        document.getElementById('goals-summary-saved').textContent = formatPKR(totalSaved);
        document.getElementById('goals-summary-bar').style.width = overall + '%';
        document.getElementById('goals-summary-sub').textContent = `${overall}% of ${formatPKR(totalTarget)} target`;
      }
      document.getElementById('goals-grid').innerHTML = goals.map(g => {
        const pct = g.target > 0 ? Math.min(100, Math.round((g.saved / g.target) * 100)) : 0;
        const rem = Math.max(0, g.target - g.saved);
        const done = g.target > 0 && g.saved >= g.target;
        const cardStyle = done ? 'background: var(--lime); color: var(--on-lime); border-color: transparent;' : '';
        const mutedStyle = done ? 'opacity: 0.7;' : 'color: var(--text-muted);';
        const trackStyle = done ? 'background: rgba(17,17,19,0.14);' : 'background: var(--bg-subtle);';
        const barStyle = done ? 'background: #111113;' : 'background: var(--lime);';
        const iconStyle = done ? 'background: rgba(17,17,19,0.1);' : 'background: var(--lime); color: var(--on-lime);';
        const pctStyle = done ? 'background: #111113; color: var(--lime);' : 'background: var(--accent-soft); color: var(--accent);';
        const deadline = g.deadline ? ` • Target ${escapeHTML(String(g.deadline))}` : '';
        return `<div class="surface-card p-4 sm:p-5 flex flex-col gap-4" style="${cardStyle}">
          <div class="flex items-center gap-3">
            <span class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style="${iconStyle}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </span>
            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-sm truncate">${escapeHTML(String(g.name))}</h3>
              <p class="text-[11px]" style="${mutedStyle}">${done ? 'Goal reached' : 'Remaining ' + formatPKR(rem)}${deadline}</p>
            </div>
            <span class="text-xs mono font-bold px-2.5 py-1 rounded-full" style="${pctStyle}">${pct}%</span>
          </div>
          <div>
            <div class="mono text-lg font-bold">${formatPKR(g.saved)}<span class="text-xs font-medium" style="${mutedStyle}"> / ${formatPKR(g.target)}</span></div>
            <div class="w-full h-2.5 rounded-full overflow-hidden mt-2.5" style="${trackStyle}">
              <div class="h-full rounded-full transition-all" style="width:${pct}%; ${barStyle}"></div>
            </div>
          </div>
          <button onclick="openPromptModal('contributeGoal', '${g.id}')" class="btn ${done ? '' : 'btn-primary'} w-full" style="${done ? 'background: #111113; color: var(--lime);' : ''}">
            + Contribute
          </button>
        </div>`;
      }).join('') || `
        <div class="md:col-span-2 lg:col-span-3 surface-card p-8 text-center space-y-3">
          <p class="text-xs" style="color: var(--text-muted);">No savings goals created yet.</p>
          <button onclick="openPromptModal('goal')" class="btn btn-primary">+ Create First Savings Goal</button>
        </div>
      `;
    }

    function renderWealth() {
      document.getElementById('investments-list').innerHTML = state.investments.map(inv => {
        const gain = inv.currentValue - inv.costBasis;
        const gainPct = inv.costBasis > 0 ? ((gain / inv.costBasis) * 100).toFixed(1) : 0;
        return `<div class="py-3 flex items-center justify-between text-xs">
          <div>
            <span class="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded" style="background: var(--bg-subtle); color: var(--text-secondary);">${inv.category}</span>
            <div class="font-semibold mt-1">${inv.name}</div>
            <div class="text-[11px]" style="color: var(--text-muted);">Cost Basis: ${formatPKR(inv.costBasis)} • <button onclick="openPromptModal('updateAsset', '${inv.id}')" class="font-semibold hover:underline" style="color: var(--accent);">Update Value</button></div>
          </div>
          <div class="text-right">
            <div class="mono font-bold text-sm">${formatPKR(inv.currentValue)}</div>
            <div class="text-[11px] mono" style="color: ${gain >= 0 ? 'var(--accent)' : 'var(--danger)'};">
              ${gain >= 0 ? '+' : ''}${formatPKR(gain)} (${gainPct}%)
            </div>
          </div>
        </div>`;
      }).join('') || `<p class="text-xs py-6 text-center" style="color: var(--text-muted);">No investments or assets added yet.</p>`;

      document.getElementById('subscriptions-list').innerHTML = state.subscriptions.map(s => `
        <div class="py-3 flex items-center justify-between text-xs">
          <div>
            <div class="font-semibold">${s.name}</div>
            <div class="text-[11px]" style="color: var(--text-muted);">${s.category} • Due day ${s.dueDay} (${s.cycle})</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="mono font-semibold" style="color: var(--warning);">${formatPKR(s.amount)}</span>
            <button onclick="paySubscription('${s.id}')" class="btn btn-primary py-1 px-2.5 text-[11px]">Pay & Log</button>
          </div>
        </div>
      `).join('') || `<p class="text-xs py-6 text-center" style="color: var(--text-muted);">No recurring bills or subscriptions added yet.</p>`;
    }

    // =========================================================================
    // UNIVERSAL INLINE MODAL SYSTEM (Replaces native prompt/alert)
    // =========================================================================
    function openPromptModal(type, targetId = null) {
      currentPromptContext = { type, targetId };
      const titleEl = document.getElementById('cp-title');
      const fieldsEl = document.getElementById('cp-fields');

      if (type === 'account') {
        titleEl.textContent = 'Add Account or Wallet';
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Account Name</label>
            <input id="cp-f1" type="text" required placeholder="e.g. Meezan Bank, SadaPay, Cash Wallet" class="input-field" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Account Type</label>
              <select id="cp-f2" class="input-field">
                <option value="Bank">Bank</option>
                <option value="Wallet">Digital Wallet</option>
                <option value="Savings">Savings</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Opening Balance (PKR)</label>
              <input id="cp-f3" type="number" step="any" value="0" required class="input-field mono" />
            </div>
          </div>
        `;
      } else if (type === 'adjustAccount') {
        const acc = state.accounts.find(a => a.id === targetId);
        if (!acc) return;
        titleEl.textContent = `Adjust Balance — ${acc.name}`;
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">New Current Balance (PKR)</label>
            <input id="cp-f1" type="number" step="any" value="${acc.balance}" required class="input-field mono" />
          </div>
        `;
      } else if (type === 'category') {
        titleEl.textContent = 'New Envelope Category';
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Category Name</label>
            <input id="cp-f1" type="text" required placeholder="e.g. Education, Car Maintenance" class="input-field" />
          </div>
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Monthly Assigned Budget (PKR)</label>
            <input id="cp-f2" type="number" min="0" value="0" required class="input-field mono" />
          </div>
        `;
      } else if (type === 'friend') {
        titleEl.textContent = 'Add Person to Splitwise';
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Person / Roommate Name</label>
            <input id="cp-f1" type="text" required placeholder="e.g. Ali Raza" class="input-field" />
          </div>
        `;
      } else if (type === 'goal') {
        titleEl.textContent = 'Create Savings Goal';
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Goal Name</label>
            <input id="cp-f1" type="text" required placeholder="e.g. Emergency Fund, Umrah Trip" class="input-field" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Target Amount (PKR)</label>
              <input id="cp-f2" type="number" min="1" required placeholder="e.g. 500000" class="input-field mono" />
            </div>
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Target Date</label>
              <input id="cp-f3" type="date" value="2027-06-30" required class="input-field" />
            </div>
          </div>
        `;
      } else if (type === 'contributeGoal') {
        const g = state.goals.find(x => x.id === targetId);
        if (!g) return;
        titleEl.textContent = `Contribute to ${g.name}`;
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Contribution Amount (PKR)</label>
            <input id="cp-f1" type="number" min="1" required placeholder="e.g. 25000" class="input-field mono" />
          </div>
        `;
      } else if (type === 'investment') {
        titleEl.textContent = 'Add Investment / Asset';
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Asset Name</label>
            <input id="cp-f1" type="text" required placeholder="e.g. 1 Tola Gold, Al Meezan Mutual Fund" class="input-field" />
          </div>
          <div class="grid grid-cols-3 gap-2.5">
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Class</label>
              <select id="cp-f2" class="input-field">
                <option value="Gold">Gold</option>
                <option value="Mutual Fund">Mutual Fund</option>
                <option value="Stocks">PSX Stocks</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Crypto">Crypto</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Cost (PKR)</label>
              <input id="cp-f3" type="number" min="0" required placeholder="200000" class="input-field mono" />
            </div>
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Current Value</label>
              <input id="cp-f4" type="number" min="0" required placeholder="230000" class="input-field mono" />
            </div>
          </div>
        `;
      } else if (type === 'updateAsset') {
        const inv = state.investments.find(x => x.id === targetId);
        if (!inv) return;
        titleEl.textContent = `Update Market Value — ${inv.name}`;
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Current Market Value (PKR)</label>
            <input id="cp-f1" type="number" min="0" value="${inv.currentValue}" required class="input-field mono" />
          </div>
        `;
      } else if (type === 'subscription') {
        titleEl.textContent = 'Add Recurring Bill / Subscription';
        fieldsEl.innerHTML = `
          <div>
            <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Bill / Subscription Name</label>
            <input id="cp-f1" type="text" required placeholder="e.g. K-Electric, StormFiber, Netflix" class="input-field" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Monthly Amount (PKR)</label>
              <input id="cp-f2" type="number" min="1" required placeholder="e.g. 6800" class="input-field mono" />
            </div>
            <div>
              <label class="block mb-1 font-medium" style="color: var(--text-secondary);">Due Day (1–31)</label>
              <input id="cp-f3" type="number" min="1" max="31" value="15" required class="input-field mono" />
            </div>
          </div>
        `;
      }

      document.getElementById('custom-prompt-modal').classList.remove('hidden');
      document.getElementById('custom-prompt-modal').classList.add('flex');
      setTimeout(() => document.getElementById('cp-f1')?.focus(), 50);
    }

    function submitCustomPrompt(e) {
      e.preventDefault();
      if (!currentPromptContext) return;
      const { type, targetId } = currentPromptContext;
      const v1 = document.getElementById('cp-f1')?.value;
      const v2 = document.getElementById('cp-f2')?.value;
      const v3 = document.getElementById('cp-f3')?.value;
      const v4 = document.getElementById('cp-f4')?.value;

      if (type === 'account') {
        state.accounts.push({ id: 'acc-' + Date.now(), name: v1.trim(), type: v2, balance: Number(v3) || 0 });
        showToast(`Added account "${v1.trim()}"`);
      } else if (type === 'adjustAccount') {
        const acc = state.accounts.find(a => a.id === targetId);
        if (acc) acc.balance = Number(v1) || 0;
        showToast('Account balance updated');
      } else if (type === 'category') {
        const b = Number(v2) || 0;
        state.categories.push({ id: 'cat-' + Date.now(), name: v1.trim(), type: 'expense', budgeted: b, target: b });
        showToast(`Created envelope "${v1.trim()}"`);
      } else if (type === 'friend') {
        state.friends.push({ id: 'fr-' + Date.now(), name: v1.trim(), balance: 0 });
        showToast(`Added ${v1.trim()} to Splitwise`);
      } else if (type === 'goal') {
        state.goals.push({ id: 'gl-' + Date.now(), name: v1.trim(), target: Number(v2) || 0, saved: 0, deadline: v3 });
        showToast(`Created goal "${v1.trim()}"`);
      } else if (type === 'contributeGoal') {
        const g = state.goals.find(x => x.id === targetId);
        if (g) g.saved += Number(v1) || 0;
        showToast(`Added ${formatPKR(v1)} to ${g?.name}`);
      } else if (type === 'investment') {
        state.investments.push({ id: 'inv-' + Date.now(), name: v1.trim(), category: v2, costBasis: Number(v3) || 0, currentValue: Number(v4) || 0 });
        showToast(`Added asset "${v1.trim()}"`);
      } else if (type === 'updateAsset') {
        const inv = state.investments.find(x => x.id === targetId);
        if (inv) inv.currentValue = Number(v1) || 0;
        showToast('Market value updated');
      } else if (type === 'subscription') {
        state.subscriptions.push({ id: 'sub-' + Date.now(), name: v1.trim(), amount: Number(v2) || 0, cycle: 'Monthly', dueDay: Number(v3) || 15, category: state.categories[1]?.name || 'General' });
        showToast(`Added recurring bill "${v1.trim()}"`);
      }

      closeModal('custom-prompt-modal');
      saveState();
    }

    function openTransactionModal() {
      if (state.accounts.length === 0) {
        showToast('Add your first Bank Account or Wallet first');
        return openPromptModal('account');
      }
      document.getElementById('tx-date').value = new Date().toISOString().slice(0, 10);
      document.getElementById('tx-modal').classList.remove('hidden');
      document.getElementById('tx-modal').classList.add('flex');
    }

    function openTransferModal() {
      if (state.accounts.length < 2) {
        showToast('Add at least 2 accounts to transfer between them');
        return openPromptModal('account');
      }
      document.getElementById('transfer-modal').classList.remove('hidden');
      document.getElementById('transfer-modal').classList.add('flex');
    }

    function openSplitModal() {
      if (state.friends.length === 0) {
        showToast('Add a person first to split a shared bill');
        return openPromptModal('friend');
      }
      document.getElementById('sp-payer').innerHTML = `<option value="You">You</option>` + state.friends.map(f => `<option value="${f.name}">${f.name}</option>`).join('');
      document.getElementById('sp-friends-checkboxes').innerHTML = state.friends.map(f => `
        <label class="flex items-center gap-2 cursor-pointer text-xs">
          <input type="checkbox" name="sp-friend" value="${f.name}" checked class="accent-emerald-500" />
          <span>${f.name}</span>
        </label>
      `).join('');
      document.getElementById('split-modal').classList.remove('hidden');
      document.getElementById('split-modal').classList.add('flex');
    }

    function closeModal(id) {
      document.getElementById(id).classList.add('hidden');
      document.getElementById(id).classList.remove('flex');
    }

    function submitTransaction(e) {
      e.preventDefault();
      const type = document.getElementById('tx-type').value;
      const date = document.getElementById('tx-date').value;
      const amount = Number(document.getElementById('tx-amount').value);
      const accountId = document.getElementById('tx-account').value;
      const category = document.getElementById('tx-category').value;
      const payee = document.getElementById('tx-payee').value.trim();

      state.transactions.push({ id: 'tx-' + Date.now(), date, payee, category, accountId, type, amount });
      const acc = state.accounts.find(a => a.id === accountId);
      if (acc) acc.balance += (type === 'income' ? amount : -amount);

      closeModal('tx-modal');
      e.target.reset();
      saveState();
      showToast(`Logged ${formatPKR(amount)} (${payee})`);
    }

    function submitTransfer(e) {
      e.preventDefault();
      const fromId = document.getElementById('tr-from').value;
      const toId = document.getElementById('tr-to').value;
      const amount = Number(document.getElementById('tr-amount').value);
      const note = document.getElementById('tr-note').value.trim() || 'Account Transfer';
      if (fromId === toId) return showToast('Choose two different accounts');

      const fromAcc = state.accounts.find(a => a.id === fromId);
      const toAcc = state.accounts.find(a => a.id === toId);
      if (fromAcc) fromAcc.balance -= amount;
      if (toAcc) toAcc.balance += amount;

      state.transactions.push({
        id: 'tx-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        payee: `${note} (${fromAcc?.name} → ${toAcc?.name})`,
        category: 'Account Transfer',
        accountId: fromId,
        type: 'transfer',
        amount
      });
      closeModal('transfer-modal');
      e.target.reset();
      saveState();
      showToast(`Transferred ${formatPKR(amount)}`);
    }

    function deleteTransaction(id) {
      const idx = state.transactions.findIndex(t => t.id === id);
      if (idx === -1) return;
      const tx = state.transactions[idx];
      const acc = state.accounts.find(a => a.id === tx.accountId);
      if (acc && tx.type !== 'transfer') {
        acc.balance -= (tx.type === 'income' ? tx.amount : -tx.amount);
      }
      state.transactions.splice(idx, 1);
      saveState();
      showToast('Transaction removed');
    }

    function updateCategoryBudget(id, val) {
      const cat = state.categories.find(c => c.id === id);
      if (cat) cat.budgeted = Math.max(0, Number(val) || 0);
      saveState();
    }

    function coverOverspending() {
      state.categories.filter(c => c.type === 'expense').forEach(c => {
        const spent = getCategorySpent(c.name);
        if (spent > c.budgeted) c.budgeted = spent;
      });
      saveState();
      showToast('Covered overspent envelopes');
    }

    function deleteAccount(id) {
      const acc = state.accounts.find(a => a.id === id);
      if (!acc) return;
      if (confirm(`Delete account "${acc.name}"?`)) {
        state.accounts = state.accounts.filter(a => a.id !== id);
        saveState();
        showToast(`Deleted "${acc.name}"`);
      }
    }

    function submitSplitBill(e) {
      e.preventDefault();
      const desc = document.getElementById('sp-desc').value.trim();
      const total = Number(document.getElementById('sp-amount').value);
      const payer = document.getElementById('sp-payer').value;
      const selected = Array.from(document.querySelectorAll('input[name="sp-friend"]:checked')).map(el => el.value);
      if (selected.length === 0) return showToast('Select at least one person');

      const totalPeople = selected.length + 1;
      const share = Math.round(total / totalPeople);

      if (payer === 'You') {
        selected.forEach(name => {
          const fr = state.friends.find(f => f.name === name);
          if (fr) fr.balance += share;
        });
      } else {
        const fr = state.friends.find(f => f.name === payer);
        if (fr) fr.balance -= share;
      }

      state.splits.unshift({
        id: 'sp-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        desc,
        total,
        payer,
        participants: selected,
        sharePerPerson: share
      });
      closeModal('split-modal');
      e.target.reset();
      saveState();
      showToast(`Split "${desc}" (${formatPKR(share)}/person)`);
    }

    function settleFriend(id) {
      const fr = state.friends.find(f => f.id === id);
      if (!fr || fr.balance === 0) return;
      const amt = Math.abs(fr.balance);
      const isIncoming = fr.balance > 0;
      if (state.accounts.length > 0) {
        state.transactions.push({
          id: 'tx-' + Date.now(),
          date: new Date().toISOString().slice(0, 10),
          payee: `Splitwise Settlement — ${fr.name}`,
          category: isIncoming ? 'Salary & Income' : 'Dining Out & Food Delivery',
          accountId: state.accounts[0].id,
          type: isIncoming ? 'income' : 'expense',
          amount: amt
        });
        state.accounts[0].balance += (isIncoming ? amt : -amt);
      }
      fr.balance = 0;
      saveState();
      showToast(`Settled up with ${fr.name}`);
    }

    function paySubscription(id) {
      const sub = state.subscriptions.find(s => s.id === id);
      if (!sub) return;
      if (state.accounts.length === 0) {
        showToast('Add a Bank Account or Wallet first');
        return openPromptModal('account');
      }
      state.transactions.push({
        id: 'tx-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        payee: `${sub.name} (Recurring Bill)`,
        category: sub.category,
        accountId: state.accounts[0].id,
        type: 'expense',
        amount: sub.amount
      });
      state.accounts[0].balance -= sub.amount;
      saveState();
      showToast(`Paid & logged ${formatPKR(sub.amount)} for ${sub.name}`);
    }

    function exportTransactionsCSV() {
      const headers = ['Date', 'Payee', 'Category', 'Type', 'Amount_PKR', 'Account'];
      const rows = state.transactions.map(t => {
        const acc = state.accounts.find(a => a.id === t.accountId)?.name || 'Default';
        return [t.date, `"${t.payee.replace(/"/g, '""')}"`, `"${t.category}"`, t.type, t.amount, `"${acc}"`].join(',');
      });
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lifvia-transactions-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      showToast('Exported CSV');
    }

    function importTransactionsCSV(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (state.accounts.length === 0) {
        state.accounts.push({ id: 'acc-' + Date.now(), name: 'Primary Account', type: 'Bank', balance: 0 });
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        const lines = e.target.result.split(/\r?\n/).filter(Boolean);
        let imported = 0;
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
          if (cols.length >= 5) {
            const [date, payee, category, type, amountStr] = cols;
            const amount = Number(amountStr) || 0;
            if (amount > 0) {
              state.transactions.push({
                id: 'tx-' + Date.now() + '-' + i,
                date: date || new Date().toISOString().slice(0, 10),
                payee: payee || 'Imported Transaction',
                category: category || 'Groceries & Supermarkets',
                accountId: state.accounts[0].id,
                type: type === 'income' ? 'income' : 'expense',
                amount
              });
              imported++;
            }
          }
        }
        saveState();
        showToast(`Imported ${imported} transactions`);
      };
      reader.readAsText(file);
    }

    function exportBackupJSON() {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `lifvia-backup.json`;
      a.click();
      showToast('Backup JSON downloaded');
    }

    checkInitialSession();
  