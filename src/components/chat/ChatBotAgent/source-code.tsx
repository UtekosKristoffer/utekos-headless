import Script from 'next/script'

export function ChatBotAgent() {
  const ChatBotAgentSourceCode = `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="SO0afKtc9hg24ytkt83_9";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`
  return (
    <>
      <Script
        id='chatbot-agent'
        async
        dangerouslySetInnerHTML={{ __html: ChatBotAgentSourceCode }}
      />
    </>
  )
}
