import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import * as E from '../src/engine.js';
import * as D from '../src/data.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.GAME_URL||'http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
await mkdir('test-results',{recursive:true});
const errors=[],failed=[];
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)failed.push(r.url()+' '+r.status());});
async function loaded(){await page.locator('#loading.gone').waitFor({state:'attached'});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
async function fixture(phase=1,complete=false){
  const s=E.newGame();s.tutorial=true;s.phase=phase;s.seeds.onion=8;s.seeds.loft=8;E.add(s,Object.fromEntries(Object.keys(D.ITEMS).map(id=>[id,9999])));s.research=D.RESEARCH.filter(r=>r.phase<phase||complete).map(r=>r.id);s.projects=D.PROJECTS.filter(p=>p.phase<phase||complete).map(p=>p.id);s.stats.cleared=3;s.stats.harvested=20;s.stats.planted=6;
  if(await page.locator('#panel').evaluate(el=>el.open))await page.getByRole('button',{name:'Close panel'}).click();
  await page.locator('#settings').click();
  const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Import save'}).click();
  await (await chooser).setFiles({name:'test-farm.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(s))});
  await page.waitForFunction(()=>!document.querySelector('#panel').open);
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
}
try{
  await page.goto(base);await loaded();
  assert.equal(await page.title(),'Bumpkin Town · A rather peculiar farming adventure');
  await page.screenshot({path:'test-results/desktop-farm.png'});
  // A real canvas action: harvest a starter squash after walking to its bed.
  await page.locator('[data-tool="harvest"]').click();
  await page.mouse.click(342,515);
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('bumpkin-town-save-v1')).stats.harvested>=3);
  await page.locator('#bag').click();assert.match(await page.locator('#panel-content').innerText(),/Cogsquash/);
  await page.getByRole('button',{name:'Close panel'}).click();
  await page.locator('[data-tool="seed"]').click();await page.getByRole('button',{name:'Plant Bean',exact:true}).click();assert.ok(await page.locator('[data-tool="seed"]').evaluate(el=>el.classList.contains('selected')));
  await fixture();await page.locator('#journal').click();
  assert.ok(await page.getByRole('button',{name:'Begin chapter 2'}).isDisabled());
  await page.locator('[data-action="research"][data-id="soil"]').click();
  assert.ok(await page.locator('[data-action="research"][data-id="mill"]').isEnabled());
  await page.locator('[data-action="research"][data-id="mill"]').click();
  await page.getByRole('button',{name:'Machines',exact:true}).click();
  await page.locator('[data-action="craft"][data-id="gear"][data-count="5"]').click();
  assert.match(await page.locator('[data-job="gear"]').innerText(),/Working/);
  for(const name of ['Town projects','Neighbours','Field notes','How to play']){await page.getByRole('button',{name,exact:true}).click();assert.ok((await page.locator('#panel-content').innerText()).length>150);}
  await page.getByRole('button',{name:'Neighbours',exact:true}).click();await page.locator('[data-person="jun"]').click();
  await page.getByRole('button',{name:'Stay a little longer'}).click();assert.match(await page.locator('.quote').innerText(),/cogsquash/);
  await page.locator('[data-action="choice"][data-id="1"]').click();assert.match(await page.locator('#panel-content').innerText(),/Something you said/);
  await page.getByRole('button',{name:'Close panel'}).click();await page.locator('[data-place="town"]').click();
  await page.screenshot({path:'test-results/desktop-town.png'});
  await page.locator('#bag').click();await page.getByRole('button',{name:'Trade at Pip’s'}).click();
  const before=await page.locator('.inline-count').innerText();await page.locator('[data-action="buy-seed"][data-id="squash"][data-count="1"]').click();assert.notEqual(await page.locator('.inline-count').innerText(),before);
  await page.getByRole('button',{name:'Close panel'}).click();
  await fixture(2);await page.locator('#journal').click();assert.match(await page.locator('#panel-content').innerText(),/Springbean winder/);assert.ok(await page.getByRole('button',{name:'Begin chapter 3'}).isDisabled());
  await fixture(3,true);await page.locator('#journal').click();await page.getByRole('button',{name:'Gather at the table'}).click();assert.match(await page.locator('#panel-content').innerText(),/A place at the table/);assert.match(await page.locator('.prose').innerText(),/approximately right/);
  await page.getByRole('button',{name:'Tomorrow, there will be gardening'}).click();await page.locator('[data-place="town"]').click();
  await page.screenshot({path:'test-results/desktop-future-town.png'});
  await page.locator('[data-place="cellar"]').click();await page.screenshot({path:'test-results/desktop-workshop.png'});
  for(const width of [390,375,320]){
    await page.setViewportSize({width,height:844});await fixture();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.screenshot({path:`test-results/mobile-${width}-farm.png`});
    await page.locator('#mobile-journal').click();assert.equal(await page.locator('#panel').evaluate(el=>el.scrollWidth>el.clientWidth),false);
    await page.screenshot({path:`test-results/mobile-${width}-research.png`});
    await page.getByRole('button',{name:'Close panel'}).click();await page.locator('[data-tool="seed"]').click();await page.getByRole('button',{name:'Plant Reed',exact:true}).click();
    await page.locator('#settings').click();await page.getByRole('button',{name:'Sound off',exact:true}).click();assert.ok(await page.getByRole('button',{name:'Sound on',exact:true}).isVisible());await page.getByRole('button',{name:'Close panel'}).click();
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  console.log('Browser checks passed: canvas harvest, seeds, research gates, crafting, dialogue, trading, finale, three phone widths, no page errors or failed resources.');
}finally{await browser.close();}
