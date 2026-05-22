// console.log("The scraper script has been successfully injected");

// chrome.runtime.onMessage.addListener(
//     (
//         message: {action: string}, 
//         sender: chrome.runtime.MessageSender, 
//         sendResponse:(response: any)=> void)=>{

//          if(message.action === "PING_DOM"){
//             console.log("POPup clicked ! Analyzing the page backhround color...");

//             const bodyStyles = window.getComputedStyle(document.body);
//             let actualColor = bodyStyles.backgroundColor ;


//           if(actualColor === "rgba(0, 0, 0, 0)" || actualColor === "transparent"){
//              const rootStyles = window.getComputedStyle(document.documentElement);
//              actualColor = rootStyles.backgroundColor;
//           }

//           if (actualColor === "rgba(0, 0, 0, 0)" || actualColor === "transparent") {
//                 // Check if the user's system or site prefers a dark layout
//                 const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//                 actualColor = isDarkMode ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)";
//             }
        
             
//         sendResponse({
//             status: "success",
//             backgroundColor: actualColor
//         });
//      }

//      return true ;
// });

// console.log("Deep Palate Scraper Injected!");
// function rgbToHex(rgbStr: string): string | null {
//     const cleanStr = rgbStr.trim().toLowerCase();

//     if(cleanStr === 'transparent'|| cleanStr === 'rgba(0, 0, 0, 0)' || cleanStr === 'none'){
//         return null ;
//     }
//     const match = cleanStr.match(/[-+]?[\d.]+/g);
//     if(!match || match.length < 3) return null ;

//     // const r = parseInt(match[0]).toString(16).padStart(2, '0');
//     // const g = parseInt(match[1]).toString(16).padStart(2, '0');
//     // const b= parseInt(match[2]).toString(16).padStart(2, '0');

//     const r = Math.min(255, Math.max(0, parseInt(match[0])));
//     const g = Math.min(255, Math.max(0, parseInt(match[1])));
//     const b = Math.min(255, Math.max(0, parseInt(match[2])));


//     if(match.length === 4 && parseFloat(match[3])=== 0) return null ;

//     const hex = ((1 << 24) + (r << 16) +(g << 8) + b).toString(16).slice(1);

//      return `#${hex}`;
// }

//   function getElementSection(element: HTMLElement): string {
//      let current: HTMLElement | null = element ;
//      while(current){
//         const tag = current.tagName.toLowerCase();
//         const id = current.id.toLowerCase();
//         const classes = typeof current.className === 'string'? current.className.toLowerCase(): '';

//         if(tag === 'nav' || tag === 'header' || id.includes('nav') || id.includes('header') || classes.includes('nav') || classes.includes('header')){
//              return "Navigation Bar Zone";
//         }

//         if(id.includes('hero') || classes.includes('hero' ) || id.includes('banner') || id.includes('top')){
//             return "Hero Section / Banner" ;

//         }

//         if(tag === 'footer' || id.includes('footer') || classes.includes('footer')){
//              return "Footer Copyright Block" ;
//         }

//         // if(tag === 'aside' || id.includes('sidebar') || classes.includes('sidebar')){
//         //     return "Sidebar Menu Zone";
//         // }

//         current = current.parentElement;
//      }
//       return "Main Layout Content Layers" ;
//   }

     
// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
// //      if(message.action === "PING_DOM"){

// //         console.log("Analyzing actual webpage layout elements...");

// //         const sectionedData: Record<string, Set<string>> = {
// //             "Navigation Bar Zone": new Set<string>(),
// //             "Hero Section / Banner": new Set<string>(),
// //             "Main Layout Content Layers": new Set<string>(),
// //             "Footer Copyright Block": new Set<string>()
// //         };

// //          const allElements = document.querySelectorAll("*");

// //          allElements.forEach((element) =>{

// //             const htmlElement = element as HTMLElement;

// //             const sectionName = getElementSection(htmlElement);

// //             try{
// //                 const styles = window.getComputedStyle(element);
// //                 const bg = styles.backgroundColor ;
// //                 const text = styles.color;

// //              if(bg){
// //                 const hexBg = rgbToHex(bg);
// //                 if(hexBg && hexBg !== "#ffffff" && hexBg !== "#000000"){
// //                     sectionedData[sectionName].add(hexBg);
// //                 }
// //              }
        

// //              if(text){
// //                 const hexText = rgbToHex(text);
// //                  if(hexText && hexText !== "#ffffff" && hexText !== "#000000"){
// //                      sectionedData[sectionName].add(hexText);
// //                  }
// //              }
// //             } catch (e) {}
// //          });

