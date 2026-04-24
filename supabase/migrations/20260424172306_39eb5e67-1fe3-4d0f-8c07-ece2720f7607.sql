INSERT INTO public.hebrew_terms (term, transliteration, meaning, context, category, featured, published, display_order)
VALUES (
  'ABIB',
  'aviv',
  'The first month of YAHUAH''s calendar — month of green ears, when Pesach falls.',
  'Scripture commands: "Guard the month of Abib, and observe the Pesach unto YAHUAH" (Deḇariym / Deuteronomy 16:1). Abib marks the start of the biblical year, not Nisan or January.',
  'moedim',
  true,
  true,
  100
)
ON CONFLICT DO NOTHING;