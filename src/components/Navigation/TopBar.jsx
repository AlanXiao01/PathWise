export default function TopBar({ page, onNavigate, isPro }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Careers' },
    { id: 'myPath', label: 'My Path' },
    { id: 'dashboard', label: 'Overview' },
  ];

  const premiumItems = [
    { id: 'visa', label: 'Visa Guide', icon: '🛂' },
    { id: 'resume', label: 'Resume Builder', icon: '📄' },
    { id: 'scholarships', label: 'Scholarships', icon: '🎓' },
    { id: 'aiAssistant', label: 'AI Assistant', icon: '🤖' },
  ];

  return (
    <header className='topbar'>
      <div className='topbar-left' onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
        <div className='logo-mark'>PW</div>
        <div className='brand-group'>
          <div className='brand-name'>PathWise</div>
          <div className='brand-subtitle'>Immigrant career pathways</div>
        </div>
      </div>

      <nav className='topnav'>
        {navItems.map(item => (
          <button
            key={item.id}
            type='button'
            className={`topnav-item ${page === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}

        {isPro && (
          <div className='topnav-dropdown'>
            <button type='button' className='topnav-item dropdown-trigger'>
              Premium ▼
            </button>
            <div className='dropdown-menu'>
              {premiumItems.map(item => (
                <button
                  key={item.id}
                  type='button'
                  className={`dropdown-item ${page === item.id ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                >
                  <span style={{ marginRight: 8 }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className='topbar-actions'>
        {isPro ? <span className='badge badge-pro'>Premium</span> : <button type='button' className='btn-secondary' onClick={() => onNavigate('pro')}>Premium</button>}
        <button type='button' className='btn-secondary' onClick={() => onNavigate('settings')}>Settings</button>
      </div>
    </header>
  );
}
