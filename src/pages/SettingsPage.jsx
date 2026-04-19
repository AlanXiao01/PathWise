import { useState } from 'react';
import { DB_COUNTRIES, DB_EDUCATION, DB_USER_TYPES } from '../constants/databases';

export default function SettingsPage({ TT, email, lang, setLang, dark, setDark, profile, setProfile, isPro, navigate, setIntakeStep, showToast, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const save = () => {
    setProfile(draft);
    setEditing(false);
    showToast(TT.saved, 'ok');
  };

  return (
    <div className='fade' style={{ display: 'grid', gap: 24 }}>
      <div>
        <h1 style={{ margin: 0 }}>{TT.settings}</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>Customize your preferences and profile</p>
      </div>

      <div className='card' style={{ padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>{TT.yourProfile}</p>
            <p style={{ margin: '8px 0 0', color: '#64748b' }}>Profile and account details</p>
          </div>
          {!editing ? (
            <button className='btn-secondary' type='button' onClick={() => { setDraft(profile); setEditing(true); }}>{TT.editProfile}</button>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <button className='btn-secondary' type='button' onClick={() => setEditing(false)}>{TT.cancel}</button>
              <button className='btn' type='button' onClick={save}>{TT.save}</button>
            </div>
          )}
        </div>

        <div style={{ marginTop: 22 }}>
          <p style={{ margin: 0, color: '#475569' }}>{TT.signedInAs} <strong>{email}</strong></p>
          
          {editing ? (
            <div style={{ display: 'grid', gap: 18, marginTop: 18 }}>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Type</label>
                <select className='select' value={draft.userType} onChange={(e) => setDraft({ ...draft, userType: e.target.value })}>
                  {DB_USER_TYPES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Country</label>
                <select className='select' value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })}>
                  {DB_COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Career</label>
                <input className='input' value={draft.career} onChange={(e) => setDraft({ ...draft, career: e.target.value })} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
              <div><p style={{ margin: 0, color: '#64748b' }}>Type:</p><strong>{DB_USER_TYPES.find((item) => item.id === profile.userType)?.label || '—'}</strong></div>
              <div><p style={{ margin: 0, color: '#64748b' }}>Country:</p><strong>{profile.country || '—'}</strong></div>
              <div><p style={{ margin: 0, color: '#64748b' }}>Career:</p><strong>{profile.career || '—'}</strong></div>
            </div>
          )}
        </div>
      </div>

      <div className='card' style={{ padding: 28 }}>
        <h2 style={{ marginTop: 0 }}>{TT.language}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
          {[['en', '🇬🇧 English'], ['fr', '🇫🇷 Français'], ['hi', '🇮🇳 हिन्दी'], ['zh', '🇨🇳 中文'], ['es', '🇪🇸 Español']].map(([key, label]) => (
            <button key={key} type='button' className={`topnav-item ${lang === key ? 'active' : ''}`} onClick={() => setLang(key)}>{label}</button>
          ))}
        </div>
      </div>

      <div className='card' style={{ padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>{TT.darkMode}</p>
            <p style={{ margin: '8px 0 0', color: '#64748b' }}>Toggle dark mode</p>
          </div>
          <button className='btn-secondary' type='button' onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'}</button>
        </div>
      </div>

      <div className='card' style={{ padding: 28 }}>
        <h2 style={{ marginTop: 0 }}>Subscription</h2>
        <p style={{ color: '#64748b' }}>{isPro ? 'Premium active' : 'Free plan'}</p>
        {!isPro && <button className='btn' type='button' onClick={() => navigate('pro')} style={{ marginTop: 16 }}>Upgrade</button>}
      </div>

      <div className='card' style={{ padding: 28 }}>
        <button className='btn-secondary' type='button' onClick={onLogout} style={{ color: '#dc2626', borderColor: 'rgba(220,38,38,0.16)' }}>{TT.logout}</button>
      </div>
    </div>
  );
}
