/* Cover book, typing names, tassel scroll, countdown */
/* typing */
function type(el,txt,cb){let i=0;el.classList.add('cur');const t=setInterval(()=>{el.textContent=txt.slice(0,++i);if(i>=txt.length){clearInterval(t);el.classList.remove('cur');cb&&cb()}},130)}
let namesOn=false;
function startNames(){type($('#n1'),NAMES[L][0],()=>type($('#n2'),NAMES[L][1],()=>{namesOn=true}))}
/* cover video */
{const v=$('#cover .cvbg');v.muted=true;vplay(v)}
/* open book */
const act=(el,fn)=>el.addEventListener('keydown',e=>{if(e.key=='Enter'||e.key==' '||e.key=='ArrowDown'){e.preventDefault();fn.call(el)}});
$('#book').onclick=function(){if(this.classList.contains('lift'))return;const b=this,c=$('#cover'),sc=$('.scene');
b.classList.add('lift');c.classList.add('opening');music();petals(22);
setTimeout(()=>b.classList.add('open'),380);
setTimeout(()=>{sc.classList.add('dive');c.classList.add('flash')},2300);
setTimeout(()=>{c.classList.add('gone');{const v=$('#cover .cvbg');v&&v.pause()}$('#app').classList.add('on');$('#mus').style.display='block';startNames();petals(14)},2900)};
/* tassel */
let opened=false;function openScroll(){if(opened)return;opened=true;$('#paper').classList.add('open');$('#p3').classList.add('op');$('#fing').remove();$('#pull').remove();$('#tass').setAttribute('tabindex','-1');
const c=['#d4af6a','#e5758f','#6e1f2f','#f1d89a'],s=$('#p3');for(let i=0;i<36;i++){const e=document.createElement('i');e.className='cf';e.style.cssText=`left:${Math.random()*100}%;background:${c[i%4]};--dx:${(Math.random()-.5)*120}px;animation-delay:${Math.random()*1.2}s`;s.appendChild(e);setTimeout(()=>e.remove(),5000)}petals(10)}
(()=>{const t=$('#tass');let y0=null;
t.addEventListener('pointerdown',e=>{y0=e.clientY;t.setPointerCapture(e.pointerId);t.classList.add('drag')});
t.addEventListener('pointermove',e=>{if(y0===null)return;const dy=Math.max(0,Math.min(e.clientY-y0,50));t.style.height=(100+dy)+'px';if(e.clientY-y0>30){y0=null;openScroll()}});
const end=()=>{if(y0!==null)openScroll();y0=null;t.classList.remove('drag');t.style.height=''};
t.addEventListener('pointerup',end);t.addEventListener('pointercancel',()=>{y0=null;t.classList.remove('drag');t.style.height=''});})();
$('#fing').onclick=openScroll;act($('#fing'),openScroll);act($('#tass'),openScroll);act($('#book'),()=>$('#book').click());
/* countdown */
const T=new Date('2027-03-25T20:00:00+05:30');
function tick(){let d=Math.max(0,T-Date.now());const over=d==0,box=$('#cd'),msg=$('#cdmsg');if(box.hidden!==over){box.hidden=over;msg.hidden=!over}if(over)return;const v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];document.querySelectorAll('#cd b').forEach((b,i)=>{const s=String(v[i]).padStart(2,'0');if(b.textContent!==s){b.textContent=s;b.classList.remove('fp');void b.offsetWidth;b.classList.add('fp')}})}
tick();setInterval(tick,1000);
