'use client';

import { FormEvent, useEffect, useState } from 'react';

export function OffersSection() {
  const [offers, setOffers] = useState<Array<{ id: string; title: string; description: string; cta: string; active: boolean; order: number }>>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  async function load() { const response = await fetch('/api/offers?all=true'); if (!response.ok) throw new Error(); setOffers(await response.json()); }
  useEffect(() => { load().catch(() => setStatus('Unable to load offers.')); }, []);
  async function add(event: FormEvent) { event.preventDefault(); setSaving(true); setStatus(''); try { const response = await fetch('/api/offers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, cta: 'Order now', active: true, order: offers.length + 1 }) }); if (!response.ok) throw new Error(); setTitle(''); setDescription(''); await load(); setStatus('Offer saved.'); } catch { setStatus('Unable to save offer.'); } finally { setSaving(false); } }
  return <section className="space-y-6"><div><h2 className="text-2xl font-bold">Manage Offers</h2><p className="text-muted-foreground">Create promotions that appear on the offers page.</p></div>{status && <p role="status" className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">{status}</p>}<form onSubmit={add} className="rounded-lg border bg-white p-6 space-y-4"><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Offer title" className="w-full rounded-lg border px-3 py-2" /><textarea required value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Offer description" className="min-h-24 w-full rounded-lg border px-3 py-2" /><button disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving…' : 'Add offer'}</button></form><div className="rounded-lg border bg-white p-6 space-y-3">{offers.length === 0 ? <p className="text-muted-foreground">No offers yet.</p> : offers.map((offer) => <div key={offer.id} className="rounded-lg bg-muted/40 p-3"><p className="font-semibold">{offer.title}</p><p className="text-sm text-muted-foreground">{offer.description}</p></div>)}</div></section>;
}
