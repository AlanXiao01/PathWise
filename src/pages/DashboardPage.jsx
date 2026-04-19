export default function DashboardPage({ TT, profile, profileComplete, currentPath, completedSteps, activity, isPro, navigate, chatMsgs }) {
  const progress = currentPath ? (completedSteps.length / Math.max(currentPath.recommendedPath?.steps.length || 1, 1)) * 100 : 0;

  return (
    <div className='fade' style={{ display: 'grid', gap: 24 }}>
      <div>
        <h1 style={{ margin: 0 }}>{TT.dashboard}</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>Your career planning overview</p>
      </div>

      <div className='grid-3 card-grid'>
        <div className='card' style={{ padding: 24 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Progress</p>
          <p style={{ margin: '14px 0 6px', fontSize: 32, fontWeight: 700 }}>{Math.round(progress)}%</p>
          <div className='progress-bar'><div className='progress-fill' style={{ width: `${progress}%` }} /></div>
        </div>
        <div className='card' style={{ padding: 24 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Questions asked</p>
          <p style={{ margin: '14px 0 6px', fontSize: 32, fontWeight: 700 }}>{chatMsgs.filter((m) => m.role === 'user').length}</p>
        </div>
        <div className='card' style={{ padding: 24 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Plan</p>
          <p style={{ margin: '14px 0 6px', fontSize: 32, fontWeight: 700 }}>{isPro ? 'Premium' : 'Free'}</p>
        </div>
      </div>

      <div className='card' style={{ padding: 28 }}>
        <h2 style={{ marginTop: 0 }}>Quick actions</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          <button className='btn-secondary' onClick={() => navigate('myPath')}>View my path</button>
          <button className='btn-secondary' onClick={() => navigate('explore')}>Explore careers</button>
          <button className='btn-secondary' onClick={() => navigate('chat')}>Ask AI</button>
          <button className='btn-secondary' onClick={() => navigate('settings')}>Settings</button>
        </div>
      </div>

      {activity.length > 0 && (
        <div className='card' style={{ padding: 28 }}>
          <h2 style={{ marginTop: 0 }}>{TT.recentActivity}</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {activity.slice(0, 5).map((item, index) => (
              <div key={index} style={{ display: 'flex', gap: 12, padding: 12 }}>
                <span>{item.icon}</span>
                <span style={{ color: '#475569' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
