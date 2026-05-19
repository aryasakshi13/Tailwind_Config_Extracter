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
    <>
      <div>
        <h1 className="text-blue-400">Hello from my side</h1>
      </div>
    </>
  )
}

export default App
