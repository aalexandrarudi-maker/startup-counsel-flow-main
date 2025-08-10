import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, FileText, Calendar, CreditCard } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Law Firm Companion
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Startup Counsel Flow - Your Growth Dashboard
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Daily Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage your daily tasks and priorities</p>
            <Link href="/dashboard">
              <Button variant="ghost" className="p-0 h-auto">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Client Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Track your client relationships and opportunities</p>
            <Link href="/dashboard">
              <Button variant="ghost" className="p-0 h-auto">
                View Pipeline <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Content Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create and manage thought leadership content</p>
            <Link href="/dashboard">
              <Button variant="ghost" className="p-0 h-auto">
                Explore Content <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans Preview */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Growth Path</h2>
        <p className="text-lg text-gray-600 mb-6">
          Start free and scale as you grow. No long-term commitments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="text-3xl font-bold">€0</div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>✓ Basic dashboard access</li>
              <li>✓ Up to 5 client records</li>
              <li>✓ Standard support</li>
            </ul>
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                Current Plan
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center border-2 border-blue-500 relative">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
            Most Popular
          </Badge>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For growing law firms</CardDescription>
            <div className="text-3xl font-bold">€99<span className="text-lg text-gray-500">/month</span></div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>✓ Everything in Free</li>
              <li>✓ Unlimited client records</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
            </ul>
            <Link href="/pricing">
              <Button className="w-full">
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For established practices</CardDescription>
            <div className="text-3xl font-bold">€299<span className="text-lg text-gray-500">/month</span></div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>✓ Everything in Pro</li>
              <li>✓ Team collaboration</li>
              <li>✓ Advanced compliance tools</li>
              <li>✓ Dedicated support</li>
            </ul>
            <Link href="/pricing">
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Practice?</h2>
        <p className="text-gray-600 mb-6">
          Join hundreds of lawyers who are already using our platform to grow their firms.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg">
              Start Free Trial
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
