import { Suspense } from 'react'
import PropertyArchive from '@/components/shared/PropertyArchive'

export default function HomesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyArchive 
        title="Houses for Sale & Rent in Pakistan" 
        subtitle="Explore thousands of houses, villas and townhouses in all major cities."
        filterType="House"
      />
    </Suspense>
  )
}
