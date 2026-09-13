const paths={
  hand:'<path d="M8 13V7a2 2 0 0 1 4 0v5-8a2 2 0 0 1 4 0v8-6a2 2 0 0 1 4 0v9c0 5-3 8-8 8-3 0-5-2-7-5l-2-3a2 2 0 0 1 3-2l2 2"/>',
  clear:'<path d="m4 21 12-14M12 4l4 3 5 1-1-6-6-1z"/>',
  hoe:'<path d="m5 21 11-14M8 3c5-2 10 0 13 5l-4 2-3-4-6-1z"/>',
  seed:'<path d="M12 22v-10M12 14C3 15 2 10 2 7c7-1 10 2 10 7ZM12 10C12 3 18 2 22 2c0 7-3 10-10 8Z"/>',
  water:'<path d="M12 2C9 7 4 11 4 16a8 8 0 0 0 16 0c0-5-5-9-8-14ZM8 15c-1 3 1 5 3 5"/>',
  harvest:'<path d="m4 22 15-17M9 16c-5 0-6-3-5-6 4 0 6 2 5 6Zm4-5c-5 0-6-3-5-6 4 0 6 2 5 6Zm4-5c-4-1-4-4-3-6 4 1 5 3 3 6ZM9 16c0 5 4 5 7 3-1-4-4-5-7-3Zm4-5c0 5 4 5 7 3-1-4-4-5-7-3Z"/>',
  bag:'<path d="M7 6V5a5 5 0 0 1 10 0v1M5 7h14l2 15H3ZM8 12h8v6H8Z"/>',
  journal:'<path d="M12 5C8 2 4 2 1 3v17c4-1 7-1 11 2 4-3 7-3 11-2V3c-3-1-7-1-11 2Zm0 0v17"/>'
};
export function applyIcons(){for(const [id,path]of Object.entries(paths)){const el=document.querySelector(`[data-tool="${id}"]>span`)||document.querySelector(`#${id}>span`);if(el)el.innerHTML=`<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;}}
