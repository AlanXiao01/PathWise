import { useState } from 'react';

export default function VisaPage({ TT, profile, isPro, navigate }) {
  const [expandedGuides, setExpandedGuides] = useState({});

  if (!isPro) {
    return (
      <div className='fade' style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontSize: 48, margin: 0 }}>🔒</p>
        <h2 style={{ margin: '18px 0 8px' }}>Premium Feature</h2>
        <p style={{ color: '#64748b' }}>Visa guidance is available with premium access.</p>
        <button className='btn' onClick={() => navigate('pro')}>Upgrade to Pro</button>
      </div>
    );
  }

  const toggleGuide = (visaName) => {
    setExpandedGuides(prev => ({ ...prev, [visaName]: !prev[visaName] }));
  };

  const visaTypes = [
    {
      name: 'Express Entry',
      description: 'Points-tested system for skilled workers',
      requirements: ['Education', 'Work experience', 'Language skills', 'Job offer (optional)'],
      processingTime: '6 months - 2 years',
      cost: '$1,325 CAD',
      suitable: profile.userType === 'immigrant' || profile.userType === 'career_changer',
      detailedGuide: `<h4>How Express Entry Works</h4><p>Express Entry is Canada's primary system for skilled worker immigration. It uses a points-based system to rank candidates and invite them to apply for permanent residency.</p><h4>Step-by-Step Process</h4><ol><li><strong>Create Express Entry Profile:</strong> Submit your information to the Express Entry system</li><li><strong>Enter Express Entry Pool:</strong> Your profile is ranked using the Comprehensive Ranking System (CRS)</li><li><strong>Receive Invitation to Apply (ITA):</strong> If your score is high enough, you'll receive an ITA</li><li><strong>Submit Application:</strong> Apply for permanent residency within 60 days</li><li><strong>Medical & Security Checks:</strong> Complete required background checks</li><li><strong>Receive Permanent Residency:</strong> Welcome to Canada!</li></ol><h4>Processing Times</h4><ul><li>Profile creation: Immediate</li><li>ITA wait time: 6 months to several years (depends on CRS score)</li><li>Application processing: 6 months</li><li>Total timeline: 1-3 years</li></ul><h4>Tips for Success</h4><ul><li>Improve your CRS score through language training or education</li><li>Consider provincial nomination for 50 extra points</li><li>Get a job offer in Canada for significant points boost</li></ul>`
    },
    {
      name: 'Provincial Nominee Program',
      description: 'Province-specific pathways for skilled workers',
      requirements: ['Meet provincial criteria', 'Job offer', 'Settlement plan'],
      processingTime: '1-2 years',
      cost: '$1,050 CAD',
      suitable: true,
      detailedGuide: `<h4>What is the Provincial Nominee Program (PNP)?</h4><p>The PNP allows Canadian provinces to nominate individuals to immigrate to Canada. Each province has its own PNP with specific requirements and criteria.</p><h4>How PNP Works</h4><ol><li><strong>Choose a Province:</strong> Research provinces that match your skills and interests</li><li><strong>Check Eligibility:</strong> Review specific PNP requirements for your chosen province</li><li><strong>Express Entry Profile:</strong> Create or update your Express Entry profile</li><li><strong>Apply to PNP:</strong> Submit application to the provincial nominee program</li><li><strong>Receive Nomination:</strong> If approved, you'll get a provincial nomination</li></ol><h4>PNP Benefits</h4><ul><li><strong>600 CRS Points:</strong> Provincial nomination gives you 600 CRS points</li><li><strong>Guaranteed ITA:</strong> Nomination guarantees Invitation to Apply</li><li><strong>Faster Processing:</strong> Shorter processing times than base Express Entry</li></ul>`
    },
    {
      name: 'Study Permit',
      description: 'For international students',
      requirements: ['University acceptance', 'Financial proof', 'Medical exam'],
      processingTime: '2-8 weeks',
      cost: '$150 CAD',
      suitable: profile.userType === 'student',
      detailedGuide: `<h4>What is a Study Permit?</h4><p>A study permit allows foreign nationals to study at designated learning institutions in Canada.</p><h4>Eligibility Requirements</h4><ul><li><strong>Acceptance Letter:</strong> From a designated learning institution (DLI)</li><li><strong>Financial Proof:</strong> Demonstrate ability to pay for tuition and living expenses</li><li><strong>No Criminal Record:</strong> Clean police certificate</li><li><strong>Medical Fitness:</strong> Pass medical examination if required</li></ul><h4>Financial Requirements</h4><ul><li><strong>Tuition Fees:</strong> Pay first year tuition</li><li><strong>Living Expenses:</strong> $10,000-12,000 CAD per year (outside Quebec)</li><li><strong>Quebec Residents:</strong> $11,000-13,000 CAD per year</li></ul><h4>Work While Studying</h4><ul><li><strong>On-Campus Work:</strong> Allowed without work permit</li><li><strong>Off-Campus Work:</strong> Allowed with Social Insurance Number</li></ul>`
    },
    {
      name: 'Work Permit',
      description: 'Temporary work authorization',
      requirements: ['Job offer', 'LMIA (sometimes)', 'Qualifications'],
      processingTime: '2-8 weeks',
      cost: '$155 CAD',
      suitable: true,
      detailedGuide: `<h4>What is a Work Permit?</h4><p>A work permit allows foreign workers to work legally in Canada for a specific employer, in a specific occupation.</p><h4>Types of Work Permits</h4><ul><li><strong>Employer-Specific Work Permit:</strong> Most common type requiring Labor Market Impact Assessment</li><li><strong>International Mobility Program:</strong> For multinational company transfers</li><li><strong>Open Work Permit:</strong> Can work for any employer</li></ul><h4>Eligibility Requirements</h4><ul><li><strong>Job Offer:</strong> Valid offer from eligible Canadian employer</li><li><strong>Qualifications:</strong> Meet job requirements</li><li><strong>Language:</strong> Sufficient language ability for the job</li></ul><h4>Path to Permanent Residency</h4><ul><li>Work experience in Canada earns CRS points</li><li>Provincial programs have work permit to PR streams</li></ul>`
    }
  ];

  return (
    <div className='fade'>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Visa Guidance</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>Personalized visa pathways based on your profile</p>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {visaTypes.filter(visa => visa.suitable).map((visa) => (
          <div key={visa.name} className='card' style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0 }}>{visa.name}</h3>
                <p style={{ color: '#64748b', margin: '8px 0' }}>{visa.description}</p>
              </div>
              <span style={{ fontSize: 24 }}>{profile.userType === 'student' && visa.name === 'Study Permit' ? '🎓' : '📋'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Processing Time</p>
                <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{visa.processingTime}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Cost</p>
                <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{visa.cost}</p>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Requirements:</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {visa.requirements.map((req, i) => (
                  <li key={i} style={{ color: '#475569', marginBottom: 4 }}>{req}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => toggleGuide(visa.name)}
              className='btn'
              style={{ width: '100%', marginBottom: expandedGuides[visa.name] ? 20 : 0 }}
            >
              {expandedGuides[visa.name] ? 'Hide Detailed Guide' : 'Get Detailed Guide'}
            </button>

            {expandedGuides[visa.name] && (
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: 20,
                  maxHeight: '600px',
                  overflowY: 'auto'
                }}
                dangerouslySetInnerHTML={{ __html: visa.detailedGuide }}
              />
            )}
          </div>
        ))}
      </div>

      <div className='card' style={{ padding: 28, marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>Assessment Based on Your Profile</h3>
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 12 }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Your Type: {profile.userType}</p>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Recommended: Express Entry + Provincial Nominee</p>
          </div>
          <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 12 }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Your Country: {profile.country}</p>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Processing time may vary by country</p>
          </div>
          <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 12 }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Your Education: {profile.education}</p>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Eligible for Express Entry points</p>
          </div>
        </div>
      </div>
    </div>
  );
}