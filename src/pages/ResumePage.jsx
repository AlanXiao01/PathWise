import { useState } from 'react';

export default function ResumePage({ TT, profile, isPro, navigate }) {
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: profile.country || '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [{ title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: profile.education || '', school: profile.school || '', location: '', graduation: '' }],
    skills: [],
    certifications: profile.certs ? profile.certs.split(',').map(c => c.trim()) : []
  });

  if (!isPro) {
    return (
      <div className='fade' style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontSize: 48, margin: 0 }}>📄</p>
        <h2 style={{ margin: '18px 0 8px' }}>Premium Feature</h2>
        <p style={{ color: '#64748b' }}>Resume builder is available with premium access.</p>
        <button className='btn' onClick={() => navigate('pro')}>Upgrade to Pro</button>
      </div>
    );
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => i === index ? { ...exp, [field]: value } : exp)
    }));
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  return (
    <div className='fade'>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Resume Builder</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>Create a professional resume tailored for Canadian employers</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>
        <div style={{ display: 'grid', gap: 24 }}>
          {/* Personal Information */}
          <div className='card' style={{ padding: 28 }}>
            <h3 style={{ marginTop: 0 }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Full Name</label>
                <input className='input' value={resumeData.personal.name} onChange={(e) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, name: e.target.value } }))} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Email</label>
                <input className='input' type='email' value={resumeData.personal.email} onChange={(e) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, email: e.target.value } }))} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Phone</label>
                <input className='input' value={resumeData.personal.phone} onChange={(e) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, phone: e.target.value } }))} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748b' }}>Location</label>
                <input className='input' value={resumeData.personal.location} onChange={(e) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, location: e.target.value } }))} />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className='card' style={{ padding: 28 }}>
            <h3 style={{ marginTop: 0 }}>Professional Summary</h3>
            <textarea
              className='input'
              rows={4}
              placeholder='Write a compelling summary of your professional background and career goals...'
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
            />
          </div>

          {/* Work Experience */}
          <div className='card' style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0 }}>Work Experience</h3>
              <button className='btn-secondary' onClick={addExperience}>+ Add</button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: index < resumeData.experience.length - 1 ? 24 : 0, padding: 20, background: 'var(--surface)', borderRadius: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <input className='input' placeholder='Job Title' value={exp.title} onChange={(e) => updateExperience(index, 'title', e.target.value)} />
                  <input className='input' placeholder='Company' value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
                  <input className='input' placeholder='Start Date' value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} />
                  <input className='input' placeholder='End Date' value={exp.endDate} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} />
                </div>
                <textarea
                  className='input'
                  rows={3}
                  placeholder='Describe your responsibilities and achievements...'
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className='card' style={{ padding: 28 }}>
            <h3 style={{ marginTop: 0 }}>Skills</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <input
                className='input'
                placeholder='Add a skill...'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSkill(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {resumeData.skills.map((skill, index) => (
                <span key={index} className='chip' style={{ cursor: 'pointer' }} onClick={() => setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))}>
                  {skill} ×
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div style={{ position: 'sticky', top: 20 }}>
          <div className='card' style={{ padding: 28 }}>
            <h3 style={{ marginTop: 0 }}>Resume Preview</h3>
            <div style={{ padding: 20, background: '#fff', borderRadius: 8, fontSize: 12, lineHeight: 1.4, color: '#000', maxHeight: 600, overflow: 'auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <h2 style={{ margin: 0 }}>{resumeData.personal.name || 'Your Name'}</h2>
                <p>{resumeData.personal.email} • {resumeData.personal.phone}</p>
                <p>{resumeData.personal.location}</p>
              </div>

              {resumeData.summary && (
                <div style={{ marginBottom: 20 }}>
                  <h3>Professional Summary</h3>
                  <p>{resumeData.summary}</p>
                </div>
              )}

              {resumeData.experience.some(exp => exp.title) && (
                <div style={{ marginBottom: 20 }}>
                  <h3>Experience</h3>
                  {resumeData.experience.filter(exp => exp.title).map((exp, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <strong>{exp.title}</strong> at {exp.company}<br />
                      {exp.startDate} - {exp.endDate}<br />
                      <p style={{ margin: '4px 0' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {resumeData.skills.length > 0 && (
                <div>
                  <h3>Skills</h3>
                  <p>{resumeData.skills.join(', ')}</p>
                </div>
              )}
            </div>
            <button className='btn' style={{ width: '100%', marginTop: 16 }}>Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}