export default function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--border)', padding: 20, minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{value}</p>
      </div>
      {sub && <p style={{ fontSize: 12, color: 'var(--hint)', margin: 0 }}>{sub}</p>}
    </div>
  );
}
