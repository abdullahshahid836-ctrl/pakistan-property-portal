import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Fetch all properties to compute averages
    const { data: properties, error } = await supabase
      .from('properties')
      .select('city, price, area_size, type')
    
    if (error) throw error

    const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan']
    
    // Group by city
    const stats = cities.map(city => {
      const cityProps = properties?.filter(p => p.city === city) || []
      const avgPrice = cityProps.length > 0 
        ? cityProps.reduce((acc, p) => acc + (p.price || 0), 0) / cityProps.length 
        : 0
      
      // Use current hour as a seed for a "live" fluctuation (±0.05%)
      const hour = new Date().getHours()
      const day = new Date().getDate()
      const seed = (hour + day) % 10
      const fluctuation = (seed - 5) / 1000 // -0.005 to +0.005
      
      const liveAvg = avgPrice * (1 + fluctuation)
      
      // Mock historical data based on live avg
      const history = [6, 5, 4, 3, 2, 1, 0].map(m => {
        const date = new Date()
        date.setMonth(date.getMonth() - m)
        const monthName = date.toLocaleString('default', { month: 'short' })
        
        // Create a realistic growth curve (roughly 1% monthly growth)
        const growthFactor = 1 - (m * 0.012) + (Math.random() * 0.005)
        return {
          month: monthName,
          value: Math.round(avgPrice * growthFactor)
        }
      })

      return {
        city,
        currentAvg: Math.round(liveAvg),
        trend: (1.2 + (seed / 10)).toFixed(1) + '%', // Mocked trend but seeded
        isDown: seed < 2,
        history
      }
    })

    return NextResponse.json({
      lastUpdated: new Date().toISOString(),
      stats
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
