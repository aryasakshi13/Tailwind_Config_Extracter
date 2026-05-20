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

console.log("Deep Palate Scraper Injected!");
function rgbToHex(rgbStr: string): string | null {
    const match = rgbStr.match(/\d+/g);

    if(!match || match.length <3 )  return null ;

    if(match.length ===4 && parseFloat(match[3])=== 0) return null ;

    const r = parseInt(match[0]).toString(16).padStart(2, '0');
     const g = parseInt(match[1]).toString(16).padStart(2, '0');
      const b= parseInt(match[2]).toString(16).padStart(2, '0');

     return `#${r}${g}${b}`.toLowerCase();
}

chrome.runtime.onMessage.addListener((message, sender, sendresponse) =>{
     if(message.action === "PING_DOM"){

        console.log("Analyzing actual webpage layout elements...");

         const uniqueColors = new Set<string>();

         const allElements = document.querySelectorAll("*");

         allElements.forEach((element) =>{
             const styles = window.getComputedStyle(element);
             const bg = styles.backgroundColor ;
             const text = styles.color;

             if(bg){
                const hexBg = rgbToHex(bg);
                if(hexBg && hexBg !== "#ffffff" && hexBg !== "#000000"){
                    uniqueColors.add(hexBg);
                }
             }

             if(text){
                const hextText = rgbToHex(text);
                 if(hextText){
                    uniqueColors.add(hextText);
                 }
             }
         });

         sendresponse({
            status: "success",
            colors: Array.from(uniqueColors).slice(0,12)
         });
     }
      return true ;
})



