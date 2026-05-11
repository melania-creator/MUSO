import { useState, useEffect } from 'react';
import { Sidebar, Topbar, MobileNav } from './components/Shell';
import {
  TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakSelect, TweakButton
} from './components/TweaksPanel';
import OnboardingModal from './modals/OnboardingModal';
import SplashScreen from './components/SplashScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScreenAuth    from './screens/ScreenAuth';
import ScreenProfile from './screens/ScreenProfile';

import ScreenHome    from './screens/ScreenHome';
import ScreenSOS     from './screens/ScreenSOS';
import ScreenAdopt   from './screens/ScreenAdopt';
import ScreenRifugi  from './screens/ScreenRifugi';
import ScreenSitter  from './screens/ScreenSitter';
import ScreenShop    from './screens/ScreenShop';
import ScreenJoin    from './screens/ScreenJoin';
import ScreenMessages from './screens/ScreenMessages';
import { DetailSOS, DetailAdopt }   from './screens/ScreenDetails';
import { DetailSitterRich, ShopOwner, SitterOwner } from './screens/ScreenOwners';
import ReportModal   from './modals/ReportModal';

const TWEAK_DEFAULTS = {
  palette: 'sunrise',
  iconStyle: 'duotone',
  density: 'comfortable',
  anim: 'subtle',
};

