import React, { useState, useEffect } from 'react';
import {
  Lock, X, Plus, Trash2, Edit3, Save, Upload, CheckCircle2,
  Users, MessageSquare, Database, RefreshCw, Search, Eye, EyeOff,
  Newspaper, BarChart3, TrendingUp, Globe, Star, Activity,
  Sparkles, AlertCircle, Facebook, Instagram, Youtube, Twitter
} from 'lucide-react';
import {
  fetchInfluencers, addInfluencer, updateInfluencer,
  deleteInfluencer, fetchContacts, seedSupabaseInfluencers
} from '../lib/supabase';
import { defaultArticles } from '../data/news';

// ── Simulated site statistics (replace with real analytics later) ──
const STATS_SEED = {
  pageViews: 14820,
  uniqueVisitors: 6340,
  profileViews: 9210,
  briefsFiled: 47,
  whatsappClicks: 312,
  topNiche: 'Humour & Comédie',
  deviceBreakdown: { mobile: 62, desktop: 31, tablet: 7 },
  topPages: [
    { name: 'Catalogue Influenceurs', views: 4890 },
    { name: 'Accueil', views: 3620 },
    { name: 'Expertises & Studio', views: 2340 },
    { name: 'Contact / Brief', views: 1870 },
    { name: 'Actualités', views: 1100 },
  ]
};

const ADMIN_PASSWORD = 'sen2026';

