import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Download, QrCode } from 'lucide-react'

export default function MyTickets() {
  const [user, setUser] = useState<any>(null)

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

  const mockTickets = [
    {
      id: '1',
      eventTitle: 'Tech Conference 2024',
      date: '2024-10-15',
      time: '09:00',
      venue: 'San Francisco Convention Center',
      seatNumber: 'A-123',
      qrCode: 'TC2024-001-A123',
      status: 'confirmed'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Tickets</h1>
        
        <div className="grid gap-6">
          {mockTickets.map((ticket) => (
            <Card key={ticket.id} className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{ticket.eventTitle}</CardTitle>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {ticket.date} at {ticket.time}
                    </div>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      {ticket.venue}
                    </div>
                  </div>
                  <Badge variant="secondary">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Seat</div>
                    <div className="font-semibold">{ticket.seatNumber}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-2" />
                      Show QR
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}