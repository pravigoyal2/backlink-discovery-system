import { esc, getAll } from '../_utils.js';

export async function onRequestGet({params, env}){
  const links = await getAll(env);
  const item = links.find(x => x.id === params.id);
  if(!item) return new Response('Not Found',{status:404});

  const idx = links.findIndex(x => x.id === item.id);
  const related = links
    .filter((_,i)=>i !== idx)
    .slice(Math.max(0, idx-3), Math.max(0, idx-3)+6);

  const relatedHtml = related.map(x =>
    `<li><a href="/u/${esc(x.id)}">${esc(x.anchor)}</a></li>`
  ).join('');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(item.anchor)} | Web Resource Discovery</title>
<meta name="description" content="Recently discovered public web resource.">
<meta name="robots" content="index,follow">
<link rel="canonical" href="/u/${esc(item.id)}">
<style>
body{font-family:Arial,sans-serif;background:#f8f9fc;color:#161616;margin:0}
main{max-width:820px;margin:auto;padding:48px 18px}
.card{background:#fff;border:1px solid #e6e8ef;border-radius:16px;padding:26px}
a{color:#175cd3;text-decoration:none;overflow-wrap:anywhere}
p{line-height:1.7}.muted{color:#6b7280}
</style>
</head>
<body><main>
<p><a href="/latest">← Latest resources</a></p>
<section class="card">
<h1>${esc(item.anchor)}</h1>
<p>This public web resource was added to the discovery hub on <strong>${esc(new Date(item.added).toUTCString())}</strong>.</p>
<p><a rel="external" href="${esc(item.url)}">${esc(item.url)}</a></p>
${relatedHtml ? `<h2>Related recently discovered resources</h2><ul>${relatedHtml}</ul>` : ''}
</section>
</main></body></html>`;

  return new Response(html,{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'public, max-age=600'}});
}
