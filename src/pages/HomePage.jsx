import StatCard from '../components/Common/StatCard';
import { POPULAR_CAREER_IDS, DB_CAREERS } from '../constants/databases';
import { fmt } from '../utils/helpers';

export default function HomePage({ TT, profile, profileComplete, navigate, setIntakeStep, activity, currentPath, isPro }) {
  return (
    <div className='fade'>
      <section style={{ marginBottom: 30, background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.05), rgba(15, 23, 42, 0.02))', borderRadius: 24, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ margin: 0, color: '#0f766e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 12, background: 'linear-gradient(90deg, #0f766e, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✨ Welcome to</p>
            <h1 className='section-title' style={{ background: 'linear-gradient(135deg, #0f172a, #0f766e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{TT.tagline}</h1>
            <p className='section-subtitle' style={{ marginTop: 18, color: '#475569', fontSize: 17, lineHeight: 1.7 }}>{TT.subtitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <button className='btn' onClick={() => { setIntakeStep(0); navigate('intake'); }} style={{ background: 'linear-gradient(135deg, #0f766e, #2563eb)', boxShadow: '0 8px 32px rgba(15, 118, 110, 0.3)' }}>
                🚀 {TT.getStarted}
              </button>
              <button className='btn-secondary' onClick={() => navigate('explore')} style={{ border: '2px solid rgba(15, 118, 110, 0.2)', color: '#0f766e' }}>
                🔍 {TT.explore}
              </button>
              <button className='btn-secondary' onClick={() => navigate('chat')} style={{ border: '2px solid rgba(15, 118, 110, 0.2)', color: '#0f766e' }}>
                💬 {TT.chat}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='card card-grid grid-3' style={{ padding: 32, marginBottom: 32, background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', border: '1px solid rgba(15,118,110,0.1)', boxShadow: '0 20px 60px rgba(15,23,42,0.08)' }}>
        {[
          { icon: '🧭', title: 'Personalized Roadmaps', description: 'Custom career paths tailored to your background and goals.', color: '#0f766e' },
          { icon: '⚖️', title: 'Regulatory Clarity', description: 'Navigate Canadian immigration and licensing requirements.', color: '#2563eb' },
          { icon: '💡', title: 'Smart Pathways', description: 'Compare multiple routes to find your optimal career journey.', color: '#dc2626' },
        ].map((item) => (
          <div key={item.title} style={{ padding: 28, minHeight: 200, borderRadius: 20, background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', border: '1px solid rgba(15,118,110,0.08)', transition: 'all 0.3s ease', cursor: 'pointer' }} className='hoverable' onClick={() => navigate('explore')}>
            <p style={{ margin: 0, fontSize: 36, textAlign: 'center', marginBottom: 16 }}>{item.icon}</p>
            <h3 style={{ marginTop: 0, marginBottom: 14, textAlign: 'center', color: item.color, fontSize: 18 }}>{item.title}</h3>
            <p style={{ color: '#64748b', lineHeight: 1.7, textAlign: 'center', margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </section>

      {profileComplete && currentPath ? (
        <section className='card' style={{ padding: 28, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: '0 0 6px' }}>Your path</h2>
              <p style={{ color: '#64748b' }}>{currentPath.recommendedPath?.name}</p>
            </div>
            <button className='btn' onClick={() => navigate('myPath')}>View details</button>
          </div>
        </section>
      ) : profileComplete ? (
        <section className='card card-strong' style={{ padding: 28, marginBottom: 28 }}>
          <h2 style={{ margin: 0 }}>No path yet</h2>
          <p style={{ color: '#475569', marginTop: 12 }}>Complete the intake to generate your personalized pathway.</p>
        </section>
      ) : null}

      <section className='card' style={{ padding: 32, background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.8))', border: '1px solid rgba(15,118,110,0.1)', boxShadow: '0 20px 60px rgba(15,23,42,0.08)' }}>
        <h2 style={{ margin: 0, textAlign: 'center', background: 'linear-gradient(135deg, #0f172a, #0f766e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 24 }}>Popular Canadian Careers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 24 }}>
          {POPULAR_CAREER_IDS.slice(0, 6).map((id) => {
            const career = DB_CAREERS[id];
            return (
              <button key={id} type='button' className='card hoverable' style={{ textAlign: 'left', padding: 24, borderRadius: 16, background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', border: '1px solid rgba(15,118,110,0.08)', transition: 'all 0.3s ease' }} onClick={() => navigate('explore')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 32, margin: 0 }}>{career.emoji}</p>
                  <div>
                    <h3 style={{ margin: 0, marginBottom: 4, color: '#0f172a' }}>{career.name}</h3>
                    <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>{career.category}</p>
                  </div>
                </div>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{career.description?.slice(0, 100)}...</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
