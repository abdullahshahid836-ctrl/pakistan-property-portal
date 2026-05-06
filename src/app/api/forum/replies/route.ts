import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const topicId = searchParams.get('topicId')

  if (!topicId) {
    return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('forum_replies')
    .select('*')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true })

  if (error) {
    // If table doesn't exist yet, return empty array to avoid crash
    if (error.code === 'PGRST204' || error.message.includes('relation "forum_replies" does not exist')) {
      return NextResponse.json({ replies: [], tableMissing: true })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ replies: data })
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const body = await request.json()
  const { topicId, content, author, authorRole, authorAvatar } = body

  if (!topicId || !content || !author) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('forum_replies')
    .insert([
      {
        topic_id: topicId,
        content,
        author,
        author_role: authorRole || 'Member',
        author_avatar: authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      }
    ])
    .select()
    .single()

  if (error) {
    if (error.message.includes('relation "forum_replies" does not exist')) {
      return NextResponse.json({ 
        error: 'The forum_replies table is missing in the database. Please run the SQL setup.',
        tableMissing: true 
      }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ reply: data })
}
