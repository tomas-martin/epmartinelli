-- ============================================================
-- SCHEMA PARA EL PANEL DE ADMINISTRACIÓN E.P. MARTINELLI
-- Ejecutar esto en el SQL Editor de Supabase
-- ============================================================

-- 1. TABLA DE PERFILES (vinculada a auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'employee')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA DE PRODUCTOS
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  sku TEXT UNIQUE NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 2,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA DE MOVIMIENTOS DE STOCK
CREATE TABLE stock_movements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('entry', 'exit')),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ÍNDICES
CREATE INDEX idx_stock_movements_product_id ON stock_movements(product_id);
CREATE INDEX idx_stock_movements_user_id ON stock_movements(user_id);
CREATE INDEX idx_stock_movements_created_at ON stock_movements(created_at DESC);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_sku ON products(sku);

-- ============================================================
-- RLS (ROW LEVEL SECURITY)
-- ============================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- Función helper para evitar recursión infinita en RLS
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

-- POLÍTICAS PARA PROFILES
-- ============================================================

-- Todos los usuarios autenticados pueden leer perfiles
-- (necesario para mostrar quién hizo cada movimiento en el historial)
CREATE POLICY "Authenticated users can read profiles"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');

-- Solo el dueño puede insertar/actualizar/eliminar perfiles
CREATE POLICY "Owner can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (
    public.current_user_role() = 'owner'
  );

CREATE POLICY "Owner can update profiles"
  ON profiles FOR UPDATE
  USING (
    public.current_user_role() = 'owner'
  );

CREATE POLICY "Owner can delete profiles"
  ON profiles FOR DELETE
  USING (
    public.current_user_role() = 'owner'
  );

-- Permitir al trigger de auth insertar el perfil propio durante el registro
CREATE POLICY "Allow insert own profile on signup"
  ON profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- ============================================================
-- POLÍTICAS PARA PRODUCTOS
-- ============================================================

-- Todos los usuarios autenticados pueden leer productos
CREATE POLICY "Authenticated users can read products"
  ON products FOR SELECT
  USING (auth.role() = 'authenticated');

-- Solo el dueño y el administrador pueden insertar, actualizar o eliminar productos
CREATE POLICY "Owner can insert products"
  ON products FOR INSERT
  WITH CHECK (
    public.current_user_role() IN ('owner', 'admin')
  );

CREATE POLICY "Owner can update products"
  ON products FOR UPDATE
  USING (
    public.current_user_role() IN ('owner', 'admin')
  );

CREATE POLICY "Owner can delete products"
  ON products FOR DELETE
  USING (
    public.current_user_role() IN ('owner', 'admin')
  );

-- ============================================================
-- POLÍTICAS PARA STOCK_MOVEMENTS
-- ============================================================

-- Todos los usuarios autenticados pueden leer todos los movimientos
-- (el historial completo es visible para dueño, administrador y empleado)
CREATE POLICY "Authenticated users can read all movements"
  ON stock_movements FOR SELECT
  USING (auth.role() = 'authenticated');

-- Cualquier usuario autenticado puede insertar movimientos
CREATE POLICY "Authenticated users can insert movements"
  ON stock_movements FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- FUNCIÓN PARA CREAR PERFIL AUTOMÁTICAMENTE AL REGISTRARSE
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que se ejecuta después de crear un usuario en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- MIGRACIÓN (solo si ya tenés el esquema anterior aplicado)
-- ============================================================

-- Permitir rol 'admin' en la tabla de perfiles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('owner', 'admin', 'employee'));

-- Recrear políticas de productos para que el admin también gestione el catálogo
DROP POLICY IF EXISTS "Owner can insert products" ON products;
DROP POLICY IF EXISTS "Owner can update products" ON products;
DROP POLICY IF EXISTS "Owner can delete products" ON products;
CREATE POLICY "Owner can insert products" ON products FOR INSERT
  WITH CHECK (public.current_user_role() IN ('owner', 'admin'));
CREATE POLICY "Owner can update products" ON products FOR UPDATE
  USING (public.current_user_role() IN ('owner', 'admin'));
CREATE POLICY "Owner can delete products" ON products FOR DELETE
  USING (public.current_user_role() IN ('owner', 'admin'));

-- Historial completo visible para todos los autenticados
DROP POLICY IF EXISTS "Owner can read all movements" ON stock_movements;
DROP POLICY IF EXISTS "Employee can read own movements" ON stock_movements;
CREATE POLICY "Authenticated users can read all movements"
  ON stock_movements FOR SELECT
  USING (auth.role() = 'authenticated');

-- Perfiles legibles por todos los autenticados (para el historial)
DROP POLICY IF EXISTS "Owner can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Employee can read own profile" ON profiles;
CREATE POLICY "Authenticated users can read profiles"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');