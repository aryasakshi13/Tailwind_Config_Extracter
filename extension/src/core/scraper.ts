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


// console.log("Deep Palate Scraper Injected!");

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

 function shouldSkipElement(element: HTMLElement): boolean {
    // Skip code blocks — syntax highlight colors
    if (isInsideCodeBlock(element)) return true;

    const tag = element.tagName.toLowerCase();

    // Skip canvas — animated gradients, WebGL, charts
    if (tag === 'canvas') return true;

    // Skip script/style tags
    if (tag === 'script' || tag === 'style' || tag === 'noscript') return true;

    if(tag === 'svg') return true;

    // Skip SVG internals — icon fills, path colors
    if (element.closest('svg') !== null) return true;

    // Skip hidden elements
    const styles = window.getComputedStyle(element);
    if (styles.display === 'none' || styles.visibility === 'hidden') return true;

     //  NEW: skip fully transparent elements
    if (parseFloat(styles.opacity) === 0) return true;
     
    // NEW: skip elements hidden via an ancestor's display:none
    if (element.offsetParent === null && styles.position !== 'fixed') return true;

    // Skip tiny elements
    const rect = element.getBoundingClientRect();
    if (rect.width < 5 || rect.height < 5) return true;

    return false;
}  


function isUsefulColor(_hex: string): boolean {
//    const r = parseInt(hex.slice(1, 3), 16);
//     const g = parseInt(hex.slice(3, 5), 16);
//     const b = parseInt(hex.slice(5, 7), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Skip near-black (under 20) and near-white (over 235)
    // if (brightness < 30) return false;

    //  if (brightness === 0 && r === g && g === b) return false;

    return true;
}

function isInsideCodeBlock(element: HTMLElement): boolean {
    return (
        element.tagName === 'PRE' ||
        element.tagName === 'CODE' ||
        element.tagName === 'KBD' ||
        element.closest('pre') !== null ||
        element.closest('code') !== null
    );
}

function getElementSection(element: HTMLElement): string {
     let current: HTMLElement | null = element ;
     while(current && current !== document.body){

        const tag = current.tagName.toLowerCase();
        const role = current.getAttribute('role')?.toLowerCase()|| '';
        // const id = current.id.toLowerCase();
        // const classes = typeof current.className === 'string'? current.className.toLowerCase(): '';
        // const combined = id + ' ' + classes;

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
        // if(/nav|navbar|menu|topbar/ .test(combined)) return "Navigation";
        // if(/hero|banner|jumbotron|masthead/.test(combined)) return 'Header / Hero';
        //  if (/footer/.test(combined)) return 'Footer';        
        // if (/sidebar|aside/.test(combined)) return 'Sidebar';
        // if(/card|feature|pricing|testimonal|cta/.test(combined)) return 'Components' ;

        //  if (/\bnav\b|navbar|navigation|topbar|menubar|top-bar|site-header/.test(combined)) return 'Navigation';
        // if (/\bhero\b|banner|jumbotron|masthead|splash|intro-section/.test(combined)) return 'Header / Hero';
        // if (/\bfooter\b|foot-|site-footer|page-footer/.test(combined)) return 'Footer';
        // if (/sidebar|\baside\b|side-panel/.test(combined)) return 'Sidebar';
        // if (/\bcard\b|\bbtn\b|\bbadge\b|feature-|pricing-|testimonial/.test(combined)) return 'Components';


        // if(current.parentElement === document.body){
        //     const allBodyChildren = Array.from(document.body.children) as HTMLElement[];
        //     const index = allBodyChildren.indexOf(current);
        //     const total = allBodyChildren.length;

        //     if(index === 0) return 'Navigation';
        //     if(index === 1 ) return 'Header / Hero';
        //     if(index === total - 1) return 'Footer';
        // }

        // const rect = current.getBoundingClientRect();
        // const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // const absoluteTop = rect.top + scrollTop;
        // const pageHeight = Math.max(
        //     document.body.scrollHeight,
        //     document.documentElement.scrollHeight
        // );

        // const isStructural = rect.width > window.innerWidth * 0.5 || rect.width > 600;

        // if (isStructural) {
        //     if (absoluteTop < 80) return 'Navigation';
        //     if (absoluteTop < 400) return 'Header / Hero';
        //     if (absoluteTop > pageHeight - 300) return 'Footer';
        // }

        current = current.parentElement;
    }
    //  return "Main Content" ;

      current = element;
     while(current && current !== document.body){
 
        const id = current.id.toLowerCase();
        const classes = typeof current.className === 'string'? current.className.toLowerCase(): '';
        const combined = id + ' ' + classes;
 
         if (/\bnav\b|navbar|navigation|topbar|menubar|top-bar|site-header/.test(combined)) return 'Navigation';
        if (/\bhero\b|banner|jumbotron|masthead|splash|intro-section/.test(combined)) return 'Header / Hero';
        if (/\bfooter\b|foot-|site-footer|page-footer/.test(combined)) return 'Footer';
        if (/sidebar|\baside\b|side-panel/.test(combined)) return 'Sidebar';
        if (/\bcard\b|\bbtn\b|\bbadge\b|feature-|pricing-|testimonial/.test(combined)) return 'Components';
 
        const rect = current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const absoluteTop = rect.top + scrollTop;
        const pageHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
 
        const isStructural = rect.width > window.innerWidth * 0.5 || rect.width > 600;
 
        if (isStructural) {
            if (absoluteTop < 80) return 'Navigation';
            if (absoluteTop < 400) return 'Header / Hero';
            if (absoluteTop > pageHeight - 300) return 'Footer';
        }
 
        current = current.parentElement;
     }
     return "Main Content" ;

}


