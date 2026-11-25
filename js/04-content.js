/* Event data, schedule timeline, function cards, venue, calendar (.ics) */
const NAMES={en:['Bittu','Aradhya'],hi:['बिट्टू','आराध्या']};
const V={
 hall:{n:['Banquet Hall','बैंक्वेट हॉल'],a:['Sector 4, Bokaro Steel City, Jharkhand','सेक्टर 4, बोकारो स्टील सिटी, झारखंड'],m:'https://maps.app.goo.gl/YNGZBL3q3VRN5Vcs7',note:['','']},
 home:{n:['Family Residence','पारिवारिक निवास'],a:['',''],m:'',note:['','']},
 baraat:{n:['Baraat start point','बारात प्रस्थान स्थल'],a:['Sector 4, Bokaro Steel City, Jharkhand','सेक्टर 4, बोकारो स्टील सिटी, झारखंड'],m:'',note:['','']}
}; // fill a (full address), m (Google Maps link) and note (parking / landmark) for each venue
const ic=(...a)=>a.map(i=>'<svg viewBox="0 0 48 48" width="46" height="46"><use href="#'+i+'"/></svg>').join('');
const F=[
{n:['Mata Pujan','माता पूजन'],ic:ic('diya','lotus','diya'),s:'2027-03-21T10:00',h:2,v:'home',dr:['Traditional Ethnic','पारंपरिक परिधान'],cn:['Saffron','केसरिया'],tc:'#e8891c',tb:'#ffe9c4',d:['#e8891c','#f7b83a','#fff3e0']},
{n:['Haldi','हल्दी'],ic:ic('mari2','mari','mari2'),s:'2027-03-23T11:00',h:2,v:'hall',dr:['Yellow / Pastel','पीला / पेस्टल'],cn:['Marigold Yellow','गेंदा पीला'],tc:'#f2c230',tb:'#fff2b8',d:['#f2c230','#fff2b8','#ffffff']},
{n:['Mehendi','मेहंदी'],ic:ic('lotus','hand','lotus'),s:'2027-03-24T16:00',h:3,v:'hall',dr:['Green / Pastel','हरा / पेस्टल'],cn:['Mehendi Green','मेहंदी हरा'],tc:'#6b8e3d',tb:'#e4efd0',d:['#6b8e3d','#a8c47a','#e4efd0']},
{n:['Sangeet','संगीत'],ic:ic('noten','drum','noten'),s:'2027-03-24T19:30',h:4,v:'hall',dr:['Glam Indo-Western','ग्लैम इंडो-वेस्टर्न'],cn:['Blush Pink','गुलाबी'],tc:'#e5758f',tb:'#fde0e6',d:['#e5758f','#f6b3c4','#fde0e6']},
{n:['Baraat','बारात'],ic:ic('spark','drum','spark'),s:'2027-03-25T17:00',h:2,v:'baraat',dr:['Festive Ethnic','उत्सवी परिधान'],cn:['Royal Red','शाही लाल'],tc:'#b3283d',tb:'#fbd5d5',d:['#b3283d','#e8891c','#d4af6a']},
{n:['Wedding & Pheras','विवाह एवं फेरे'],hl:1,ic:ic('lotus','mandap','lotus'),s:'2027-03-25T20:00',h:4,v:'hall',dr:['Traditional Ethnic','पारंपरिक परिधान'],cn:['Ivory & Gold','आइवरी व सुनहरा'],tc:'#d4af6a',tb:'#fbf0d3',d:['#d4af6a','#fbf0d3','#ffffff']},
{n:['Reception','स्वागत समारोह'],ic:ic('spark','glass','rose'),s:'2027-03-26T19:00',h:4,v:'hall',on:1,dr:['Formal / Gowns & Suits','फॉर्मल / गाउन व सूट'],cn:['Wine','वाइन'],tc:'#6e1f2f',tb:'#f3d7dc',d:['#6e1f2f','#4a1220','#d4af6a']}];
const CONTACT={name:['',''],phone:'',whatsapp:''}; // e.g. phone:'+919XXXXXXXXX' (with country code); leave empty to hide the button
const WD=[['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि']];
const MO=[['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],['जन','फ़र','मार्च','अप्रैल','मई','जून','जुल','अग','सित','अक्टू','नव','दिस']];
const lk=()=>L=='hi'?1:0, t=(e,h)=>L=='hi'?h:e;
function dparts(f){const d=new Date(f.s.slice(0,10)+'T12:00:00Z');return{wd:WD[lk()][d.getUTCDay()],day:+f.s.slice(8,10),mo:MO[lk()][+f.s.slice(5,7)-1]}}
function fmtT(f){const H=+f.s.slice(11,13),M=f.s.slice(14,16),h12=H%12||12;
 if(L!='hi')return h12+':'+M+(H<12?' AM':' PM')+(f.on?' Onwards':'');
 return (H<12?'सुबह':H<16?'दोपहर':H<20?'शाम':'रात')+' '+h12+':'+M+' बजे'+(f.on?' से':'')}
const vAddr=v=>v.a[lk()]||t('Address will be shared by the family','पता परिवार द्वारा साझा किया जाएगा');
const I={clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M12 13v5M9.500 15.500h5"/>'};
const fi=(k,z=15)=>'<svg viewBox="0 0 24 24" width="'+z+'" height="'+z+'" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+I[k]+'</svg>';

/* schedule (timeline) */
function renderS(){
 const lastEnd=+new Date(F[F.length-1].s+':00+05:30')+F[F.length-1].h*36e5,wedEnd=+new Date('2027-03-25T20:00:00+05:30');
 $('#cdmsg').textContent=Date.now()>=lastEnd?t('Thank you for your blessings and love ♥','आपके आशीर्वाद और स्नेह के लिए हृदय से धन्यवाद ♥'):t('The wedding has begun – join us for the Reception on 26 Mar, 7:00 PM','विवाह संपन्न हो रहा है – 26 मार्च, शाम 7:00 बजे स्वागत समारोह में पधारें');
 $('.mcap').textContent=t('Tap to open in Google Maps','गूगल मैप्स में खोलने के लिए छुएँ');
 const rs=$('#rsvp'),ph=(CONTACT.whatsapp||CONTACT.phone||'').replace(/[^\d+]/g,'');rs.hidden=!ph;if(ph){rs.href=CONTACT.whatsapp?'https://wa.me/'+ph.replace('+',''):'tel:'+ph;rs.textContent=CONTACT.whatsapp?t('Message the family on WhatsApp','परिवार को व्हाट्सऐप करें'):t('Call the family','परिवार को कॉल करें')}
 const now=Date.now(),mid=f=>{const m=[...f.ic.matchAll(/href="#(\w+)"/g)];return m[Math.floor(m.length/2)][1]},
 end=f=>+new Date(f.s+':00+05:30')+f.h*36e5,nx=F.findIndex(f=>end(f)>now),days=[];
 F.forEach((f,i)=>{const k=f.s.slice(0,10);let d=days[days.length-1];if(!d||d.k!=k){d={k,l:[]};days.push(d)}d.l.push(i)});
 $('#wk').textContent=t('21 – 26 Mar 2027 · 7 celebrations · Bokaro Steel City','21 – 26 मार्च 2027 · 7 समारोह · बोकारो स्टील सिटी');
 $('#sch').innerHTML='<div class="tl">'+days.map(d=>{const f0=F[d.l[0]],p=dparts(f0);
  return `<div class="day" style="--tc:${f0.tc};--tb:${f0.tb}"><div class="dd"><b>${p.day}</b><i>${p.wd}</i></div><div class="evs">`+d.l.map(i=>{const f=F[i],v=V[f.v],past=end(f)<now,cls='ev'+(f.hl?' hl':'')+(past?' past':'')+(i==nx?' next':'');
   const tag=i==nx?`<em class="tg">${t('Next','अगला')}</em>`:past?`<em class="tg ok">${t('Done','संपन्न')}</em>`:'';
   return `<div class="${cls}" style="--tc:${f.tc};--tb:${f.tb}"><span class="eic"><svg viewBox="0 0 48 48" aria-hidden="true"><use href="#${mid(f)}"/></svg></span><div class="ei"><strong>${f.n[lk()]}${tag}</strong><div class="mt"><span class="et">${fi('clock',12)}${fmtT(f)}</span>${v.m?`<a class="ev2" href="${v.m}" target="_blank" rel="noopener" aria-label="${t('Open map','मैप खोलें')}">${fi('pin',12)}${v.n[lk()]}</a>`:`<span class="ev2">${fi('pin',12)}${v.n[lk()]}</span>`}</div></div><div class="sa"><button data-cal="${i}" aria-label="${t('Add to calendar','कैलेंडर में जोड़ें')}">${fi('cal',15)}</button></div></div>`}).join('')+`</div></div>`}).join('')+'</div>'}
const rail=$('#rail');
$('#d4').innerHTML=F.map(()=>'<i></i>').join('');
function renderF(){
 rail.innerHTML=F.map((f,i)=>{const p=dparts(f),v=V[f.v],vn=v.n[lk()],vl=v.m?`<a href="${v.m}" target="_blank" rel="noopener">${vn}</a>`:vn;
 return `<div class="card" style="--tc:${f.tc};--tb:${f.tb}"><button class="cb" data-cal="${i}" aria-label="${t('Add to calendar','कैलेंडर में जोड़ें')}">${fi('cal',18)}</button><div class="ill" style="background:${f.tb}">${f.ic}</div><h3 class="pf">${f.n[lk()]}</h3><div class="fn-meta"><div class="fn-date"><span>${p.wd}</span><strong class="pf">${p.day}</strong><em>${p.mo}</em></div><ul class="fn-info"><li>${fi('clock')}<b>${fmtT(f)}</b></li><li>${fi('pin')}<span>${vl}</span></li></ul></div><div class="fn-foot"><div><small>${t('Dress code','परिधान')}</small><span>${f.dr[lk()]}</span></div><div><small>${t('Colours to wear','पहनने के रंग')}</small><span>${f.d.map(c=>`<i class="cdot" style="background:${c}"></i>`).join('')}<br>${f.cn[lk()]}</span></div></div></div>`}).join('');
 renderS();
 if(typeof carousel=='function')carousel()}
let vk='hall';
function renderV(){const v=V[vk];
 $('#vtabs').innerHTML=Object.keys(V).map(k=>`<button class="chip${k==vk?' a':''}" data-v="${k}">${V[k].n[lk()]}</button>`).join('');
 $('#vn').textContent=v.n[lk()];$('#va').textContent=vAddr(v);$('#vnote').textContent=v.note[lk()];
 $('#vmap').style.display=$('#vdir').style.display=v.m?'':'none';
 if(v.m){$('#vmap').href=$('#vdir').href=v.m}}
/* calendar (.ics) */
function addCal(idx){const list=idx==null?F:[F[idx]],z=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,''),q=x=>String(x).replace(/\\/g,'\\\\').replace(/[,;]/g,'\\$&').replace(/\r?\n/g,'\\n');
 const ev=list.map(f=>{const a=new Date(f.s+':00+05:30'),b=new Date(+a+f.h*36e5),v=V[f.v];
 return ['BEGIN:VEVENT','UID:'+f.s+'-bittu-aradhya@wedding','DTSTAMP:'+z(new Date()),'DTSTART:'+z(a),'DTEND:'+z(b),'SUMMARY:'+q(f.n[0]+' – Bittu & Aradhya'),'LOCATION:'+q(v.n[0]+(v.a[0]?', '+v.a[0]:'')),'DESCRIPTION:'+q('Dress code: '+f.dr[0]+' ('+f.cn[0]+')'+(v.m?'. Map: '+v.m:'')),'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:'+q(f.n[0]+' tomorrow – Bittu & Aradhya'),'END:VALARM','END:VEVENT'].join('\r\n')});
 const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding//EN',...ev,'END:VCALENDAR'].join('\r\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download=idx==null?'wedding-all-events.ics':'wedding-'+F[idx].n[0].toLowerCase().replace(/\W+/g,'-')+'.ics';document.body.appendChild(a);a.click();a.remove();toast(t('Added – open the file to save','जुड़ गया – सेव करने के लिए फ़ाइल खोलें'))}
document.addEventListener('click',e=>{const c=e.target.closest('[data-cal]');if(c)addCal(+c.dataset.cal);const v=e.target.closest('[data-v]');if(v){vk=v.dataset.v;renderV()}});
function gcalUrl(f){const v=V[f.v],a=new Date(f.s+':00+05:30'),b=new Date(+a+f.h*36e5),z=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
 return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(f.n[0]+' – Bittu & Aradhya')+'&dates='+z(a)+'/'+z(b)+'&details='+encodeURIComponent('Dress code: '+f.dr[0]+' ('+f.cn[0]+')'+(v.m?'\nMap: '+v.m:''))+'&location='+encodeURIComponent(v.n[0]+(v.a[0]?', '+v.a[0]:''))}
$('#gcal').href=gcalUrl(F[5]);
$('#cal').onclick=()=>addCal(5);$('#calall').onclick=()=>addCal(null);
