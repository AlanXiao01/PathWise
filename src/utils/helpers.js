export const fmt = (n) => {
  if (n === undefined || n === null) return '—';
  return '$' + Math.round(n).toLocaleString();
};

export const genCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const cleanAI = (text) => {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^[-*]\s+/gm, '• ')
    .trim();
};

export const parseJSON = (text) => {
  try {
    const m = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[1] || m[0]) : null;
  } catch {
    return null;
  }
};
