import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Calendar, LogOut, Settings, User, Menu, X } from 'lucide-react'

interface NavbarProps {
  user?: {
    name: string
    email: string
    role: 'admin' | 'user'
    avatar?: string
  }
  onLogout?: () => void
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout?.()
    navigate('/login')
  }

      return (
        <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-semibold text-blue-700 tracking-wide">EventX Portal</span>
          </div>
          <nav>
            <ul className="flex gap-6 text-blue-600 font-medium">
              <li><a href="/" className="hover:text-blue-900 transition">Dashboard</a></li>
              <li><a href="/events" className="hover:text-blue-900 transition">Browse Events</a></li>
              <li><a href="/my-tickets" className="hover:text-blue-900 transition">Tickets</a></li>
            </ul>
          </nav>
        </header>
      )
}