import {CROPS,ITEMS,RESEARCH,RECIPES,PROJECTS,ORDERS,PHASES} from './data.js';
export const SAVE_KEY='bumpkin-town-save-v1';
export const SIZE=48;
export const WIDTH=28;
export const HEIGHT=23;
export const DAY_SECONDS=480;
export const has=(s,id)=>s.research.includes(id);
export const count=(s,id)=>s.bag[id]||0;
export const affordable=(s,cost,mult=1)=>Object.entries(cost).every(([id,n])=>count(s,id)>=n*mult);
export const add=(s,items,mult=1)=>{for(const [id,n] of Object.entries(items))s.bag[id]=(s.bag[id]||0)+n*mult;};
export const spend=(s,items,mult=1)=>{if(!affordable(s,items,mult))return false;add(s,items,-mult);return true;};
export const yieldFor=s=>3+Number(has(s,'crate'))+Number(has(s,'cooperative'))+Number(has(s,'seasons'));
export const growTime=(s,crop)=>CROPS[crop].grow*(has(s,'compost')?.75:1)*(crop==='reed'&&has(s,'stillwater')?.5:1);
export const tileAt=(s,x,y)=>s.tiles.find(t=>t.x===x&&t.y===y);
export const ready=(s,t)=>t.crop&&t.watered&&t.growth>=growTime(s,t.crop);
export const BUILDINGS={farm:[{id:'house',x:5,y:3,w:4,h:3,name:'Wren farmhouse',sprite:0},{id:'cellar',x:10,y:4,w:2,h:2,name:'Basement',sprite:14}],town:[{id:'shop',x:5,y:4,w:4,h:3,name:'Pip’s exchange',sprite:1},{id:'diner',x:16,y:4,w:5,h:3,name:'Bea’s diner',sprite:2},{id:'post',x:20,y:13,w:4,h:3,name:'Post office',sprite:3}],cellar:[]};
export function newGame(){
  const tiles=[];
  for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){
    let type='grass';let blocked=false;
    if(x>=22)type='water';
    if((y===8&&x>2&&x<24)||(x===10&&y>5)||(y===18&&x>5&&x<23))type='path';
    if(y>=9&&y<=14&&x>=5&&x<=8)type='field';
    if(y>=9&&y<=14&&x>=12&&x<=15)type='field';
    if(y>=10&&y<=15&&x>=19&&x<=20)type='wet';
    if(y>=16&&y<=17&&x>=5&&x<=8){type='field';blocked=true;}
    let obstacle=null;
    if(type==='field'&&!(x<=8&&y<=10))obstacle=((x+y)%5===0?'rock':(x+y)%3===0?'stump':'bramble');
    if(type==='wet'&&y>11)obstacle='bramble';
    const border=x<3||y<2||y>20;
    if(type==='grass'&&((x*17+y*31)%19===0||border&&(x+y)%3===0))obstacle=(x*3+y)%4?'tree':'rock';
    if(type==='grass'&&x>=4&&x<=17&&y>=7&&y<=18)obstacle=null;
    tiles.push({x,y,type,obstacle,blocked,tilled:type==='field'&&x<=8&&y<=10,crop:null,growth:0,watered:false});
  }
  for(const [x,y,growth] of [[5,9,100],[6,9,100],[7,9,72],[8,9,42]])Object.assign(tiles.find(t=>t.x===x&&t.y===y),{crop:'squash',growth,watered:true});
  return {version:1,phase:1,day:1,time:0,played:0,coins:80,energy:100,bag:{wood:4,stone:2,clay:4,scrap:2,glass:2},seeds:{squash:12,bean:6,gourd:6,reed:8,onion:0,loft:0},tiles,research:[],projects:[],jobs:[],friendship:{},talks:{},gifts:{},scavenged:{},orderDone:0,mealDay:0,stats:{cleared:0,tilled:0,planted:0,harvested:0,crafted:0,orders:0},choices:{},journal:[],place:'farm',player:{x:10.5,y:11.5},selectedSeed:'squash',ending:false,sound:false,tutorial:false,seenStory:1};
}
export function validSave(raw){
  if(!raw||raw.version!==1||!Number.isInteger(raw.phase)||raw.phase<1||raw.phase>3||!Number.isInteger(raw.day)||raw.day<1)return false;
  if(!Array.isArray(raw.tiles)||raw.tiles.length!==WIDTH*HEIGHT||!Array.isArray(raw.research)||!Array.isArray(raw.projects)||!Array.isArray(raw.jobs))return false;
  if(![raw.coins,raw.energy,raw.time,raw.played,raw.player?.x,raw.player?.y].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0))return false;
  if(raw.energy>100||raw.time>=DAY_SECONDS||raw.player.x>WIDTH||raw.player.y>HEIGHT||!['farm','town','cellar'].includes(raw.place))return false;
  for(const obj of [raw.bag,raw.seeds,raw.stats,raw.friendship,raw.talks,raw.gifts,raw.scavenged])if(!obj||typeof obj!=='object'||Array.isArray(obj)||!Object.values(obj).every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0))return false;
  if(!CROPS[raw.selectedSeed]||!raw.choices||typeof raw.choices!=='object'||Object.values(raw.choices).some(v=>typeof v!=='string')||!Array.isArray(raw.journal)||raw.journal.some(j=>!j||typeof j.title!=='string'||typeof j.body!=='string'))return false;
  if(['cleared','tilled','planted','harvested','crafted','orders'].some(k=>!Number.isFinite(raw.stats[k])))return false;
  if(Object.keys(CROPS).some(k=>!Number.isFinite(raw.seeds[k])))return false;
  if(raw.research.some(id=>!RESEARCH.some(r=>r.id===id))||new Set(raw.research).size!==raw.research.length||raw.projects.some(id=>!PROJECTS.some(p=>p.id===id))||new Set(raw.projects).size!==raw.projects.length)return false;
  if(raw.jobs.some(j=>!j||!RECIPES.some(r=>r.id===j.id)||!Number.isInteger(j.batches)||j.batches<1||j.batches>50||!Number.isFinite(j.remaining)||j.remaining<0))return false;
  return raw.tiles.every((t,i)=>t&&t.x===i%WIDTH&&t.y===Math.floor(i/WIDTH)&&['grass','water','path','field','wet'].includes(t.type)&&[null,'bramble','stump','rock','tree'].includes(t.obstacle)&&(!t.crop||CROPS[t.crop])&&Number.isFinite(t.growth)&&t.growth>=0&&typeof t.watered==='boolean');
}
export function loadGame(storage){try{const raw=JSON.parse(storage.getItem(SAVE_KEY));return validSave(raw)?raw:newGame();}catch{return newGame();}}
export function saveGame(s,storage){try{storage.setItem(SAVE_KEY,JSON.stringify(s));return true;}catch{return false;}}
export function harvest(s,t,auto=false){
  if(!ready(s,t))return {ok:false,message:'This crop is still growing.'};
  const crop=t.crop,n=yieldFor(s);add(s,{[crop]:n});s.stats.harvested+=n;if(has(s,'soil'))s.seeds[crop]=(s.seeds[crop]||0)+1;
  t.crop=null;t.growth=0;t.watered=false;
  if(auto&&s.seeds[crop]>0){s.seeds[crop]--;t.crop=crop;t.watered=has(s,'irrigation')||t.type==='wet';}
  return {ok:true,message:`+${n} ${CROPS[crop].name}${has(s,'soil')?' · seed saved':''}`,item:crop};
}
export function work(s,x,y,tool){
  const t=tileAt(s,x,y);if(!t)return {ok:false,message:'That’s beyond the fence.'};
  if(t.blocked&&!has(s,'crate'))return {ok:false,message:'Research “Room to put things” to open the south field.'};
  if(tool==='hand')tool=t.obstacle?'clear':ready(s,t)?'harvest':t.crop&&!t.watered?'water':'hand';
  if(tool==='hand')return {ok:false,message:t.crop?`${CROPS[t.crop].name} · ${t.watered?Math.ceil(Math.max(0,growTime(s,t.crop)-t.growth))+' seconds to harvest':'Needs water'}`:['field','wet'].includes(t.type)?'Till this bed, plant a seed, then water it.':'A perfectly good patch of grass.'};
  if(tool==='harvest')return harvest(s,t);
  const effort=tool==='clear'?5:tool==='hoe'?3:1;
  if(s.energy<effort)return {ok:false,message:'Time for a rest. Tap the farmhouse, or get a meal at Bea’s.'};
  if(tool==='clear'){
    if(!t.obstacle)return {ok:false,message:'Already clear. Choose Till to prepare a bed.'};
    const loot=t.obstacle==='rock'?{stone:6,clay:2}:t.obstacle==='tree'||t.obstacle==='stump'?{wood:8}:{wood:3,reed:1};
    add(s,loot);t.obstacle=null;s.energy-=effort;s.stats.cleared++;return {ok:true,message:Object.entries(loot).map(([id,n])=>`+${n} ${ITEMS[id].name}`).join(' · ')};
  }
  if(t.obstacle)return {ok:false,message:'Clear this patch first.'};
  if(!['field','wet'].includes(t.type))return {ok:false,message:tool==='water'?'Your watering can refills itself at the creek.':'Plant in the stitched garden beds.'};
  if(tool==='hoe'){if(t.tilled)return {ok:false,message:'Soil is ready. Choose Plant.'};t.tilled=true;s.energy-=effort;s.stats.tilled++;return {ok:true,message:'A fresh bed. Smells like possibilities.'};}
  if(tool==='seed'){
    if(!t.tilled)return {ok:false,message:'Till this soil first.'};if(t.crop)return {ok:false,message:'Something is already growing here.'};
    const crop=s.selectedSeed;if(!CROPS[crop]||CROPS[crop].phase>s.phase)return {ok:false,message:'That seed isn’t available in this chapter.'};
    if(CROPS[crop].wet&&t.type!=='wet')return {ok:false,message:'Wirereed needs a creek bed, beside the water.'};
    if(t.type==='wet'&&!CROPS[crop].wet)return {ok:false,message:'These soggy beds are perfect for wirereed.'};
    if(!(s.seeds[crop]>0))return {ok:false,message:'No seeds left. Visit Pip’s store in town.'};
    s.seeds[crop]--;t.crop=crop;t.growth=0;t.watered=has(s,'irrigation')||t.type==='wet';s.energy--;s.stats.planted++;return {ok:true,message:`${CROPS[crop].name} planted${t.watered?' and watered.':'. A little water next.'}`};
  }
  if(tool==='water'){if(!t.crop)return {ok:false,message:'Plant something first.'};if(t.watered)return {ok:false,message:'Already watered. One watering lasts until harvest.'};t.watered=true;s.energy--;return {ok:true,message:'A long drink. You can leave this one to grow.'};}
  return {ok:false,message:'Choose a tool from your belt.'};
}
export function tick(s,seconds){
  const events=[];s.played+=seconds;s.time+=seconds;
  while(s.time>=DAY_SECONDS){s.time-=DAY_SECONDS;s.day++;s.energy=100;events.push({type:'day',message:`Day ${s.day}. Fresh boots, fresh possibilities.`});}
  for(const t of s.tiles){if(t.crop&&t.watered)t.growth+=seconds;if(has(s,'harvester')&&ready(s,t))harvest(s,t,true);}
  for(const job of s.jobs)job.remaining=Math.max(0,job.remaining-seconds*(has(s,'yesterday')?2:1));
  const done=s.jobs.filter(j=>j.remaining<=0);
  for(const j of done){const recipe=RECIPES.find(r=>r.id===j.id);add(s,recipe.output,j.batches);s.stats.crafted+=Object.values(recipe.output).reduce((a,b)=>a+b,0)*j.batches;events.push({type:'crafted',message:`${recipe.name}: ${j.batches*Object.values(recipe.output)[0]} ${ITEMS[j.id].name} ready.`});}
  s.jobs=s.jobs.filter(j=>j.remaining>0);return events;
}
export function sleep(s){s.day++;s.time=0;s.energy=100;return {ok:true,message:`Day ${s.day}. A new page in the almanac.`};}
export function unlock(s,id){const r=RESEARCH.find(r=>r.id===id);if(!r||r.phase!==s.phase||has(s,id)||!r.requires.every(req=>has(s,req)))return {ok:false,message:'Complete the earlier research first.'};if(!spend(s,r.cost))return {ok:false,message:'Gather the missing materials first.'};s.research.push(id);s.journal.push({title:r.name,body:r.effect,day:s.day});return {ok:true,message:r.effect};}
export function craft(s,id,batches=1){const r=RECIPES.find(r=>r.id===id);if(!r||!has(s,r.research)||!Number.isInteger(batches)||batches<1||batches>50)return {ok:false,message:'This machine is not ready.'};if(s.jobs.some(j=>j.id===id))return {ok:false,message:'That machine is already working.'};if(!spend(s,r.input,batches))return {ok:false,message:'Not enough ingredients for this batch.'};s.jobs.push({id,batches,remaining:r.seconds*batches});return {ok:true,message:`${r.name} is working. You can head upstairs.`};}
export function finishProject(s,id){const p=PROJECTS.find(p=>p.id===id);if(!p||p.phase!==s.phase||s.projects.includes(id)||!has(s,p.requires))return {ok:false,message:'Complete the matching basement research first.'};if(!spend(s,p.cost))return {ok:false,message:'Gather the remaining materials first.'};s.projects.push(id);s.friendship[p.person]=(s.friendship[p.person]||0)+2;s.journal.push({title:p.name,body:p.after,day:s.day});return {ok:true,message:p.after,story:true};}
export function gate(s){const r=RESEARCH.filter(r=>r.phase===s.phase),p=PROJECTS.filter(p=>p.phase===s.phase);return {research:r.filter(r=>has(s,r.id)).length,researchTotal:r.length,projects:p.filter(p=>s.projects.includes(p.id)).length,projectsTotal:p.length,ready:r.every(r=>has(s,r.id))&&p.every(p=>s.projects.includes(p.id))};}
export function advance(s){if(!gate(s).ready)return {ok:false,message:'Finish this chapter’s research and three town projects first.'};if(s.phase===3){s.ending=true;return {ok:true,ending:true,message:'A place at the table.'};}s.phase++;if(s.phase===2)s.seeds.onion+=8;if(s.phase===3)s.seeds.loft+=8;s.journal.push({title:PHASES[s.phase-1],body:'A new chapter, sewn onto the old one.',day:s.day});return {ok:true,phase:s.phase,message:PHASES[s.phase-1]};}
export function buy(s,id,n=1,seed=false){if(!Number.isInteger(n)||n<1||n>100)return {ok:false,message:'Choose a valid quantity.'};const item=seed?CROPS[id]:ITEMS[id];if(!item||seed&&item.phase>s.phase)return {ok:false,message:'Not yet in stock.'};const price=seed?item.seed:item.buy;if(!price)return {ok:false,message:'Find this around town.'};if(s.coins<price*n)return {ok:false,message:'Sell a little produce or complete an order first.'};s.coins-=price*n;if(seed)s.seeds[id]=(s.seeds[id]||0)+n;else add(s,{[id]:n});return {ok:true,message:`${n} ${item.name}${seed?' seeds':''} tucked into your bag.`};}
export function sell(s,id,n){if(!ITEMS[id]||!Number.isInteger(n)||n<1||count(s,id)<n)return {ok:false,message:'Nothing to sell.'};const earned=ITEMS[id].sell*n;add(s,{[id]:-n});s.coins+=earned;return {ok:true,message:`Sold ${n} ${ITEMS[id].name} · +${earned} coins.`};}
export function scavenge(s,spot){if(!['yard','clay','wood','glass'].includes(spot))return {ok:false,message:'Nothing here.'};const cooldown=has(s,'stillwater')?25:90;if(s.scavenged[spot]!==undefined&&s.played-s.scavenged[spot]<cooldown)return {ok:false,message:`Let the pile settle. ${Math.ceil(cooldown-(s.played-s.scavenged[spot]))} seconds.`};const loot={yard:{scrap:6,stone:4},clay:{clay:12,reed:2},wood:{wood:12,stone:4},glass:{glass:8,scrap:2}}[spot];const n=has(s,'tubes')?2:1;add(s,loot,n);s.scavenged[spot]=s.played;return {ok:true,message:Object.entries(loot).map(([id,v])=>`+${v*n} ${ITEMS[id].name}`).join(' · ')};}
export function currentOrder(s){const available=ORDERS.filter(o=>!CROPS[o.item]||CROPS[o.item].phase<=s.phase).filter(o=>o.item!=='gear'||has(s,'mill'));return available[(s.day-1)%available.length];}
export function fulfillOrder(s){if(s.orderDone===s.day)return {ok:false,message:'Today’s order is delivered. Another arrives tomorrow.'};const o=currentOrder(s);if(!spend(s,{[o.item]:o.count}))return {ok:false,message:'A few more ingredients to gather.'};s.orderDone=s.day;s.stats.orders++;const pay=Math.round(o.pay*(has(s,'cooperative')?1.5:1));s.coins+=pay;s.friendship[o.person]=(s.friendship[o.person]||0)+1;return {ok:true,message:`Order delivered · +${pay} coins. They saved you a seat.`};}
export function meal(s){if(s.mealDay!==s.day){s.mealDay=s.day;s.energy=100;return {ok:true,message:'Bea slides over a bowl. “First one’s on me.” Energy restored.'};}if(s.coins<12)return {ok:false,message:'Another meal is 12 coins. A rest at home is always free.'};s.coins-=12;s.energy=100;return {ok:true,message:'Soup, bread, and a moment to yourself. Energy restored.'};}
export function travel(s,place){if(!['farm','town','cellar'].includes(place))return;s.place=place;s.player=place==='farm'?{x:10.5,y:11.5}:place==='town'?{x:12.5,y:11.5}:{x:13.5,y:14.5};}
export function walkable(s,x,y){if(x<1||y<2||x>=WIDTH-1||y>=HEIGHT-2)return false;if(s.place==='cellar')return x>=6&&x<=21&&y>=6&&y<=17;const t=tileAt(s,x,y);if(s.place==='farm'&&(t.type==='water'||t.obstacle||t.blocked&&!has(s,'crate')))return false;return !(BUILDINGS[s.place]||[]).some(b=>x>=b.x&&x<b.x+b.w&&y>=b.y&&y<b.y+b.h);}
export function findPath(s,toX,toY,adjacent=false){const sx=Math.floor(s.player.x),sy=Math.floor(s.player.y),start=`${sx},${sy}`,queue=[[sx,sy]],prev=new Map([[start,null]]);let end=null;for(let i=0;i<queue.length;i++){const [x,y]=queue[i];if(adjacent?Math.abs(x-toX)+Math.abs(y-toY)<=1:x===toX&&y===toY){end=`${x},${y}`;break;}for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;if(prev.has(key)||!walkable(s,nx,ny))continue;prev.set(key,`${x},${y}`);queue.push([nx,ny]);}}if(!end)return null;const path=[];while(end!==start){path.push(end.split(',').map(Number));end=prev.get(end);}return path.reverse();}
