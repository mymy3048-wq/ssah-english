// 모든 페이지 공통: 미국 남자 목소리 우선
(function(){
 const MALE=/(male|guy|david|mark|alex|aaron|fred|tom|evan|nathan|ryan|eric|christopher|andrew|brian|roger|steffan|iol|iom|tpd|iog|ioq)/i, FEM=/(female|samantha|zira|aria|jenny|ava|allison|susan|victoria|karen|sfg|tpf|tpc|iob|tpe)/i;
 let V=[];
 function load(){const all=speechSynthesis.getVoices().filter(v=>/^en[-_]US/i.test(v.lang));
   V=all.filter(v=>MALE.test(v.name+v.voiceURI)&&!FEM.test(v.name+v.voiceURI));
   window.US_VOICES=all;window.MALE_VOICES=V}
 try{load();speechSynthesis.addEventListener('voiceschanged',load)}catch(e){}
 window.pickVoice=function(n){let pref='';try{pref=localStorage.getItem('voice')||''}catch(e){}
   const all=window.US_VOICES||[];const p=all.find(v=>v.name===pref);
   if(p&&!n)return p; return V.length?V[(n||0)%V.length]:(p||all[0]||null)};
 const sp=speechSynthesis.speak.bind(speechSynthesis);
 speechSynthesis.speak=function(u){try{if(!u.voice){const v=pickVoice(0);if(v){u.voice=v;u.lang=v.lang}}
   if(!MALE_VOICES.length&&u.pitch===1){let pref='';try{pref=localStorage.getItem('voice')||''}catch(e){} if(!pref)u.pitch=0.7}}catch(e){} sp(u)};
})();