function AppContent() {
  const { user } = useAuth();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState('home');
  const [joinRole, setJoinRole] = useState('user');
  const [reportOpen, setReportOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [sosReports, setSosReports] = useState([]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [showSplash, setShowSplash] = useState(isMobile);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try { return !localStorage.getItem('muso_onboarded'); } catch { return false; }
  });

  // Palette attributes — must stay before early return to satisfy hooks rules
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-palette', t.palette);
    r.setAttribute('data-icon-style', t.iconStyle);
    r.setAttribute('data-density', t.density);
    r.setAttribute('data-anim', t.anim);
  }, [t]);

  // Browser / iOS / Android back-button support via History API
  useEffect(() => {
    window.history.replaceState({ screen: 'home', detail: null }, '');
    const onPop = (e) => {
      const s = e.state || { screen: 'home', detail: null };
      setActive(s.screen ?? 'home');
      setDetail(s.detail ?? null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (!user) return <ScreenAuth />;

  // Navigation — always pushes a history entry so back() works everywhere
  const go = (screen) => {
    window.history.pushState({ screen, detail: null }, '');
    setActive(screen);
    setDetail(null);
  };

  const handleSosSubmit = (report) => {
    setSosReports(prev => [report, ...prev]);
    go('sos');
  };

  const handleOnboardingDone = () => {
    try { localStorage.setItem('muso_onboarded', '1'); } catch {}
    setShowOnboarding(false);
  };

  const goJoin = (role) => { setJoinRole(role); go('join'); };

  const openDetail = (d) => {
    window.history.pushState({ screen: active, detail: d }, '');
    setDetail(d);
    window.scrollTo({ top: 0 });
  };

  // back() triggers popstate which restores previous screen/detail state
  const closeDetail = () => window.history.back();

  const screens = {
    home:      <ScreenHome   go={go} onSos={() => setReportOpen(true)} goJoin={goJoin} openDetail={openDetail}/>,
    sos:       <ScreenSOS    onSos={() => setReportOpen(true)} openDetail={openDetail} sosReports={sosReports}/>,
    adopt:     <ScreenAdopt  openDetail={openDetail}/>,
    rifugi:    <ScreenRifugi goJoin={goJoin} />,
    sitter:    <ScreenSitter goJoin={goJoin} openDetail={openDetail}/>,
    shop:      <ScreenShop   goJoin={goJoin} />,
    join:      <ScreenJoin   initialRole={joinRole} go={go} />,
    msg:       <ScreenMessages />,
    donations: <ScreenRifugi />,
    profile:   <ScreenProfile onBack={() => window.history.back()} />,
  };

  let body;
  if (detail) {
    if (detail.type === 'sos')              body = <DetailSOS        data={detail.data} onBack={closeDetail}/>;
    else if (detail.type === 'adopt')       body = <DetailAdopt      data={detail.data} onBack={closeDetail}/>;
    else if (detail.type === 'sitter')      body = <DetailSitterRich data={detail.data} onBack={closeDetail}/>;
    else if (detail.type === 'shopOwner')   body = <ShopOwner        onBack={closeDetail}/>;
    else if (detail.type === 'sitterOwner') body = <SitterOwner      onBack={closeDetail}/>;
  } else {
    body = screens[active];
  }

  return (
    <div className="app" data-screen-label={active}>
      <Sidebar active={active} setActive={go} onSos={() => setReportOpen(true)} />
      <main className="main">
        <Topbar onSos={() => setReportOpen(true)} user={user} onProfile={() => go('profile')} />
        <div className="content">
          {body}
        </div>
      </main>
      <MobileNav active={active} setActive={go} onSos={() => setReportOpen(true)} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} onSosSubmit={handleSosSubmit} />
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      {!showSplash && showOnboarding && <OnboardingModal onDone={handleOnboardingDone} />}

      {import.meta.env.DEV && <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakColor label="Schema" value={t.palette}
            options={[['#FFB59B','#FFC8DA','#C9B8FF','#B8D8FF'],['#C5D6B0','#F2DD9A','#E8B894','#D8CBE3'],['#F5B5A3','#EDB8C8','#D5C4DD','#BFC8E0']]}
            onChange={(v, idx) => setTweak('palette', ['sunrise','bosco','crepuscolo'][['#FFB59B,#FFC8DA,#C9B8FF,#B8D8FF','#C5D6B0,#F2DD9A,#E8B894,#D8CBE3','#F5B5A3,#EDB8C8,#D5C4DD,#BFC8E0'].indexOf(v.join ? v.join(',') : v)] ?? 0)} />
          <TweakRadio label="Densità" value={t.density} options={['compact','comfortable','spacious']} onChange={v => setTweak('density', v)} />
        </TweakSection>
        <TweakSection label="Stile visivo">
          <TweakRadio label="Icone" value={t.iconStyle} options={['line','duotone','filled']} onChange={v => setTweak('iconStyle', v)} />
          <TweakRadio label="Animazioni" value={t.anim} options={['none','subtle','playful']} onChange={v => setTweak('anim', v)} />
        </TweakSection>
        <TweakSection label="Test rapidi">
          <TweakButton onClick={() => setShowOnboarding(true)}>Rivedi onboarding</TweakButton>
          <TweakButton onClick={() => setReportOpen(true)}>Apri flow SOS</TweakButton>
          <TweakButton onClick={() => goJoin('user')}>Form Utente</TweakButton>
          <TweakButton onClick={() => goJoin('sitter')}>Form Sitter</TweakButton>
          <TweakButton onClick={() => goJoin('rifugio')}>Form Rifugio</TweakButton>
          <TweakButton onClick={() => goJoin('shop')}>Form Vetrina</TweakButton>
          <TweakButton onClick={() => openDetail({type:'shopOwner'})}>📊 Dashboard Vetrina</TweakButton>
          <TweakButton onClick={() => openDetail({type:'sitterOwner'})}>📊 Dashboard Sitter</TweakButton>
          <TweakSelect label="Vai a schermata" value={active}
            options={[{value:'home',label:'Home'},{value:'sos',label:'SOS Mappa'},{value:'adopt',label:'Adozioni'},{value:'rifugi',label:'Rifugi & Aiuti'},{value:'sitter',label:'Pet Sitter'},{value:'shop',label:'Vetrine'},{value:'join',label:'Iscrizione'}]}
            onChange={v => go(v)} />
        </TweakSection>
      </TweaksPanel>}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
