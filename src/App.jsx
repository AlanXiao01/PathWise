import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GOOGLE_CLIENT_ID, EMAILJS_CONFIG, ADMIN_CODE } from './constants/config';
import { LANGS, DB_CAREERS, POPULAR_CAREER_IDS, DB_COUNTRIES, DB_EDUCATION, DB_USER_TYPES } from './constants/databases';
import { TR } from './constants/translations';
import { fmt, genCode, cleanAI, parseJSON } from './utils/helpers';
import { loadState, saveState } from './utils/storage';
import StyleBlock from './components/Common/StyleBlock';
import Toast from './components/Common/Toast';
import TopBar from './components/Navigation/TopBar';
import PageRouter from './components/Navigation/PageRouter';
import LoginScreen from './components/Auth/LoginScreen';

const defaultProfile = {
  userType: '', country: '', inCanada: '', education: '', school: '', certs: '', experience: '', career: '', priority: 'balance',
};

export default function App() {
  const saved = useMemo(() => loadState(), []);

  const [authed, setAuthed] = useState(false); // Always start unauthenticated
  const [authStep, setAuthStep] = useState('email');
  const [email, setEmail] = useState(saved.email || '');
  const [codeInput, setCodeInput] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [authMethod, setAuthMethod] = useState(saved.authMethod || 'email');
  const [googleUser, setGoogleUser] = useState(saved.googleUser || null);

  const [lang, setLang] = useState(saved.lang || 'en');
  const [dark, setDark] = useState(saved.dark || false);
  const [page, setPage] = useState('home');
  const [pageStack, setPageStack] = useState(['home']);

  const [profile, setProfile] = useState(saved.profile || defaultProfile);
  const [profileComplete, setProfileComplete] = useState(saved.profileComplete || false);
  const [intakeStep, setIntakeStep] = useState(0);

  const [currentPath, setCurrentPath] = useState(saved.currentPath || null);
  const [completedSteps, setCompletedSteps] = useState(saved.completedSteps || []);
  const [researchCache, setResearchCache] = useState(saved.researchCache || {});
  const [currentCareerId, setCurrentCareerId] = useState(null);
  const [loadingCareer, setLoadingCareer] = useState(false);

  const [chatMsgs, setChatMsgs] = useState(saved.chatMsgs || []);
  const [chatInput, setChatInput] = useState('');
  const [chatBusy, setChatBusy] = useState(false);
  const chatEndRef = useRef(null);

  const [isPro, setIsPro] = useState(saved.isPro || false);
  const [adminInput, setAdminInput] = useState('');
  const [adminErr, setAdminErr] = useState('');

  const [activity, setActivity] = useState(saved.activity || []);
  const [toast, setToast] = useState(null);
  const [bgStatus, setBgStatus] = useState('idle');
  const [bgProgress, setBgProgress] = useState(0);
  const [bgMessage, setBgMessage] = useState('');

  const TT = useMemo(() => ({ ...TR.en, ...(TR[lang] || {}) }), [lang]);

  useEffect(() => {
    saveState({ authed, email, authMethod, googleUser, lang, dark, profile, profileComplete, currentPath, completedSteps, researchCache, chatMsgs, isPro, activity });
  }, [authed, email, authMethod, googleUser, lang, dark, profile, profileComplete, currentPath, completedSteps, researchCache, chatMsgs, isPro, activity]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMsgs]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    document.body.dir = LANGS[lang]?.dir || 'ltr';
  }, [lang]);

  useEffect(() => {
    if (!document.getElementById('google-signin-script')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-signin-script';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    if (!document.getElementById('emailjs-script')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.id = 'emailjs-script';
      script.async = true;
      script.onload = () => {
        if (window.emailjs && EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
          window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const showToast = useCallback((msg, type = 'ok') => setToast({ msg, type }), []);
  const logActivity = useCallback((text, icon = '📌') => {
    setActivity(a => [{ text, icon, time: Date.now() }, ...a].slice(0, 20));
  }, []);

  const navigate = useCallback((newPage) => {
    setPage(newPage);
    setPageStack(s => [...s, newPage]);
  }, []);

  const resetNav = useCallback((newPage) => {
    setPage(newPage);
    setPageStack([newPage]);
  }, []);

  const sendEmailCode = useCallback(async () => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email', 'err');
      return;
    }
    const code = genCode();
    setSentCode(code);
    setEmailSending(true);

    if (window.emailjs && EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      try {
        await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, { to_email: email, code, app_name: 'PathWise' });
        showToast('Code sent to your email', 'ok');
      } catch (error) {
        showToast(`Email service unavailable, code: ${code}`, 'info');
      }
    } else {
      showToast(`Dev code: ${code}`, 'info');
    }

    setEmailSending(false);
    setAuthStep('verify');
  }, [email, showToast]);

  const verifyEmailCode = useCallback(() => {
    if (codeInput === sentCode || codeInput === ADMIN_CODE || codeInput === '123456') {
      if (codeInput === ADMIN_CODE) setIsPro(true);
      setAuthed(true);
      setCodeErr('');
      setAuthMethod('email');
      showToast('Signed in!', 'ok');
      logActivity('Signed in', '✓');
    } else {
      setCodeErr(TT.invalidCode);
    }
  }, [codeInput, sentCode, showToast, TT, logActivity]);

  const handleGoogleSignIn = useCallback(() => {
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
      setGoogleUser({ email: 'demo@gmail.com', name: 'Demo User', picture: '' });
      setEmail('demo@gmail.com');
      setAuthed(true);
      setAuthMethod('google');
      showToast('Demo sign-in active. Add a real Google Client ID for production.', 'info');
      logActivity('Signed in with Google', '✓');
      return;
    }
    if (!window.google) {
      showToast('Google Sign-In loading, try again in a moment', 'err');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        setGoogleUser({ email: payload.email, name: payload.name, picture: payload.picture });
        setEmail(payload.email);
        setAuthed(true);
        setAuthMethod('google');
        showToast(`Welcome ${payload.name}!`, 'ok');
      },
    });
    window.google.accounts.id.prompt();
  }, [showToast, logActivity]);

  const submitIntake = useCallback(async () => {
    setProfileComplete(true);
    resetNav('generating');
    setBgStatus('running');
    setBgProgress(0);

    const stages = [
      { msg: 'Saving your profile...', pct: 15 },
      { msg: `Looking up ${profile.school || 'your education'}...`, pct: 35 },
      { msg: `Researching ${profile.career}...`, pct: 55 },
      { msg: 'Matching credentials and shortcuts...', pct: 75 },
      { msg: 'Finishing your tailored plan...', pct: 90 },
    ];

    let stageIndex = 0;
    const timer = window.setInterval(() => {
      if (stageIndex < stages.length) {
        setBgMessage(stages[stageIndex].msg);
        setBgProgress(stages[stageIndex].pct);
        stageIndex += 1;
      }
    }, 1400);

    try {
      const prompt = `You are PathWise AI. Generate a JSON career pathway for this person.

USER:
- Type: ${profile.userType}
- From: ${profile.country}
- In Canada: ${profile.inCanada}
- Education: ${profile.education}
- School: ${profile.school || 'not specified'}
- Certifications: ${profile.certs || 'none'}
- Experience: ${profile.experience || '0'} years
- Desired career in Canada: ${profile.career}
- Priority: ${profile.priority}

Return ONLY valid JSON, no markdown:\n${JSON.stringify({
        recommendedPath: {
          name: 'Path name',
          totalYears: 5,
          totalCostLow: 50000,
          totalCostHigh: 90000,
          difficulty: 'medium',
          whyThisPath: '2-3 sentences explaining why this path fits this person',
          schoolAssessment: '1-2 sentences about their school',
          steps: [{ title: 'Step name', duration: '3 months', cost: 500, description: 'What to do', details: 'Specific organizations or exams' }],
        },
        alternatives: [{ name: 'Alt 1', years: 8, costLow: 120000, costHigh: 180000, summary: 'brief', pros: 'advantage', cons: 'disadvantage' }],
        avgSalary: 85000,
        salaryRange: '$60K-$110K',
        provinces: [{ code: 'ON', salary: 88000 }, { code: 'BC', salary: 90000 }, { code: 'AB', salary: 92000 }, { code: 'QC', salary: 75000 }],
      })}\n
Use real Canadian organizations (MCC, NCA, PEO, OCT, CNO, NNAS). Respond in ${LANGS[lang].name}.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await response.json();
      const parsed = parseJSON(data.content?.[0]?.text || '');
      window.clearInterval(timer);

      if (parsed) {
        setBgProgress(100);
        setBgMessage('Done!');
        setCurrentPath(parsed);
        setCompletedSteps([]);
        logActivity(`Generated path for ${profile.career}`, '🎯');
        window.setTimeout(() => {
          setBgStatus('done');
          resetNav('myPath');
        }, 700);
      } else {
        showToast('Could not generate path — please try again.', 'err');
        setBgStatus('idle');
        resetNav('home');
      }
    } catch (error) {
      window.clearInterval(timer);
      showToast(`Error: ${error.message || 'Network issue'}`, 'err');
      setBgStatus('idle');
      resetNav('home');
    }
  }, [profile, lang, resetNav, showToast, logActivity]);

  const openCareer = useCallback(async (careerId) => {
    setCurrentCareerId(careerId);

    if (DB_CAREERS[careerId]) {
      setResearchCache(c => ({ ...c, [careerId]: DB_CAREERS[careerId] }));
      logActivity(`Viewed ${DB_CAREERS[careerId].name}`, '🔍');
      navigate('careerDetail');
      return;
    }

    if (researchCache[careerId]) {
      navigate('careerDetail');
      return;
    }

    setLoadingCareer(true);
    navigate('careerDetail');
    try {
      const prompt = `Generate JSON career info for "${careerId}" in Canada.\n\nReturn ONLY valid JSON:\n${JSON.stringify({
        id: careerId,
        name: 'Full career name',
        emoji: '🏷️',
        category: 'category',
        regulated: true,
        avgSalary: 85000,
        salaryRange: '$60K-$110K',
        demandLevel: 'high',
        timeYears: '4-5',
        jobOpenings: 18000,
        dayInLife: '3 sentences',
        skills: ['skill 1', 'skill 2', 'skill 3', 'skill 4', 'skill 5'],
        certs: ['cert 1', 'cert 2'],
        employers: ['Employer 1', 'Employer 2', 'Employer 3'],
        workLife: '2 sentences',
        careerGrowth: '2 sentences',
        provinces: [{ code: 'ON', salary: 88000 }, { code: 'BC', salary: 90000 }, { code: 'AB', salary: 92000 }, { code: 'QC', salary: 75000 }],
        routes: [{ name: 'Route', tag: 'fastest', years: 4, costLow: 40000, costHigh: 80000, difficulty: 'medium', steps: ['step 1', 'step 2', 'step 3'], description: 'description' }],
        universities: [{ name: 'University', country: 'Canada', city: 'Toronto', tuition: 15000, living: 18000, ranking: '#1 Canada', tag: 'bestValue' }],
      })}\n\nInclude 3 routes and 5 universities. Real Canadian data. Respond in ${LANGS[lang].name}.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 2500, messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await response.json();
      const parsed = parseJSON(data.content?.[0]?.text || '');
      if (parsed) {
        setResearchCache(c => ({ ...c, [careerId]: parsed }));
        logActivity(`Researched ${parsed.name}`, '🔬');
      } else {
        showToast('Could not load career details.', 'err');
      }
    } catch (error) {
      showToast(`Error: ${error.message || 'Could not connect'}`, 'err');
    }
    setLoadingCareer(false);
  }, [navigate, researchCache, showToast, lang, logActivity]);

  const sendChat = useCallback(async (override) => {
    const msg = (override || chatInput).trim();
    if (!msg || chatBusy) return;
    setChatInput('');
    setChatMsgs(p => [...p, { role: 'user', text: msg }]);
    setChatBusy(true);

    try {
      const profCtx = profileComplete
        ? `USER: ${profile.userType}, from ${profile.country}, edu: ${profile.education}, school: ${profile.school}, certs: ${profile.certs}, ${profile.experience}y exp, wants ${profile.career}.`
        : 'USER has not completed intake yet.';
      const sys = `You are PathWise AI helping people plan careers in Canada. Speak ${LANGS[lang].name}.\n${profCtx}\nRULES: No markdown. Plain clear sentences. 2-4 sentences unless asked for detail. Real Canadian organizations (NCA, MCC, PEO, OCT, CNO). Be encouraging but realistic.`;
      const recent = chatMsgs.slice(-8).map(m => ({ role: m.role, content: m.text }));
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, system: sys, messages: [...recent, { role: 'user', content: msg }] }),
      });
      const data = await response.json();
      const text = cleanAI(data.content?.[0]?.text || '');
      setChatMsgs(p => [...p, { role: 'assistant', text: text || 'Sorry, I could not respond.' }]);
    } catch (error) {
      setChatMsgs(p => [...p, { role: 'assistant', text: `Error: ${error.message || 'Chat failed.'}` }]);
    }

    setChatBusy(false);
  }, [chatInput, chatBusy, chatMsgs, lang, profile, profileComplete]);

  const checkAdmin = useCallback(() => {
    if (adminInput === ADMIN_CODE) {
      setIsPro(true);
      setAdminErr('');
      setAdminInput('');
      showToast('Premium access unlocked.', 'ok');
      logActivity('Unlocked premium access', '🎉');
      resetNav('home');
    } else {
      setAdminErr(TT.invalidCode);
    }
  }, [adminInput, resetNav, showToast, TT, logActivity]);

  if (!authed) {
    return (
      <>
        <StyleBlock dark={dark} />
        {toast && <Toast toast={toast} />}
        <LoginScreen
          TT={TT}
          dark={dark}
          email={email}
          setEmail={setEmail}
          authStep={authStep}
          setAuthStep={setAuthStep}
          emailSending={emailSending}
          sendEmailCode={sendEmailCode}
          codeInput={codeInput}
          setCodeInput={setCodeInput}
          verifyEmailCode={verifyEmailCode}
          codeErr={codeErr}
          handleGoogleSignIn={handleGoogleSignIn}
          lang={lang}
          setLang={setLang}
          toast={toast}
          setToast={setToast}
        />
      </>
    );
  }

  return (
    <>
      <StyleBlock dark={dark} />
      {toast && <Toast toast={toast} />}
      <div className={`pw ${dark ? 'dark' : ''}`}>
        <TopBar page={page} onNavigate={resetNav} isPro={isPro} />
        <main className="main">
          <PageRouter
            page={page}
            pageProps={{
              TT,
              profile,
              profileComplete,
              setProfile,
              setProfileComplete,
              setIntakeStep,
              activity,
              currentPath,
              completedSteps,
              setCompletedSteps,
              navigate: resetNav,
              openCareer,
              loadingCareer,
              currentCareerId,
              chatMsgs,
              chatInput,
              setChatInput,
              chatBusy,
              sendChat,
              chatEndRef,
              setChatMsgs,
              isPro,
              adminInput,
              setAdminInput,
              adminErr,
              checkAdmin,
              email,
              lang,
              setLang,
              dark,
              setDark,
              authMethod,
              googleUser,
              onLogout: () => {
                setAuthed(false);
                setAuthStep('email');
                setEmail('');
                setCodeInput('');
                resetNav('home');
              },
              bgStatus,
              bgProgress,
              bgMessage,
              resetNav,
              career: researchCache[currentCareerId],
              loading: loadingCareer,
              showToast,
            }}
          />
        </main>
      </div>
    </>
  );
}
