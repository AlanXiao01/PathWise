import StatCard from '../components/Common/StatCard';
import { fmt } from '../utils/helpers';

export default function MyPathPage({ TT, currentPath, profile, completedSteps, setCompletedSteps, navigate, setIntakeStep }) {
  if (!currentPath) {
    return (
      <div className='fade'>
        <div className='card' style={{ textAlign: 'center', padding: 50 }}>
          <p style={{ fontSize: 52, margin: 0 }}>🧭</p>
          <h2 style={{ margin: '18px 0 10px' }}>{TT.noPath}</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>{TT.noProfile}</p>
          <button className='btn' onClick={() => { setIntakeStep(0); navigate('intake'); }}>{TT.createPath}</button>
        </div>
      </div>
    );
  }

  const toggleStep = (index) => setCompletedSteps(prev => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]);
  const path = currentPath.recommendedPath || {};

  return (
    <div className='fade'>
      <div style={{ marginBottom: 22 }}>
        <p style={{ margin: 0, color: '#0f766e', textTransform: 'uppercase', fontSize: 12 }}>{TT.yourPath}</p>
        <h2 style={{ margin: '10px 0 0' }}>{path.name}</h2>
      </div>

      <div className='card card-strong' style={{ padding: 28, marginBottom: 22 }}>
        <p style={{ fontSize: 16, marginBottom: 8, color: '#475569' }}>{path.whyThisPath}</p>
      </div>

      <div className='grid-4 card-grid' style={{ marginBottom: 22 }}>
        <StatCard label={TT.totalTime} value={`${path.totalYears}y`} />
        <StatCard label={TT.totalCost} value={fmt(path.totalCostLow)} sub={`to ${fmt(path.totalCostHigh)}`} />
        <StatCard label={TT.difficulty} value={path.difficulty} />
        <StatCard label={TT.avgSalary} value={fmt(currentPath.avgSalary)} sub={currentPath.salaryRange} />
      </div>

      <div className='card' style={{ padding: 28, marginBottom: 22 }}>
        <h3 style={{ margin: 0 }}>{TT.steps}</h3>
        <div style={{ display: 'grid', gap: 18, marginTop: 20 }}>
          {path.steps?.map((step, index) => {
            const done = completedSteps.includes(index);
            return (
              <div key={index} style={{ display: 'grid', gap: 12, padding: 24, borderRadius: 24, background: done ? 'rgba(34,197,94,0.08)' : 'rgba(240,249,255,0.9)', border: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, textDecoration: done ? 'line-through' : 'none' }}>{step.title}</div>
                  <p style={{ margin: '8px 0 0', color: '#64748b' }}>{step.description}</p>
                </div>
                {step.details && <p style={{ margin: 0, color: '#475569', fontSize: 13 }}>{step.details}</p>}
                <button className='btn-secondary' onClick={() => toggleStep(index)}>{done ? TT.markUndone : TT.markDone}</button>
              </div>
            );
          })}
        </div>
      </div>

      {currentPath.provinces?.length > 0 && (
        <div className='card' style={{ padding: 28 }}>
          <h3 style={{ marginTop: 0 }}>{TT.salaries}</h3>
          <div style={{ display: 'grid', gap: 14, marginTop: 18 }}>
            {currentPath.provinces.map((prov) => {
              const max = Math.max(...currentPath.provinces.map((item) => item.salary));
              return (
                <div key={prov.code} style={{ display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700 }}>{prov.code}</span>
                    <span>{fmt(prov.salary)}</span>
                  </div>
                  <div className='progress-bar'><div className='progress-fill' style={{ width: `${(prov.salary / max) * 100}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
