import { useState } from 'react'
import './index.css';


function App() {

  const [detectedColors, setDetectedColors] = useState<string[]>([]);

  const pingWebpageDom = async () => {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!activeTab || !activeTab.id) {
      return;
    }

    chrome.tabs.sendMessage(activeTab.id, { action: "PING_DOM" }, (response) => {

      if (response && response.status === "success") {
        setDetectedColors(response.colors);
      } else {
        console.log("Communication failed. Ensure you are on a live website");
      }
    });
  }

  return (
    <div className="w-[320px] p-5 bg-slate-900 text-slate-100 font-sans antialiased">
      {/* Header Section */}
      <div className="mb-4 border-b border-slate-800 pb-2">
        <h1 className="text-xl font-bold text-teal-400">Tailwind Extracter</h1>
        <p className="">Phase 1 : Local Message Passing</p>
      </div>

      {/* Intractive Control Panel */}
      <div className='space-y-4'>
        <button onClick={pingWebpageDom} className=' bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs py-2.5 px-4 rounded shadow transition-all duration-200 cursor-pointer'>
          Ping webpage DOM
        </button>

        {/* Conitional Output Panel */}

        {detectedColors.length > 0 && (
          <div className='p-3 bg-slate-800 rounded border border-slate-700 space-y-3'>
            <p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
              Detected Design Tokens:
            </p>
            <div className='grid grid-cols-3 gap-2'>
              {detectedColors.map((color, index) => (
                <div key={index} className="flex flex-col items-center p-1.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                  {/* Live color Swatch Box */}
                  <div className='w-full h-8 rounded border border-slate-600 shadow-inner'
                    style={{ backgroundColor: color }}
                  />
                  {/* Raw String Output */}
                  <code className='text-[10px] text-emerald-400 font-mono font-bold bg-slate-950 px-2 py-1 rounded border border-slate-800'>
                    {color}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
