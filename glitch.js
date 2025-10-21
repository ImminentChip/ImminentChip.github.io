const overlay = document.getElementById('glitchOverlay') || (()=> {
const el = document.createElement('div'); el.id='glitchOverlay'; document.body.appendChild(el); return el;
})();
const html = document.documentElement;
const swup = new Swup({ containers: ['#swup'], animateHistoryBrowsing: true });

(function mount(){
  overlay.innerHTML = `
    <div class="blocks"></div>
    <div class="scan"></div>
    <div class="flash"></div>
  `;
})();

const disp = document.querySelector('#glitchDisp feDisplacementMap');
function setDispScale(v){ if(disp) disp.setAttribute('scale', String(v)); }

const R = (a,b)=> Math.random()*(b-a)+a;
function shuffleBlocks(){
  overlay.style.setProperty('--bw', `${Math.round(R(8,20))}px`);
  overlay.style.setProperty('--bh', `${Math.round(R(8,20))}px`);
  overlay.style.setProperty('--bx', `${Math.round(R(-16,16))}px`);
  overlay.style.setProperty('--by', `${Math.round(R(-12,12))}px`);
}

function playGlitch(cb){
  html.classList.add('glx');
  overlay.classList.add('show');

  setDispScale(0);
  shuffleBlocks();

  const t0 = setTimeout(()=>{ setDispScale(38); shuffleBlocks(); }, 40);
  const t1 = setTimeout(()=>{ setDispScale(22); shuffleBlocks(); }, 110);
  const t2 = setTimeout(()=>{ setDispScale(30); shuffleBlocks(); }, 180);

  overlay.style.setProperty('--fy', `${Math.round(R(-10, 90))}%`);
  overlay.style.setProperty('--fo', 1);
  const tFlash = setTimeout(()=> overlay.style.setProperty('--fo', 0), 120);

  setTimeout(()=>{
    overlay.classList.remove('show');
    html.classList.remove('glx');
    setDispScale(0);
    [t0,t1,t2,tFlash].forEach(clearTimeout);
    cb && cb();
  }, 360);
}

swup.hooks.on('animation:out:start', ()=> playGlitch());
