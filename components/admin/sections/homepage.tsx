'use client';

import { useEffect, useState } from 'react';

export function HomepageSection() {
  const [content, setContent] = useState({ heroTitle: '', heroSubtitle: '', trustMessage: '' });
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => { fetch('/api/homepage').then((res) => res.json()).then((data) => setContent({ heroTitle: data.heroTitle ?? '', heroSubtitle: data.heroSubtitle ?? '', trustMessage: data.trustMessage ?? '' })).catch(() => setStatus('Unable to load homepage content.')); }, []);
  async function save() { setSaving(true); setStatus(''); try { const response = await fetch('/api/homepage', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) }); if (!response.ok) throw new Error(); setStatus('Homepage content saved.'); } catch { setStatus('Unable to save homepage content.'); } finally { setSaving(false); } }
  return <section className="space-y-6"><div><h2 className="text-2xl font-bold">Manage Homepage Content</h2><p className="text-muted-foreground">Update the main message visitors see.</p></div>{status && <p role="status" className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">{status}</p>}<div className="rounded-lg border bg-white p-6 space-y-4"><label className="block text-sm font-medium">Hero title<input value={content.heroTitle} onChange={(event) => setContent({ ...content, heroTitle: event.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Hero subtitle<textarea value={content.heroSubtitle} onChange={(event) => setContent({ ...content, heroSubtitle: event.target.value })} className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Trust message<input value={content.trustMessage} onChange={(event) => setContent({ ...content, trustMessage: event.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label><button onClick={save} disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save homepage'}</button></div></section>;
}
