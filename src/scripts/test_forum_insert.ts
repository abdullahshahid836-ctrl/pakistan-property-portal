import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testInsert() {
  console.log('Testing insert into forum_replies...')
  const { data, error } = await supabase
    .from('forum_replies')
    .insert([
      {
        topic_id: 'topic-101',
        author: 'Test User',
        content: 'This is a test reply'
      }
    ])
    .select()

  if (error) {
    console.error('Insert error:', error)
  } else {
    console.log('Insert success:', data)
  }
}

testInsert()
