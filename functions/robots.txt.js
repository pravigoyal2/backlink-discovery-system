import { absoluteOrigin } from './_utils.js';

export async function onRequestGet({request}){
  const origin = absoluteOrigin(request);
  const txt = `User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`;
  return new Response(txt,{headers:{'content-type':'text/plain; charset=UTF-8'}});
}
