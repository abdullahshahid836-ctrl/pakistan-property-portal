import { Suspense } from 'react'
import PropertyArchive from '@/components/shared/PropertyArchive'

export default function RentalsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyArchive 
        title="Properties for Rent" 
        subtitle="Find the perfect house, flat or commercial space for rent across Pakistan."
        filterPurpose="Rent"
      />
    </Suspense>
  )
}
