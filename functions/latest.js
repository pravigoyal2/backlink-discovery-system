import { esc, getAll } from './_utils.js';

export async function onRequestGet({env}){
  const links = await getAll(env);
  const latest = links.slice(0,100);

  const rows = latest.map(x => `
    <article class="item">
      <h2><a href="/u/${esc(x.id)}">${esc(x.anchor)}</a></h2>
      <p><a rel="external" href="${esc(x.url)}">${esc(x.url)}</a></p>
      <small>${esc(new Date(x.added).toUTCString())}</small>
    </article>`).join('');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Latest Web Resources</title>
<meta name="description" content="Recently discovered public web resources.">
<meta name="robots" content="index,follow">
<style>
body{font-family:Arial,sans-serif;background:#f7f8fb;color:#171717;margin:0}
main{max-width:920px;margin:auto;padding:40px 18px}
.item{background:white;border:1px solid #e8eaf0;border-radius:14px;padding:20px;margin:14px 0}
a{color:#175cd3;text-decoration:none;overflow-wrap:anywhere}
h1{font-size:34px}.nav{margin-bottom:20px}
small{color:#6b7280}
</style>
</head>
<body><main>
<div class="nav"><a href="/">Home</a> · <a href="/feed.xml">RSS</a> · <a href="/sitemap.xml">Sitemap</a></div>
<h1>Latest Web Resources</h1>
${rows || '<p>No resources have been added yet.</p>'}
</main></body></html>`;

  return new Response(html,{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'public, max-age=300'}});
}
