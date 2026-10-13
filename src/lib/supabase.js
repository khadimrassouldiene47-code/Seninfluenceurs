import { createClient } from '@supabase/supabase-js';
import { defaultInfluencers } from '../data/influencers';
import { defaultArticles } from '../data/news';

const DEFAULT_SUPABASE_URL = 'https://jvkrryakllbxplsynwpt.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_uhIi8GlyGIC7VuFeKgaDbg_xw4JvZM1';

// Allow overriding via localStorage if user configures a new project in Admin
export function getSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('seninfluenceurs_supabase_url');
    const customKey = localStorage.getItem('seninfluenceurs_supabase_key');
    if (customUrl && customKey) {
      return { url: customUrl, key: customKey };
    }
  }
  return {
    url: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL,
    key: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON_KEY
  };
}

const creds = getSupabaseCredentials();
export let supabase = createClient(creds.url, creds.key);

export function reinitSupabaseClient(url, key) {
  if (typeof window !== 'undefined') {
    if (url && key) {
      localStorage.setItem('seninfluenceurs_supabase_url', url);
      localStorage.setItem('seninfluenceurs_supabase_key', key);
    } else {
      localStorage.removeItem('seninfluenceurs_supabase_url');
      localStorage.removeItem('seninfluenceurs_supabase_key');
    }
  }
  const activeCreds = getSupabaseCredentials();
  supabase = createClient(activeCreds.url, activeCreds.key);
  return supabase;
}

const INFLUENCERS_STORAGE_KEY = 'seninfluenceurs_talents_v4';
const CONTACTS_STORAGE_KEY = 'seninfluenceurs_contacts_v1';
const ARTICLES_STORAGE_KEY = 'seninfluenceurs_articles_v1';

// Initialize local storage seeds if not already present
export function initLocalStorageSeeds() {
  if (typeof window === 'undefined') return;
  // Cleanup old v1/v2/v3 caches to avoid showing 180 old talents
  try {
    localStorage.removeItem('seninfluenceurs_talents_v1');
    localStorage.removeItem('seninfluenceurs_talents_v2');
    localStorage.removeItem('seninfluenceurs_talents_v3');
  } catch {}

  if (!localStorage.getItem(INFLUENCERS_STORAGE_KEY)) {
    localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(defaultInfluencers));
  }
  if (!localStorage.getItem(ARTICLES_STORAGE_KEY)) {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(defaultArticles));
  }
}

// Fetch Influencers (Supabase first, fallback to LocalStorage/Default)
export async function fetchInfluencers() {
  initLocalStorageSeeds();
  try {
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .order('followers_count', { ascending: false });

    if (!error && data && data.length > 0) {
      // Map supabase snake_case back to camelCase
      const formatted = data.map((item) => ({
        id: String(item.id),
        name: item.name,
        category: item.category,
        niche: item.niche,
        followers: item.followers || `${item.followers_count}`,
        followersCount: item.followers_count || 0,
        photo: item.photo,
        verified: !!item.verified,
        featured: !!item.featured,
        engagementRate: item.engagement_rate || '7.5%',
        bio: item.bio || '',
        socials: item.socials || {}
      }));
      // update cache
      localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(formatted));
      return formatted;
    }
  } catch (err) {
    console.warn('Supabase not available, using offline cache/seed:', err);
  }

  // Fallback to local storage
  const cached = localStorage.getItem(INFLUENCERS_STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // ignore
    }
  }
  return defaultInfluencers;
}

// Create or Add Influencer
export async function addInfluencer(influencer) {
  const localTempId = Date.now().toString();
  let newItem = {
    id: localTempId,
    name: influencer.name,
    category: influencer.category || 'Influenceurs',
    niche: influencer.niche || 'Lifestyle',
    followers: influencer.followers || '100K',
    followersCount: parseInt(influencer.followersCount, 10) || 100000,
    photo: influencer.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    verified: influencer.verified ?? true,
    featured: influencer.featured ?? false,
    engagementRate: influencer.engagementRate || '8.0%',
    bio: influencer.bio || '',
    socials: influencer.socials || {}
  };

  // Attempt save in Supabase first to get real generated ID
  try {
    const { data, error } = await supabase.from('influencers').insert([
      {
        name: newItem.name,
        category: newItem.category,
        niche: newItem.niche,
        followers: newItem.followers,
        followers_count: newItem.followersCount,
        photo: newItem.photo,
        verified: newItem.verified,
        featured: newItem.featured,
        engagement_rate: newItem.engagementRate,
        bio: newItem.bio,
        socials: newItem.socials
      }
    ]).select();

    if (!error && data && data[0]) {
      newItem.id = String(data[0].id);
    }
  } catch (e) {
    console.warn('Supabase insert failed, saving to local cache:', e);
  }

  // Save in local cache
  const existing = await fetchInfluencers();
  const updated = [newItem, ...existing.filter(i => i.id !== newItem.id)];
  localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(updated));

  return newItem;
}

// Update Influencer
export async function updateInfluencer(id, updates) {
  const existing = await fetchInfluencers();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(updated));

  try {
    const numericId = !isNaN(Number(id)) ? Number(id) : id;
    await supabase
      .from('influencers')
      .update({
        name: updates.name,
        category: updates.category,
        niche: updates.niche,
        followers: updates.followers,
        followers_count: updates.followersCount,
        photo: updates.photo,
        verified: updates.verified,
        featured: updates.featured,
        engagement_rate: updates.engagementRate,
        bio: updates.bio,
        socials: updates.socials
      })
      .eq('id', numericId);
  } catch (e) {
    console.warn('Supabase update failed:', e);
  }
  return updated;
}

// Delete Influencer
export async function deleteInfluencer(id) {
  const existing = await fetchInfluencers();
  const updated = existing.filter((item) => item.id !== id);
  localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(updated));

  try {
    const numericId = !isNaN(Number(id)) ? Number(id) : id;
    await supabase.from('influencers').delete().eq('id', numericId);
  } catch (e) {
    console.warn('Supabase delete failed:', e);
  }
  return updated;
}

// Submit contact / brief
export async function submitContactBrief(contactData) {
  const newContact = {
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    ...contactData
  };

  // Local storage save
  const existingRaw = localStorage.getItem(CONTACTS_STORAGE_KEY);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify([newContact, ...existing]));

  // Supabase save
  try {
    await supabase.from('contacts').insert([
      {
        company_name: contactData.companyName,
        contact_name: contactData.contactName,
        email: contactData.email,
        phone: contactData.phone,
        budget: contactData.budget,
        objective: contactData.objective,
        talent_type: contactData.talentType,
        message: contactData.message,
        file_name: contactData.fileName || null
      }
    ]);
  } catch (e) {
    console.warn('Supabase contacts insert error:', e);
  }

  return newContact;
}

// Fetch all contacts (for admin)
export async function fetchContacts() {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (e) {
    // fallback
  }

  const raw = localStorage.getItem(CONTACTS_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Seed / sync all default influencers to Supabase in 1 click
export async function seedSupabaseInfluencers() {
  const rows = defaultInfluencers.map((i) => ({
    name: i.name,
    category: i.category,
    niche: i.niche,
    followers: i.followers,
    followers_count: i.followersCount,
    photo: i.photo,
    verified: i.verified,
    featured: i.featured,
    engagement_rate: i.engagementRate,
    bio: i.bio,
    socials: i.socials
  }));

  const { data, error } = await supabase.from('influencers').insert(rows);
  if (error) {
    throw error;
  }
  return data;
}
