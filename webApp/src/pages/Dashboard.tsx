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
                  <div className='grid grid-cols-1 md: grid-cols-2 lg:grid:-cols-3 gap-6'>
                    {themes.map((theme) => (
                      <div key ={theme._id}
                        className='bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 rounded-xl p-5 shadow-xl flex flex-col justify-between'
                      >
                        <div>
                            {/* Header title & timestamp */}
                            <div className='flex items-start justify-between mb-2'>
                                 <h3 className=' text-white font-bold text-base truncate pr-2' title={theme.siteName}>
                                     {theme.siteName || "Unnamed Sync"}
                                </h3>
                                <span className='text-[10px] bg-slate-800 text-slate-400 font-medium px-2 py-0.5 rounded-full whitespace-nowrap'>
                                    {new Date(theme.createdAt).toLocaleDateString()}

                                 </span>
                            </div>

                                {/* Target External Url Link */}

                                <a
                                  href ={theme.siteUrl.startsWith('http') ? theme.siteUrl: `https://${theme.siteUrl}`} 
                                  target="_blank"
                                  rel="noreferrer"
                                  className='text-emerald-400 text-xs font-mono hover:underline inline-block mb-4 truncate max-w-full'
                                >
                                  {theme.siteUrl}
                                </a>
                                  <div className='text-xs text-slate-500 italic border-t border-slate-800/60 pt-3'>
                                      Token asset swatches mounting  here next....
                                  </div>
                        </div>
                            <div className="mt-6 pt-3 border-t border-slate-800"> 
                                <button
                                  onClick={()=> alert(`Opeming workspace architecture for: {theme.siteName}`)}
                                  className='w-full bg-slate-800 hover;bg-slate-600 text-slate-200 font-bold text-xs py02 rounded-lg transition-colors duration-150'
                                >
                                 View Dessign Token Configuration
                                </button>
                            </div>
                      </div>
                    ))}
                     
                  </div>

              </div>
                
            </div>
        );
    
};

export default HistoryDashboard;
