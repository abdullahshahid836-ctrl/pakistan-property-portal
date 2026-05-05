import { Suspense } from 'react'
import PropertyArchive from '@/components/shared/PropertyArchive'

export default function RoomsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyArchive 
        title="Rooms & Portions for Rent" 
        subtitle="Affordable living solutions for students and professionals."
        filterType="Room"
      />
    </Suspense>
  )
}
