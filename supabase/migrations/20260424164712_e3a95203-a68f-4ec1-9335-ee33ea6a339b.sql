-- Hebrew Terms library for Raw & Real Gospel
CREATE TABLE public.hebrew_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL,
  transliteration text,
  meaning text NOT NULL,
  context text,
  usage text,
  category text NOT NULL DEFAULT 'general',
  paleo_glyph text,
  scripture_refs text[] DEFAULT '{}',
  display_order integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX hebrew_terms_term_unique ON public.hebrew_terms (lower(term));
CREATE INDEX hebrew_terms_category_idx ON public.hebrew_terms (category);
CREATE INDEX hebrew_terms_display_order_idx ON public.hebrew_terms (display_order);

ALTER TABLE public.hebrew_terms ENABLE ROW LEVEL SECURITY;

-- Public can read all published terms
CREATE POLICY "Public can read published hebrew terms"
  ON public.hebrew_terms FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Admins can manage
CREATE POLICY "Admins manage hebrew terms"
  ON public.hebrew_terms FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- updated_at trigger
CREATE TRIGGER hebrew_terms_updated_at
  BEFORE UPDATE ON public.hebrew_terms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the full term library
INSERT INTO public.hebrew_terms (term, meaning, context, category, display_order, featured) VALUES
('YAHUAH', 'The Set-Apart Name of the Father — "He exists / He causes to be"', 'Primary divine name across the site', 'sacred-names', 1, true),
('YAH', 'Short form of YAHUAH, seen in HalleluYAH', 'Short praise language, headings, accents', 'sacred-names', 2, true),
('YAHUSHA', 'Name of the Messiah — "YAHUAH saves" / "YAH is salvation"', 'Used instead of Jesus when speaking of Messiah', 'sacred-names', 3, true),
('YAHUSHA HA''MASHIACH', 'Yahusha the Messiah / Anointed One', 'Formal title for Messiah', 'sacred-names', 4, true),
('RUACH', 'Breath, wind, spirit', 'Used for spirit/breath language', 'sacred-names', 5, false),
('RUACH HAQODESH', 'Set-Apart Spirit / Sacred Breath', 'Used instead of Holy Spirit', 'sacred-names', 6, true),
('ELOHIYM', 'Mighty One / Power / Divine authority', 'Used instead of generic "God" when fitting', 'titles', 10, false),
('EL', 'Mighty One / Strength / Power', 'Short divine title', 'titles', 11, false),
('EL ELYON', 'The Most High Mighty One', 'Used for royal/high authority tone', 'titles', 12, false),
('EL SHADDAI', 'Almighty / Mighty One of provision and power', 'Used in worship or teaching sections', 'titles', 13, false),
('ADONAI', 'Master / Sovereign / Lord', 'A title — not the Name itself', 'titles', 14, false),
('MELEK', 'King', 'Royal design language', 'titles', 15, false),
('MALKUTH', 'Kingdom', 'Kingdom-focused sections', 'titles', 16, false),
('TORAH', 'Instruction, teaching, law', 'Commandments, obedience, teaching', 'covenant', 20, true),
('MITSWAH', 'Commandment', 'Obedience and commandments', 'covenant', 21, false),
('SHABBATH', 'Rest / Ceasing — the seventh-day Sabbath', 'Sabbath teaching', 'covenant', 22, true),
('QODESH', 'Set-apart, holy', 'Holiness / set-apart living', 'covenant', 23, false),
('HAQODESH', 'The set-apart / the holy', 'As in Ruach HaQodesh', 'covenant', 24, false),
('QADASH', 'To set apart, consecrate', 'Set-apart life themes', 'covenant', 25, false),
('EMUNAH', 'Faith, faithfulness, trust', 'Faith-based content', 'covenant', 26, false),
('TESHUVAH', 'Return, repentance', 'Call back to YAHUAH', 'covenant', 27, true),
('BERITH', 'Covenant', 'Covenant teaching', 'covenant', 28, true),
('MISHPACHAH', 'Family', 'Community / family', 'covenant', 29, false),
('SHALOM', 'Peace, wholeness, completeness', 'Peace and restoration', 'covenant', 30, false),
('CHOKMAH', 'Wisdom', 'Teaching / wisdom sections', 'wisdom', 40, false),
('DA''ATH', 'Knowledge', 'Study / knowledge sections', 'wisdom', 41, false),
('BINAH', 'Understanding', 'Deeper teaching', 'wisdom', 42, false),
('OR', 'Light', 'Truth and light imagery', 'wisdom', 43, false),
('CHOSHEN', 'Breastplate', 'Priesthood / identity symbolism', 'priesthood', 50, false),
('KOHEN', 'Priest', 'Priesthood identity teachings', 'priesthood', 51, false),
('KOHANIYM', 'Priests (plural)', 'Priesthood teachings', 'priesthood', 52, false),
('NAVI', 'Prophet', 'Prophetic teaching tone', 'priesthood', 53, false),
('NEVI''IYM', 'Prophets', 'Section name for prophetic writings', 'priesthood', 54, false),
('MASHIACH', 'Messiah / Anointed One', 'Messiah-centered content', 'priesthood', 55, false),
('TALMIDIYM', 'Disciples / Students', 'Discipleship sections', 'priesthood', 56, false),
('DEREK', 'Way, path, road', '"The Way" language', 'identity', 60, false),
('HA''DEREK', 'The Way', 'Original faith path of Yahusha''s followers', 'identity', 61, true),
('YISRA''EL', 'Israel — one who prevails with El', 'Identity teachings', 'identity', 62, false),
('YAHUDAH', 'Judah / Praise', 'Tribe of Judah identity', 'identity', 63, false),
('IBRIY', 'Hebrew — one who crosses over', 'Hebrew roots / identity', 'identity', 64, false),
('AM', 'People / Nation', 'YAHUAH''s people language', 'identity', 65, false),
('GOYIM', 'Nations', 'Discussing nations / gentiles', 'identity', 66, false),
('TSIYON', 'Zion — place of YAHUAH''s reign and restoration', 'Restoration / kingdom imagery', 'identity', 67, false),
('BESORAH', 'Good news / gospel', 'Hebrew-rooted "gospel"', 'scripture', 70, true),
('SEFER', 'Book / Scroll', 'Blog, writings, study resources', 'scripture', 71, false),
('CEPHER', 'Book / Scroll', 'Library or scripture-study sections', 'scripture', 72, false),
('EDUTH', 'Testimony / Witness', 'Testimonies', 'scripture', 73, false),
('ZAKAR', 'Remember', '"Remember the covenant" themes', 'scripture', 74, false),
('YASHAR', 'Upright / Straight', 'Righteousness messaging', 'scripture', 75, false),
('TSEDEQ', 'Righteousness / Justice', 'Justice / righteousness sections', 'scripture', 76, false),
('CHAYAH', 'Life / To live', 'Restoration / life messaging', 'scripture', 77, false),
('QAHAL', 'Assembly / Congregation', 'More Hebrew-rooted than "church"', 'identity', 80, true),
('MO''EDIM', 'Appointed times / Feasts', 'Feast days calendar', 'moedim', 90, true),
('PESACH', 'Passover', 'Feast teaching', 'moedim', 91, false),
('MATSAH', 'Unleavened bread', 'Feast teaching', 'moedim', 92, false),
('BIKKURIYM', 'Firstfruits', 'Feast teaching', 'moedim', 93, false),
('SHAVU''OTH', 'Weeks / Pentecost', 'Feast teaching', 'moedim', 94, false),
('YOM TERUAH', 'Day of Trumpets / Shouting', 'Feast teaching', 'moedim', 95, false),
('YOM KIPPURIYM', 'Day of Atonements', 'Feast teaching', 'moedim', 96, false),
('SUKKOTH', 'Tabernacles / Booths', 'Feast teaching', 'moedim', 97, false);
