import React, {useEffect, useState} from 'react';

interface ThemeRecord {
    _id: string;
    siteUrl: string;
    siteName: string;
    sections: Record<string, {colors: string[]; fonts: string[]; spaces: string[]}>;
    createdAt: string;
}

const HistoryDashboard: React.FC = () =>{
    const [themes, setThemes] = useState<ThemeRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWorkspaceHistory = async () =>{
          try{
             const response = await fetch('http://localhost:5000/extractor/history');
             const json = await response.json();
             if(json.success){
                setThemes(json.data);
             }   
          } catch(error){
            console.error("Errror connecting to datat layer API:", error);

          } finally{
             setLoading(false);
          }
        };
         fetchWorkspaceHistory();

    }, []);

     if(loading){
         return(
            <div className='min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center font-sans'>
                <p className='text-lg animate-pulse tracking-wide font-medium'>
                    Loading configuration vaults..
                </p>
            </div>
         );
     }
        return(
            <div className=' = "main-h-screen bg-slate-950 text-slate-100 p-8 font-sans'>
              <div className='max-w-7xl mx-auto'>

                {/* Section : top Header Area*/}
                <header className='mb-10'>
                    <h1 className='text-3xl font-extrabold tracking-tight text-white mb-2'>
                        Design Sysytem History Vault
                    </h1>
                    <p className='text-sate-400 text-sm'>
                          Review, amnage, and extract Tailwind css tokens from your synchronized web workspaces.
                    </p>
                </header>
                {/* Section : Workspace Grid placeholder */}
                  <div className='bg-slate-900 border border-slate-800 rounded-xl p-12 text-center'>
                     <p className='text-emerald-400 font-mono text-lg mb-2'>
                        Connected to API server Successfully!
                     </p>
                     <p className='text-slate-300'>
                        Found<span className='text-white font-bold'>{themes.length}</span>Saved workspace in your mongodb cluster.
                     </p>
                  </div>

              </div>
                
            </div>
        );
    
};

export default HistoryDashboard;
