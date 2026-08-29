-- ══════════════════════════════════════════════════════════
-- Anne Boissons Royale — schéma Supabase complet
-- À exécuter dans Supabase > SQL Editor > New query
-- ══════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Types ─────────────────────────────────────────────────
do $$ begin
  create type product_category as enum (
    'whisky', 'bieres-cannettes', 'champagnes-aperitifs',
    'rhums', 'spiritueux', 'eaux', 'vins'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type zone_type as enum ('local', 'expedition');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum (
    'en_attente', 'en_cours_livraison', 'livree', 'annulee'
  );
exception when duplicate_object then null; end $$;

-- ── Produits ──────────────────────────────────────────────
create table if not exists products (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  slug              text not null unique,
  description       text,
  category          product_category not null,
  image_url         text,
  images            text[] not null default '{}',
  price_retail      integer not null check (price_retail >= 0),
  price_wholesale   integer check (price_wholesale >= 0),
  min_wholesale_qty integer check (min_wholesale_qty > 0),
  stock             integer not null default 0 check (stock >= 0),
  active            boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists products_category_idx on products(category);
create index if not exists products_active_idx   on products(active);

-- Recherche plein texte pour le chatbot
create index if not exists products_search_idx on products
  using gin (to_tsvector('french', name || ' ' || coalesce(description, '')));

-- ── Zones de livraison ────────────────────────────────────
create table if not exists delivery_zones (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  cities     text[] not null default '{}',
  zone_type  zone_type not null,
  fee        integer not null default 0 check (fee >= 0),
  free_above integer check (free_above >= 0),
  message    text,
  created_at timestamptz not null default now()
);

-- ── Commandes ─────────────────────────────────────────────
create table if not exists orders (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  customer_name      text not null,
  customer_phone     text not null,
  customer_city      text not null,
  customer_address   text not null,
  delivery_zone_id   uuid references delivery_zones(id),
  delivery_zone_name text not null,
  delivery_fee       integer not null default 0,
  items              jsonb not null,
  subtotal           integer not null,
  total              integer not null,
  status             order_status not null default 'en_attente',
  notes              text
);

create index if not exists orders_status_idx     on orders(status);
create index if not exists orders_created_at_idx on orders(created_at desc);

-- ── Messages de contact ───────────────────────────────────
create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text,
  email      text,
  message    text not null,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Réponses préconfigurées du chatbot ────────────────────
create table if not exists chatbot_faq (
  id         uuid primary key default gen_random_uuid(),
  keywords   text[] not null,
  answer     text not null,
  priority   integer not null default 0,
  created_at timestamptz not null default now()
);

-- ══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════
alter table products         enable row level security;
alter table delivery_zones   enable row level security;
alter table orders           enable row level security;
alter table contact_messages enable row level security;
alter table chatbot_faq      enable row level security;

-- Lecture publique : produits actifs uniquement
drop policy if exists "public_read_active_products" on products;
create policy "public_read_active_products" on products
  for select using (active = true);

-- Lecture publique : zones de livraison
drop policy if exists "public_read_zones" on delivery_zones;
create policy "public_read_zones" on delivery_zones
  for select using (true);

-- Lecture publique : FAQ chatbot
drop policy if exists "public_read_faq" on chatbot_faq;
create policy "public_read_faq" on chatbot_faq
  for select using (true);

-- Admin authentifié : accès total
drop policy if exists "admin_all_products" on products;
create policy "admin_all_products" on products
  for all using (auth.role() = 'authenticated');

drop policy if exists "admin_all_zones" on delivery_zones;
create policy "admin_all_zones" on delivery_zones
  for all using (auth.role() = 'authenticated');

drop policy if exists "admin_all_orders" on orders;
create policy "admin_all_orders" on orders
  for all using (auth.role() = 'authenticated');

drop policy if exists "admin_all_messages" on contact_messages;
create policy "admin_all_messages" on contact_messages
  for all using (auth.role() = 'authenticated');

drop policy if exists "admin_all_faq" on chatbot_faq;
create policy "admin_all_faq" on chatbot_faq
  for all using (auth.role() = 'authenticated');

-- Note : les commandes et messages sont créés côté serveur
-- via la clé service_role (bypass RLS). Aucune policy
-- d'insertion publique — cela évite qu'un client falsifie
-- un prix ou des frais de livraison.

-- ══════════════════════════════════════════════════════════
-- DONNÉES INITIALES
-- ══════════════════════════════════════════════════════════
insert into delivery_zones (name, cities, zone_type, fee, message) values
  ('Cotonou',    array['cotonou'],    'local', 1000, null),
  ('Abomey-Calavi', array['calavi', 'abomey-calavi'], 'local', 1500, null),
  ('Porto-Novo', array['porto-novo', 'portonovo'], 'local', 2000, null),
  ('Autres villes du Bénin', array['*'], 'expedition', 5000,
   'Livraison en dehors de Cotonou, Calavi et Porto-Novo : votre colis sera expédié.')
on conflict do nothing;

insert into chatbot_faq (keywords, answer, priority) values
  (array['livraison','livrer','delai','expedition'],
   'Nous livrons à Cotonou, Abomey-Calavi et Porto-Novo (frais locaux). Pour les autres villes du Bénin, votre colis est expédié avec des frais d''expédition. Les frais exacts s''affichent au moment de la commande.', 10),
  (array['paiement','payer','carte','mobile money','espece'],
   'Le paiement se fait uniquement à la livraison, en espèces, quand vous recevez votre commande.', 10),
  (array['gros','grossiste','revendeur','quantite'],
   'Oui, nous vendons en gros. Les prix de gros sont affichés sur chaque fiche produit avec la quantité minimum requise.', 10),
  (array['horaire','ouvert','ferme','heure'],
   'Nous sommes ouverts du lundi au samedi, de 8h à 20h. Le dimanche de 10h à 18h.', 8),
  (array['adresse','ou etes vous','localisation','boutique'],
   'Notre boutique se trouve à Cotonou, Bénin. Contactez-nous par WhatsApp pour l''itinéraire exact.', 8),
  (array['sans alcool','non alcoolise','enfant','jus','eau'],
   'Oui, nous proposons des eaux en bouteille et des vins/champagnes sans alcool. Consultez les catégories « Eaux en
