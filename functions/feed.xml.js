import { getAll, absoluteOrigin, xmlEsc } from './_utils.js';

export async function onRequestGet({request, env}){
  const origin = absoluteOrigin(request);
  const links = (await getAll(env)).slice(0,100);

  const items = links.map(x => `<item>
<title>${xmlEsc(x.anchor)}</title>
<link>${xmlEsc(origin + '/u/' + x.id)}</link>
<guid>${xmlEsc(origin + '/u/' + x.id)}</guid>
<pubDate>${new Date(x.added).toUTCString()}</pubDate>
<description>${xmlEsc('External resource: ' + x.url)}</description>
</item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Web Resource Discovery Feed</title>
<link>${xmlEsc(origin + '/latest')}</link>
<description>Recently discovered public web resources.</description>
${items}
</channel></rss>`;

  return new Response(xml,{headers:{'content-type':'application/rss+xml; charset=UTF-8','cache-control':'public, max-age=300'}});
}
