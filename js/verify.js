(function(){
const D=window.CRF_INTERNS||[],tb=document.getElementById('rows'),q=document.getElementById('q'),cnt=document.getElementById('cnt');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function draw(list,hl){
 tb.innerHTML=list.map(r=>{const i=D.indexOf(r)+1;return `<tr class="${hl&&r.ref.toLowerCase()===hl?'hit':''}"><td>${i}</td><td><b>${esc(r.ref)}</b></td><td>${esc(r.name)}</td><td>${esc(r.inst)}</td><td>${esc(r.doj)}</td><td>${esc(r.doe)}</td><td>${esc(r.grade||'—')}</td><td>${r.syn?`<a href="${esc(r.syn)}" target="_blank" rel="noopener">Link</a>`:'—'}</td><td>${esc(r.remark)}</td></tr>`}).join('')||'<tr><td colspan="9" style="text-align:center;padding:30px">No record found. Check the reference number on your certificate.</td></tr>';
 cnt.textContent=list.length+' of '+D.length+' records';
}
function run(){const v=q.value.trim().toLowerCase();draw(!v?D:D.filter(r=>(r.ref+' '+r.name+' '+r.inst).toLowerCase().includes(v)),v)}
q.addEventListener('input',run);
const p=new URLSearchParams(location.search).get('ref');if(p){q.value=p}run();
})();
