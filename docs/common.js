// 공통: 하단 탭바 + 글자 크기
(function(){
 const FS=[0.9,1,1.12,1.25];let fi=1;try{const v=localStorage.getItem('fs');if(v!=null)fi=+v}catch(e){}
 const css=document.createElement('style');css.textContent=`
 body{padding-bottom:64px}
 .wrap{zoom:var(--z,1)}
 nav.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:20;display:grid!important;grid-template-columns:repeat(4,1fr);gap:0!important;background:var(--surface);border-top:1px solid var(--line);padding:4px 4px calc(4px + env(safe-area-inset-bottom));margin:0}
 nav.tabbar a{border:0!important;background:none!important;color:var(--muted)!important;display:flex;flex-direction:column;align-items:center;gap:0;padding:4px 0!important;font-size:12px!important;font-weight:600}
 nav.tabbar a i{font-style:normal;font-size:20px;line-height:1.3;filter:grayscale(1);opacity:.6}
 nav.tabbar a.on{color:var(--accent)!important}nav.tabbar a.on i{filter:none;opacity:1}
 .dock{bottom:calc(58px + env(safe-area-inset-bottom))!important;padding-bottom:10px!important}
 .fsbtn{position:fixed;top:10px;right:12px;z-index:21;font:inherit;font-size:13px;font-weight:700;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:4px 10px;opacity:.85}
 .wrap{padding-top:46px!important}`;
 document.head.append(css);document.documentElement.style.setProperty('--z',FS[fi]);
 const ICON={'회화':'💬','어휘':'📚','리스닝':'🎧','리딩':'📄'};
 addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('nav');
  if(nav){nav.classList.add('tabbar');nav.querySelectorAll('a').forEach(a=>{const t=a.textContent.trim();a.innerHTML=`<i>${ICON[t]||'•'}</i>${t}`});document.body.append(nav)}
  const b=document.createElement('button');b.className='fsbtn';b.setAttribute('aria-label','글자 크기');
  const lab=()=>b.textContent='가'+['−','','+','++'][fi];lab();
  b.onclick=()=>{fi=(fi+1)%FS.length;document.documentElement.style.setProperty('--z',FS[fi]);try{localStorage.setItem('fs',fi)}catch(e){};lab()};
  document.body.append(b);
 });
})();
