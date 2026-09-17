document.getElementById('year').textContent = new Date().getFullYear();
const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const topbar=document.getElementById('topbar');
addEventListener('scroll',()=>topbar.classList.toggle('scrolled',scrollY>10),{passive:true});

const portrait=document.getElementById('heroPortrait');
const portraitModal=document.getElementById('portraitModal');
const portraitClose=document.getElementById('portraitClose');

function updatePortrait(){
  const mobile=innerWidth<=620;
  const headerH=mobile?74:76;
  const miniSize=mobile?36:44;
  const fullW=innerWidth;
  const fullH=Math.max(420,innerHeight-headerH);
  const end=Math.max(280,Math.min(620,innerHeight*.62));
  const p=Math.max(0,Math.min(1,scrollY/end));
  const ease=1-Math.pow(1-p,3);
  const nav=document.querySelector('.nav');
  const navRect=nav.getBoundingClientRect();
  const targetLeft=navRect.left;
  const targetTop=navRect.top+Math.max(0,(navRect.height-miniSize)/2);
  const left=targetLeft*ease;
  const top=headerH+(targetTop-headerH)*ease;
  const width=fullW+(miniSize-fullW)*ease;
  const height=fullH+(miniSize-fullH)*ease;
  const radius=(miniSize/2)*ease;
  portrait.style.left=left+'px';
  portrait.style.top=top+'px';
  portrait.style.width=width+'px';
  portrait.style.height=height+'px';
  portrait.style.borderRadius=radius+'px';
  portrait.style.opacity=String(.44 + .56*ease);
  portrait.style.zIndex=p>.72?'60':'2';
  const isMini=p>.88;
  portrait.classList.toggle('is-mini',isMini);
  topbar.classList.toggle('portrait-mini',isMini);
  portrait.setAttribute('aria-hidden',isMini?'false':'true');
}
let portraitTick=false;
function requestPortraitUpdate(){
  if(!portraitTick){
    requestAnimationFrame(()=>{updatePortrait();portraitTick=false});
    portraitTick=true;
  }
}
addEventListener('scroll',requestPortraitUpdate,{passive:true});
addEventListener('resize',requestPortraitUpdate,{passive:true});
updatePortrait();

portrait.addEventListener('click',()=>{
  if(!portrait.classList.contains('is-mini')) return;
  portraitModal.classList.add('open');
  portraitModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
});
function closePortrait(){
  portraitModal.classList.remove('open');
  portraitModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
portraitClose.addEventListener('click',closePortrait);
portraitModal.addEventListener('click',e=>{if(e.target===portraitModal)closePortrait()});
addEventListener('keydown',e=>{if(e.key==='Escape')closePortrait()});

// Mobile fix: keep the Master's thesis preview fully inside its card.
const thesisMobileFix=document.createElement('style');
thesisMobileFix.textContent=`@media(max-width:700px){.chapter.reverse{min-width:0}.chapter.reverse .media{width:100%;max-width:100%;min-width:0}.chapter.reverse .media>a{display:block;width:100%;max-width:100%}.chapter.reverse .media img{display:block;width:100%;max-width:100%;height:auto;aspect-ratio:auto;object-fit:contain;object-position:center;transform:none}.chapter.reverse .media:hover img{transform:none}}`;
document.head.appendChild(thesisMobileFix);
