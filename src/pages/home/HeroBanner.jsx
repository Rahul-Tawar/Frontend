import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'


const HeroBanner = () => {
  return (
    <div className='flex flex-col min-h-[50dvh] h-screen w-full p-15'>
      <section className="bg-primary py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md space-y-4">
            <h1 className="text-4xl md:text-4xl font-bold text-primary-foreground">Streamline Your Tender Process</h1>
            <p className="text-primary-foreground/80">
              Our tender management application helps you stay organized, track deadlines, and collaborate with your
              team to win more bids.
            </p>
            <Button
             variant=""
             className="bg-orange-400 hover:bg-orange-500" 
            >
              Get Started
            </Button>
        </div>
          <img
            src="/placeholder.svg"
            width="400"
            height="300"
            alt="Tender Management"
            className="rounded-lg shadow-lg"
          />
      </section>
    </div>
   
  )
}

export default HeroBanner