function hasVisibleText(element: HTMLElement): boolean {
    const text = element.textContent?.trim() || '';
    if (text.length === 0) return false;
 
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;
 
    return true;
}






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

//    const propsToScan = ["backgroundColor", 'color'];

    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
        // Prevent scanning our own extractor drawer panel UI color codes
        // if (sidePanelElement && sidePanelElement.contains(element)) return;

        const htmlElement = element as HTMLElement;

         if (shouldSkipElement(htmlElement)) return;
     
        const sectionName = getElementSection(htmlElement);

        try {
            const styles = window.getComputedStyle(element);

            //   propsToScan.forEach(prop => {
            //     const val = styles.getPropertyValue(
            //         prop.replace(/([A-Z])/g, '-$1').toLowerCase()
            //     );
            //     if (val) {
            //         const hex = rgbToHex(val);
            //         if (hex && isUsefulColor(hex)) {
            //             sectionedData[sectionName]?.add(hex);
            //         }
            //     }
            // });
            

            const bgVal = styles.getPropertyValue('background-color');
            if (bgVal) {
                const hex = rgbToHex(bgVal);
                if (hex && isUsefulColor(hex)) {
                    sectionedData[sectionName]?.add(hex);
                }
            }


            if (hasVisibleText(htmlElement)) {
                const colorVal = styles.getPropertyValue('color');
                if (colorVal) {
                    const hex = rgbToHex(colorVal);
                    if (hex && isUsefulColor(hex)) {
                        sectionedData[sectionName]?.add(hex);
                    }
                }
            }


        } catch (e) {}
    });

    

    const finalPayload: Record<string, string[]> = {};
    for (const [zone, colorSet] of Object.entries(sectionedData)) {
        if (colorSet.size > 0) {
            finalPayload[zone] = Array.from(colorSet).slice(0, 8);
        }
    }
    return finalPayload;
}

// function handleSidebarToggle() {
//     // If sidebar is already open on the page screen view, slide it away and destroy it cleanly
//     if (sidePanelElement) {
//         sidePanelElement.style.right = '-360px';
//         setTimeout(() => {
//             if (sidePanelElement) {
//                 sidePanelElement.remove();
//                 sidePanelElement = null;
//             }
//         }, 300);
//         return;
//     }

//     // Build the full height layout overlay element node container
//     sidePanelElement = document.createElement('div');
//     sidePanelElement.id = "tailwind-extractor-sidebar-frame";
    
//     Object.assign(sidePanelElement.style, {
//         position: 'fixed',
//         top: '0',
//         right: '-360px', // Starts offscreen
//         width: '340px',
//         height: '100vh',
//         backgroundColor: '#0f172a',
//         color: '#f8fafc',
//         boxShadow: '-8px 0 24px rgba(0,0,0,0.4)',
//         zIndex: '999999999', // Forces interface above standard web wrappers
//         transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//         fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
//         padding: '20px',
//         boxSizing: 'border-box',
//         overflowY: 'auto'
//     });

