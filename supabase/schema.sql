-- ============================================================
-- ECHOWIN WEALTH — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- site_content: key-value CMS for all editable text
CREATE TABLE IF NOT EXISTS site_content (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page        TEXT NOT NULL,
  section     TEXT NOT NULL,
  key         TEXT NOT NULL,
  value       TEXT,
  value_json  JSONB,
  is_visible  BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_by  UUID REFERENCES auth.users(id),
  UNIQUE(page, section, key)
);

-- offerings: service cards
CREATE TABLE IF NOT EXISTS offerings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  short_desc   TEXT,
  full_desc    TEXT,
  features     JSONB DEFAULT '[]'::jsonb,
  icon_name    TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- contact_info: offices, phones, emails, whatsapp
CREATE TABLE IF NOT EXISTS contact_info (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT NOT NULL,
  label      TEXT,
  value      TEXT NOT NULL,
  meta       JSONB,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- seo_metadata: per-page SEO
CREATE TABLE IF NOT EXISTS seo_metadata (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page           TEXT UNIQUE NOT NULL,
  title          TEXT,
  description    TEXT,
  og_title       TEXT,
  og_description TEXT,
  og_image_url   TEXT,
  canonical_url  TEXT,
  keywords       TEXT[],
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- media: Supabase Storage references
CREATE TABLE IF NOT EXISTS media (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  bucket       TEXT NOT NULL DEFAULT 'site-assets',
  storage_path TEXT NOT NULL,
  public_url   TEXT NOT NULL,
  mime_type    TEXT,
  size_bytes   BIGINT,
  alt_text     TEXT,
  usage_tag    TEXT,
  uploaded_at  TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by  UUID REFERENCES auth.users(id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE site_content  ENABLE ROW LEVEL SECURITY;
ALTER TABLE offerings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info  ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata  ENABLE ROW LEVEL SECURITY;
ALTER TABLE media         ENABLE ROW LEVEL SECURITY;

-- Public reads
CREATE POLICY "public_read_site_content"  ON site_content  FOR SELECT USING (true);
CREATE POLICY "public_read_offerings"     ON offerings     FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_contact_info"  ON contact_info  FOR SELECT USING (is_visible = true);
CREATE POLICY "public_read_seo_metadata"  ON seo_metadata  FOR SELECT USING (true);
CREATE POLICY "public_read_media"         ON media         FOR SELECT USING (true);

-- Admin writes (app_role = 'admin' in JWT)
CREATE POLICY "admin_all_site_content"   ON site_content  FOR ALL USING ((auth.jwt() ->> 'app_role') = 'admin');
CREATE POLICY "admin_all_offerings"      ON offerings     FOR ALL USING ((auth.jwt() ->> 'app_role') = 'admin');
CREATE POLICY "admin_all_contact_info"   ON contact_info  FOR ALL USING ((auth.jwt() ->> 'app_role') = 'admin');
CREATE POLICY "admin_all_seo_metadata"   ON seo_metadata  FOR ALL USING ((auth.jwt() ->> 'app_role') = 'admin');
CREATE POLICY "admin_all_media"          ON media         FOR ALL USING ((auth.jwt() ->> 'app_role') = 'admin');

-- ============================================================
-- AUTH HOOK: set app_role = 'admin' for whitelisted emails
-- ============================================================

CREATE OR REPLACE FUNCTION set_admin_role()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  admin_emails TEXT[] := ARRAY['tanmay.harsh@echowin.in', 'admin@echowin.in'];
BEGIN
  IF NEW.email = ANY(admin_emails) THEN
    NEW.raw_app_meta_data := COALESCE(NEW.raw_app_meta_data, '{}'::jsonb) || '{"app_role": "admin"}'::jsonb;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION set_admin_role();

-- ============================================================
-- STORAGE BUCKET (run via Supabase Dashboard or API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO offerings (slug, title, short_desc, full_desc, features, icon_name, sort_order) VALUES
('financial-planning', 'Financial Planning',
 'Personalized goal planning aligned with your life milestones.',
 'Comprehensive family goal planning with risk-profile assessment, investment horizon analysis, and personalized recommendations tailored to your unique situation.',
 '["Family goal planning", "Risk-profile assessment", "Investment horizon analysis", "Personalized recommendations"]'::jsonb,
 'Target', 1),
('mutual-funds', 'Mutual Funds',
 'SIP, STP, SWP, and lumpsum across all fund categories.',
 'Curated mutual fund portfolios spanning equity, debt, hybrid, and sectoral categories. Systematic investment plans designed for long-term wealth creation.',
 '["Systematic Investment Plans (SIP)", "Systematic Transfer Plans (STP)", "Systematic Withdrawal Plans (SWP)", "Lumpsum investments"]'::jsonb,
 'TrendingUp', 2),
('portfolio-management', 'Portfolio Management Services (PMS)',
 'Research-driven sophisticated investment for HNI clients.',
 'Sophisticated investment options for high-net-worth individuals. Research-driven strategies with active portfolio management and transparent reporting.',
 '["Research-driven stock selection", "Active portfolio monitoring", "Customized strategies", "Detailed performance reporting"]'::jsonb,
 'BarChart3', 3),
('aif', 'Alternative Investment Funds (AIF)',
 'Beyond mutual funds — industry-research backed alternatives.',
 'Access to alternative asset classes beyond conventional mutual funds. Industry research backed investment in private equity, hedge funds, and structured products.',
 '["Private equity access", "Hedge fund strategies", "Structured products", "Industry research backed"]'::jsonb,
 'Layers', 4),
('algo-plans', 'Proprietary Algorithm-Based Plans',
 'Algorithmic SIP and lumpsum for superior risk-adjusted returns.',
 'Proprietary algorithms drive our systematic investment plans delivering superior risk-adjusted returns. Data-driven signals replace human emotion from investment decisions.',
 '["Algorithmic SIP (superior returns)", "Algorithmic Lumpsum", "Data-driven signals", "Emotion-free investing"]'::jsonb,
 'Cpu', 5),
('insurance', 'Insurance Products',
 'Life, Health, and General Insurance under one roof.',
 'Comprehensive insurance solutions covering life, health, and general insurance needs. Proper risk coverage is the foundation of any sound financial plan.',
 '["Life Insurance", "Health Insurance", "General Insurance (car/motor)", "Risk assessment consultation"]'::jsonb,
 'Shield', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO contact_info (type, label, value, meta, sort_order) VALUES
('office', 'Hyderabad Office', '3rd Floor, 91 Springboard, Mytri Square, 2-41/11, 6/2, Gachibowli - Miyapur Rd, Prashanth Nagar Colony, Hyderabad, Telangana 500084', '{"city": "Hyderabad", "state": "Telangana", "is_primary": true}'::jsonb, 1),
('office', 'Bengaluru Office', '91springboard Outer Ring Road (ORR), 512/10, Service Lane Mahadevapura, Bengaluru, Karnataka 560048', '{"city": "Bengaluru", "state": "Karnataka", "is_primary": false}'::jsonb, 2),
('phone', 'Landline', '040-7963-2712', '{"is_primary": false}'::jsonb, 3),
('phone', 'Mobile', '+91-6200059635', '{"is_primary": true}'::jsonb, 4),
('email', 'General Enquiry', 'care@echowin.in', '{"is_primary": true}'::jsonb, 5),
('email', 'Managing Director', 'tanmay.harsh@echowin.in', '{"is_primary": false}'::jsonb, 6),
('whatsapp', 'WhatsApp', '+91-6200059635', '{"is_primary": true}'::jsonb, 7);

INSERT INTO seo_metadata (page, title, description, og_title, og_description, keywords, canonical_url) VALUES
('home', 'Echowin Wealth — Data-Driven Financial Advisory & Investment Management', 'Powered by Data Analytics & Investment Algorithms. AMFI (SEBI) Registered Mutual Fund Distributor. Financial Advisory and Investment Management in Hyderabad & Bengaluru.', 'Echowin Wealth — Data-Driven Financial Advisory', 'AMFI (SEBI) Registered. Algorithm-backed wealth management for every one.', ARRAY['financial advisor hyderabad', 'mutual fund distributor', 'investment management', 'SIP', 'PMS', 'AIF', 'algorithmic investing'], 'https://echowin.in'),
('about', 'About Us — Echowin Wealth Private Limited', 'Analytics-backed investment solutions. A team of finance professionals from ICICI Bank combined with data analytics specialists.', 'About Echowin Wealth', 'Know our mission, philosophy, and team.', ARRAY['echowin wealth', 'financial advisors', 'ICICI Bank', 'data analytics investing'], 'https://echowin.in/about-us'),
('offerings', 'Our Offerings — Mutual Funds, PMS, AIF, Algo Plans | Echowin Wealth', 'Explore our full range: Financial Planning, Mutual Funds, PMS, AIF, Algorithm-Based Plans, and Insurance Products.', 'Our Offerings — Echowin Wealth', 'Full-spectrum financial services for every investor.', ARRAY['mutual funds', 'portfolio management', 'AIF', 'algorithmic SIP', 'insurance', 'financial planning'], 'https://echowin.in/offerings'),
('contact', 'Contact Us — Echowin Wealth Hyderabad & Bengaluru', 'Reach our offices in Hyderabad and Bengaluru. Call 040-7963-2712 or email care@echowin.in', 'Contact Echowin Wealth', 'Get in touch with our team.', ARRAY['echowin contact', 'financial advisor hyderabad', 'wealth management bengaluru'], 'https://echowin.in/contact-us')
ON CONFLICT (page) DO NOTHING;

INSERT INTO site_content (page, section, key, value) VALUES
('home', 'hero', 'headline', 'Powered by Data Analytics & Investment Algorithms'),
('home', 'hero', 'subheadline', 'Echowin Wealth is a Financial Advisory and Investment Management Firm'),
('home', 'hero', 'cta_text', 'Sign Up'),
('home', 'hero', 'cta_url', 'https://forms.gle/Ms74pz9vdEqfs6u99'),
('home', 'hero', 'name_change_notice', 'Formerly HealthofWealth Financial Advisors Private Limited'),
('home', 'trust', 'amfi_label', 'AMFI (SEBI) Registered Mutual Fund Distributor'),
('home', 'trust', 'startup_label', 'Startup India Recognised'),
('global', 'navbar', 'client_login_url', 'https://portfolio.echowin.in/client-login'),
('about', 'mission', 'headline', 'Our Mission'),
('about', 'mission', 'body', 'To look after the best financial interests of each of our clients'),
('about', 'philosophy', 'headline', 'Our Philosophy'),
('about', 'philosophy', 'body', 'Bringing top notch investment solutions for every one'),
('about', 'approach', 'headline', 'Process Centric Data Backed Approach'),
('about', 'approach', 'subheadline', 'Analytics Backed Quality Investing Recommendations')
ON CONFLICT (page, section, key) DO NOTHING;
