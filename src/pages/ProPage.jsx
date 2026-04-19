export default function ProPage({ TT, isPro, adminInput, setAdminInput, adminErr, checkAdmin }) {
  return (
    <div className='fade' style={{ display: 'grid', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>{TT.proTitle}</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>{TT.proSubtitle}</p>
      </div>

      {isPro ? (
        <div className='card card-strong' style={{ padding: 28, textAlign: 'center' }}>
          <p style={{ fontSize: 48, margin: 0 }}>🎉</p>
          <h2 style={{ margin: '18px 0 8px' }}>{TT.proActive}</h2>
          <p style={{ color: '#475569' }}>{TT.proActiveDesc}</p>
        </div>
      ) : (
        <div className='card' style={{ padding: 28 }}>
          <p style={{ margin: 0, color: '#64748b' }}>Payment integration coming soon.</p>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            <div style={{ padding: 20, background: 'rgba(6,95,70,0.08)', borderRadius: 24 }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Admin code</p>
              <p style={{ margin: '8px 0 0', color: '#475569' }}>Unlock for testing.</p>
            </div>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr auto' }}>
              <input type='password' className='input' value={adminInput} onChange={(e) => setAdminInput(e.target.value)} placeholder='Enter code...' />
              <button className='btn' type='button' onClick={checkAdmin}>{TT.unlock}</button>
            </div>
            {adminErr && <p style={{ margin: 0, color: '#dc2626' }}>{adminErr}</p>}
          </div>
        </div>
      )}

      <div className='card' style={{ padding: 28 }}>
        <h3 style={{ marginTop: 0 }}>Features</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
          {[TT.proBenefit1, TT.proBenefit2, TT.proBenefit3, TT.proBenefit4, TT.proBenefit5].map((benefit) => (
            <li key={benefit} style={{ color: '#475569' }}>✓ {benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
