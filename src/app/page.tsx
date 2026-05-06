import React from 'react'
import HeroSearch from '@/components/home/HeroSearch'
import ExploreTools from '@/components/home/ExploreTools'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import CommunityForum from '@/components/home/CommunityForum'
import PopularLocations from '@/components/home/PopularLocations'
import ListPropertyCTA from '@/components/home/ListPropertyCTA'

export default function Home() {
  return (
    <div className="flex flex-col relative">
      <HeroSearch />
      <ExploreTools />
      <FeaturedProjects />
      <PopularLocations />
      <CommunityForum />
      <ListPropertyCTA />
    </div>
  )
}
