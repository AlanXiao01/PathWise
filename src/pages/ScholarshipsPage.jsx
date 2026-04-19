import { useState, useEffect } from 'react';

export default function ScholarshipsPage({ TT, profile, isPro, navigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPro) {
      loadScholarships();
    }
  }, [isPro]);

  const loadScholarships = async () => {
    setLoading(true);
    // Mock scholarship data - in real app this would come from an API
    const mockScholarships = [
      {
        id: 1,
        name: 'Ontario Graduate Scholarship',
        amount: '$15,000',
        deadline: '2024-12-01',
        eligibility: 'Graduate students in Ontario universities',
        field: 'All fields',
        level: 'Masters/PhD',
        provider: 'Ontario Government'
      },
      {
        id: 2,
        name: 'Vanier Canada Graduate Scholarship',
        amount: '$50,000/year',
        deadline: '2024-11-01',
        eligibility: 'International PhD students',
        field: 'All fields',
        level: 'PhD',
        provider: 'Canadian Government'
      },
      {
        id: 3,
        name: 'Trudeau Foundation Scholarship',
        amount: '$60,000/year',
        deadline: '2024-12-15',
        eligibility: 'Social sciences and humanities PhD students',
        field: 'Social Sciences',
        level: 'PhD',
        provider: 'Pierre Elliott Trudeau Foundation'
      },
      {
        id: 4,
        name: 'NSERC Postgraduate Scholarship',
        amount: '$21,000/year',
        deadline: '2024-10-15',
        eligibility: 'Science and engineering graduate students',
        field: 'STEM',
        level: 'Masters/PhD',
        provider: 'Natural Sciences and Engineering Research Council'
      },
      {
        id: 5,
        name: 'University of Toronto International Scholarship',
        amount: '$20,000-$30,000',
        deadline: '2024-11-30',
        eligibility: 'International undergraduate students',
        field: 'All fields',
        level: 'Undergraduate',
        provider: 'University of Toronto'
      }
    ];
    setTimeout(() => {
      setScholarships(mockScholarships);
      setLoading(false);
    }, 1000);
  };

  if (!isPro) {
    return (
      <div className='fade' style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontSize: 48, margin: 0 }}>🎓</p>
        <h2 style={{ margin: '18px 0 8px' }}>Premium Feature</h2>
        <p style={{ color: '#64748b' }}>Scholarship finder is available with premium access.</p>
        <button className='btn' onClick={() => navigate('pro')}>Upgrade to Pro</button>
      </div>
    );
  }

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='fade'>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Scholarship Finder</h1>
        <p style={{ color: '#64748b', marginTop: 10 }}>Find scholarships and funding opportunities in Canada</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <input
          type='text'
          className='input'
          placeholder='Search scholarships by name, field, or provider...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p>🔍 Searching for scholarships...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredScholarships.map((scholarship) => (
            <div key={scholarship.id} className='card' style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0 }}>{scholarship.name}</h3>
                  <p style={{ color: '#64748b', margin: '4px 0' }}>by {scholarship.provider}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{scholarship.amount}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Field</p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{scholarship.field}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Level</p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{scholarship.level}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: '#64748b' }}>Eligibility</p>
                  <p style={{ margin: '4px 0 0', fontSize: 14 }}>{scholarship.eligibility}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button className='btn'>Apply Now</button>
                <button className='btn-secondary'>Save for Later</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredScholarships.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ color: '#64748b' }}>No scholarships found matching your search.</p>
        </div>
      )}

      <div className='card' style={{ padding: 28, marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>Scholarship Tips</h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#475569' }}>
          <li>Apply early - many scholarships have deadlines months in advance</li>
          <li>Check eligibility requirements carefully</li>
          <li>Prepare strong application materials (essays, references, transcripts)</li>
          <li>Look for scholarships specific to your field of study</li>
          <li>Consider provincial scholarships in addition to federal ones</li>
        </ul>
      </div>
    </div>
  );
}