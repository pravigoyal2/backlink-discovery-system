import { isHttpUrl, makeId, getAll, saveAll } from '../_utils.js';

export async function onRequestPost({request, env}){
  try{
    const supplied = request.headers.get('x-admin-key') || '';
    if(!env.ADMIN_KEY || supplied !== env.ADMIN_KEY){
      return Response.json({error:'Unauthorized'}, {status:401});
    }

    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];
    if(!items.length){
      return Response.json({error:'No URLs supplied'}, {status:400});
    }
    if(items.length > 500){
      return Response.json({error:'Maximum 500 URLs per request'}, {status:400});
    }

    const links = await getAll(env);
    const existing = new Set(links.map(x => x.url));
    let added = 0, skipped = 0;

    for(const item of items){
      const url = String(item.url || '').trim();
      const anchor = String(item.anchor || '').trim().slice(0,160);

      if(!isHttpUrl(url) || existing.has(url)){
        skipped++;
        continue;
      }

      links.unshift({
        id: makeId(),
        url,
        anchor: anchor || new URL(url).hostname,
        added: new Date().toISOString()
      });
      existing.add(url);
      added++;
    }

    // Keep KV payload bounded for a lightweight deployment.
    const trimmed = links.slice(0, 5000);
    await saveAll(env, trimmed);

    return Response.json({ok:true, added, skipped, total:trimmed.length});
  }catch(e){
    return Response.json({error:e.message || 'Server error'}, {status:500});
  }
}
