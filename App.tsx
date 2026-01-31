import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, History, BookOpen, Zap, ShieldCheck, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { BotConfig, MessageLog, AppTab } from './types';
import Dashboard from './components/Dashboard';
import ConfigForm from './components/ConfigForm';
import LogViewer from './components/LogViewer';
import SetupGuide from './components/SetupGuide';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [systemStatus, setSystemStatus] = useState<{isReady: boolean, PAGE_ACCESS_TOKEN: boolean} | null>(null);
  const [config, setConfig] = useState<BotConfig>({
    pageId: '',
    accessToken: '',
    webhookUrl: '',
    triggerKeyword: 'loan',
    targetLink: 'https://bangladesh-finance-micro-loan-found-ebon.vercel.app/',
    previewTitle: 'লোন আবেদন ফর্ম - আলোকধারা ফাউন্ডেশন',
    previewSubtitle: '💸১ থেকে ৩ ঘন্টায় লোন কার্যকর হয়।',
    previewImageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop'
  });
  const [logs, setLogs] = useState<MessageLog[]>([]);

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setSystemStatus(data))
      .catch(() => setSystemStatus({ isReady: false, PAGE_ACCESS_TOKEN: false }));
  }, [activeTab]);

  const addLog = (sender: MessageLog['sender'], text: string, status: MessageLog['status']) => {
    const newLog: MessageLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      sender,
      text,
      status
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-200 font-sans">
      <aside className="w-72 border-r border-slate-800 bg-slate-900/50 hidden lg:flex flex-col shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Zap className="text-white w-6 h-6" />
          </div>
          <h1 className="font-bold text-xl text-white">FB AutoPro</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === AppTab.DASHBOARD ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}> <LayoutDashboard size={20} /> ড্যাশবোর্ড </button>
          <button onClick={() => setActiveTab(AppTab.SETTINGS)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === AppTab.SETTINGS ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}> <Settings size={20} /> সেটিংস </button>
          <button onClick={() => setActiveTab(AppTab.LOGS)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === AppTab.LOGS ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}> <History size={20} /> লগ </button>
          <button onClick={() => setActiveTab(AppTab.GUIDE)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === AppTab.GUIDE ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}> <BookOpen size={20} /> গাইড </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-slate-800 bg-slate-950/80 flex items-center px-6 sticky top-0 z-40 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white">ড্যাশবোর্ড</h2>
        </header>
        <div className="p-6">
          {activeTab === AppTab.DASHBOARD && <Dashboard config={config} isBotRunning={isBotRunning} logs={logs} systemStatus={systemStatus} onSimulateTrigger={() => addLog('PageAdmin', config.triggerKeyword, 'triggered')} onGoToGuide={() => setActiveTab(AppTab.GUIDE)} />}
          {activeTab === AppTab.SETTINGS && <ConfigForm config={config} setConfig={setConfig} systemStatus={systemStatus} />}
          {activeTab === AppTab.LOGS && <LogViewer logs={logs} />}
          {activeTab === AppTab.GUIDE && <SetupGuide />}
        </div>
      </main>
    </div>
  );
};

export default App;      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg flex justify-around items-center p-3 z-50">
        <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.DASHBOARD ? 'text-blue-500' : 'text-slate-400'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.SETTINGS)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.SETTINGS ? 'text-blue-500' : 'text-slate-400'}`}>
          <Settings size={20} />
          <span className="text-[10px] font-bold uppercase">Settings</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.LOGS)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.LOGS ? 'text-blue-500' : 'text-slate-400'}`}>
          <History size={20} />
          <span className="text-[10px] font-bold uppercase">Logs</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.GUIDE)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.GUIDE ? 'text-blue-500' : 'text-slate-400'}`}>
          <BookOpen size={20} />
          <span className="text-[10px] font-bold uppercase">Guide</span>
        </button>
      </nav>
    </div>
  );
};

export default App;            <button 
              onClick={() => setIsBotRunning(!isBotRunning)}
              className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${isBotRunning ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' : 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20'}`}
            >
              {isBotRunning ? 'বন্ধ করুন' : 'চালু করুন'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
        <header className="h-20 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40 backdrop-blur-xl">
          <div className="flex items-center gap-4">
             <div className="lg:hidden w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
             </div>
             <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
               {activeTab === AppTab.DASHBOARD && 'মেইন ড্যাশবোর্ড'}
               {activeTab === AppTab.SETTINGS && 'API কনফিগারেশন'}
               {activeTab === AppTab.LOGS && 'অ্যাক্টিভিটি হিস্ট্রি'}
               {activeTab === AppTab.GUIDE && 'কিভাবে কানেক্ট করবেন?'}
             </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
               <Activity size={14} className={systemStatus?.isReady ? 'text-green-400' : 'text-red-400'} />
               <span className="text-xs font-semibold text-slate-300">
                 {systemStatus?.isReady ? 'Backend Live' : 'Backend Incomplete'}
               </span>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-12">
          {activeTab === AppTab.DASHBOARD && (
            <Dashboard 
              config={config} 
              isBotRunning={isBotRunning} 
              logs={logs}
              systemStatus={systemStatus}
              onSimulateTrigger={() => addLog('PageAdmin', config.triggerKeyword, 'triggered')}
              onGoToGuide={() => setActiveTab(AppTab.GUIDE)}
            />
          )}
          {activeTab === AppTab.SETTINGS && (
            <ConfigForm config={config} setConfig={setConfig} systemStatus={systemStatus} />
          )}
          {activeTab === AppTab.LOGS && (
            <LogViewer logs={logs} />
          )}
          {activeTab === AppTab.GUIDE && (
            <SetupGuide />
          )}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 backdrop-blur-lg flex justify-around items-center p-3 z-50">
        <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.DASHBOARD ? 'text-blue-500' : 'text-slate-400'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.SETTINGS)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.SETTINGS ? 'text-blue-500' : 'text-slate-400'}`}>
          <Settings size={20} />
          <span className="text-[10px] font-bold uppercase">Settings</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.LOGS)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.LOGS ? 'text-blue-500' : 'text-slate-400'}`}>
          <History size={20} />
          <span className="text-[10px] font-bold uppercase">Logs</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.GUIDE)} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === AppTab.GUIDE ? 'text-blue-500' : 'text-slate-400'}`}>
          <BookOpen size={20} />
          <span className="text-[10px] font-bold uppercase">Guide</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
