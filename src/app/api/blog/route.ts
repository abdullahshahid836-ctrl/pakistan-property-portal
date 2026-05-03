import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('publish_date', { ascending: false })

    if (error) throw error

    return NextResponse.json({ posts: data })
  } catch (error: any) {
    console.error('Blog fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
