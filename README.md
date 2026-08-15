# E.P. Martinelli — Panel de Administración

Landing page + panel de administración (React + TypeScript + Vite) con Supabase.

## Configuración local

1. Crear `.env.local` a partir de `.env.example` con la URL y anon key del proyecto Supabase.
2. `npm install`
3. `npm run dev`

## Base de datos

Ejecutar `supabase-schema.sql` en el SQL Editor de Supabase. Si ya tenías el esquema
anterior aplicado, ejecutá la sección **MIGRACIÓN** al final del archivo.

Roles disponibles:

- **owner (Dueño)**: acceso total + crea/elimina usuarios (administradores y empleados).
- **admin (Administrador)**: gestiona productos y stock, ve historial completo. No crea usuarios.
- **employee (Empleado)**: ve productos (con precios), gestiona stock, ve historial completo. No crea usuarios.

## Edge Functions (crear usuarios desde el panel)

Para que el dueño pueda crear administradores/empleados desde el panel (`/admin/usuarios`),
se necesitan dos Edge Functions de Supabase: `create-user` y `delete-user`.

1. Instalar el CLI de Supabase si no lo tenés:
   ```
   npm install -g supabase
   ```
2. Ingresar y vincular el proyecto:
   ```
   supabase login
   supabase link --project-ref <tu-project-ref>
   ```
3. Deployar las funciones:
   ```
   supabase functions deploy create-user
   supabase functions deploy delete-user
   ```
4. En el Dashboard de Supabase (Settings → API), copiar la **service_role key**.
5. En el dashboard de la Edge Function, agregar la variable de entorno
   `SUPABASE_SERVICE_ROLE_KEY` con esa clave (la `SUPABASE_URL` y `SUPABASE_ANON_KEY`
   se inyectan automáticamente al deployar).

> ⚠️ La service_role key tiene acceso total. Solo usala como variable de entorno de
> las funciones, nunca en el frontend (`.env.local` solo lleva la anon key).

## Deploy en Vercel

La SPA usa `vercel.json` con rewrites para que las rutas de `/admin` no den 404.