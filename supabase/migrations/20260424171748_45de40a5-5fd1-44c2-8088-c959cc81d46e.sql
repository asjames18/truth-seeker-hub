
-- 1. Fix profiles: restrict SELECT to own row + admins
DROP POLICY IF EXISTS "profiles: allow authenticated read" ON public.profiles;

-- has_role helper (SECURITY DEFINER, search_path locked)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Fix user_roles privilege escalation
DROP POLICY IF EXISTS "user_roles: allow authenticated all" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles: allow authenticated read" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Enable RLS on blog_calendar_assignments (admin-only)
ALTER TABLE public.blog_calendar_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view calendar"
  ON public.blog_calendar_assignments FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert calendar"
  ON public.blog_calendar_assignments FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update calendar"
  ON public.blog_calendar_assignments FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete calendar"
  ON public.blog_calendar_assignments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Enable RLS on blog_monthly_views (allow anonymous insert for tracking; admin-only read)
ALTER TABLE public.blog_monthly_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a view"
  ON public.blog_monthly_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read views"
  ON public.blog_monthly_views FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Fix SSRF: restrict call_api_endpoint and lock search_path
REVOKE EXECUTE ON FUNCTION public.call_api_endpoint(text, text) FROM anon, authenticated, public;

CREATE OR REPLACE FUNCTION public.call_api_endpoint(endpoint_url text, secret_key text DEFAULT NULL::text)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, extensions
AS $function$
DECLARE
  full_url TEXT;
  request_id BIGINT;
BEGIN
  -- Only service_role / superuser can invoke (EXECUTE revoked from anon/authenticated)
  IF auth.role() IS DISTINCT FROM 'service_role' AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF secret_key IS NOT NULL AND secret_key != '' THEN
    IF position('?' in endpoint_url) > 0 THEN
      full_url := endpoint_url || '&secret=' || secret_key;
    ELSE
      full_url := endpoint_url || '?secret=' || secret_key;
    END IF;
  ELSE
    full_url := endpoint_url;
  END IF;

  SELECT net.http_get(
    url := full_url,
    headers := jsonb_build_object(
      'User-Agent', 'Supabase-pg_cron/1.0',
      'Content-Type', 'application/json'
    )
  ) INTO request_id;

  RETURN request_id;
END;
$function$;
