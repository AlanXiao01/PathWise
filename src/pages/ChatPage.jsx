export default function ChatPage({ TT, chatMsgs, chatInput, setChatInput, chatBusy, sendChat, chatEndRef, setChatMsgs }) {
  return (
    <div className='fade' style={{ display: 'grid', gap: 20, minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>{TT.chat}</h1>
          <p style={{ color: '#64748b', marginTop: 10 }}>Ask questions about careers in Canada</p>
        </div>
        {chatMsgs.length > 0 && <button className='btn-secondary' type='button' onClick={() => setChatMsgs([])}>Clear</button>}
      </div>

      <div style={{ padding: 24, background: 'var(--surface)', borderRadius: 28, border: '1px solid var(--border)', minHeight: 420, display: 'grid', gap: 14 }}>
        {chatMsgs.length === 0 ? (
          <div style={{ display: 'grid', gap: 12, placeItems: 'center', padding: 40, color: '#64748b' }}>
            <p style={{ fontSize: 48, margin: 0 }}>✨</p>
            <p style={{ textAlign: 'center', maxWidth: 560 }}>What would you like to know about careers in Canada?</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {chatMsgs.map((message, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '78%', padding: 18, borderRadius: 24, background: message.role === 'user' ? 'var(--accent)' : 'var(--surface)', color: message.role === 'user' ? '#fff' : 'var(--text)' }}>
                  {message.text}
                </div>
              </div>
            ))}
            {chatBusy && <div style={{ display: 'flex' }}><div style={{ padding: 18, borderRadius: 24, background: 'var(--surface)' }}>{TT.thinking}</div></div>}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr auto' }}>
        <input type='text' className='input' placeholder={TT.aiPlaceholder} value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChat()} />
        <button className='btn' type='button' disabled={chatBusy || !chatInput.trim()} onClick={() => sendChat()}>{TT.send}</button>
      </div>
    </div>
  );
}
