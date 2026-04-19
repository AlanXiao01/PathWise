export default function LoginScreen({ TT, dark, email, setEmail, authStep, setAuthStep, emailSending, sendEmailCode, codeInput, setCodeInput, verifyEmailCode, codeErr, handleGoogleSignIn, lang, setLang }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(135deg, #0f172a, #0f766e)' }}>
      <div style={{ width: '100%', maxWidth: 520, borderRadius: 32, overflow: 'hidden', boxShadow: '0 40px 120px rgba(15, 23, 42, 0.35)' }}>
        <div style={{ padding: 32, background: 'rgba(255,255,255,0.92)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 62, height: 62, borderRadius: 20, background: '#0f766e', display: 'grid', placeItems: 'center', color: '#fff', margin: '0 auto 18px', fontSize: 24, fontWeight: 700 }}>PW</div>
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 34, margin: 0 }}>{TT.appName}</h1>
            <p style={{ marginTop: 10, color: '#475569', fontSize: 15 }}>{TT.tagline}</p>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>{TT.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            {authStep === 'email' ? (
              <>
                <button type='button' onClick={handleGoogleSignIn} className='btn' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                  <span style={{ width: 20, height: 20, display: 'grid', placeItems: 'center', background: '#fff', borderRadius: 8, color: '#0f766e' }}>G</span>
                  {TT.continueGoogle}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#94a3b8', fontSize: 12 }}>
                  <span style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                  or
                  <span style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                </div>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={TT.emailPlaceholder} className='input' />
                <button type='button' className='btn' onClick={sendEmailCode} disabled={emailSending}>
                  {emailSending ? 'Sending...' : TT.sendCode}
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: 14, color: '#475569' }}>{TT.codeSentTo} <strong>{email}</strong></p>
                <input type='text' value={codeInput} onChange={(e) => setCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))} onKeyDown={(e) => e.key === 'Enter' && verifyEmailCode()} placeholder='123456' className='input' />
                {codeErr && <p style={{ color: '#dc2626', fontSize: 13 }}>{codeErr}</p>}
                <button type='button' className='btn' onClick={verifyEmailCode}>{TT.verify}</button>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <button type='button' className='btn-secondary' onClick={() => { setAuthStep('email'); setCodeInput(''); }}>{TT.back}</button>
                  <button type='button' className='btn-secondary' onClick={sendEmailCode}>{TT.resend}</button>
                </div>
                <p style={{ fontSize: 12, color: '#64748b', textAlign: 'center', marginTop: 16 }}>Dev: code shown in toast or use 123456. Admin: 592899</p>
              </>
            )}
          </div>
        </div>
        <div style={{ padding: 18, background: '#0f172a', color: '#cbd5e1', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {Object.entries({ en: '🇬🇧 English', fr: '🇫🇷 Français', hi: '🇮🇳 हिन्दी', zh: '🇨🇳 中文', ar: '🇸🇦 العربية', tl: '🇵🇭 Tagalog', pa: '🇮🇳 ਪੰਜਾਬੀ', es: '🇪🇸 Español', ur: '🇵🇰 اردو', pt: '🇧🇷 Português' }).map(([key, label]) => (
            <button key={key} type='button' onClick={() => setLang(key)} className='button-link' style={{ color: lang === key ? '#fff' : '#cbd5e1' }}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
