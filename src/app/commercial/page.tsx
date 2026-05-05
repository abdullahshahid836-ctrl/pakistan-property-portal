import { Suspense } from 'react'
import PropertyArchive from '@/components/shared/PropertyArchive'

export default function CommercialPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyArchive 
        title="Commercial Properties in Pakistan" 
        subtitle="Shops, offices and warehouses for your business needs."
        filterType="Commercial"
      />
    </Suspense>
  )
}
