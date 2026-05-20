console.log("The scraper script has been successfully injected");

chrome.runtime.onMessage.addListener(
    (
        message: {action: string}, 
        sender: chrome.runtime.MessageSender, 
        sendResponse:(response: any)=> void)=>{

         if(message.action === "PING_DOM"){
            console.log("POPup clicked ! Analyzing the page backhround color...");

            const bodyStyles = window.getComputedStyle(document.body);
            let actualColor = bodyStyles.backgroundColor ;


          if(actualColor === "rgba(0, 0, 0, 0)" || actualColor === "transparent"){
             const rootStyles = window.getComputedStyle(document.documentElement);
             actualColor = rootStyles.backgroundColor;
          }

          if (actualColor === "rgba(0, 0, 0, 0)" || actualColor === "transparent") {
                // Check if the user's system or site prefers a dark layout
                const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                actualColor = isDarkMode ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)";
            }
        
             
        sendResponse({
            status: "success",
            backgroundColor: actualColor
        });
     }

     return true ;
});