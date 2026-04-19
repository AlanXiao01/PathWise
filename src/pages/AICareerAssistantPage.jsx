import { useState, useRef, useEffect } from 'react';

export default function AICareerAssistantPage({ TT, profile, isPro, navigate }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm your AI Career Assistant. I can help you with:

• Career planning and advice
• Job search strategies
• Interview preparation
• Resume and cover letter review
• Salary negotiation tips
• Canadian workplace culture
• Professional development

What would you like help with today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isPro) {
    return (
      <div className='fade' style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontSize: 48, margin: 0 }}>🤖</p>
        <h2 style={{ margin: '18px 0 8px' }}>Premium Feature</h2>
        <p style={{ color: '#64748b' }}>AI Career Assistant is available with premium access.</p>
        <button className='btn' onClick={() => navigate('pro')}>Upgrade to Pro</button>
      </div>
    );
  }

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const context = profile ? `
User Profile:
- Type: ${profile.userType}
- From: ${profile.country}
- Education: ${profile.education}
- Experience: ${profile.experience} years
- Target Career: ${profile.career}
- Priority: ${profile.priority}
      ` : '';

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are an expert AI Career Assistant specializing in Canadian careers. Be helpful, encouraging, and provide practical advice. Focus on Canadian job market, immigration, and professional development. Keep responses concise but comprehensive. ${context}`,
          messages: [
            ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input }
          ]
        })
      });

      const data = await response.json();
      const aiResponse = data.content?.[0]?.text || 'Sorry, I could not generate a response. Please try again.';

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.',
        timestamp: new Date()
      }]);
    }

    setIsTyping(false);
  };

  const quickQuestions = [
    'How do I prepare for Canadian job interviews?',
    'What are the best job search sites in Canada?',
    'How much should I expect to earn in my field?',
    'What certifications should I get for my career?',
    'How do I network effectively in Canada?'
  ];

  return (
    <div className='fade' style={{ display: 'grid', gap: 20, minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>AI Career Assistant</h1>
          <p style={{ color: '#64748b', marginTop: 10 }}>Get personalized career advice and guidance</p>
        </div>
        <button className='btn-secondary' onClick={() => setMessages([messages[0]])}>Clear Chat</button>
      </div>

      {/* Quick Questions */}
      <div className='card' style={{ padding: 20 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Quick Questions:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className='btn-secondary'
              style={{ fontSize: 12, padding: '6px 12px' }}
              onClick={() => setInput(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ padding: 24, background: 'var(--surface)', borderRadius: 28, border: '1px solid var(--border)', minHeight: 500, display: 'grid', gap: 16 }}>
        {messages.map((message, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%',
              padding: 16,
              borderRadius: 20,
              background: message.role === 'user' ? 'var(--accent)' : 'var(--card)',
              color: message.role === 'user' ? '#fff' : 'var(--text)',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5
            }}>
              {message.content}
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 8 }}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: 16, borderRadius: 20, background: 'var(--card)' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr auto' }}>
        <input
          type='text'
          className='input'
          placeholder='Ask me anything about your career...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          disabled={isTyping}
        />
        <button
          className='btn'
          onClick={sendMessage}
          disabled={!input.trim() || isTyping}
        >
          {isTyping ? '...' : 'Send'}
        </button>
      </div>

      {/* Profile Context */}
      {profile && (
        <div className='card' style={{ padding: 20 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Your Profile Context:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#64748b' }}>
            <span>📍 {profile.country}</span>
            <span>🎓 {profile.education}</span>
            <span>💼 {profile.experience}y experience</span>
            <span>🎯 {profile.career}</span>
          </div>
        </div>
      )}
    </div>
  );
}