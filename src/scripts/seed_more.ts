import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function getPriceLabel(price: number): string {
  if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Crore`
  if (price >= 100000) return `${(price / 100000).toFixed(0)} Lac`
  return price.toLocaleString()
}

const moreProperties = [
  // LAHORE
  {
    title: "10 Marla Luxury House in Bahria Town Lahore",
    type: "House", purpose: "Sale", price: 32000000, city: "Lahore", area: "Bahria Town Lahore",
    address: "Sector C, Bahria Town, Lahore", bedrooms: 4, bathrooms: 5, areaSize: 10, areaUnit: "Marla",
    description: "Modern design 10 Marla house in the heart of Bahria Town Lahore.",
    features: ["Security", "Park View"], agentId: "agent-004"
  },
  {
    title: "5 Marla Residential Plot in Bahria Town Lahore",
    type: "Plot", purpose: "Sale", price: 6500000, city: "Lahore", area: "Bahria Town Lahore",
    address: "Sector F, Bahria Town, Lahore", bedrooms: 0, bathrooms: 0, areaSize: 5, areaUnit: "Marla",
    description: "Ideal investment 5 Marla plot in Sector F, Bahria Town Lahore.",
    features: ["Leveled Ground"], agentId: "agent-001"
  },
  {
    title: "1 Kanal Plot in DHA Lahore",
    type: "Plot", purpose: "Sale", price: 38000000, city: "Lahore", area: "DHA Lahore",
    address: "Block Q, DHA Phase 7, Lahore", bedrooms: 0, bathrooms: 0, areaSize: 1, areaUnit: "Kanal",
    description: "Prime location 1 Kanal plot in DHA Phase 7.",
    features: ["Gas", "Electricity"], agentId: "agent-007"
  },
  {
    title: "Luxury Apartment in Gulberg",
    type: "Flat", purpose: "Rent", price: 150000, city: "Lahore", area: "Gulberg",
    address: "Main Boulevard, Gulberg, Lahore", bedrooms: 2, bathrooms: 2, areaSize: 1200, areaUnit: "Sq. Ft.",
    description: "Fully furnished 2-bedroom apartment in Gulberg.",
    features: ["Furnished", "Gym"], agentId: "agent-001"
  },

  // KARACHI
  {
    title: "125 Sq Yd Plot in Bahria Town Karachi",
    type: "Plot", purpose: "Sale", price: 4500000, city: "Karachi", area: "Bahria Town Karachi",
    address: "Precinct 12, Bahria Town Karachi", bedrooms: 0, bathrooms: 0, areaSize: 125, areaUnit: "Sq. Yd.",
    description: "Ali Block Precinct 12 plot available.",
    features: ["Corner Plot"], agentId: "agent-005"
  },
  {
    title: "3 Bed Luxury Flat in Clifton",
    type: "Flat", purpose: "Sale", price: 45000000, city: "Karachi", area: "Clifton",
    address: "Block 4, Clifton, Karachi", bedrooms: 3, bathrooms: 3, areaSize: 2200, areaUnit: "Sq. Ft.",
    description: "Sea view apartment in the most elite area of Karachi.",
    features: ["Sea View", "Security"], agentId: "agent-002"
  },
  {
    title: "1 Kanal Plot in DHA Karachi",
    type: "Plot", purpose: "Sale", price: 55000000, city: "Karachi", area: "DHA Karachi",
    address: "Phase 8, DHA, Karachi", bedrooms: 0, bathrooms: 0, areaSize: 1, areaUnit: "Kanal",
    description: "Prime residential plot in DHA Karachi Phase 8.",
    features: ["Sea Side"], agentId: "agent-008"
  },

  // ISLAMABAD
  {
    title: "500 Sq Yd Plot in Bahria Enclave Islamabad",
    type: "Plot", purpose: "Sale", price: 22000000, city: "Islamabad", area: "Bahria Enclave",
    address: "Sector C, Bahria Enclave, Islamabad", bedrooms: 0, bathrooms: 0, areaSize: 1, areaUnit: "Kanal",
    description: "Beautiful view 1 Kanal plot in Bahria Enclave.",
    features: ["Hilly View"], agentId: "agent-003"
  },
  {
    title: "10 Marla House in DHA Islamabad",
    type: "House", purpose: "Sale", price: 35000000, city: "Islamabad", area: "DHA Islamabad",
    address: "Phase 2, DHA Islamabad", bedrooms: 4, bathrooms: 5, areaSize: 10, areaUnit: "Marla",
    description: "Brand new 10 Marla designer house in DHA Phase 2.",
    features: ["Modern Interior"], agentId: "agent-006"
  },

  // RAWALPINDI
  {
    title: "5 Marla Plot in Bahria Town Phase 8",
    type: "Plot", purpose: "Sale", price: 4800000, city: "Rawalpindi", area: "Bahria Town Phase 8",
    address: "Sector N, Bahria Town Phase 8", bedrooms: 0, bathrooms: 0, areaSize: 5, areaUnit: "Marla",
    description: "Good location plot in Phase 8.",
    features: ["Possession Ready"], agentId: "agent-009"
  },

  // PESHAWAR
  {
    title: "1 Kanal Plot in Hayatabad",
    type: "Plot", purpose: "Sale", price: 42000000, city: "Peshawar", area: "Hayatabad",
    address: "Phase 6, Hayatabad, Peshawar", bedrooms: 0, bathrooms: 0, areaSize: 1, areaUnit: "Kanal",
    description: "Prime residential plot in Hayatabad Phase 6.",
    features: ["Near Market"], agentId: "agent-012"
  },

  // MULTAN
  {
    title: "10 Marla Plot in DHA Multan",
    type: "Plot", purpose: "Sale", price: 8500000, city: "Multan", area: "DHA Multan",
    address: "Sector B, DHA Multan", bedrooms: 0, bathrooms: 0, areaSize: 10, areaUnit: "Marla",
    description: "Premium plot in DHA Multan Sector B.",
    features: ["Near Park"], agentId: "agent-010"
  },
  {
    title: "5 Marla Plot in Bahria Town Multan",
    type: "Plot", purpose: "Sale", price: 3500000, city: "Multan", area: "Bahria Town Multan",
    address: "Block A, Bahria Town Multan", bedrooms: 0, bathrooms: 0, areaSize: 5, areaUnit: "Marla",
    description: "Affordable investment in Bahria Town Multan.",
    features: ["Electricity"], agentId: "agent-011"
  }
]

async function seedMore() {
  console.log('Reseeding properties with better agent distribution...')
  
  // First, clear previous extra properties to avoid duplicates if necessary, 
  // but here we use upsert with deterministic IDs if possible, or just insert more.
  // To keep it simple, I'll just insert these with specific IDs.

  const propertiesToInsert = moreProperties.map((p, index) => ({
    id: `extra-prop-${index}`,
    title: p.title,
    type: p.type,
    purpose: p.purpose,
    price: p.price,
    price_label: getPriceLabel(p.price),
    city: p.city,
    area: p.area,
    address: p.address,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area_size: p.areaSize,
    area_unit: p.areaUnit,
    description: p.description,
    features: p.features,
    agent_id: p.agentId,
    is_active: true,
    is_verified: true,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]
  }))

  const { error } = await supabase
    .from('properties')
    .upsert(propertiesToInsert)

  if (error) {
    console.error('Error seeding more properties:', error)
  } else {
    console.log('✅ Seeded 13 properties with unique agent IDs successfully!')
  }
}

seedMore()