// //          const finalPayload: Record<string, string[]> = {};

// //          for(const[zone, colorSet] of Object.entries(sectionedData)){
// //               if(colorSet.size > 0 ){
// //                  finalPayload[zone] = Array.from(colorSet).slice(0,6)
// //               }
// //          }

// //          sendResponse({
// //             status: "success",
// //             sections: finalPayload
// //          });
// //      }
// //       return true ;
// // })


console.log("Deep Palate Scraper Injected!");

function rgbToHex(rgbStr: string): string | null {
    const cleanStr = rgbStr.trim().toLowerCase();

    if(cleanStr === 'transparent'|| cleanStr === 'rgba(0, 0, 0, 0)' || cleanStr === 'none'){
        return null ;
    }
    const match = cleanStr.match(/\d+(\.\d+)?/g);
    if(!match || match.length < 3) return null ;

    const r = Math.min(255, Math.max(0, parseInt(match[0])));
    const g = Math.min(255, Math.max(0, parseInt(match[1])));
    const b = Math.min(255, Math.max(0, parseInt(match[2])));


       if(match.length === 4){
         const alpha = parseFloat(match[3]);
         if(alpha === 0) return null ; 
       }

    const hex = ((1 << 24) + (r << 16) +(g << 8) + b).toString(16).slice(1);
    return `#${hex}`;
}

function getElementSection(element: HTMLElement): string {
     let current: HTMLElement | null = element ;
     while(current && current !== document.body){

        const tag = current.tagName.toLowerCase();
        const role = current.getAttribute('role')?.toLowerCase()|| '';
        const id = current.id.toLowerCase();
        const classes = typeof current.className === 'string'? current.className.toLowerCase(): '';
        const combined = id + ' ' + classes;

        // if(tag === 'nav' || tag === 'header' || id.includes('nav') || id.includes('header') || classes.includes('nav') || classes.includes('header')){
        //      return "Navigation Bar Zone";
        // }
        // if(id.includes('hero') || classes.includes('hero' ) || id.includes('banner') || id.includes('top')){
        //     return "Hero Section / Banner" ;
        // }
        // if(tag === 'footer' || id.includes('footer') || classes.includes('footer')){
        //      return "Footer Copyright Block" ;
        // }

        //  Semantic HTML tag Check 
         if(tag === 'nav' || role === 'navigation') return 'Navigation';
         if(tag === 'header') return 'Header / Hero';
         if(tag === 'footer' || role === 'contentinfo') return 'Footer';
         if(tag === 'aside' || role === 'complementary') return 'Sidebar';
         if(tag === 'main' || role === 'main') return 'Main Content';

        //   fallback : class/ id keyword
        if(/nav|navbar|menu|topbar/ .test(combined)) return "Navigation";
        if(/hero|banner|jumbotron|masthead/.test(combined)) return 'Header / Hero';
        if(/footbar/.test(combined)) return 'Sidebar';
        if(/card|feature|pricing|testimonal|cta/.test(combined)) return 'Components' ;

        current = current.parentElement;
     }
     return "Main Content" ;
}

// Global reference pointer tracking our dynamic right sidebar container element
// let sidePanelElement: HTMLDivElement | null = null;

function runPageColorScan(): Record<string, string[]> {
    // const sectionedData: Record<string, Set<string>> = {
    //     "Navigation Bar Zone": new Set<string>(),
    //     "Hero Section / Banner": new Set<string>(),
    //     "Main Layout Content Layers": new Set<string>(),
    //     "Footer Copyright Block": new Set<string>()
    // };

    const sections = [
          'Navigation', "Header / Hero", "Main Content",
          "Components", "Sidebar", "Footer"
    ];

    const sectionedData: Record<string, Set<string>> = {};

   sections.forEach(s => {sectionedData[s]= new Set<string>();});

   const propsToScan = ["backgroundColor", 'color', 'borderColor', 'fill'];

    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
        // Prevent scanning our own extractor drawer panel UI color codes
        if (sidePanelElement && sidePanelElement.contains(element)) return;

        const htmlElement = element as HTMLElement;
        const sectionName = getElementSection(htmlElement);

        try {
            const styles = window.getComputedStyle(element);
            const bg = styles.backgroundColor;
            const text = styles.color;

            if (bg) {
                const hexBg = rgbToHex(bg);
                if (hexBg && hexBg !== "#ffffff" && hexBg !== "#000000") {
                    sectionedData[sectionName].add(hexBg);
                }
            }
            if (text) {
                const hexText = rgbToHex(text);
                if (hexText && hexText !== "#ffffff" && hexText !== "#000000") {
                    sectionedData[sectionName].add(hexText);
                }
            }
        } catch (e) {}
    });

    const finalPayload: Record<string, string[]> = {};
    for (const [zone, colorSet] of Object.entries(sectionedData)) {
        if (colorSet.size > 0) {
            finalPayload[zone] = Array.from(colorSet).slice(0, 6);
        }
    }
    return finalPayload;
}

