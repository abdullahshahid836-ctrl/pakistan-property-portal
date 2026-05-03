import { NextRequest, NextResponse } from 'next/server'
import locationsData from '@/data/locations.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.toLowerCase() || ''

  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] })

  const suggestions: Array<{
    label: string
    type: 'city' | 'area'
    city: string
    value: string
  }> = []

  for (const city of locationsData.cities) {
    if (city.name.toLowerCase().includes(q)) {
      suggestions.push({
        label: city.name,
        type: 'city',
        city: city.name,
        value: city.name
      })
    }
    for (const area of city.areas) {
      if (area.toLowerCase().includes(q)) {
        suggestions.push({
          label: `${area}, ${city.name}`,
          type: 'area',
          city: city.name,
          value: area
        })
      }
    }
    if (suggestions.length >= 8) break
  }

  return NextResponse.json({ suggestions: suggestions.slice(0, 8) })
}
