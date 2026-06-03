/*
 * [@superbase/server](https://supabase.com/blog/introducing-supabase-server.md)
 *
 *
 * */

import { withSupabase } from '@supabase/server'

// Typical Deno.serve usage
Deno.serve(
  withSupabase({ auth: 'user' }, async (req, ctx) => {
    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  })
)

// New fetch style handler usage
export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const { data } = await ctx.supabase.from('todos').select()
    return Response.json(data)
  })
}
