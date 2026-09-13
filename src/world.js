import {CROPS,PEOPLE,RECIPES} from './data.js';
import {SIZE as T,WIDTH,HEIGHT,BUILDINGS,has,ready,growTime} from './engine.js';
const PI=Math.PI;
const COLORS={grass:'#83a45a',grass2:'#89aa60',field:'#a38759',wet:'#749690',path:'#c9b88b',water:'#669fba',mud:'#795439',outline:'#55432c'};
export const NPC_POS={mabel:[19,16],jun:[11,7],bea:[17,8],orson:[20,11],pip:[7,8],cleo:[15,12]};
export const SPOTS=[{id:'wood',x:4,y:16,name:'Timber pile',sprite:7},{id:'yard',x:6,y:17,name:'Salvage yard',sprite:6},{id:'glass',x:8,y:17,name:'Bottle bank',sprite:6},{id:'clay',x:22,y:10,name:'Creek clay',sprite:6}];
export class World{
  constructor(canvas,state){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.state=state;this.width=0;this.height=0;this.zoom=1;this.camera={x:570,y:530};this.follow=true;this.hover=null;this.particles=[];this.time=0;this.images={};this.targets=[];this.resize();}
  async load(){await Promise.all(['world','people-crops'].map(name=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{this.images[name]=im;resolve();};im.onerror=reject;im.src=`./assets/${name}-atlas.png`;})));}
  resize(){this.width=innerWidth;this.height=innerHeight;this.dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=this.width*this.dpr;this.canvas.height=this.height*this.dpr;this.canvas.style.width=this.width+'px';this.canvas.style.height=this.height+'px';this.zoom=this.width<650?.97:Math.max(.8,Math.min(1.22,this.height/810));}
  get cy(){return this.height<600?this.height*.48:this.height*.5+10;}
  point(x,y){return {x:(x-this.width/2)/this.zoom+this.camera.x,y:(y-this.cy)/this.zoom+this.camera.y};}
  recenter(instant=false){this.follow=true;const s=this.state;const x=s.player.x*T+(this.width>700?70:s.place==='farm'?-65:0),y=s.player.y*T-100;if(instant)this.camera={x,y};}
  sprite(atlas,index,x,y,w,h){const im=this.images[atlas];if(!im)return;const col=index%4,row=Math.floor(index/4);let sx,sy,sw,sh;if(atlas==='people-crops'){const rows=[0,324,634,934,1254];sx=col*313.5;sy=rows[row];sw=313.5;sh=rows[row+1]-sy;}else{sx=col*313.5;sy=row*313.5;sw=sh=313.5;}this.ctx.drawImage(im,sx,sy,sw,sh,x,y,w,h);}
  round(x,y,w,h,r,fill,stroke){const c=this.ctx;c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
  label(text,x,y,{color='#f4ead0',ink='#4f4e36',small=false}={}){const c=this.ctx;c.font=`${small?11:12}px Trebuchet MS`;const w=c.measureText(text).width+20;c.save();c.shadowColor='#33402b22';c.shadowBlur=4;c.shadowOffsetY=2;this.round(x-w/2,y-12,w,25,8,color);c.restore();c.fillStyle=ink;c.textAlign='center';c.fillText(text,x,y+5);}
  stitches(x,y,w,h,color='#dddda6'){const c=this.ctx;c.save();c.strokeStyle=color;c.lineWidth=1.4;c.setLineDash([4,5]);c.strokeRect(x+4,y+4,w-8,h-8);c.restore();}
  terrain(){const c=this.ctx,s=this.state;
    c.fillStyle=COLORS.grass;c.fillRect(-2000,-2000,6000,6000);
    if(s.place==='cellar'){this.cellarFloor();return;}
    for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){
      const t=s.tiles[y*WIDTH+x];let type=s.place==='farm'?t.type:(x>24?'water':y>=9&&y<=13||x>=11&&x<=14?'path':'grass');
      if(s.place==='town'&&s.phase===3&&x>=11&&x<=14&&y>=9&&y<=13)type=['path','snow','fall','sky'][(x+y)%4];
      const px=x*T,py=y*T;
      const fill={...COLORS,snow:'#dee0cd',fall:'#b4864e',sky:'#334b59'}[type]||COLORS.grass;
      c.fillStyle=fill;c.fillRect(px,py,T+1,T+1);
      const n=(x*127+y*61)%23;c.fillStyle=type==='grass'?(n%2?'#9eb87355':'#55794222'):type==='water'?'#d8e9db45':'#5c4d3320';
      for(let i=0;i<4;i++){const dx=(n*13+i*19)%46,dy=(n*17+i*11)%45;if(type==='water'){c.fillRect(px+dx,py+dy+Math.sin(this.time*.0007+x)*2,9,1);}else{c.fillRect(px+dx,py+dy,2,2);}}
      if(type==='grass'&&n===5){c.strokeStyle='#638449';c.beginPath();c.moveTo(px+20,py+29);c.lineTo(px+17,py+25);c.moveTo(px+20,py+29);c.lineTo(px+22,py+23);c.stroke();}
      if(['snow','fall','sky'].includes(type)){this.stitches(px,py,T,T,'#f3e8cf');if(type==='sky'){c.fillStyle='#ecdeb0';c.font='16px Georgia';c.fillText('✧',px+18,py+30);}}
      if(s.place==='farm'&&['field','wet'].includes(type)){
        const locked=t.blocked&&!has(s,'crate');
        if(t.tilled){this.round(px+3,py+3,T-6,T-6,5,t.watered?'#644e37':'#87603c');c.strokeStyle=t.watered?'#876642':'#aa7c4a';c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.moveTo(px+10,py+12+i*11);c.lineTo(px+39,py+10+i*11);c.stroke();}}
        else if(!t.obstacle){c.strokeStyle='#bea172';c.lineWidth=1;c.setLineDash([2,5]);c.strokeRect(px+5,py+5,T-10,T-10);c.setLineDash([]);}
        if(locked){c.fillStyle='#56734555';c.fillRect(px,py,T,T);}
      }
    }
    if(s.place==='farm'){
      for(const [x,y,w,h]of[[5,9,4,6],[12,9,4,6],[19,10,2,6],[5,16,4,2]])this.stitches(x*T,y*T,w*T,h*T);
      this.stitches(22*T,0,6*T,HEIGHT*T,'#b7d2bb');
      this.fence(4*T,8.1*T,6*T);this.fence(11*T,8.1*T,6*T);this.fence(4*T,15.25*T,5*T);
      this.label('CREEK BEDS',20*T,16.4*T,{small:true,color:'#d2dfc4'});
      if(!has(s,'crate'))this.label('A little more room, someday',7*T,18*T,{small:true,color:'#d6d7ac'});
      this.label('To town →',24*T,8.5*T);this.targets.push({kind:'travel',id:'town',x:23*T,y:8*T,w:3*T,h:T});
    }else{
      this.fence(3*T,15*T,7*T);this.label('THE SALVAGE YARD',6.5*T,15.3*T,{small:true});
    }
  }
  fence(x,y,w){const c=this.ctx;c.strokeStyle='#795935';c.lineWidth=7;c.beginPath();c.moveTo(x,y+9);c.lineTo(x+w,y+9);c.stroke();c.strokeStyle='#c9ab70';c.lineWidth=4;c.beginPath();c.moveTo(x,y+6);c.lineTo(x+w,y+6);c.stroke();for(let dx=0;dx<=w;dx+=T){this.round(x+dx-4,y-7,9,34,2,'#b08a51','#795935');c.fillStyle='#dec38c';c.fillRect(x+dx-2,y-5,3,27);}}
  cellarFloor(){const c=this.ctx;c.fillStyle='#344333';c.fillRect(-2000,-2000,6000,6000);this.round(5*T,4*T,18*T,15*T,18,'#45362a');this.round(5*T+10,4*T+10,18*T-20,15*T-20,8,'#896246');for(let y=5;y<19;y++){c.fillStyle=y%2?'#976f4b':'#a27950';c.fillRect(5*T+18,y*T,18*T-36,T-2);for(let x=6;x<23;x+=3){c.strokeStyle='#654932';c.beginPath();c.moveTo(x*T+(y%2)*T,y*T);c.lineTo(x*T+(y%2)*T,y*T+T);c.stroke();}}this.round(5*T+12,4*T+12,18*T-24,2*T,5,'#b29872');for(let x=6;x<=21;x++){c.strokeStyle='#8c775b';c.strokeRect(x*T,4.4*T,T,.8*T);}this.label('WREN’S WORKSHOP',14*T,5*T,{color:'#efe0bb'});this.label('↑ Back to the farm',14*T,18*T);this.targets.push({kind:'travel',id:'farm',x:12*T,y:17*T,w:4*T,h:T});}
  objects(){const s=this.state,c=this.ctx,objects=[];
    if(s.place==='farm'){
      for(const t of s.tiles){if(t.obstacle)objects.push({y:(t.y+1)*T,draw:()=>{const tree=t.obstacle==='tree',rock=t.obstacle==='rock';const w=tree?122:rock?50:48+((t.x+t.y)%3)*3;this.sprite('world',tree?(s.phase===3?12:(t.x+t.y)%2?4:5):rock?6:7,(t.x+.5)*T-w/2,(t.y+1.05)*T-w,w,w);}});
        if(t.crop)objects.push({y:(t.y+1)*T,draw:()=>{const progress=Math.min(1,t.growth/growTime(s,t.crop));const w=ready(s,t)?51:22+progress*23;const bob=t.crop==='loft'?Math.sin(this.time*.002+t.x)*3:0;this.sprite('people-crops',CROPS[t.crop].sprite,(t.x+.5)*T-w/2,(t.y+.9)*T-w+bob,w,w);if(ready(s,t)){c.fillStyle='#fae7a2';c.font='14px Georgia';c.fillText('✦',(t.x+.7)*T,(t.y+.16)*T+Math.sin(this.time*.002+t.x)*3);}if(!t.watered){c.fillStyle='#b2d7e2';c.font='15px Georgia';c.fillText('◈',(t.x+.7)*T,(t.y+.25)*T);}}});}
      objects.push({y:7*T,draw:()=>{this.sprite('people-crops',7,8.5*T,6.15*T,43,43);}});
      if(has(s,'irrigation'))for(const x of [9.3,16.3])objects.push({y:13*T,draw:()=>{c.strokeStyle='#b98749';c.lineWidth=8;c.beginPath();c.moveTo(x*T,9*T);c.lineTo(x*T,15*T);c.stroke();c.fillStyle='#e2c68c';for(let y=9;y<=14;y++)c.fillRect(x*T-7,y*T,14,7);if(Math.floor(this.time/800)%5===0){c.strokeStyle='#d0e1c799';c.lineWidth=1;c.beginPath();c.arc(x*T,12*T,48,PI,PI*1.85);c.stroke();}}});
      if(has(s,'harvester'))objects.push({y:14*T,draw:()=>{this.sprite('world',14,15.5*T,12.8*T,80,80);}});
      if(s.phase===3)objects.push({y:8*T,draw:()=>{this.sprite('world',13,15*T,3.7*T,180,180);this.label('Sky-cloth greenhouse',17*T,8*T,{small:true});}});
    }
    if(s.place!=='cellar')for(const b of BUILDINGS[s.place])objects.push({y:(b.y+b.h)*T,draw:()=>{
      const sci=s.phase>1;const index=b.id==='cellar'?14:b.sprite+(sci?8:0),w=b.w*T+20,h=b.id==='cellar'?120:b.w*T+16;const x=b.x*T-10,y=(b.y+b.h)*T-h;
      c.fillStyle='#3b402c22';c.beginPath();c.ellipse(x+w/2,y+h-7,w*.45,14,0,0,PI*2);c.fill();this.sprite(b.id==='cellar'&&s.phase===1?'people-crops':'world',index,x,y,w,h);
      if(s.phase===3&&b.id==='house'){c.save();c.translate(x+w*.53,y+h*.22);c.rotate(-.2);this.round(-20,-12,47,31,3,'#293f50');this.stitches(-20,-12,47,31,'#f2e1ae');c.fillStyle='#f2e1ae';c.font='15px Georgia';c.fillText('✧',-5,9);c.restore();}
      this.label(b.name,(b.x+b.w/2)*T,(b.y+b.h+.25)*T,{small:true});this.targets.push({kind:'building',id:b.id,x,y,w,h});
      if(b.id==='house'&&Math.floor(this.time/600)%4!==0){c.fillStyle='#f6eed25a';c.beginPath();c.ellipse(x+w*.74,y+10-Math.floor(this.time/300)%4*6,8,13,0,0,PI*2);c.fill();}
    }});
    if(s.place==='town'){
      for(const [x,y]of[[3,3],[10,4],[23,4],[4,12],[19,12],[17,17],[25,17],[3,19]])objects.push({y:y*T,draw:()=>this.sprite('world',s.phase===3?12:(x%2?4:5),x*T-50,y*T-125,125,125)});
      objects.push({y:11*T,draw:()=>{if(s.phase>1)this.sprite('world',s.phase===3?15:14,11.3*T,7.6*T,145,145);else{this.round(11.8*T,9.25*T,10,70,2,'#765633');this.round(13.7*T,9.25*T,10,70,2,'#765633');this.round(11.45*T,8.3*T,139,78,5,'#936a40','#634a2e');this.round(11.6*T,8.45*T,124,64,3,'#ceb87b');for(let i=0;i<3;i++){c.save();c.translate((11.85+i*.8)*T,9*T);c.rotate((i-1)*.1);this.round(-8,-16,27,39,1,['#f1e5c3','#e1ba65','#efdfb4'][i]);c.fillStyle='#8b7952';c.fillRect(-2,-5,15,1);c.fillRect(-2,0,12,1);c.fillRect(-2,5,14,1);c.restore();}}this.label(s.phase===3?'The four-season square':'Town noticeboard',12.8*T,11.3*T,{small:true});this.targets.push({kind:'board',id:'board',x:11*T,y:8*T,w:3.5*T,h:3.3*T});}});
      for(const p of PEOPLE){const [x,y]=NPC_POS[p.id];objects.push({y:(y+1)*T,draw:()=>{this.character(p.sprite,x*T,y*T,54,Math.floor(this.time/700)%2);this.label(p.name,x*T+27,y*T+18,{small:true});this.targets.push({kind:'person',id:p.id,x:x*T-10,y:y*T-60,w:74,h:100});}});}
      for(const p of SPOTS){objects.push({y:(p.y+1)*T,draw:()=>{this.sprite('world',p.sprite,p.x*T-20,p.y*T-20,90,75);this.label(p.name,p.x*T+24,p.y*T+55,{small:true});this.targets.push({kind:'scavenge',id:p.id,x:p.x*T-20,y:p.y*T-20,w:90,h:100});}});}
      objects.push({y:9*T,draw:()=>{this.sprite('people-crops',7,20*T,8*T,45,45);}});
      if(s.phase===3){for(let i=0;i<9;i++){const x=(11+i%3)*T+Math.sin(this.time*.001+i)*12,y=8*T+Math.cos(this.time*.001+i)*15;objects.push({y,draw:()=>{c.fillStyle='#a4c6b7bb';c.beginPath();c.arc(x,y,5+i%3,0,PI*2);c.fill();}});}}
    }
    if(s.place==='cellar'){
      RECIPES.forEach((r,i)=>{const x=7+(i%4)*4,y=8+Math.floor(i/4)*5,unlocked=has(s,r.research);objects.push({y:(y+1)*T,draw:()=>{c.globalAlpha=unlocked?1:.3;this.sprite(r.id==='lift'?'world':'people-crops',r.id==='lift'?14:r.sprite,x*T-24,y*T-65,130,120);c.globalAlpha=1;this.label(unlocked?r.name:'? '+r.name,x*T+35,y*T+60,{small:true});const job=s.jobs.find(j=>j.id===r.id);if(job){const n=Math.ceil(job.remaining/(has(s,'yesterday')?2:1));this.label(`⚙ ${n}s`,x*T+35,y*T-60,{color:'#edbf68'});}this.targets.push({kind:'machine',id:r.id,x:x*T-24,y:y*T-65,w:130,h:150});}});});
      objects.push({y:16*T,draw:()=>{this.sprite('world',14,18*T,13*T,135,130);this.label('Research desk',19.4*T,16*T);this.targets.push({kind:'research',id:'research',x:18*T,y:13*T,w:3*T,h:3*T});}});
      objects.push({y:7*T,draw:()=>{this.character(2,8*T,7*T,55,0);this.label('Jun',8*T+28,7*T+18,{small:true});this.targets.push({kind:'person',id:'jun',x:8*T,y:6*T,w:60,h:80});}});
    }
    objects.push({y:s.player.y*T,draw:()=>{this.character(0,s.player.x*T-28,s.player.y*T,56,this.moving?Math.floor(this.time/100)%3-1:0);}});
    objects.sort((a,b)=>a.y-b.y).forEach(o=>o.draw());
  }
  character(sprite,x,y,w,bob){const c=this.ctx;c.fillStyle='#35412630';c.beginPath();c.ellipse(x+w/2,y-3,w*.29,7,0,0,PI*2);c.fill();this.sprite('people-crops',sprite,x,y-w*1.45+bob,w,w*1.45);}
  burst(x,y,text,color='#fff0bb'){for(let i=0;i<7;i++)this.particles.push({x:x*T+24,y:y*T+12,vx:Math.cos(i)*25,vy:-20-Math.sin(i)*25,life:1,color});if(text)this.particles.push({x:x*T+24,y:y*T,vx:0,vy:-22,life:1.5,text,color});}
  render(time,dt){this.time=time;const c=this.ctx,s=this.state;if(this.follow){const tx=s.player.x*T+(this.width>700?70:s.place==='farm'?-65:0),ty=s.player.y*T-100;this.camera.x+=(tx-this.camera.x)*Math.min(1,dt*4);this.camera.y+=(ty-this.camera.y)*Math.min(1,dt*4);}
    c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,this.width,this.height);c.translate(this.width/2,this.cy);c.scale(this.zoom,this.zoom);c.translate(-this.camera.x,-this.camera.y);this.targets=[];this.terrain();
    if(this.hover&&s.place==='farm'){const {x,y}=this.hover;c.save();c.strokeStyle='#fff3be';c.lineWidth=2;c.setLineDash([5,4]);c.strokeRect(x*T+1,y*T+1,T-2,T-2);c.restore();}
    this.objects();
    for(const p of this.particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;c.globalAlpha=Math.max(0,Math.min(1,p.life));c.fillStyle=p.color;if(p.text){c.font='bold 16px Trebuchet MS';c.textAlign='center';c.fillText(p.text,p.x,p.y);}else c.fillRect(p.x,p.y,4,4);}c.globalAlpha=1;this.particles=this.particles.filter(p=>p.life>0);
    c.setTransform(this.dpr,0,0,this.dpr,0,0);
    const dusk=Math.max(0,(s.time/480-.65)/.35);if(dusk){c.fillStyle=`rgba(112,64,51,${dusk*.16})`;c.fillRect(0,0,this.width,this.height);}
    // Fine paper grain, deterministic and light enough to keep sprites crisp.
    c.fillStyle='#f6edce09';for(let i=0;i<220;i++)c.fillRect((i*137)%this.width,(i*71)%this.height,1,2);
  }
  hit(x,y){const p=this.point(x,y);return [...this.targets].reverse().find(t=>p.x>=t.x&&p.x<t.x+t.w&&p.y>=t.y&&p.y<t.y+t.h);}
}
