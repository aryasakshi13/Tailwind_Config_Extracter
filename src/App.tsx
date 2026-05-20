import { useState } from 'react'
import './index.css';


function App() {

  const[detectedBg, setDetectedBg] = useState<string | null>(null);

  const pingWebpageDom = async () =>{
     const[activeTab] = await chrome.tabs.query({active: true, currentWindow: true});

     if(!activeTab || !activeTab.id){
       return ;
     }

     chrome.tabs.sendMessage(activeTab.id,{action:"PING_DOM"}, (response)  =>{

         if(response && response.status === "success") {
            setDetectedBg(response.backgroundColor);
         } else{
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
         <button onClick ={pingWebpageDom} className=' bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs py-2.5 px-4 rounded shadow transition-all duration-200 cursor-pointer'>
          Ping webpage DOM
         </button>

         {/* Conitional Output Panel */}

         {detectedBg && (
          <div className='p-3 bg-slate-800 rounded border border-slate-700 space-y-1.5 animate-fadeIn'>
            <p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'> 
              Webpage Background Data:
            </p>
            <div className='flex items-center gap-3'>
              {/* Live color Swatch Box */}
               <div className='w-5 h-5 rounded border border-slate-600 shadow-inner'
               style={{backgroundColor:detectedBg}}
               />
               {/* Raw String Output */}
               <code className='text-xs text-emerald-400 font-mono font-bold bg-slate-950 px-2 py-1 rounded border border-slate-800'>
                {detectedBg}
               </code>
            </div>
          </div>
         )}

       </div>

      
    
    </div>
  )
}

export default App
