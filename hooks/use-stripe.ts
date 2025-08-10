import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function useStripe() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createCheckoutSession = async (priceId: string, options?: {
    successUrl?: string
    cancelUrl?: string
    metadata?: Record<string, string>
  }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: options?.successUrl,
          cancelUrl: options?.cancelUrl,
          metadata: options?.metadata,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      if (url) {
        const stripe = await stripePromise
        if (stripe) {
          const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: url.split('/').pop()! })
          if (stripeError) {
            throw stripeError
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error creating checkout session:', err)
    } finally {
      setLoading(false)
    }
  }

  const openCustomerPortal = async (returnUrl?: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ returnUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to open customer portal')
      }

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error opening customer portal:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    createCheckoutSession,
    openCustomerPortal,
    loading,
    error,
    clearError: () => setError(null),
  }
}
