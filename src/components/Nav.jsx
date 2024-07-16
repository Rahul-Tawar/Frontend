import React from 'react'
import { BriefcaseIcon, MenuIcon } from './iconComponents/Icons'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'


const Nav = () => {
 return (
    <header className="bg-background px-4 lg:px-6 py-4 flex items-center justify-between">
    <Link to="/" className="flex items-center gap-2">
      <BriefcaseIcon className="w-6 h-6 text-primary" />
      <span className="text-xl font-bold">Tender Manager</span>
    </Link>
    <nav className="hidden md:flex items-center gap-4">
      <Link to="/" className="text-muted-foreground hover:text-foreground">Features</Link>
      <Link to="/" className="text-muted-foreground hover:text-foreground">Pricing</Link>
      <Link to="/" className="text-muted-foreground hover:text-foreground">About</Link>
      <Link to="/" className="text-muted-foreground hover:text-foreground">Contact</Link>
    </nav>
    <div className="md:hidden">
      <Button variant="outline" size="icon">
        <MenuIcon className="w-6 h-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </div>
  </header>
 )
}

export default Nav
