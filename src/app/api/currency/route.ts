import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const revalidate = 86400 // cache 24 hours

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    // First check if we have a fresh rate in settings
    const { data: rateSetting } = await supabase
      .from('settings')
      .select('value, updated_at')
      .eq('key', 'usd_to_pkr_rate')
      .single()

    const lastUpdate = rateSetting?.updated_at
      ? new Date(rateSetting.updated_at)
      : null
    const isStale = !lastUpdate ||
      (Date.now() - lastUpdate.getTime()) > 24 * 60 * 60 * 1000

    if (isStale && process.env.EXCHANGE_RATE_API_KEY) {
      // Fetch fresh rate from ExchangeRate-API
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/PKR`
      )
      const data = await response.json()

      if (data.conversion_rate) {
        const newRate = data.conversion_rate.toString()

        // Save to Supabase settings table
        await supabase
          .from('settings')
          .update({ value: newRate, updated_at: new Date().toISOString() })
          .eq('key', 'usd_to_pkr_rate')

        return NextResponse.json({
          usd_to_pkr: parseFloat(newRate),
          source: 'live',
          updated: new Date().toISOString()
        })
      }
    }

    // Return cached rate from settings
    return NextResponse.json({
      usd_to_pkr: parseFloat(rateSetting?.value || '279.50'),
      source: 'cached',
      updated: rateSetting?.updated_at
    })

  } catch {
    // Fallback rate if everything fails
    return NextResponse.json({ usd_to_pkr: 279.50, source: 'fallback' })
  }
}