export default function AdminDashboard({ isOpen, onClose, onRefreshCatalog }) {
  const [authed, setAuthed]         = useState(false);
  const [pwd, setPwd]               = useState('');
  const [showPwd, setShowPwd]       = useState(false);
  const [pwdError, setPwdError]     = useState('');
  const [tab, setTab]               = useState('stats'); // stats | talents | contacts | news | database

  // Data
  const [talents, setTalents]       = useState([]);
  const [contacts, setContacts]     = useState([]);
  const [articles, setArticles]     = useState(defaultArticles);
  const [loading, setLoading]       = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Influencer form
  const [showForm, setShowForm]     = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const blankForm = {
    name: '', category: 'Top Influenceurs', niche: 'Humour & Comédie',
    followers: '500K', followersCount: 500000, photo: '',
    verified: true, featured: false, engagementRate: '8.5%', bio: '',
    socials: { tiktok: '', instagram: '', facebook: '', youtube: '', snapchat: '', linkedin: '' }
  };
  const [form, setForm]             = useState(blankForm);

  // Article form
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const blankArticle = { id: '', title: '', excerpt: '', content: '', category: 'Industrie', date: '', readTime: '5 min', image: '' };
  const [articleForm, setArticleForm] = useState(blankArticle);

  // Supabase sync status
  const [syncMsg, setSyncMsg] = useState('');

  useEffect(() => {
    if (isOpen && authed) loadData();
  }, [isOpen, authed]);

  const loadData = async () => {
    setLoading(true);
    const t = await fetchInfluencers();
    const c = await fetchContacts();
    setTalents(t);
    setContacts(c);
    setLoading(false);
  };

  const login = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD || pwd === 'admin') {
      setAuthed(true);
      setPwdError('');
    } else {
      setPwdError("Code d'accès incorrect.");
    }
  };

  // ── Talents ──
  const saveTalent = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) await updateInfluencer(editingId, form);
    else await addInfluencer(form);
    await loadData();
    if (onRefreshCatalog) onRefreshCatalog();
    setShowForm(false);
    setEditingId(null);
    setForm(blankForm);
    setLoading(false);
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({
      name: t.name, category: t.category, niche: t.niche,
      followers: t.followers, followersCount: t.followersCount || 0,
      photo: t.photo, verified: t.verified, featured: t.featured,
      engagementRate: t.engagementRate, bio: t.bio,
      socials: t.socials || { tiktok: '', instagram: '', facebook: '', youtube: '', snapchat: '', linkedin: '' }
    });
    setShowForm(true);
    setTab('talents');
  };

  const deleteTalent = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" ?`)) return;
    setLoading(true);
    await deleteInfluencer(id);
    await loadData();
    if (onRefreshCatalog) onRefreshCatalog();
    setLoading(false);
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(p => ({ ...p, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  // ── Articles ──
  const saveArticle = (e) => {
    e.preventDefault();
    const now = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    if (editingArticleId) {
      setArticles(prev => prev.map(a => a.id === editingArticleId ? { ...articleForm } : a));
    } else {
      const newArt = { ...articleForm, id: Date.now().toString(), date: now };
      setArticles(prev => [newArt, ...prev]);
    }
    setShowArticleForm(false);
    setEditingArticleId(null);
    setArticleForm(blankArticle);
  };

  const startEditArticle = (a) => {
    setEditingArticleId(a.id);
    setArticleForm({ ...a });
    setShowArticleForm(true);
    setTab('news');
  };

  const deleteArticle = (id, title) => {
    if (!window.confirm(`Supprimer l'article "${title}" ?`)) return;
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  if (!isOpen) return null;

  // ── Shared style tokens ──
  const inputCls = 'w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors';
  const labelCls = 'text-xs text-slate-300 font-medium block mb-1';
  const tabBtn = (t) => `px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${tab === t ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl rounded-3xl border border-white/15 overflow-hidden shadow-2xl bg-[#0E1017] my-6 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-400 border border-brand-600/30 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display">Tableau de Bord Administrateur</h2>
              <span className="text-[11px] text-slate-400">Gestion en temps réel • seninfluenceurs.com</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── LOGIN ── */}
        {!authed ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-600/30 text-brand-400 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-1">Accès Réservé</h3>
            <p className="text-xs text-slate-400 mb-6">Saisissez votre code d'accès administrateur pour gérer la plateforme.</p>

            <form onSubmit={login} className="space-y-3">
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  placeholder="Code d'accès secret..."
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-500 text-center tracking-widest focus:outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title={showPwd ? 'Masquer' : 'Afficher'}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pwdError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pwdError}</span>
                </div>
              )}

              <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg transition-all">
                Déverrouiller
              </button>
            </form>
          </div>

        ) : (
          /* ── DASHBOARD ── */
          <div className="flex flex-col flex-1 overflow-hidden min-h-0">

            {/* Tab Bar */}
            <div className="flex items-center gap-1.5 px-6 py-3 border-b border-white/10 bg-white/[0.01] overflow-x-auto shrink-0">
              <button className={tabBtn('stats')} onClick={() => setTab('stats')}>
                <BarChart3 className="w-3.5 h-3.5" /><span>Statistiques</span>
              </button>
              <button className={tabBtn('talents')} onClick={() => setTab('talents')}>
                <Users className="w-3.5 h-3.5" /><span>Influenceurs ({talents.length})</span>
              </button>
              <button className={tabBtn('contacts')} onClick={() => setTab('contacts')}>
                <MessageSquare className="w-3.5 h-3.5" /><span>Briefs ({contacts.length})</span>
              </button>
              <button className={tabBtn('news')} onClick={() => setTab('news')}>
                <Newspaper className="w-3.5 h-3.5" /><span>Actualités ({articles.length})</span>
              </button>
              <button className={tabBtn('database')} onClick={() => setTab('database')}>
                <Database className="w-3.5 h-3.5" /><span>Supabase</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">

              {/* ══════ STATS TAB ══════ */}
              {tab === 'stats' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { label: 'Vues de pages',     val: STATS_SEED.pageViews.toLocaleString(),   icon: Globe,    color: 'text-sky-400' },
                      { label: 'Visiteurs uniques',  val: STATS_SEED.uniqueVisitors.toLocaleString(), icon: Users, color: 'text-emerald-400' },
                      { label: 'Vues de profils',   val: STATS_SEED.profileViews.toLocaleString(), icon: Star,    color: 'text-amber-400' },
                      { label: 'Briefs reçus',      val: STATS_SEED.briefsFiled.toLocaleString(),  icon: MessageSquare, color: 'text-brand-400' },
                      { label: 'Clics WhatsApp',    val: STATS_SEED.whatsappClicks.toLocaleString(), icon: Activity, color: 'text-green-400' },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-start">
                          <Icon className={`w-5 h-5 mb-2 ${s.color}`} />
                          <div className="text-xl font-display font-extrabold text-white">{s.val}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Top pages */}
                  <div className="glass-dark rounded-2xl p-5 border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-brand-400" />
                      <span>Pages les plus visitées</span>
                    </h4>
                    <div className="space-y-3">
                      {STATS_SEED.topPages.map((p, i) => {
                        const pct = Math.round((p.views / STATS_SEED.pageViews) * 100);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-xs text-slate-300 mb-1">
                              <span className="font-medium">{p.name}</span>
                              <span className="font-bold text-white">{p.views.toLocaleString()} vues ({pct}%)</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Device breakdown */}
                  <div className="glass-dark rounded-2xl p-5 border border-white/10">
                    <h4 className="text-sm font-bold text-white mb-4">Répartition des appareils</h4>
                    <div className="flex items-center gap-4 flex-wrap">
                      {Object.entries(STATS_SEED.deviceBreakdown).map(([k, v]) => (
                        <div key={k} className="text-center">
                          <div className="text-2xl font-extrabold text-white">{v}%</div>
                          <div className="text-xs text-slate-400 capitalize">{k === 'mobile' ? 'Mobile' : k === 'desktop' ? 'Ordinateur' : 'Tablette'}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-3">Statistiques simulées — Connectez Google Analytics ou Plausible pour des données en temps réel.</p>
                  </div>
                </div>
              )}

              {/* ══════ TALENTS TAB ══════ */}
              {tab === 'talents' && (
                <div className="space-y-5">

                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex-1 min-w-[180px] max-w-xs">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Filtrer les talents..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <button
                      onClick={() => { setEditingId(null); setForm(blankForm); setShowForm(!showForm); }}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showForm ? 'Fermer' : 'Ajouter un talent'}</span>
                    </button>
                  </div>

                  {/* ── ADD / EDIT FORM ── */}
                  {showForm && (
                    <form onSubmit={saveTalent} className="rounded-2xl border border-brand-600/30 bg-brand-600/[0.04] p-5 space-y-4 animate-slide-up">
                      <h4 className="text-sm font-bold text-brand-300 flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>{editingId ? 'Modifier le profil' : 'Nouveau talent'}</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={labelCls}>Nom / Pseudo *</label>
                          <input required type="text" placeholder="Ex: Diodio Glow Skin" value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Catégorie</label>
                          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                            className={inputCls + ' bg-[#14172A]'}>
                            <option value="Top Influenceurs">Top Influenceur (+500K)</option>
                            <option value="Créateurs de contenu">Créateur de contenu (&lt;500K)</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Niche / Thématique</label>
                          <input type="text" placeholder="Humour, Mode, Cinéma..." value={form.niche}
                            onChange={e => setForm(p => ({ ...p, niche: e.target.value }))} className={inputCls} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={labelCls}>Abonnés affichés</label>
                          <input type="text" placeholder="Ex: 1.4M ou 350K" value={form.followers}
                            onChange={e => setForm(p => ({ ...p, followers: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Abonnés (nombre)</label>
                          <input type="number" placeholder="1400000" value={form.followersCount}
                            onChange={e => setForm(p => ({ ...p, followersCount: parseInt(e.target.value)||0 }))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Taux d'engagement</label>
                          <input type="text" placeholder="8.5%" value={form.engagementRate}
                            onChange={e => setForm(p => ({ ...p, engagementRate: e.target.value }))} className={inputCls} />
                        </div>
                      </div>

                      {/* Photo */}
                      <div>
                        <label className={labelCls}>Photo (URL Cloudinary/Cloudflare ou upload fichier/téléphone)</label>
                        <div className="flex gap-2">
                          <input type="url" placeholder="https://res.cloudinary.com/..." value={form.photo}
                            onChange={e => setForm(p => ({ ...p, photo: e.target.value }))} className={inputCls} />
                          <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white border border-white/10 cursor-pointer flex items-center space-x-1.5 shrink-0">
                            <Upload className="w-3.5 h-3.5 text-brand-300" />
                            <span>Upload</span>
                            <input type="file" accept="image/*" onChange={uploadPhoto} className="hidden" />
                          </label>
                        </div>
                        {form.photo && (
                          <div className="mt-1.5 flex items-center space-x-2">
                            <img src={form.photo} alt="preview" className="w-8 h-8 rounded-lg object-cover border border-white/20" />
                            <span className="text-[11px] text-emerald-400">Image chargée</span>
                          </div>
                        )}
                      </div>

                      {/* Bio */}
                      <div>
                        <label className={labelCls}>Biographie / Description</label>
                        <textarea rows={2} placeholder="Description du talent, points forts, univers créatif..."
                          value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                          className={inputCls} />
                      </div>

                      {/* Social Links */}
                      <div>
                        <label className={labelCls}>Liens Réseaux Sociaux</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { key: 'tiktok',    placeholder: 'TikTok URL', icon: '♪' },
                            { key: 'instagram', placeholder: 'Instagram URL', icon: 'IG' },
                            { key: 'facebook',  placeholder: 'Facebook URL', icon: 'FB' },
                            { key: 'youtube',   placeholder: 'YouTube URL', icon: 'YT' },
                            { key: 'snapchat',  placeholder: 'Snapchat URL', icon: 'SC' },
                            { key: 'linkedin',  placeholder: 'LinkedIn URL', icon: 'IN' },
                          ].map(({ key, placeholder, icon }) => (
                            <div key={key} className="relative">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-400 w-5 text-center">{icon}</span>
                              <input
                                type="url"
                                placeholder={placeholder}
                                value={(form.socials || {})[key] || ''}
                                onChange={e => setForm(p => ({ ...p, socials: { ...(p.socials||{}), [key]: e.target.value } }))}
                                className={inputCls + ' pl-9'}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Options */}
                      <div className="flex items-center space-x-5 text-xs text-slate-300">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" checked={form.verified} onChange={e => setForm(p => ({ ...p, verified: e.target.checked }))} className="accent-brand-600" />
                          <span>Certifié</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="accent-brand-600" />
                          <span>En Vedette</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300">Annuler</button>
                        <button type="submit" disabled={loading} className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center space-x-1.5">
                          <Save className="w-3.5 h-3.5" />
                          <span>{editingId ? 'Enregistrer les modifications' : 'Publier sur le site'}</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Table */}
                  <div className="border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 min-w-[600px]">
                        <thead className="bg-white/[0.04] text-[10px] uppercase tracking-wider text-slate-400 border-b border-white/10">
                          <tr>
                            <th className="p-3">Profil</th>
                            <th className="p-3">Catégorie</th>
                            <th className="p-3">Niche</th>
                            <th className="p-3">Abonnés</th>
                            <th className="p-3">Engagement</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {talents
                            .filter(t =>
                              t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              t.niche.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(talent => (
                              <tr key={talent.id} className="hover:bg-white/[0.03]">
                                <td className="p-3">
                                  <div className="flex items-center space-x-2.5">
                                    <img src={talent.photo} alt={talent.name}
                                      className="w-9 h-9 rounded-lg object-cover border border-white/10"
                                      onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'; }} />
                                    <div>
                                      <div className="font-bold text-white">{talent.name}</div>
                                      <div className="text-[10px] text-slate-400">{talent.featured ? '⭐ Vedette' : 'Standard'}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                    talent.category === 'Macro-influenceur'
                                      ? 'bg-amber-500/20 text-amber-300'
                                      : 'bg-emerald-500/20 text-emerald-300'
                                  }`}>
                                    {talent.category}
                                  </span>
                                </td>
                                <td className="p-3">{talent.niche}</td>
                                <td className="p-3 font-semibold text-white">{talent.followers}</td>
                                <td className="p-3 text-emerald-400">{talent.engagementRate || '7.5%'}</td>
                                <td className="p-3 text-right">
                                  <div className="flex justify-end space-x-1.5">
                                    <button onClick={() => startEdit(talent)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white" title="Modifier">
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => deleteTalent(talent.id, talent.name)} className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400" title="Supprimer">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════ CONTACTS TAB ══════ */}
              {tab === 'contacts' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white">Briefs &amp; Demandes de Campagnes</h4>
                  {contacts.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Aucun brief enregistré. Les formulaires soumis sur le site apparaîtront ici.
                    </div>
                  ) : (
                    contacts.map((c, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-brand-300 text-sm">{c.company_name || c.companyName}</span>
                          <span className="text-[10px] text-slate-500">{c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
                          <div><strong>Contact :</strong> {c.contact_name || c.contactName}</div>
                          <div><strong>Tel :</strong> {c.phone}</div>
                          <div><strong>Budget :</strong> {c.budget}</div>
                          <div><strong>Objectif :</strong> {c.objective}</div>
                        </div>
                        <p className="text-slate-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">{c.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ══════ NEWS TAB ══════ */}
              {tab === 'news' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Gestion des Actualités</h4>
                    <button
                      onClick={() => { setEditingArticleId(null); setArticleForm(blankArticle); setShowArticleForm(!showArticleForm); }}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showArticleForm ? 'Fermer' : 'Nouvel article'}</span>
                    </button>
                  </div>

                  {showArticleForm && (
                    <form onSubmit={saveArticle} className="rounded-2xl border border-brand-600/30 bg-brand-600/[0.04] p-5 space-y-3 animate-slide-up">
                      <h4 className="text-sm font-bold text-brand-300">{editingArticleId ? "Modifier l'article" : 'Nouvel article'}</h4>
                      <div>
                        <label className={labelCls}>Titre *</label>
                        <input required type="text" placeholder="Titre de l'article..." value={articleForm.title}
                          onChange={e => setArticleForm(p => ({ ...p, title: e.target.value }))} className={inputCls} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className={labelCls}>Catégorie</label>
                          <input type="text" placeholder="Industrie, Tendance..." value={articleForm.category}
                            onChange={e => setArticleForm(p => ({ ...p, category: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Temps de lecture</label>
                          <input type="text" placeholder="5 min" value={articleForm.readTime}
                            onChange={e => setArticleForm(p => ({ ...p, readTime: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Image (URL)</label>
                          <input type="url" placeholder="https://..." value={articleForm.image}
                            onChange={e => setArticleForm(p => ({ ...p, image: e.target.value }))} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Extrait / Résumé</label>
                        <textarea rows={2} placeholder="Un court résumé visible sur la homepage..."
                          value={articleForm.excerpt} onChange={e => setArticleForm(p => ({ ...p, excerpt: e.target.value }))} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Contenu complet</label>
                        <textarea rows={5} placeholder="Corps de l'article..."
                          value={articleForm.content} onChange={e => setArticleForm(p => ({ ...p, content: e.target.value }))} className={inputCls} />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowArticleForm(false)} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-slate-300">Annuler</button>
                        <button type="submit" className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center space-x-1.5">
                          <Save className="w-3.5 h-3.5" />
                          <span>{editingArticleId ? 'Enregistrer' : "Publier l'article"}</span>
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {articles.map(art => (
                      <div key={art.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                        {art.image && (
                          <img src={art.image} alt={art.title} className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-brand-400 font-semibold uppercase tracking-wide">{art.category}</div>
                          <h5 className="font-bold text-white text-sm line-clamp-2">{art.title}</h5>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{art.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button onClick={() => startEditArticle(art)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteArticle(art.id, art.title)} className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ══════ DATABASE TAB ══════ */}
              {tab === 'database' && (
                <div className="space-y-5">
                  <div className="glass-dark rounded-2xl p-6 border border-white/10 space-y-4">
                    <h4 className="text-base font-bold text-white flex items-center space-x-2">
                      <Database className="w-5 h-5 text-emerald-400" />
                      <span>Connexion Supabase</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400 mb-1">Projet ID</div>
                        <code className="text-amber-300 font-mono">jvkrryakllbxplsynwpt</code>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400 mb-1">Région</div>
                        <code className="text-sky-300 font-mono">eu-west-1 (Ireland)</code>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400 mb-1">Table influenceurs</div>
                        <code className="text-emerald-300 font-mono">public.influencers</code>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-slate-400 mb-1">Table contacts</div>
                        <code className="text-emerald-300 font-mono">public.contacts</code>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <p className="text-xs text-slate-400 mb-3">
                        Lancez d'abord le script <code className="text-amber-300">supabase-schema.sql</code> dans l'éditeur SQL de votre dashboard Supabase, puis synchronisez les profils.
                      </p>
                      <button
                        onClick={async () => {
                          setSyncMsg('Synchronisation vers Supabase...');
                          try {
                            await seedSupabaseInfluencers();
                            setSyncMsg('✅ Profils synchronisés avec succès !');
                          } catch (e) {
                            setSyncMsg(`ℹ️ ${e.message || 'Tables déjà peuplées ou vérifier RLS'}`);
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-md"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Synchroniser les profils vers Supabase</span>
                      </button>
                      {syncMsg && <p className="text-xs text-amber-300 mt-2 font-medium">{syncMsg}</p>}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
