import HomePage from '../../pages/HomePage';
import IntakePage from '../../pages/IntakePage';
import GeneratingPage from '../../pages/GeneratingPage';
import MyPathPage from '../../pages/MyPathPage';
import ExplorePage from '../../pages/ExplorePage';
import CareerDetailPage from '../../pages/CareerDetailPage';
import ChatPage from '../../pages/ChatPage';
import DashboardPage from '../../pages/DashboardPage';
import ProPage from '../../pages/ProPage';
import SettingsPage from '../../pages/SettingsPage';
import VisaPage from '../../pages/VisaPage';
import ResumePage from '../../pages/ResumePage';
import ScholarshipsPage from '../../pages/ScholarshipsPage';
import AICareerAssistantPage from '../../pages/AICareerAssistantPage';

const pageMap = {
  home: HomePage,
  intake: IntakePage,
  generating: GeneratingPage,
  myPath: MyPathPage,
  explore: ExplorePage,
  careerDetail: CareerDetailPage,
  chat: ChatPage,
  dashboard: DashboardPage,
  pro: ProPage,
  settings: SettingsPage,
  visa: VisaPage,
  resume: ResumePage,
  scholarships: ScholarshipsPage,
  aiAssistant: AICareerAssistantPage,
};

export default function PageRouter({ page, pageProps }) {
  const Page = pageMap[page] || HomePage;
  return <Page {...pageProps} />;
}
