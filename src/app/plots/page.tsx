import { Suspense } from 'react'
import PropertyArchive from '@/components/shared/PropertyArchive'

export default function PlotsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyArchive 
        title="Residential & Commercial Plots" 
        subtitle="Investment opportunities in top housing societies and commercial sectors."
        filterType="Plot"
      />
    </Suspense>
  )
}
