import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Calendar, MapPin, Users, Clock, ArrowLeft, Star, Share2, Heart } from 'lucide-react'
import { Event } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

  // Refactored: use new event field names throughout
  const mockEvent = {
    _id: '1',
    name: 'Tech Innovators Summit',
    details: `A gathering of the brightest minds in technology. Expect inspiring talks, hands-on demos, and networking with industry leaders.

    Highlights:
    • Keynotes from top innovators
    • Interactive workshops
    • Networking sessions
    • Expo hall with new tech
    • Free swag and resources

    Ideal for engineers, founders, and anyone passionate about tech advancement.`,
    eventDate: '2024-10-15',
    eventTime: '09:00',
    location: 'San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103',
    cost: 299,
    seatsTotal: 500,
    seatsAvailable: 342,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    createdBy: '1',
    createdAt: '2024-01-15',
    status: 'upcoming'
  }

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [event] = useState(mockEvent)
  const [selectedSeats, setSelectedSeats] = useState(1)
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to book tickets.',
        variant: 'destructive',
      })
      navigate('/login')
      return
    }

    setIsBooking(true)
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: 'Booking successful!',
  description: `${selectedSeats} ticket(s) booked for ${event.name}`,
      })
      
      navigate('/my-tickets')
    } catch (error) {
      toast({
        title: 'Booking failed',
        description: 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsBooking(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const totalPrice = event.cost * selectedSeats

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'}
                alt={event.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant={event.cost === 0 ? 'secondary' : 'default'}>
                  {event.cost === 0 ? 'Free Event' : `$${event.cost}`}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Event Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">{event.name}</CardTitle>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                    <span>4.8 (124 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{event.seatsTotal - event.seatsAvailable} attending</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Date & Time</div>
                      <div className="text-muted-foreground">
                        {formatDate(event.eventDate)}
                      </div>
                      <div className="text-muted-foreground">
                        {event.eventTime} (PDT)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">Venue</div>
                      <div className="text-muted-foreground">
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">About This Event</h3>
                  <div className="prose prose-gray max-w-none">
                    {event.details.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Event Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">TechEvents Pro</div>
                    <div className="text-muted-foreground">Professional event organizer</div>
                    <div className="text-sm text-muted-foreground">50+ events organized</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Tickets</CardTitle>
                <CardDescription>
                  {event.seatsAvailable} of {event.seatsTotal} tickets available
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Ticket Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Tickets
                  </label>
                  <select
                    value={selectedSeats}
                    onChange={(e) => setSelectedSeats(Number(e.target.value))}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    {[...Array(Math.min(10, event.seatsAvailable))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Ticket' : 'Tickets'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per ticket</span>
                    <span>${event.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity</span>
                    <span>{selectedSeats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$5.99</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice + 5.99}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full gradient-primary shadow-elegant" 
                  onClick={handleBooking}
                  disabled={isBooking || event.seatsAvailable === 0}
                >
                  {isBooking ? 'Processing...' : event.seatsAvailable === 0 ? 'Sold Out' : 'Book Now'}
                </Button>
                
                {!user && (
                  <p className="text-center text-sm text-muted-foreground">
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link> to book tickets
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}