//     renderSidebarHTMLMarkup();
//     document.body.appendChild(sidePanelElement);
    
//     // Trigger smooth slide entry animation transition
//     setTimeout(() => { if (sidePanelElement) sidePanelElement.style.right = '0'; }, 20);
// }

// function renderSidebarHTMLMarkup() {
//     if (!sidePanelElement) return;

//     sidePanelElement.innerHTML = `
//         <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
//             <div>
//                 <h1 style="font-size:18px; font-weight:bold; color:#2dd4bf; margin:0;">Tailwind Extractor</h1>
//                 <p style="font-size:11px; color:#64748b; margin:2px 0 0 0;">Phase 2 : Architectural Section View</p>
//             </div>
//             <button id="close-sidebar-panel" style="background:none; border:none; color:#64748b; font-size:22px; cursor:pointer; font-weight:bold;">&times;</button>
//         </div>
        
//         <button id="execute-dom-scan" style="width:100%; background-color:#14b8a6; color:#0f172a; font-weight:bold; font-size:12px; padding:12px; border:none; border-radius:4px; cursor:pointer; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:20px; transition:background-color 0.2s;">
//             Scan Section Tokens
//         </button>

//         <div id="sidebar-results-container" style="display:flex; flex-direction:column; gap:16px;">
//             <div style="text-align:center; color:#64748b; font-size:12px; padding:30px; border:1px dashed #1e293b; border-radius:6px;">
//                 Click scan button to process tokens section by section!
//             </div>
//         </div>
//     `;

//     // Hook click actions directly to layout components
//     sidePanelElement.querySelector('#close-sidebar-panel')?.addEventListener('click', handleSidebarToggle);
//     sidePanelElement.querySelector('#execute-dom-scan')?.addEventListener('click', runUIUpdateCycle);
// }

// function runUIUpdateCycle() {
//     const collectedData = runPageColorScan();
//     const targetBox = document.getElementById('sidebar-results-container');
//     if (!targetBox) return;

//     if (Object.keys(collectedData).length === 0) {
//         targetBox.innerHTML = `<div style="text-align:center; font-size:12px; color:#64748b;">No unique layout accent tokens identified on the page tab layers.</div>`;
//         return;
//     }

