export function esc(s=''){
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));
}

export function xmlEsc(s=''){
  return String(s).replace(/[<>&'"]/g, c => ({
    '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'
  }[c]));
}

export function isHttpUrl(value){
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function makeId(){
  return crypto.randomUUID().replace(/-/g,'').slice(0,16);
}

export async function getAll(env){
  const raw = await env.LINKS_KV.get('all_links');
  return raw ? JSON.parse(raw) : [];
}

export async function saveAll(env, links){
  await env.LINKS_KV.put('all_links', JSON.stringify(links));
}

export function absoluteOrigin(request){
  const u = new URL(request.url);
  return u.origin;
}
