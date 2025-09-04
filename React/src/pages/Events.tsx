import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Calendar, MapPin, Users, Search, Filter, Clock } from 'lucide-react'
import { Event } from '@/lib/supabase'

// Mock events data
// Remove mockEvents. We'll fetch from backend.

export default function Events() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [eventList, setEventList] = useState<Event[]>([])
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [sortOption, setSortOption] = useState('date')
  const [statusFilter, setStatusFilter] = useState('all')
  const [user, setUser] = useState<any>(null)
// ...existing code...

    useEffect(() => {
      const userData = localStorage.getItem('user')
      if (userData) {
        setCurrentUser(JSON.parse(userData))
      }
    }, [])

    useEffect(() => {
      setIsLoading(true)
      setFetchError(null)
      fetch('http://localhost:3000/api/events/')
        .then(res => {
          if (!res.ok) throw new Error('Unable to load events')
          return res.json()
        })
        .then(data => {
          setEventList(data.events || [])
          setDisplayedEvents(data.events || [])
          setIsLoading(false)
        })
        .catch(err => {
          setFetchError(err.message)
          setIsLoading(false)
        })
    }, [])

    useEffect(() => {
      let filtered = [...eventList]
      if (searchInput) {
        filtered = filtered.filter(e =>
          e.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          e.details.toLowerCase().includes(searchInput.toLowerCase()) ||
          e.location.toLowerCase().includes(searchInput.toLowerCase())
        )
      }
      if (statusFilter !== 'all') {
        filtered = filtered.filter(e => e.status === statusFilter)
      }
      if (sortOption === 'date') {
        filtered = filtered.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
      } else if (sortOption === 'cost') {
        filtered = filtered.sort((a, b) => a.cost - b.cost)
      }
      setDisplayedEvents(filtered)
    }, [searchInput, statusFilter, sortOption, eventList])

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar user={currentUser} />
        <main className="container mx-auto py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-4xl font-extrabold text-blue-700">Browse Events</h1>
            <div className="flex gap-3">
              <Input placeholder="Search..." value={searchInput} onChange={e => setSearchInput(e.target.value)} className="w-56" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="cost">Cost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-16 text-lg text-blue-500">Loading events...</div>
          ) : fetchError ? (
            <div className="text-center py-16 text-red-600">{fetchError}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedEvents.map(event => (
                <Card key={event._id} className="hover:shadow-xl transition border-2 border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-700">{event.name}</CardTitle>
                    <CardDescription>{event.details.slice(0, 80)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Calendar className="h-4 w-4" /> {event.eventDate}
                      <Clock className="h-4 w-4 ml-4" /> {event.eventTime}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" /> {event.location}
                    </div>
                    <div className="mt-2">
                      <Badge>{event.status}</Badge>
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold">{event.seatsAvailable} of {event.seatsTotal} seats available</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="font-bold text-lg text-blue-700">${event.cost}</span>
                    <Button asChild variant="outline">
                      <Link to={`/events/${event._id}`}>Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
// ...existing code...
}