import { useMemo, useState } from 'react';
import { POPULAR_CAREER_IDS, DB_CAREERS } from '../constants/databases';
import { fmt } from '../utils/helpers';

export default function ExplorePage({ TT, openCareer, isPro, profileComplete, navigate }) {
  const [q, setQ] = useState('');
  const [custom, setCustom] = useState('');
  const [searching, setSearching] = useState(false);
  const [customResults, setCustomResults] = useState([]);

  const filtered = useMemo(() => POPULAR_CAREER_IDS.map((id) => DB_CAREERS[id]).filter((career) => career.name.toLowerCase().includes(q.toLowerCase())), [q]);

  const searchCustomCareer = async () => {
    if (!custom.trim()) return;

    setSearching(true);
    try {
      const prompt = `Generate JSON career info for "${custom}" in Canada.\n\nReturn ONLY valid JSON:\n${JSON.stringify({
        id: custom.toLowerCase().replace(/\s+/g, '_'),
        name: custom,
        emoji: '🏢',
        category: 'Professional Services',
        regulated: false,
        avgSalary: 65000,
        salaryRange: '$45K-$100K',
        demandLevel: 'medium',
        timeYears: '2-4',
        jobOpenings: 5000,
        dayInLife: 'Professional work in this field involves daily tasks and responsibilities.',
        workLife: 'Standard office hours with opportunities for work-life balance.',
        careerGrowth: 'Career advancement opportunities include senior roles and specialization.',
        provinces: [
          { code: 'ON', salary: 68000 },
          { code: 'BC', salary: 70000 },
          { code: 'AB', salary: 72000 },
          { code: 'QC', salary: 65000 }
        ],
        pathways: {
          international: {
            assessment: 'Degree assessment and work experience evaluation',
            bridging: 'Professional certification if required',
            visa: 'Express Entry (Federal Skilled Worker)',
            cost: '$2,000-$8,000',
            time: '6 months-1 year'
          },
          canadian: {
            assessment: 'Relevant degree and experience',
            bridging: 'None required',
            visa: 'Canadian citizen/PR',
            cost: '$20,000-$60,000',
            time: '3-4 years'
          }
        },
        requirements: ['Relevant degree', 'Work experience', 'Professional skills'],
        employers: ['Various companies', 'Government', 'Private sector']
      })}\n\nInclude realistic Canadian data. Respond in English.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] })
      });

      const data = await response.json();
      const parsed = JSON.parse(data.content?.[0]?.text?.match(/\{[\s\S]*\}/)?.[0] || '{}');

      if (parsed && parsed.name) {
        setCustomResults([parsed]);
      } else {
        // Fallback with basic info
        setCustomResults([{
          id: custom.toLowerCase().replace(/\s+/g, '_'),
          name: custom,
          emoji: '💼',
          category: 'Professional',
          regulated: false,
          avgSalary: 60000,
          salaryRange: '$40K-$90K',
          demandLevel: 'medium',
          timeYears: '2-3',
          jobOpenings: 3000,
          dayInLife: 'Professional work in this field.',
          workLife: 'Standard professional work environment.',
          careerGrowth: 'Opportunities for advancement.',
          provinces: [
            { code: 'ON', salary: 65000 },
            { code: 'BC', salary: 67000 },
            { code: 'AB', salary: 68000 },
            { code: 'QC', salary: 62000 }
          ]
        }]);
      }
    } catch (error) {
      setCustomResults([{
        id: custom.toLowerCase().replace(/\s+/g, '_'),
        name: custom,
        emoji: '❓',
        category: 'Unknown',
        regulated: false,
        avgSalary: 50000,
        salaryRange: '$35K-$75K',
        demandLevel: 'unknown',
        timeYears: '2-4',
        jobOpenings: 1000,
        dayInLife: 'Professional work in this field.',
        workLife: 'Standard work environment.',
        careerGrowth: 'Various advancement opportunities.',
        provinces: [
          { code: 'ON', salary: 55000 },
          { code: 'BC', salary: 57000 },
          { code: 'AB', salary: 58000 },
          { code: 'QC', salary: 52000 }
        ]
      }]);
    }
    setSearching(false);
  };

  return (
    <div className='fade'>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>{TT.explore}</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>Explore career options for newcomers and professionals.</p>
      </div>

      {/* Custom Career Search */}
      <div className='card' style={{ padding: 28, marginBottom: 24 }}>
        <h3 style={{ marginTop: 0 }}>Search Any Career</h3>
        <p style={{ color: '#64748b', marginBottom: 16 }}>Enter any career or job title to get AI-generated information and pathways</p>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr auto' }}>
          <input
            type='text'
            className='input'
            placeholder='e.g., Data Scientist, UX Designer, Project Manager...'
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchCustomCareer()}
          />
          <button
            className='btn'
            onClick={searchCustomCareer}
            disabled={!custom.trim() || searching}
          >
            {searching ? '🔍' : 'Search'}
          </button>
        </div>
      </div>

      {/* Custom Results */}
      {customResults.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Search Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
            {customResults.map((career) => (
              <button key={career.id} type='button' className='card hoverable' style={{ padding: 24, textAlign: 'left', border: '1px solid rgba(15,118,110,0.08)' }} onClick={() => openCareer(career.id)}>
                <span style={{ fontSize: 30 }}>{career.emoji}</span>
                <h3 style={{ margin: '16px 0 10px' }}>{career.name}</h3>
                <p style={{ margin: 0, color: '#475569' }}>{career.category}</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                  <span className='chip'>{fmt(career.avgSalary)}</span>
                  <span className='chip'>{career.timeYears}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Careers */}
      <div style={{ marginBottom: 16 }}>
        <input type='text' className='input' placeholder={TT.searchCareer} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <p style={{ color: '#64748b', marginBottom: 14 }}>{TT.popularCareers} ({filtered.length})</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18 }}>
        {filtered.map((career) => (
          <button key={career.id} type='button' className='card hoverable' style={{ padding: 24, textAlign: 'left', border: '1px solid rgba(15,118,110,0.08)' }} onClick={() => openCareer(career.id)}>
            <span style={{ fontSize: 30 }}>{career.emoji}</span>
            <h3 style={{ margin: '16px 0 10px' }}>{career.name}</h3>
            <p style={{ margin: 0, color: '#475569' }}>{career.category}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <span className='chip'>{fmt(career.avgSalary)}</span>
              <span className='chip'>{career.timeYears}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
