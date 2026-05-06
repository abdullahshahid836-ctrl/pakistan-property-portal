import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function setupForumTables() {
  console.log('Setting up forum tables...')

  // Since we can't easily run raw SQL DDL through the client without an RPC function,
  // and assuming the user might not have one, we'll try to use a common pattern 
  // or just explain that we need these tables.
  
  // HOWEVER, I can try to use the 'postgres' property if available in some versions, 
  // but usually it's not.
  
  // Let's try to just insert into a 'forum_replies' table to see if it exists.
  const { error } = await supabase.from('forum_replies').select('id').limit(1)
  
  if (error && error.code === 'PGRST116') {
    console.log('forum_replies table exists but is empty.')
  } else if (error && error.message.includes('relation "forum_replies" does not exist')) {
    console.log('forum_replies table DOES NOT exist. We need to create it.')
    console.log('Please run the following SQL in your Supabase SQL Editor:')
    console.log(`
      CREATE TABLE IF NOT EXISTS forum_replies (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        topic_id TEXT NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
        author TEXT NOT NULL,
        author_role TEXT,
        author_avatar TEXT,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS content TEXT;
    `)
  } else {
    console.log('forum_replies table seems to be ready.')
  }
}

setupForumTables()
