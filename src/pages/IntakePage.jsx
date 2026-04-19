import { DB_COUNTRIES, DB_EDUCATION, DB_USER_TYPES } from '../constants/databases';

export default function IntakePage({ TT, profile, setProfile, intakeStep, setIntakeStep, submitIntake }) {
  const steps = [
    { q: 'Which best describes you?', render: () => (
      <div style={{ display: 'grid', gap: 16 }}>
        {[
          { id: 'new_immigrant', label: 'New Immigrant', desc: 'Recently arrived in Canada' },
          { id: 'international_student', label: 'International Student', desc: 'Studying in Canada' },
          { id: 'hs_student', label: 'High School Student', desc: 'Planning to study in Canada' },
          { id: 'working_professional', label: 'Working Professional', desc: 'Already working in Canada' },
          { id: 'career_changer', label: 'Career Changer', desc: 'Switching careers in Canada' },
          { id: 'family_sponsor', label: 'Family Sponsored', desc: 'Sponsored by family in Canada' },
        ].map((ut) => (
          <button key={ut.id} type='button' className='btn-secondary' onClick={() => { setProfile(p => ({ ...p, userType: ut.id })); setIntakeStep(1); }} style={{ textAlign: 'left', padding: '20px 24px', borderRadius: 16, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.borderColor = 'rgba(15, 118, 110, 0.3)'} onMouseLeave={(e) => e.target.style.borderColor = 'rgba(15, 118, 110, 0.1)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 24 }}>{ut.id === 'new_immigrant' ? '🌍' : ut.id === 'international_student' ? '🎓' : ut.id === 'hs_student' ? '📚' : ut.id === 'working_professional' ? '💼' : ut.id === 'career_changer' ? '🔄' : '👨‍👩‍👧‍👦'}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{ut.label}</div>
                <div style={{ fontSize: 14, color: '#64748b' }}>{ut.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    ) },
    { q: 'Where were you born or educated?', render: () => (
      <div style={{ display: 'grid', gap: 20 }}>
        <select value={profile.country} onChange={(e) => setProfile(p => ({ ...p, country: e.target.value }))} className='select' style={{ padding: '16px 20px', borderRadius: 12, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', fontSize: 16 }}>
          <option value=''>Select your country...</option>
          {DB_COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
        </select>
        <button type='button' className='btn' disabled={!profile.country} onClick={() => setIntakeStep(2)} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', padding: '16px 24px', borderRadius: 12 }}>Next →</button>
      </div>
    ) },
    { q: 'Are you currently in Canada?', render: () => (
      <div style={{ display: 'grid', gap: 16 }}>
        {[
          { id: 'yes', label: 'Yes, I live in Canada', desc: 'Currently residing in Canada' },
          { id: 'no_planning', label: 'No, but planning to move', desc: 'Will be moving to Canada soon' },
          { id: 'no_abroad', label: 'No, staying abroad', desc: 'Living outside Canada' },
        ].map((option) => (
          <button key={option.id} type='button' className='btn-secondary' onClick={() => { setProfile(p => ({ ...p, inCanada: option.id })); setIntakeStep(3); }} style={{ textAlign: 'left', padding: '20px 24px', borderRadius: 16, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.borderColor = 'rgba(15, 118, 110, 0.3)'} onMouseLeave={(e) => e.target.style.borderColor = 'rgba(15, 118, 110, 0.1)'}>
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{option.label}</div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{option.desc}</div>
            </div>
          </button>
        ))}
      </div>
    ) },
    { q: 'What is your highest education level?', render: () => (
      <div style={{ display: 'grid', gap: 20 }}>
        <select value={profile.education} onChange={(e) => setProfile(p => ({ ...p, education: e.target.value }))} className='select' style={{ padding: '16px 20px', borderRadius: 12, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', fontSize: 16 }}>
          <option value=''>Select your education...</option>
          {DB_EDUCATION.map((education) => <option key={education} value={education}>{education}</option>)}
        </select>
        <button type='button' className='btn' disabled={!profile.education} onClick={() => setIntakeStep(4)} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', padding: '16px 24px', borderRadius: 12 }}>Next →</button>
      </div>
    ) },
    { q: 'Which school or university did you attend?', render: () => (
      <div style={{ display: 'grid', gap: 20 }}>
        <input type='text' value={profile.school} onChange={(e) => setProfile(p => ({ ...p, school: e.target.value }))} placeholder='Type your school name (AI will assess credential recognition)...' className='input' style={{ padding: '16px 20px', borderRadius: 12, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', fontSize: 16 }} />
        <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>AI will research your school to assess credential recognition in Canada</p>
        <button type='button' className='btn' onClick={() => setIntakeStep(5)} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', padding: '16px 24px', borderRadius: 12 }}>Next →</button>
      </div>
    ) },
    { q: 'Do you have professional certifications or licenses?', render: () => (
      <div style={{ display: 'grid', gap: 20 }}>
        <textarea className='textarea' value={profile.certs} onChange={(e) => setProfile(p => ({ ...p, certs: e.target.value }))} placeholder='List your certifications (e.g., MBBS, CA, PMP, Nursing License). AI will research these...' style={{ padding: '16px 20px', borderRadius: 12, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', fontSize: 16, minHeight: 120 }} />
        <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>AI will research your certifications for Canadian equivalency</p>
        <button type='button' className='btn' onClick={() => setIntakeStep(6)} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', padding: '16px 24px', borderRadius: 12 }}>Next →</button>
      </div>
    ) },
    { q: 'How many years of work experience do you have in your field?', render: () => (
      <div style={{ display: 'grid', gap: 20 }}>
        <input type='number' className='input' value={profile.experience} onChange={(e) => setProfile(p => ({ ...p, experience: e.target.value }))} placeholder='0' min='0' style={{ padding: '16px 20px', borderRadius: 12, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', fontSize: 16 }} />
        <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Years of experience in your specific field of work</p>
        <button type='button' className='btn' onClick={() => setIntakeStep(7)} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', padding: '16px 24px', borderRadius: 12 }}>Next →</button>
      </div>
    ) },
    { q: 'What career do you want in Canada?', render: () => (
      <div style={{ display: 'grid', gap: 20 }}>
        <input type='text' value={profile.career} onChange={(e) => setProfile(p => ({ ...p, career: e.target.value }))} placeholder='e.g., Doctor, Software Engineer, Accountant, Nurse...' className='input' style={{ padding: '16px 20px', borderRadius: 12, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', fontSize: 16 }} />
        <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>AI will research this career and find the best path for you</p>
        <button type='button' className='btn' disabled={!profile.career} onClick={() => setIntakeStep(8)} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', padding: '16px 24px', borderRadius: 12 }}>Next →</button>
      </div>
    ) },
    { q: 'What matters most to you?', render: () => (
      <div style={{ display: 'grid', gap: 16 }}>
        {[
          { id: 'fastest', label: 'Fastest Route', desc: 'Get qualified as quickly as possible', emoji: '🚀' },
          { id: 'cheapest', label: 'Cheapest Route', desc: 'Minimize costs and expenses', emoji: '💰' },
          { id: 'best_schools', label: 'Best Schools', desc: 'Attend top-ranked universities', emoji: '🏆' },
          { id: 'balanced', label: 'Balanced Path', desc: 'Good mix of time, cost, and quality', emoji: '⚖️' },
        ].map((option) => (
          <button key={option.id} type='button' className='btn-secondary' onClick={() => { setProfile(p => ({ ...p, priority: option.id })); submitIntake(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 24px', borderRadius: 16, border: '2px solid rgba(15, 118, 110, 0.1)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.borderColor = 'rgba(15, 118, 110, 0.3)'} onMouseLeave={(e) => e.target.style.borderColor = 'rgba(15, 118, 110, 0.1)'}>
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{option.emoji} {option.label}</div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{option.desc}</div>
            </div>
          </button>
        ))}
      </div>
    ) },
  ];

  const current = steps[intakeStep];

  if (!current) {
    // Questionnaire completed - redirect appropriately
    if (profileComplete) {
      navigate('myPath');
      return null;
    } else {
      navigate('home');
      return null;
    }
  }

  return (
    <div className='fade' style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ background: 'linear-gradient(135deg, #0f172a, #0f766e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>Create Your Path</h1>
        <p style={{ color: '#64748b', fontSize: 16 }}>Answer a few questions to get your personalized Canadian career roadmap</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.1), rgba(37, 99, 235, 0.1))', padding: '12px 20px', borderRadius: 20, border: '1px solid rgba(15, 118, 110, 0.2)' }}>
          <p style={{ margin: 0, color: '#0f766e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 12 }}>Step {intakeStep + 1} of {steps.length}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 320, flex: 1 }}>
          {steps.map((_, index) => (
            <div key={index} style={{ flex: 1, height: 10, borderRadius: 999, background: index <= intakeStep ? 'linear-gradient(90deg, #0f766e, #2563eb)' : 'rgba(15, 118, 110, 0.1)', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>

      <div className='card' style={{ padding: 32, background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', border: '1px solid rgba(15,118,110,0.1)', boxShadow: '0 20px 60px rgba(15,23,42,0.08)' }}>
        <h2 style={{ margin: '0 0 24px 0', color: '#0f172a', fontSize: 24 }}>{current.q}</h2>
        {current.render()}
      </div>

      {intakeStep > 0 && (
        <button type='button' className='btn-secondary' style={{ marginTop: 20, border: '2px solid rgba(15, 118, 110, 0.2)', color: '#0f766e' }} onClick={() => setIntakeStep(intakeStep - 1)}>
          ← {TT.back}
        </button>
      )}
    </div>
  );
}
