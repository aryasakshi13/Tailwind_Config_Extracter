console.log("The scraper script has been successfully injected");

chrome.runtime.onMessage.addListener(
    (
        message: {action: string}, 
        sender: chrome.runtime.MessageSender, 
        sendResponse:(response: { status: string; backgroundColor: string })=> void)=>{

         if(message.action === "PING_DOM"){
    
        const bodyStyles = window.getComputedStyle(document.body);
        const actualColor = bodyStyles.backgroundColor ;

        sendResponse({
            status: "success",
            backgroundColor: actualColor
        });
     }

     return true ;
})