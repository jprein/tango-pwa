function x(d,p){for(var a=0;a<p.length;a++){const i=p[a];if(typeof i!="string"&&!Array.isArray(i)){for(const l in i)if(l!=="default"&&!(l in d)){const s=Object.getOwnPropertyDescriptor(i,l);s&&Object.defineProperty(d,l,s.get?s:{enumerable:!0,get:()=>i[l]})}}}return Object.freeze(Object.defineProperty(d,Symbol.toStringTag,{value:"Module"}))}var S=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function k(d){return d&&d.__esModule&&Object.prototype.hasOwnProperty.call(d,"default")?d.default:d}var w={exports:{}};(function(d,p){(function(a,i){d.exports=i()})(self,function(){return(()=>{var a={d:(n,e)=>{for(var o in e)a.o(e,o)&&!a.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},o:(n,e)=>Object.prototype.hasOwnProperty.call(n,e),r:n=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}},i={};a.r(i),a.d(i,{downloadVideo:()=>M,logMediaDevices:()=>l,modalContent:()=>c,openVideoPlayback:()=>y,openVideoPreview:()=>g,startRecorder:()=>f,startStream:()=>b,stopRecorder:()=>v,stopStream:()=>m,toggleModal:()=>s,uploadVideo:()=>h});const l=(n=!0,e=!0,o=!1)=>{navigator.mediaDevices.enumerateDevices().then(t=>{t.forEach(r=>{console.log(`${n&&r.kind.toUpperCase()}, ${e&&r.label}, ${o&&r.deviceId}`)})}).catch(t=>{console.log(t.name,t.message)})},s=()=>{window.location.href=window.location.href.indexOf("#greeting-modal")!==-1?"#":"#greeting-modal"},c=(n="<h1>Hi</h1>",e="deeppink")=>{const o=document.getElementById("modal-content");document.getElementById("modal").style.backgroundColor=e,n==="#video-preview"?(document.getElementById("video-playback").style.display="none",o.innerHTML="",document.getElementById("video-preview").style.display="block"):n==="#video-playback"?(document.getElementById("video-preview").style.display="none",o.innerHTML="",document.getElementById("video-playback").style.display="block"):(document.getElementById("video-preview").style.display="none",document.getElementById("video-playback").style.display="none",o.innerHTML=n),window.location.href="#greeting-modal"},g=()=>{c("#video-preview","white")},y=()=>{c("#video-playback","white")},b=(n={audio:!0,video:{facingMode:"user",frameRate:15}})=>{navigator.mediaDevices.getUserMedia(n).then(e=>{window.localStream=e;const o=document.querySelector("#video-preview");"srcObject"in o?o.srcObject=e:o.src=window.URL.createObjectURL(e),o.onloadedmetadata=()=>o.play()}).catch(e=>console.log(e.name,e.message))},m=()=>{"localStream"in window&&window.localStream.getTracks().forEach(n=>n.stop())},f=(n={audio:!0,video:{facingMode:"user"},frameRate:15})=>{let e={mimeType:"video/webm;codecs=vp9,opus"};MediaRecorder.isTypeSupported(e.mimeType)||(console.error(`${e.mimeType} is not supported, using vp8`),e={mimeType:"video/webm;codecs=vp8,opus"},MediaRecorder.isTypeSupported(e.mimeType)||(console.error(`${e.mimeType} is not supported`),e={mimeType:"video/webm"},MediaRecorder.isTypeSupported(e.mimeType)||(console.error(`${e.mimeType} is not supported`),e={mimeType:""}))),navigator.mediaDevices.getUserMedia(n).then(o=>{window.localStream=o;const t=document.querySelector("#video-preview");"srcObject"in t?t.srcObject=o:t.src=window.URL.createObjectURL(o),t.onloadedmetadata=()=>t.play(),window.MediaRecorder=new MediaRecorder(window.localStream,e),window.dataChunks=[],window.MediaRecorder.start(),console.log(window.MediaRecorder.state),window.MediaRecorder.ondataavailable=r=>window.dataChunks.push(r.data)}).catch(o=>console.log(o.name,o.message))},v=()=>{"MediaRecorder"in window&&window.MediaRecorder.state==="recording"&&(window.MediaRecorder.stop(),console.log(window.MediaRecorder.state),window.MediaRecorder.onstop=()=>{window.blobvid=new Blob(window.dataChunks,{type:"video/webm"}),window.dataChunks=[],window.videoURL=window.URL.createObjectURL(window.blobvid),document.getElementById("video-playback").src=window.videoURL}),m()},h=(n,e="upload_video.php")=>{if(window.blobvid){const o={fname:new Date().toISOString().replaceAll(":","-").replace(".","-"),uploadContent:"<h1>Uploading</h1>",uploadColor:"coral",successContent:"<h1>Successful</h1>",successColor:"cyan",...n};c(o.uploadContent,o.uploadColor);const t=e,r=new FormData;r.append("vidfile",window.blobvid,o.fname),fetch(t,{method:"POST",body:r}).then(()=>{c(o.successContent,o.successColor)}).catch(console.error)}else c("<h1>No recording was found 😔</h1>","PeachPuff")},M=(n="video.webm")=>{if(window.blobvid){console.log(n);const e=document.createElement("a");e.href=window.videoURL,e.download=n,e.click(),e.remove()}else console.log("No video found in window object")};return(()=>{const n=document.createElement("style");n.innerHTML=`
  /* Greeting Modal Container */
  #greeting-modal {
    visibility: hidden;
    opacity: 0;
    transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  
  /* Greeting Modal Container - when open */
  #greeting-modal:target {
    visibility: visible;
    opacity: 1;
  }
  
  /* Greeting Modal */
  #greeting-modal #modal {
    opacity: 0;
    transform: translateY(-1rem);
    transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-delay: 0.1s;
  }
  
  /* Greeting Modal - when open */
  #greeting-modal:target #modal {
  transform: translateY(0);
  opacity: 1;
  }
  
  /* Modal Container Styles for flex box */
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  
  /* Modal Background Styles */
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
  }
  
  /* Modal Body Styles */
  #modal {
    z-index: 1;
    background-color: white;
    width: max-content; /* 500px */
    padding: 1rem;
    border-radius: 8px;
  }
  
  #modal .close {
    position: absolute;
    right: -16px;
    top: -16px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
  }
  #modal .close:hover {
    opacity: 1;
  }

  #modal .close:before, .close:after {
    position: absolute;
    left: 16px;
    content: ' ';
    height: 34px;
    width: 3px;
    background-color: #333;
  }
  #modal .close:before {
    transform: rotate(45deg);
  }
  #modal .close:after {
    transform: rotate(-45deg);
  }
  
  
`,document.head.appendChild(n);const e=document.createRange().createContextualFragment(`
  <!-- Modal container -->
  <div class="modal-container" id="greeting-modal">

    <!-- Modal  -->
    <div id="modal">
      <video id="video-preview" muted style="display: none;"></video>
      <video id="video-playback" controls style="display: none"></video>
      <div id="modal-content"></div>
      <a href="#" class="close">
    </div>

    <!-- Background, click to close -->
    <a href="#" class="modal-bg"></a>
  </div>
`);document.body.appendChild(e)})(),i})()})})(w);var u=w.exports;const R=k(u),T=x({__proto__:null,default:R},[u]);export{S as c,u as i,T as m};
