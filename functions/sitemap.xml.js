import { getAll, absoluteOrigin, xmlEsc } from './_utils.js';

export async function onRequestGet({request, env}){
  const origin = absoluteOrigin(request);
  const links = await getAll(env);

  const urls = [
    `<url><loc>${xmlEsc(origin + '/')}</loc></url>`,
    `<url><loc>${xmlEsc(origin + '/latest')}</loc></url>`,
    ...links.map(x => `<url><loc>${xmlEsc(origin + '/u/' + x.id)}</loc><lastmod>${xmlEsc(x.added)}</lastmod></url>`)
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml,{headers:{'content-type':'application/xml; charset=UTF-8','cache-control':'public, max-age=300'}});
}
