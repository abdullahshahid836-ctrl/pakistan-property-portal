import { Suspense } from 'react'
import PropertyArchive from '@/components/shared/PropertyArchive'

export default function FlatsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyArchive 
        title="Flats & Apartments in Pakistan" 
        subtitle="Find luxury apartments and budget-friendly flats for sale and rent in top residential projects."
        filterType="Flat"
      />
    </Suspense>
  )
}
