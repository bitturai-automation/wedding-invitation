/* Background music (mp3 with synth fallback) */
/* music (soft built-in instrumental) */
let ac,master,timer,playing=false,step=0;
const N=[261.63,329.63,392,440,392,329.63,293.66,349.23];
function tone(f,t,d,v){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.1)}
function sched(){const t=ac.currentTime+.05;tone(N[step%8],t,1.8,.5);tone(N[step%8]*2,t+.35,1.2,.15);if(step%4==0)tone(N[step%8]/2,t,3.4,.4);step++}
function synthMusic(){try{if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=0;master.connect(ac.destination)}
ac.resume();master.gain.cancelScheduledValues(ac.currentTime);master.gain.linearRampToValueAtTime(.12,ac.currentTime+4);if(!timer)timer=setInterval(sched,700);playing=true;$('#mus').classList.remove('off')}catch(e){}}
function synthPause(){if(!ac)return;master.gain.linearRampToValueAtTime(0,ac.currentTime+.4);setTimeout(()=>{ac.suspend()},450);playing=false;$('#mus').classList.add('off')}
/* real track (assets/audio/music.mp3); synth above is only a fallback if the file can't play */
const bgm=new Audio('assets/audio/music.mp3');bgm.loop=true;bgm.preload='none';let useSynth=false,fadeT;
function fade(to,ms,cb){clearInterval(fadeT);const from=bgm.volume,t0=performance.now();fadeT=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/ms);bgm.volume=from+(to-from)*k;if(k>=1){clearInterval(fadeT);cb&&cb()}},40)}
function music(){useSynth=false;bgm.volume=0;const p=bgm.play(),ok=()=>{playing=true;$('#mus').classList.remove('off');fade(.65,3000)};
if(p&&p.then)p.then(ok).catch(()=>{useSynth=true;synthMusic()});else ok()}
function pause(){if(useSynth){synthPause();return}fade(0,400,()=>bgm.pause());playing=false;$('#mus').classList.add('off')}
bgm.addEventListener('error',()=>{if(!useSynth){useSynth=true;if(playing)synthMusic()}});
document.addEventListener('visibilitychange',()=>{if(useSynth)return;if(document.hidden){if(playing)bgm.pause()}else if(playing){bgm.play().catch(()=>{})}});
$('#mus').onclick=()=>playing?pause():music();
