export default function StyleBlock({ dark }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      :root {
        color-scheme: light;
        --bg: #f6f7f9;
        --surface: #ffffff;
        --card: rgba(255, 255, 255, 0.96);
        --border: rgba(14, 24, 35, 0.08);
        --border-strong: rgba(14, 24, 35, 0.12);
        --text: #111827;
        --muted: #6b7280;
        --hint: #9ca3af;
        --accent: #0f766e;
        --accent-soft: rgba(15, 118, 110, 0.12);
        --accent-strong: #115e59;
        --blue: #1d4ed8;
        --red: #dc2626;
        --gold: #b45309;
        --shadow: 0 28px 80px rgba(15, 23, 42, 0.08);
      }
      .dark {
        --bg: #09090b;
        --surface: #111827;
        --card: rgba(17, 24, 39, 0.96);
        --border: rgba(148, 163, 184, 0.16);
        --border-strong: rgba(148, 163, 184, 0.24);
        --text: #f8fafc;
        --muted: #94a3b8;
        --hint: #cbd5e1;
        --accent: #22c55e;
        --accent-soft: rgba(34, 197, 94, 0.14);
        --accent-strong: #16a34a;
        --blue: #60a5fa;
        --red: #f87171;
        --gold: #f59e0b;
        --shadow: 0 28px 80px rgba(15, 23, 42, 0.32);
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; min-height: 100vh; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); }
      button, input, select, textarea { font: inherit; }
      button { cursor: pointer; }
      .pw { min-height: 100vh; background: linear-gradient(180deg, var(--bg) 0%, #f8fafb 45%, var(--bg) 100%); }
      .main { max-width: 1240px; margin: 0 auto; padding: 32px 28px 72px; }
      .topbar { position: sticky; top: 0; z-index: 90; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 28px; backdrop-filter: blur(18px); background: rgba(255,255,255,0.84); border-bottom: 1px solid var(--border); }
      .dark .topbar { background: rgba(15,17,24,0.92); }
      .topbar-left { display: flex; align-items: center; gap: 14px; }
      .logo-mark { width: 42px; height: 42px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, var(--accent), var(--blue)); color: #fff; font-weight: 700; letter-spacing: -0.04em; font-size: 18px; cursor: pointer; }
      .brand-group { display: flex; flex-direction: column; gap: 4px; }
      .brand-name { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; letter-spacing: -0.03em; }
      .brand-subtitle { font-size: 12px; color: var(--muted); }
      .topnav { display: flex; gap: 10px; flex-wrap: wrap; }
      .topnav-item { border-radius: 999px; background: transparent; border: 1px solid transparent; color: var(--muted); padding: 12px 18px; font-size: 13px; font-weight: 600; transition: all 0.18s ease; cursor: pointer; }
      .topnav-item:hover { background: var(--accent-soft); color: var(--accent-strong); transform: translateY(-1px); }
      .topnav-item.active { background: var(--accent); color: #fff; border-color: transparent; }
      .topnav-dropdown { position: relative; }
      .dropdown-trigger { position: relative; }
      .dropdown-trigger::after { content: '▼'; margin-left: 6px; font-size: 10px; }
      .dropdown-menu { position: absolute; top: 100%; left: 0; background: var(--card); border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow); min-width: 200px; z-index: 1000; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.2s ease; }
      .topnav-dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
      .dropdown-item { width: 100%; text-align: left; padding: 12px 16px; border: none; background: none; color: var(--text); cursor: pointer; transition: background 0.15s ease; }
      .dropdown-item:hover { background: var(--surface); }
      .dropdown-item.active { background: var(--accent); color: #fff; }
      .topbar-actions { display: flex; gap: 10px; align-items: center; }
      .badge { display: inline-flex; align-items: center; gap: 6px; padding: 0.65rem 1rem; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
      .badge-pro { background: rgba(56, 189, 248, 0.14); color: #0ea5e9; }
      .btn, .btn-primary { appearance: none; border: none; border-radius: 12px; padding: 16px 24px; color: #fff; background: linear-gradient(135deg, #0f766e, #2563eb); font-weight: 700; font-size: 16px; transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2); }
      .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(15, 118, 110, 0.3); }
      .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
      .btn-secondary { appearance: none; background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8)); border: 2px solid rgba(15,118,110,0.2); color: #0f766e; border-radius: 12px; padding: 16px 24px; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(15,118,110,0.1); }
      .btn-secondary:hover { background: linear-gradient(135deg, rgba(15,118,110,0.05), rgba(37,99,235,0.05)); border-color: rgba(15,118,110,0.4); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(15,118,110,0.15); }
      .button-link { background: none; border: none; color: var(--accent); padding: 0; font-weight: 700; cursor: pointer; }
      .card { background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9)); border: 1px solid rgba(15,118,110,0.1); border-radius: 20px; box-shadow: 0 8px 32px rgba(15,23,42,0.08); backdrop-filter: blur(10px); }
      .card-compact { border-radius: 16px; }
      .card-strong { background: linear-gradient(180deg, rgba(240,249,255,0.9), rgba(255,255,255,0.96)); border-color: rgba(15,118,110,0.15); }
      .card-grid { display: grid; gap: 20px; }
      .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .text-caption { font-size: 13px; color: var(--muted); }
      .section-title { font-family: 'Fraunces', serif; font-size: clamp(36px, 5vw, 52px); margin: 0; line-height: 1.05; }
      .section-subtitle { max-width: 720px; color: var(--muted); font-size: 16px; line-height: 1.8; }
      .input, .select, textarea { width: 100%; border-radius: 18px; border: 1px solid var(--border); padding: 14px 18px; background: var(--surface); color: var(--text); font-family: inherit; }
      .input:focus, .select:focus, textarea:focus { outline: 0; border-color: var(--accent); box-shadow: 0 0 0 6px rgba(15, 118, 110, 0.08); }
      .textarea { min-height: 120px; resize: vertical; }
      .chip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--muted); font-size: 13px; transition: transform 0.18s ease; cursor: pointer; }
      .chip:hover { transform: translateY(-1px); background: rgba(15,118,110,0.08); }
      .accent-pill { display: inline-flex; align-items: center; padding: 9px 14px; border-radius: 999px; background: rgba(34,197,94,0.12); color: #166534; font-size: 12px; font-weight: 700; }
      .hoverable { transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; cursor: pointer; }
      .hoverable:hover { transform: translateY(-2px); box-shadow: 0 24px 60px rgba(15,23,42,0.08); }
      .back-btn { border: none; background: rgba(15,118,110,0.08); color: var(--accent-strong); border-radius: 999px; padding: 10px 14px; font-weight: 700; cursor: pointer; }
      .progress-bar { height: 12px; border-radius: 999px; background: rgba(15,117,110,0.1); overflow: hidden; }
      .progress-fill { height: 100%; background: linear-gradient(90deg, #22c55e, #0ea5e9); transition: width 0.3s ease; }
      .step-dot { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-size: 13px; font-weight: 700; }
      .fade { animation: fade-in 0.35s ease both; }
      @keyframes fade-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .typing-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); animation: typing 1.4s infinite ease-in-out; }
      .typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .typing-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes typing { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
      @media (max-width: 1080px) { .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 860px) { .topbar { flex-direction: column; align-items: stretch; gap: 14px; } .main { padding: 24px 18px 60px; } .grid-3, .grid-4, .grid-2 { grid-template-columns: 1fr; } }
    `}</style>
  );
}