//     targetBox.innerHTML = Object.entries(collectedData).map(([sectionName, colors]) => `
//         <div style="background-color:#1e293b; border:1px solid #334155; border-radius:6px; padding:12px; display:flex; flex-direction:column; gap:10px;">
//             <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(51,65,85,0.4); padding-bottom:4px;">
//                 <span style="font-size:10px; font-weight:bold; color:#2dd4bf; text-transform:uppercase; letter-spacing:0.05em;">${sectionName}</span>
//                 <span style="font-size:9px; background-color:#020617; padding:2px 6px; border-radius:10px; color:#94a3b8; font-family:monospace;">${colors.length} tokens</span>
//             </div>
//             <div style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:8px;">
//                 ${colors.map(color => `
//                     <div style="display:flex; flex-direction:column; align-items:center; background-color:#020617; border:1px solid #1e293b; border-radius:4px; padding:6px; gap:4px;">
//                         <div style="width:100%; height:20px; border-radius:2px; background-color:${color}; border:1px solid rgba(255,255,255,0.05);"></div>
//                         <code style="font-size:9px; font-weight:bold; color:#34d399; font-family:monospace;">${color}</code>
//                     </div>
//                 `).join('')}
//             </div>
//         </div>
//     `).join('');
// }

  function extractCSSVariables(): Record<string, string>{
    const vars : Record<string, string> ={};
    const sheets = Array.from(document.styleSheets);
    
    for (const sheet of sheets) {
        try{
            const rules = Array.from(sheet.cssRules || []);

            for(const rule of rules){
                if(rule instanceof CSSStyleRule && rule.selectorText === ':root'){
                    const style = rule.style;
                    for(let i =0; i< style.length;i++){
                        const prop = style[i];
                        if(prop.startsWith('--')){
                           const val = style.getPropertyValue(prop).trim();

                           if(
                            val.startsWith('#') ||
                            val.startsWith("rgb")||
                            val.startsWith('hsl') ||
                             /^\d{1,3}\s+\d{1,3}%\s+\d{1,3}%$/.test(val) 
                           ){
                              vars[prop] = val;
                           }
                        }
                    }
                }
            }

        }
        catch(e){

        }
    }
      
      return vars ;

  }

  interface fontSizeToken {
      value: string;
      section: string;
      element: string;
  }

  interface SpacingToken {
    value: string;
    section: string;
    property: string;
}

  
  function extractFontTokens(): {families: string[]; sizes: fontSizeToken[]} {
    const familySet = new Set<string>();
    const sizeMap = new Map<string, fontSizeToken>();

   document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, li, label').forEach((el) => {
      const htmlEl = el as HTMLElement;

      try{
         const styles = window.getComputedStyle(htmlEl);
         if(styles.display === 'none' || styles.visibility === 'hidden') return; 

            const family = styles.fontFamily;
            if(family){
                const primary = family.split(',')[0].trim().replace(/['"]/g, '');
        
                if(primary && primary !== 'inherit' && primary.length >1){
                    familySet.add(primary);
                }
            }

            const size = styles.fontSize;
            if(size && size!== '0px'){
                const px = parseFloat(size);
                if(px > 0){
                    const key = `${px}px` ;

                    if(!sizeMap.has(key)){
                        sizeMap.set(key, {
                            value: key, 
                            section: getElementSection(htmlEl),
                            element: htmlEl.tagName.toLowerCase()
                        });
                    }
                }
            }

        } catch(e) {}

       
   });

   return {
      families: Array.from(familySet).slice(0, 5),
        sizes: Array.from(sizeMap.values())
            .sort((a, b) => parseFloat(a.value)- parseFloat(b.value))
            .slice(0, 12)
   };


  }


  function extractSpacingTokens(): SpacingToken[]{
       const spacingMap = new Map<string, SpacingToken >();

       document.querySelectorAll('section, article, header, footer, nav, main, aside, div[class], button').forEach((el) =>{
           if(shouldSkipElement(el as HTMLElement)) return ;

           const htmlEl = el as HTMLElement;
           const section = getElementSection(htmlEl);


           try{
                const styles = window.getComputedStyle(el);
                 
                const propLabels: Record<string, string> = {
                'padding-top':  'padding',
                'padding-left': 'padding',
                'gap':          'gap',
            };

                Object.entries(propLabels).forEach(([prop, label]) => {
                    const val = styles.getPropertyValue(prop);
                    if (val && val !== '0px' && val !== 'normal') {
                        const px = parseFloat(val);
                        if (px >= 4 && px <= 128) {
                            const key = `${px}px`; 
                            if (!spacingMap.has(key)) {
                                spacingMap.set(key, {
                                    value: key,
                                    section,
                                    property: label
                                });  
                        }
                    }
                }
                });
            } catch (e) {}
       });

       return Array.from(spacingMap.values())
        .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))
        // .filter((v, i, arr) => arr.indexOf(v) === i)
        // .map(v => `${v}px`)
        .slice(0, 15);
  }

//   function settleScrollState(): Promise<void> {
//     return new Promise((resolve) => {
//         const originalY = window.scrollY;
 
//         window.scrollTo(0, document.body.scrollHeight);
 
//         // give lazy-mounted content (footers behind IntersectionObserver,
//         // infinite-scroll triggers, etc.) a moment to actually render
//         setTimeout(() => {
//             window.scrollTo(0, 0);
 
//             // give the navbar's scroll-listener time to revert its
//             // "scrolled" class/styles back to the top-of-page state
//             setTimeout(() => {
//                 resolve();
//             }, 150);
//         }, 250);
//     });
// }


chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
     if(message.action === "PING_DOM") {
       const sections = runPageColorScan();
       const cssVars = extractCSSVariables();
       const fonts = extractFontTokens();
        const spacing = extractSpacingTokens();

       sendResponse({
         status: "success",
         sections,
         cssVars,
         fonts,
         spacing
       });
     }
     return true ;
});



