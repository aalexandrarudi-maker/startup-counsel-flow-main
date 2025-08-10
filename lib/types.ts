export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_tier: 'free' | 'pro' | 'enterprise'
  subscription_status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'unpaid'
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  customer_id: string
  price_id: string
  status: string
  current_period_start: number
  current_period_end: number
  created_at: string
}

export interface StripePrice {
  id: string
  product: string
  active: boolean
  currency: string
  unit_amount: number
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year'
    interval_count: number
  }
}

export interface StripeProduct {
  id: string
  name: string
  description?: string
  active: boolean
  metadata: Record<string, string>
}
