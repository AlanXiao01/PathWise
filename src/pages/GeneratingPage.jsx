export default function GeneratingPage({ TT, bgProgress, bgMessage }) {
  return (
    <div className='fade' style={{ maxWidth: 560, margin: '80px auto 0', textAlign: 'center' }}>
      <div style={{ width: 120, height: 120, margin: '0 auto 24px', borderRadius: 36, background: 'rgba(34,197,94,0.12)', display: 'grid', placeItems: 'center', fontSize: 48 }}>🧭</div>
      <h2 style={{ margin: 0, fontSize: 34 }}>{TT.analyzing}</h2>
      <p style={{ color: '#64748b', marginTop: 14 }}>{TT.analyzingDetails}</p>
      <div style={{ marginTop: 36 }}>
        <div className='progress-bar'><div className='progress-fill' style={{ width: `${bgProgress}%` }} /></div>
        <p style={{ marginTop: 16, color: '#475569' }}>{bgMessage}</p>
      </div>
    </div>
  );
}
