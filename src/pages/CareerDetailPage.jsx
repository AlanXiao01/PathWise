import { useState } from 'react';
import { fmt } from '../utils/helpers';

export default function CareerDetailPage({ TT, career, loading, currentCareerId, researchCache }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm here to help you learn more about becoming a ${career?.name || 'professional'} in Canada. Ask me anything about this career path, requirements, job market, or how to get started!`,
      timestamp: new Date()
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  const careerData = career || researchCache?.[currentCareerId];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const sendAiMessage = async () => {
    if (!aiInput.trim() || aiTyping) return;

    const userMessage = { role: 'user', content: aiInput, timestamp: new Date() };
    setAiMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setAiTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        `That's a great question about ${careerData?.name}! Based on current Canadian job market data, here's what you need to know...`,
        `For ${careerData?.name} positions in Canada, the key requirements include...`,
        `The path to becoming a ${careerData?.name} typically involves...`,
        `Salary expectations for ${careerData?.name} roles vary by province, but generally range from...`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setAiMessages(prev => [...prev, {
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      }]);
      setAiTyping(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className='fade' style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontSize: 48 }}>🔬</p>
        <h2 style={{ margin: '18px 0 8px' }}>Loading career details...</h2>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className='fade' style={{ textAlign: 'center', padding: 60 }}>
        <p>Career not found.</p>
      </div>
    );
  }

  const detailedSections = [
    {
      id: 'overview',
      title: 'Career Overview',
      icon: '📋',
      content: `
        <h4>What is a ${careerData.name}?</h4>
        <p>${careerData.name}s are essential healthcare professionals who diagnose and treat patients, prescribe medications, and provide comprehensive medical care. They work in various settings including hospitals, clinics, private practices, and specialized medical facilities.</p>

        <h4>Key Responsibilities</h4>
        <ul>
          <li>Conducting patient examinations and assessments</li>
          <li>Diagnosing medical conditions and illnesses</li>
          <li>Prescribing appropriate treatments and medications</li>
          <li>Performing medical procedures and surgeries</li>
          <li>Maintaining detailed patient records</li>
          <li>Collaborating with other healthcare professionals</li>
          <li>Staying current with medical research and best practices</li>
        </ul>

        <h4>Work Environment</h4>
        <p>${careerData.name}s work in diverse environments including:</p>
        <ul>
          <li>Hospital emergency rooms and wards</li>
          <li>Private medical clinics and practices</li>
          <li>Specialized medical centers</li>
          <li>Research institutions</li>
          <li>Medical education facilities</li>
          <li>Telemedicine and remote care settings</li>
        </ul>
      `
    },
    {
      id: 'education',
      title: 'Education & Training Requirements',
      icon: '🎓',
      content: `
        <h4>Educational Pathway</h4>
        <p>Becoming a ${careerData.name} requires extensive education and training:</p>

        <h5>1. Undergraduate Degree (3-4 years)</h5>
        <p>Complete a bachelor's degree with prerequisite courses in biology, chemistry, physics, and mathematics. Competitive GPA (3.5+) is essential.</p>

        <h5>2. Medical School (4 years)</h5>
        <p>Attend accredited medical school. Canadian medical schools require MCAT scores and interviews. International medical graduates may need additional assessment.</p>

        <h5>3. Residency Training (2-7 years)</h5>
        <p>Complete residency in chosen specialty. Family medicine: 2 years, Surgery: 5-7 years, Specialized fields: 4-6 years.</p>

        <h5>4. Licensure & Certification</h5>
        <p>Obtain provincial medical license through Medical Council of Canada Qualifying Examination (MCCQE) and provincial licensing exams.</p>

        <h4>Canadian Medical Education</h4>
        <p>Canadian medical schools include:</p>
        <ul>
          <li>University of Toronto Faculty of Medicine</li>
          <li>McGill University Faculty of Medicine</li>
          <li>University of British Columbia Faculty of Medicine</li>
          <li>McMaster University Michael G. DeGroote School of Medicine</li>
          <li>University of Ottawa Faculty of Medicine</li>
          <li>University of Calgary Cumming School of Medicine</li>
        </ul>
      `
    },
    {
      id: 'certification',
      title: 'Certification & Licensing',
      icon: '📜',
      content: `
        <h4>Medical Council of Canada (MCC)</h4>
        <p>The MCC oversees physician certification in Canada:</p>
        <ul>
          <li>MCCQE Part I: Medical knowledge assessment</li>
          <li>MCCQE Part II: Clinical skills evaluation</li>
          <li>NAC OSCE: National Assessment Collaboration Objective Structured Clinical Examination</li>
        </ul>

        <h4>Provincial Licensing</h4>
        <p>Each province has its own medical regulatory authority:</p>
        <ul>
          <li>Ontario: College of Physicians and Surgeons of Ontario (CPSO)</li>
          <li>British Columbia: College of Physicians and Surgeons of BC (CPSBC)</li>
          <li>Alberta: College of Physicians & Surgeons of Alberta (CPSA)</li>
          <li>Quebec: Collège des médecins du Québec (CMQ)</li>
        </ul>

        <h4>Specialty Certification</h4>
        <p>For specialized practice:</p>
        <ul>
          <li>Royal College of Physicians and Surgeons of Canada (RCPSC)</li>
          <li>College of Family Physicians of Canada (CFPC)</li>
          <li>Specialty-specific certification examinations</li>
        </ul>

        <h4>Continuing Professional Development</h4>
        <p>Maintaining certification requires ongoing education:</p>
        <ul>
          <li>Annual continuing medical education credits</li>
          <li>Professional development activities</li>
          <li>Quality improvement initiatives</li>
          <li>Periodic recertification examinations</li>
        </ul>
      `
    },
    {
      id: 'job_market',
      title: 'Job Market & Opportunities',
      icon: '📊',
      content: `
        <h4>Employment Outlook</h4>
        <p>The demand for ${careerData.name}s in Canada is strong with excellent job prospects:</p>
        <ul>
          <li>Projected growth: 10-15% over next decade</li>
          <li>Annual job openings: ${careerData.jobOpenings || '8,000+'}</li>
          <li>Shortage in rural and remote communities</li>
          <li>Increasing demand in specialized fields</li>
        </ul>

        <h4>Provincial Distribution</h4>
        <p>Job opportunities vary by province:</p>
        <ul>
          <li>Ontario: Largest healthcare system, most opportunities</li>
          <li>British Columbia: Growing demand, competitive salaries</li>
          <li>Alberta: Oil & gas industry healthcare needs</li>
          <li>Atlantic Canada: Physician shortages, incentives available</li>
          <li>Northern Territories: High demand, relocation incentives</li>
        </ul>

        <h4>Practice Settings</h4>
        <ul>
          <li>Hospital-based practice</li>
          <li>Private practice and clinics</li>
          <li>Academic medical centers</li>
          <li>Community health centers</li>
          <li>Telemedicine and virtual care</li>
          <li>Research and pharmaceutical companies</li>
        </ul>

        <h4>Career Advancement</h4>
        <p>Opportunities for career progression:</p>
        <ul>
          <li>Specialization in medical subspecialties</li>
          <li>Leadership roles in healthcare administration</li>
          <li>Academic positions and medical education</li>
          <li>Research and clinical trials</li>
          <li>International medical consulting</li>
        </ul>
      `
    },
    {
      id: 'salary_compensation',
      title: 'Salary & Compensation',
      icon: '💰',
      content: `
        <h4>Average Compensation</h4>
        <p>Medical doctors in Canada earn competitive salaries:</p>
        <ul>
          <li>National average: ${fmt(careerData.avgSalary || 260000)} annually</li>
          <li>Range: ${careerData.salaryRange || '$180K-$380K'}</li>
          <li>Family physicians: $200K-$300K</li>
          <li>Specialists: $300K-$500K+</li>
          <li>Surgeons: $400K-$600K+</li>
        </ul>

        <h4>Provincial Variations</h4>
        <p>Salaries vary significantly by province:</p>
        ${careerData.provinces?.map(prov => `<li>${prov.code}: ${fmt(prov.salary)} annually</li>`).join('') || '<li>Ontario: $280K-$350K</li><li>British Columbia: $250K-$320K</li><li>Alberta: $270K-$340K</li>'}

        <h4>Additional Compensation</h4>
        <ul>
          <li>Benefits packages (health, dental, vision)</li>
          <li>Professional liability insurance</li>
          <li>Continuing education allowances</li>
          <li>Retirement savings plans</li>
          <li>Paid vacation and leave</li>
          <li>Relocation assistance for rural positions</li>
        </ul>

        <h4>Incentive Programs</h4>
        <p>Government incentives for physicians:</p>
        <ul>
          <li>Rural practice incentives: $50K-$100K bonuses</li>
          <li>Northern and remote location premiums</li>
          <li>Return of service agreements</li>
          <li>Loan forgiveness programs</li>
          <li>Tax benefits for relocation</li>
        </ul>
      `
    },
    {
      id: 'work_life_balance',
      title: 'Work-Life Balance & Lifestyle',
      icon: '⚖️',
      content: `
        <h4>Typical Work Schedule</h4>
        <p>Physician work schedules vary by specialty and practice setting:</p>
        <ul>
          <li>Hospital-based: 40-80 hours/week, including nights/weekends</li>
          <li>Clinic-based: 35-50 hours/week, Monday-Friday</li>
          <li>On-call requirements: 1-2 weeks/month</li>
          <li>Emergency medicine: Shift-based, 8-12 hour shifts</li>
          <li>Private practice: More flexible scheduling</li>
        </ul>

        <h4>Work-Life Balance Factors</h4>
        <ul>
          <li>High-stress environment with life-critical decisions</li>
          <li>Emotional demands of patient care</li>
          <li>Administrative and paperwork burden</li>
          <li>On-call responsibilities affecting personal time</li>
          <li>Continuing education requirements</li>
        </ul>

        <h4>Benefits of Medical Career</h4>
        <ul>
          <li>Intellectually stimulating and challenging work</li>
          <li>Direct positive impact on patients' lives</li>
          <li>Respect and trust from community</li>
          <li>Financial security and stability</li>
          <li>Opportunities for research and teaching</li>
          <li>International mobility and recognition</li>
        </ul>

        <h4>Managing Work-Life Balance</h4>
        <ul>
          <li>Setting boundaries and prioritizing self-care</li>
          <li>Building support networks with colleagues</li>
          <li>Utilizing vacation time and mental health resources</li>
          <li>Participating in wellness programs</li>
          <li>Seeking work-life balance in practice choices</li>
        </ul>
      `
    },
    {
      id: 'challenges',
      title: 'Challenges & Considerations',
      icon: '⚠️',
      content: `
        <h4>Professional Challenges</h4>
        <ul>
          <li>High-stress environment with life-critical decisions</li>
          <li>Emotional toll of patient suffering and loss</li>
          <li>Administrative burden and paperwork</li>
          <li>Keeping up with rapidly advancing medical knowledge</li>
          <li>Managing patient expectations and difficult conversations</li>
          <li>Dealing with medical malpractice concerns</li>
          <li>Workplace violence and safety concerns</li>
        </ul>

        <h4>Educational Challenges</h4>
        <ul>
          <li>Lengthy and expensive education pathway</li>
          <li>Highly competitive admissions process</li>
          <li>Rigorous residency training requirements</li>
          <li>Balancing education with personal life</li>
          <li>Student debt accumulation</li>
          <li>Pressure to excel academically</li>
        </ul>

        <h4>Career Challenges</h4>
        <ul>
          <li>Physician burnout and mental health concerns</li>
          <li>Workplace stress and long hours</li>
          <li>Balancing clinical work with administrative duties</li>
          <li>Keeping current with medical advancements</li>
          <li>Managing electronic health records</li>
          <li>Navigating healthcare system changes</li>
        </ul>

        <h4>Immigration Challenges for IMGs</h4>
        <ul>
          <li>Credential recognition and assessment</li>
          <li>English/French language proficiency requirements</li>
          <li>Additional licensing examinations</li>
          <li>Adapting to Canadian healthcare system</li>
          <li>Cultural and practice differences</li>
          <li>Family relocation and integration</li>
        </ul>
      `
    },
    {
      id: 'immigration_path',
      title: 'Immigration Pathway for Doctors',
      icon: '✈️',
      content: `
        <h4>Express Entry System</h4>
        <p>Most international medical graduates use Express Entry:</p>
        <ul>
          <li>Federal Skilled Worker Program</li>
          <li>Federal Skilled Trades Program</li>
          <li>Canadian Experience Class</li>
          <li>Provincial Nominee Programs</li>
        </ul>

        <h4>Medical Occupation Codes</h4>
        <ul>
          <li>NOC 31100 - Family physicians</li>
          <li>NOC 31101 - Specialists</li>
          <li>NOC 31102 - General practitioners</li>
        </ul>

        <h4>Credential Assessment</h4>
        <p>Medical Council of Canada (MCC) evaluates international credentials:</p>
        <ul>
          <li>Document review and verification</li>
          <li>Educational credential assessment</li>
          <li>Language proficiency testing</li>
          <li>Clinical skills assessment</li>
        </ul>

        <h4>Licensing Process</h4>
        <ol>
          <li>Complete MCC evaluating examinations</li>
          <li>Obtain provincial licensure</li>
          <li>Complete supervised practice requirements</li>
          <li>Apply for permanent residency</li>
        </ol>

        <h4>Provincial Programs</h4>
        <ul>
          <li>Ontario Immigrant Nominee Program (OINP)</li>
          <li>British Columbia Provincial Nominee Program</li>
          <li>Alberta Immigrant Nominee Program</li>
          <li>Quebec Skilled Worker Program</li>
        </ul>

        <h4>Timeline Expectations</h4>
        <ul>
          <li>Credential assessment: 3-6 months</li>
          <li>Licensing process: 1-2 years</li>
          <li>Express Entry processing: 6-12 months</li>
          <li>Total pathway: 2-4 years</li>
        </ul>
      `
    }
  ];

  return (
    <div className='fade'>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 24 }}>
        <span style={{ fontSize: 40 }}>{careerData.emoji}</span>
        <div>
          <h1 style={{ margin: 0 }}>{careerData.name}</h1>
          <p style={{ color: '#64748b', marginTop: 8 }}>{careerData.category}</p>
        </div>
      </div>

      {/* Key Stats */}
      <div className='grid-4 card-grid' style={{ marginBottom: 32 }}>
        <div style={{ padding: 24, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>{TT.avgSalary}</p>
          <p style={{ margin: '12px 0 0', fontSize: 24, fontWeight: 700 }}>{fmt(careerData.avgSalary)}</p>
        </div>
        <div style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>{TT.timeToQualify}</p>
          <p style={{ margin: '12px 0 0', fontSize: 24, fontWeight: 700 }}>{careerData.timeYears}</p>
        </div>
        <div style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>{TT.demand}</p>
          <p style={{ margin: '12px 0 0', fontSize: 24, fontWeight: 700 }}>{TT[careerData.demandLevel] || 'High'}</p>
        </div>
        <div style={{ padding: 24, borderRadius: 24, border: '1px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Jobs/year</p>
          <p style={{ margin: '12px 0 0', fontSize: 24, fontWeight: 700 }}>{careerData.jobOpenings?.toLocaleString() || '8,000'}</p>
        </div>
      </div>

      {/* Expandable Sections */}
      <div style={{ marginBottom: 32 }}>
        {detailedSections.map((section) => (
          <div key={section.id} className='card' style={{ marginBottom: 16, borderRadius: 16 }}>
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: '100%',
                padding: '24px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 18,
                fontWeight: 600
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{section.icon}</span>
                <span>{section.title}</span>
              </div>
              <span style={{ fontSize: 20, transition: 'transform 0.3s' }}>
                {expandedSections[section.id] ? '−' : '+'}
              </span>
            </button>

            {expandedSections[section.id] && (
              <div
                style={{ padding: '0 24px 24px 60px' }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </div>
        ))}
      </div>

      {/* AI Chat Section */}
      <div className='card' style={{ padding: 28, marginBottom: 24 }}>
        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          AI Career Assistant
        </h3>
        <p style={{ color: '#64748b', marginBottom: 20 }}>
          Ask specific questions about becoming a {careerData.name} in Canada
        </p>

        <div style={{ height: 300, overflowY: 'auto', marginBottom: 16, padding: 16, background: 'var(--surface)', borderRadius: 12 }}>
          {aiMessages.map((msg, idx) => (
            <div key={idx} style={{
              marginBottom: 16,
              padding: 12,
              borderRadius: 12,
              background: msg.role === 'user' ? 'var(--accent)' : 'rgba(248,250,252,0.8)',
              color: msg.role === 'user' ? '#fff' : 'var(--text)',
              marginLeft: msg.role === 'user' ? 'auto' : 0,
              marginRight: msg.role === 'user' ? 0 : 'auto',
              maxWidth: '80%'
            }}>
              {msg.content}
            </div>
          ))}
          {aiTyping && (
            <div style={{ padding: 12, color: '#64748b' }}>
              AI is thinking...
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <input
            type='text'
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
            placeholder={`Ask about ${careerData.name} requirements, salaries, or job market...`}
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)' }}
          />
          <button
            onClick={sendAiMessage}
            disabled={!aiInput.trim() || aiTyping}
            className='btn'
            style={{ padding: '12px 20px' }}
          >
            Ask AI
          </button>
        </div>
      </div>

      {/* Provincial Salaries */}
      {careerData.provinces?.length > 0 && (
        <div className='card' style={{ padding: 28 }}>
          <h3 style={{ marginTop: 0 }}>{TT.salaries}</h3>
          <div style={{ display: 'grid', gap: 14, marginTop: 16 }}>
            {careerData.provinces.map((prov) => {
              const max = Math.max(...careerData.provinces.map((item) => item.salary));
              return (
                <div key={prov.code} style={{ display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{prov.code}</span>
                    <span>{fmt(prov.salary)}</span>
                  </div>
                  <div className='progress-bar'>
                    <div className='progress-fill' style={{ width: `${(prov.salary / max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
