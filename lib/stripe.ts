import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export interface CreateCheckoutSessionParams {
  priceId: string
  customerId?: string
  email?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}

export async function createCheckoutSession({
  priceId,
  customerId,
  email,
  successUrl,
  cancelUrl,
  metadata = {},
}: CreateCheckoutSessionParams) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: customerId,
      customer_email: customerId ? undefined : email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return { session, error: null }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return { session: null, error: error as Error }
  }
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return { session, error: null }
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return { session: null, error: error as Error }
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return { subscription, error: null }
  } catch (error) {
    console.error('Error retrieving subscription:', error)
    return { subscription: null, error: error as Error }
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return { subscription, error: null }
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return { subscription: null, error: error as Error }
  }
}

export async function getCustomer(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return { customer, error: null }
  } catch (error) {
    console.error('Error retrieving customer:', error)
    return { customer: null, error: error as Error }
  }
}
