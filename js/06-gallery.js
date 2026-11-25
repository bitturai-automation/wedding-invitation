/* Loading screen, function carousel, Our Story gallery */
/* loading screen + lazy media */
{const t0=performance.now(),cv=$('#cover .cvbg');
 const vid=new Promise(r=>{if(cv.readyState>=2)r();else cv.addEventListener('loadeddata',r,{once:true})});
 Promise.race([Promise.all([vid,document.fonts?document.fonts.ready:0]),new Promise(r=>setTimeout(r,3500))]).then(()=>setTimeout(()=>{$('#load').classList.add('gone');bgm.preload='auto';try{bgm.load()}catch(e){}},Math.max(0,900-(performance.now()-t0))))}
{const lz=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const v=e.target.querySelector('video[data-src]');if(v){v.src=v.dataset.src;v.removeAttribute('data-src')}lz.unobserve(e.target)}}),{root:$('#app'),rootMargin:'100% 0px'});['p4','p6','p8'].forEach(i=>lz.observe($('#'+i)))}
function carousel(){const cs=[...rail.children],c=rail.scrollLeft+rail.clientWidth/2;let best=0,bd=1e9;cs.forEach((el,i)=>{const m=el.offsetLeft+el.offsetWidth/2,d=(m-c)/el.offsetWidth,a=Math.min(Math.abs(d),1.5);el.style.transform=`rotateY(${-d*32}deg) scale(${1-a*.1})`;el.style.opacity=1-a*.3;if(Math.abs(m-c)<bd){bd=Math.abs(m-c);best=i}});[...$('#d4').children].forEach((d,i)=>d.classList.toggle('a',i==best));cs.forEach((el,i)=>el.classList.toggle('cur',i==best))}
rail.addEventListener('scroll',carousel,{passive:true});carousel();
[...$('#d4').children].forEach((d,i)=>d.onclick=()=>rail.children[i].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'}));
/* gallery */
const P=[['assets/photos/s1.jpg','Two hearts, one beautiful beginning',['The Beginning','शुरुआत'],'50% 68%'],['assets/photos/s2.jpg','Where every glance becomes a promise',['The Promise','वादा'],'50% 78%'],['assets/photos/s3.jpg','Surrounded by love, laughter and blessings',['The Blessings','आशीर्वाद'],'42% 55%'],['assets/photos/s4.jpg','Every celebration is sweeter with family',['The Celebration','उत्सव'],'50% 62%']];
const gal=$('#gal'),th=$('#d5');let gi=0,gUser=0;
P.forEach((p,i)=>{gal.insertAdjacentHTML('beforeend',`<div class="sl"><div class="ph"><svg class="orn" viewBox="0 0 48 48" aria-hidden="true"><use href="#lotus"/></svg><img src="${p[0]}" alt="${p[1]}" loading="lazy" draggable="false" style="object-position:${p[3]}"></div></div>`);
 th.insertAdjacentHTML('beforeend',`<button aria-label="Photo ${i+1}"><img src="${p[0]}" alt="" loading="lazy" draggable="false" style="object-position:${p[3]}"></button>`)});
function gtxt(){const p=P[gi],n=P.length;[...th.children].forEach((b,k)=>b.classList.toggle('on',k==gi));
 const c=$('#gct');c.classList.remove('in');void c.offsetWidth;c.classList.add('in');
 $('#gch').textContent='0'+(gi+1)+' / 0'+n+'  ·  '+p[2][lk()];$('#gtxt').textContent=L=='hi'?(H[p[1]]||p[1]):p[1]}
let gT=0,gOff=null;
function gdots(){if(gT)return;gT=requestAnimationFrame(()=>{gT=0;if(!gOff)gOff=[...gal.children].map(el=>el.offsetLeft+el.offsetWidth/2);const c=gal.scrollLeft+gal.clientWidth/2;let best=0,bd=1e9;gOff.forEach((m,i)=>{const d=Math.abs(m-c);if(d<bd){bd=d;best=i}});
 if(best!=gi||!gal._i){gal._i=1;gi=best;[...gal.children].forEach((el,k)=>el.classList.toggle('on',k==gi));gtxt()}})}
const gto=i=>gal.children[(i+P.length)%P.length].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
gal.addEventListener('scroll',gdots,{passive:true});gal.children[0].classList.add('on');gdots();gtxt();
th.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;gUser=1;gto([...th.children].indexOf(b))});
$('#gprev').onclick=()=>{gUser=1;gto(gi-1)};$('#gnext').onclick=()=>{gUser=1;gto(gi+1)};
['pointerdown','wheel'].forEach(e=>gal.addEventListener(e,()=>{gUser=1},{passive:true}));
window.addEventListener('resize',()=>{gOff=null;gdots()});
/* sparkles */
const r=$('#p6');for(let i=0;i<22;i++){const s=document.createElement('i');s.className='sp';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*2.4}s`;r.appendChild(s)}
$('#copy').onclick=async()=>{const v=V[vk],a=v.n[0]+(v.a[0]?', '+v.a[0]:'');try{await navigator.clipboard.writeText(a)}catch(e){const x=document.createElement('textarea');x.value=a;document.body.appendChild(x);x.select();document.execCommand('copy');x.remove()}toast(t('Address copied','पता कॉपी हो गया'))};
