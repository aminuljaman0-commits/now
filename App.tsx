import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, History, BookOpen, Zap, Activity } from 'lucide-react';
import { BotConfig, MessageLog, AppTab } from './types';
import Dashboard from './components/Dashboard';
import ConfigForm from './components/ConfigForm';
import LogViewer from './components/LogViewer';
import SetupGuide from './components/SetupGuide';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [config, setConfig] = useState<BotConfig>({
    pageId: '', accessToken: '', webhookUrl: '', triggerKeyword: 'loan',
    targetLink: 'https://bangladesh-finance-micro-loan-found-ebon.vercel.app/',
    previewTitle: 'লোন আবেদন ফর্ম', previewSubtitle: '১-৩ ঘন্টায় লোন কার্যকর',
    previewImageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000'
  });
  const [logs, setLogs] = useState<MessageLog[]>([]);

  useEffect(() => {
    fetch('/api/status').then(res => res.json()).then(data => setSystemStatus(data))
    .catch(() => setSystemStatus({ isReady: false }));
  }, [activeTab]);

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-200">
      <aside className="w-64 border-r border-slate-800 bg-slate-900 hidden lg:flex flex-col">
        <div className="p-6 font-bold text-xl text-white">FB AutoPro</div>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className="w-full text-left p-3 rounded hover:bg-slate-800">ড্যাশবোর্ড</button>
          <button onClick={() => setActiveTab(AppTab.SETTINGS)} className="w-full text-left p-3 rounded hover:bg-slate-800">সেটিংস</button>
          <button onClick={() => setActiveTab(AppTab.LOGS)} className="w-full text-left p-3 rounded hover:bg-slate-800">লগ</button>
          <button onClick={() => setActiveTab(AppTab.GUIDE)} className="w-full text-left p-3 rounded hover:bg-slate-800">গাইড</button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {activeTab === AppTab.DASHBOARD && <Dashboard config={config} isBotRunning={isBotRunning} logs={logs} systemStatus={systemStatus} onSimulateTrigger={() => {}} onGoToGuide={() => setActiveTab(AppTab.GUIDE)} />}
        {activeTab === AppTab.SETTINGS && <ConfigForm config={config} setConfig={setConfig} systemStatus={systemStatus} />}
        {activeTab === AppTab.LOGS && <LogViewer logs={logs} />}
        {activeTab === AppTab.GUIDE && <SetupGuide />}
      </main>
    </div>
  );
};

export default App;