function handleSidebarToggle() {
    // If sidebar is already open on the page screen view, slide it away and destroy it cleanly
    if (sidePanelElement) {
        sidePanelElement.style.right = '-360px';
        setTimeout(() => {
            if (sidePanelElement) {
                sidePanelElement.remove();
                sidePanelElement = null;
            }
        }, 300);
        return;
    }

    // Build the full height layout overlay element node container
    sidePanelElement = document.createElement('div');
    sidePanelElement.id = "tailwind-extractor-sidebar-frame";
    
    Object.assign(sidePanelElement.style, {
        position: 'fixed',
        top: '0',
        right: '-360px', // Starts offscreen
        width: '340px',
        height: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        boxShadow: '-8px 0 24px rgba(0,0,0,0.4)',
        zIndex: '999999999', // Forces interface above standard web wrappers
        transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto'
    });

    renderSidebarHTMLMarkup();
    document.body.appendChild(sidePanelElement);
    
    // Trigger smooth slide entry animation transition
    setTimeout(() => { if (sidePanelElement) sidePanelElement.style.right = '0'; }, 20);
}

function renderSidebarHTMLMarkup() {
    if (!sidePanelElement) return;

    sidePanelElement.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
            <div>
                <h1 style="font-size:18px; font-weight:bold; color:#2dd4bf; margin:0;">Tailwind Extractor</h1>
                <p style="font-size:11px; color:#64748b; margin:2px 0 0 0;">Phase 2 : Architectural Section View</p>
            </div>
            <button id="close-sidebar-panel" style="background:none; border:none; color:#64748b; font-size:22px; cursor:pointer; font-weight:bold;">&times;</button>
        </div>
        
        <button id="execute-dom-scan" style="width:100%; background-color:#14b8a6; color:#0f172a; font-weight:bold; font-size:12px; padding:12px; border:none; border-radius:4px; cursor:pointer; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:20px; transition:background-color 0.2s;">
            Scan Section Tokens
        </button>

        <div id="sidebar-results-container" style="display:flex; flex-direction:column; gap:16px;">
            <div style="text-align:center; color:#64748b; font-size:12px; padding:30px; border:1px dashed #1e293b; border-radius:6px;">
                Click scan button to process tokens section by section!
            </div>
        </div>
    `;

    // Hook click actions directly to layout components
    sidePanelElement.querySelector('#close-sidebar-panel')?.addEventListener('click', handleSidebarToggle);
    sidePanelElement.querySelector('#execute-dom-scan')?.addEventListener('click', runUIUpdateCycle);
}

function runUIUpdateCycle() {
    const collectedData = runPageColorScan();
    const targetBox = document.getElementById('sidebar-results-container');
    if (!targetBox) return;

    if (Object.keys(collectedData).length === 0) {
        targetBox.innerHTML = `<div style="text-align:center; font-size:12px; color:#64748b;">No unique layout accent tokens identified on the page tab layers.</div>`;
        return;
    }

    targetBox.innerHTML = Object.entries(collectedData).map(([sectionName, colors]) => `
        <div style="background-color:#1e293b; border:1px solid #334155; border-radius:6px; padding:12px; display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(51,65,85,0.4); padding-bottom:4px;">
                <span style="font-size:10px; font-weight:bold; color:#2dd4bf; text-transform:uppercase; letter-spacing:0.05em;">${sectionName}</span>
                <span style="font-size:9px; background-color:#020617; padding:2px 6px; border-radius:10px; color:#94a3b8; font-family:monospace;">${colors.length} tokens</span>
            </div>
            <div style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:8px;">
                ${colors.map(color => `
                    <div style="display:flex; flex-direction:column; align-items:center; background-color:#020617; border:1px solid #1e293b; border-radius:4px; padding:6px; gap:4px;">
                        <div style="width:100%; height:20px; border-radius:2px; background-color:${color}; border:1px solid rgba(255,255,255,0.05);"></div>
                        <code style="font-size:9px; font-weight:bold; color:#34d399; font-family:monospace;">${color}</code>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
     if(message.action === "TOGGLE_SIDEBAR") {
        handleSidebarToggle();
        sendResponse({ status: "success" });
     }
     return true ;
});

