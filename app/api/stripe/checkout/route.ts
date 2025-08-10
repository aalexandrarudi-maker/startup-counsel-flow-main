import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl, metadata } = await req.json()
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Get the current user from Supabase
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user profile to check if they already have a Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    const { session, error } = await createCheckoutSession({
      priceId,
      customerId: profile?.stripe_customer_id,
      email: profile?.email || user.email,
      successUrl: successUrl || `${req.nextUrl.origin}/dashboard?success=true`,
      cancelUrl: cancelUrl || `${req.nextUrl.origin}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        ...metadata,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error in checkout route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
