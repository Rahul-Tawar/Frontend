import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const HeroBanner = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Streamline Your Tender Process
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our tender management application helps you stay organized, efficient, and compliant throughout the
          entire tender lifecycle.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link
            href="#"
            className="inline bg-accent font-semibold text-background hover:text-background hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" 
            prefetch={false}
            role="button"
            
          >
            Get Started
          </Link>
          
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Learn More
          </Link>
        </div>
      </div>
      <img
        src="/placeholder.svg"
        width="550"
        height="550"
        alt="Hero"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
      />
    </div>
  </section>
  )
}

export default HeroBanner
