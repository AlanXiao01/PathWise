export default function Toast({ toast }) {
  const bg = toast.type === 'err' ? 'var(--red)' : toast.type === 'ok' ? 'var(--accent)' : 'var(--blue)';
  return (
    <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: bg, color: '#fff', padding: '14px 18px', borderRadius: 18, boxShadow: '0 24px 60px rgba(15,23,42,0.16)', fontSize: 13, minWidth: 240, maxWidth: 320 }}>
      {toast.msg}
    </div>
  );
}
