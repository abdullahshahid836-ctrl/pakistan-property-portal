import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function readJson(file: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data', file), 'utf8'))
}

async function seed() {
  const agentsData = readJson('agents.json')
  const propertiesData = readJson('properties.json')
  const projectsData = readJson('projects.json')
  const blogData = readJson('blog-posts.json')
  const forumData = readJson('forum-topics.json')

  console.log('Seeding agents...')
  const { error: agentError } = await supabase
    .from('agents')
    .upsert(agentsData.map((a: any) => ({
      id: a.id,
      name: a.name,
      agency: a.agency,
      city: a.city,
      phone: a.phone,
      whatsapp: a.whatsapp,
      email: a.email,
      photo_url: a.photo,
      languages: a.languages,
      total_listings: a.totalListings,
      rating: a.rating,
      review_count: a.reviewCount,
      experience: a.experience,
      bio: a.bio,
      specializations: a.specializations
    })))
  if (agentError) console.error('Agent error:', agentError)

  console.log('Seeding properties...')
  const { error: propError } = await supabase
    .from('properties')
    .upsert(propertiesData.map((p: any) => ({
      id: p.id,
      title: p.title,
      type: p.type,
      purpose: p.purpose,
      price: p.price,
      price_label: p.priceLabel,
      city: p.city,
      area: p.area,
      address: p.address,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area_size: p.areaSize,
      area_unit: p.areaUnit,
      description: p.description,
      features: p.features,
      images: p.images,
      agent_id: p.agentId,
      is_verified: p.isVerified,
      is_featured: p.isFeatured,
      views: p.views,
      lat: p.coordinates?.lat,
      lng: p.coordinates?.lng
    })))
  if (propError) console.error('Property error:', propError)

  console.log('Seeding projects...')
  for (const proj of projectsData) {
    const { data: project, error: projError } = await supabase
      .from('projects')
      .upsert({
        id: proj.id,
        slug: proj.slug,
        name: proj.name,
        developer: proj.developer,
        city: proj.city,
        location: proj.location,
        price_min: proj.priceMin,
        price_max: proj.priceMax,
        price_label: proj.priceLabel,
        status: proj.status,
        completion_date: proj.completionDate,
        description: proj.description,
        amenities: proj.amenities,
        cover_image: proj.coverImage,
        images: proj.images,
        is_trending: proj.isTrending,
        lat: proj.coordinates?.lat,
        lng: proj.coordinates?.lng
      })
      .select()
      .single()

    if (projError) console.error(`Project error (${proj.name}):`, projError)

    if (proj.units && project) {
      await supabase.from('project_units').insert(
        proj.units.map((u: any) => ({
          project_id: project.id,
          unit_type: u.type,
          size: u.size,
          price: u.price
        }))
      )
    }
  }

  console.log('Seeding blog posts...')
  await supabase.from('blog_posts').upsert(
    blogData.map((b: any) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      author: b.author,
      author_photo: b.authorPhoto,
      publish_date: b.publishDate,
      read_time: b.readTime,
      cover_image: b.coverImage,
      tags: b.tags
    }))
  )

  console.log('Seeding forum...')
  for (const cat of forumData.categories) {
    const { data: category, error: catError } = await supabase
      .from('forum_categories')
      .upsert({
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        topic_count: cat.topicCount,
        new_topics: cat.newTopics
      })
      .select()
      .single()

    if (catError) console.error(`Forum category error (${cat.name}):`, catError)

    if (cat.topics && category) {
      await supabase.from('forum_topics').insert(
        cat.topics.map((t: any) => ({
          id: t.id,
          category_id: category.id,
          title: t.title,
          author: t.author,
          replies: t.replies,
          views: t.views,
          is_hot: t.isHot
        }))
      )
    }
  }

  console.log('✅ Database seeded successfully!')
}

seed().catch(console.error)
