'use client'

import { useStripe } from '@/hooks/use-stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '€0',
    description: 'Perfect for getting started',
    features: [
      'Basic dashboard access',
      'Up to 5 client records',
      'Standard support',
      'Basic templates',
    ],
    priceId: null,
    popular: false,
    icon: Check,
  },
  {
    name: 'Pro',
    price: '€99',
    period: '/month',
    description: 'For growing law firms',
    features: [
      'Everything in Free',
      'Unlimited client records',
      'Advanced analytics',
      'Priority support',
      'Custom templates',
      'API access',
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    popular: true,
    icon: Zap,
  },
  {
    name: 'Enterprise',
    price: '€299',
    period: '/month',
    description: 'For established practices',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Advanced compliance tools',
      'White-label options',
      'Dedicated support',
      'Custom integrations',
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE,
    popular: false,
    icon: Crown,
  },
]

export default function PricingPage() {
  const { createCheckoutSession, loading, error } = useStripe()

  const handleSubscribe = async (priceId: string) => {
    if (!priceId) return
    
    await createCheckoutSession(priceId, {
      successUrl: `${window.location.origin}/dashboard?success=true`,
      cancelUrl: `${window.location.origin}/pricing?canceled=true`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your law firm's growth. Start free and upgrade anytime.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <plan.icon className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-gray-600">
                {plan.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                onClick={() => handleSubscribe(plan.priceId || '')}
                disabled={!plan.priceId || loading}
              >
                {loading ? 'Processing...' : plan.priceId ? 'Get Started' : 'Current Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Need a custom plan? Contact us for enterprise solutions.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>
    </div>
  )
}
