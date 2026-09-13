import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import {RESEARCH,RECIPES,PROJECTS,CROPS,ITEMS} from '../src/data.js';

test('a new farm is valid and can harvest, clear, till, plant, water, and grow',()=>{
  const s=E.newGame();assert.ok(E.validSave(s));
  assert.ok(E.work(s,5,9,'harvest').ok);assert.equal(s.bag.squash,3);
  assert.ok(E.work(s,5,11,'clear').ok);assert.ok(E.work(s,5,11,'hoe').ok);
  assert.ok(E.work(s,5,11,'seed').ok);assert.ok(E.work(s,5,11,'water').ok);
  E.tick(s,100);assert.ok(E.ready(s,E.tileAt(s,5,11)));assert.ok(E.work(s,5,11,'harvest').ok);
  assert.equal(s.bag.squash,6);assert.equal(s.stats.planted,1);
});
test('crop habitat, energy, seed and already-planted checks do not spend items',()=>{
  const s=E.newGame();s.selectedSeed='reed';const before=s.seeds.reed;
  assert.equal(E.work(s,5,10,'seed').ok,false);assert.equal(s.seeds.reed,before);
  E.work(s,19,10,'hoe');assert.ok(E.work(s,19,10,'seed').ok);assert.ok(E.tileAt(s,19,10).watered);
  const n=s.seeds.reed;assert.equal(E.work(s,19,10,'seed').ok,false);assert.equal(s.seeds.reed,n);
  s.energy=0;const wood=s.bag.wood;assert.equal(E.work(s,7,11,'clear').ok,false);assert.equal(s.bag.wood,wood);
  E.sleep(s);assert.equal(s.energy,100);assert.equal(s.day,2);
});
test('research and chapter gates cannot be bypassed or purchased twice',()=>{
  const s=E.newGame();E.add(s,Object.fromEntries(Object.keys(ITEMS).map(k=>[k,9999])));
  assert.equal(E.unlock(s,'winder').ok,false);assert.equal(E.advance(s).ok,false);
  assert.equal(E.unlock(s,'kiln').ok,false);
  assert.ok(E.unlock(s,'soil').ok);const wood=s.bag.wood;assert.equal(E.unlock(s,'soil').ok,false);assert.equal(s.bag.wood,wood);
  for(const r of RESEARCH.filter(r=>r.phase===1&&!E.has(s,r.id)))assert.ok(E.unlock(s,r.id).ok,r.id);
  assert.equal(E.advance(s).ok,false);
  for(const p of PROJECTS.filter(p=>p.phase===1))assert.ok(E.finishProject(s,p.id).ok);
  assert.ok(E.advance(s).ok);assert.equal(s.phase,2);assert.equal(s.seeds.onion,8);
});
test('all three chapters and finale are reachable, with every recipe backed by renewable inputs',()=>{
  const s=E.newGame();const renewable=new Set([...Object.keys(CROPS),'wood','stone','clay','scrap','glass']);
  for(const r of RECIPES){for(const id of Object.keys(r.input))assert.ok(renewable.has(id),`${id} required by ${r.id}`);for(const id of Object.keys(r.output))renewable.add(id);}
  for(const r of [...RESEARCH,...PROJECTS])for(const id of Object.keys(r.cost))assert.ok(renewable.has(id),`${r.id}: ${id}`);
  for(let phase=1;phase<=3;phase++){
    for(const r of RESEARCH.filter(r=>r.phase===phase)){E.add(s,r.cost);assert.ok(E.unlock(s,r.id).ok,r.id);}
    for(const p of PROJECTS.filter(p=>p.phase===phase)){E.add(s,p.cost);assert.ok(E.finishProject(s,p.id).ok,p.id);}
    assert.ok(E.gate(s).ready);assert.ok(E.advance(s).ok);
  }
  assert.equal(s.research.length,18);assert.equal(s.projects.length,9);assert.ok(s.ending);assert.ok(E.validSave(s));
});
test('batch processing pays once, takes time, and cannot duplicate a working machine',()=>{
  const s=E.newGame();s.research.push('mill');s.bag.squash=20;
  assert.ok(E.craft(s,'gear',5).ok);assert.equal(s.bag.squash,10);assert.equal(E.craft(s,'gear',5).ok,false);
  E.tick(s,59);assert.equal(E.count(s,'gear'),0);E.tick(s,1);assert.equal(s.bag.gear,10);
  E.tick(s,120);assert.equal(s.bag.gear,10);assert.equal(s.jobs.length,0);
  assert.equal(E.craft(s,'gear',-1).ok,false);assert.equal(E.craft(s,'gear',1.5).ok,false);
});
test('automatic farming returns seeds and replants without spending coins',()=>{
  const s=E.newGame();s.research.push('soil','irrigation','crate','cooperative','harvester');const n=s.seeds.squash,coins=s.coins;
  E.tick(s,1);assert.equal(s.bag.squash,10);assert.equal(s.seeds.squash,n);assert.equal(s.coins,coins);
  const t=E.tileAt(s,5,9);assert.equal(t.crop,'squash');assert.ok(t.watered);assert.equal(t.growth,0);
});
test('scavenging recovers essential resources for free and respects cooldowns',()=>{
  const s=E.newGame();s.coins=0;assert.ok(E.scavenge(s,'yard').ok);assert.equal(E.scavenge(s,'yard').ok,false);
  E.tick(s,90);assert.ok(E.scavenge(s,'yard').ok);assert.ok(E.scavenge(s,'clay').ok);assert.ok(E.scavenge(s,'wood').ok);assert.ok(E.scavenge(s,'glass').ok);
  assert.equal(s.coins,0);assert.ok(s.bag.clay>=12);assert.ok(s.bag.scrap>=12);assert.equal(E.scavenge(s,'bogus').ok,false);
});
test('sales and purchases cannot create negative quantities or buy future crops',()=>{
  const s=E.newGame();assert.equal(E.buy(s,'loft',1,true).ok,false);assert.equal(E.buy(s,'squash',-1,true).ok,false);
  assert.equal(E.sell(s,'wood',-1).ok,false);assert.equal(E.sell(s,'wood',100).ok,false);
  assert.ok(E.sell(s,'wood',2).ok);assert.equal(s.coins,84);assert.ok(E.buy(s,'squash',5,true).ok);assert.equal(s.coins,69);
});
test('orders only pay once a day, and free meals and rest allow recovery',()=>{
  const s=E.newGame(),o=E.currentOrder(s);E.add(s,{[o.item]:o.count*2});assert.ok(E.fulfillOrder(s).ok);const money=s.coins;assert.equal(E.fulfillOrder(s).ok,false);assert.equal(s.coins,money);
  s.energy=0;s.coins=0;assert.ok(E.meal(s).ok);assert.equal(s.energy,100);assert.equal(E.meal(s).ok,false);E.sleep(s);assert.ok(E.meal(s).ok);
});
test('pathfinding routes around obstacles and reaches a working distance',()=>{
  const s=E.newGame();const path=E.findPath(s,5,11,true);assert.ok(path?.length);for(const [x,y]of path)assert.ok(E.walkable(s,x,y));
  const [x,y]=path.at(-1);assert.ok(Math.abs(x-5)+Math.abs(y-11)<=1);assert.equal(E.findPath(s,24,12,false),null);
  E.travel(s,'cellar');assert.ok(E.findPath(s,8,14));assert.equal(E.findPath(s,2,2),null);
});
test('save round trips and malformed files preserve a valid fallback',()=>{
  let value;const storage={setItem:(_,v)=>value=v,getItem:()=>value};const s=E.newGame();E.tick(s,23);E.saveGame(s,storage);assert.deepEqual(E.loadGame(storage),s);
  assert.equal(E.validSave({...s,coins:-1}),false);assert.equal(E.validSave({...s,phase:5}),false);
  assert.equal(E.validSave({...s,tiles:[]}),false);assert.equal(E.validSave({...s,jobs:[{id:'fake',batches:1,remaining:10}]}),false);
  value='{broken';assert.ok(E.validSave(E.loadGame(storage)));
});
