export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { plan, success_url, cancel_url } = req.body;

    const priceMap = {
      'monthly': 'price_1TOWiGG2TlrDnzLKKntqKffm',
      'annual': 'price_1TOWjVG2TlrDnzLKFhlobHI1',
      'nuova-vita': 'price_1TOuPqG2TlrDnzLKov4YA0Em',
      'kit-casa': 'price_1TOuQIG2TlrDnzLKSMsPC3PC',
      'kit-casa-sessione': 'price_1TOuQjG2TlrDnzLKVjrY1OwO',
    };

    const priceId = priceMap[plan];
    if (!priceId) {
      return res.status(400).json({ error: 'Piano non valido' });
    }

    const isSubscription = ['monthly', 'annual'].includes(plan);

    const params = new URLSearchParams({
      'mode': isSubscription ? 'subscription' : 'payment',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'success_url': success_url || 'https://biscalab.com',
      'cancel_url': cancel_url || 'https://biscalab.com',
      'allow_promotion_codes': 'true',
      'metadata[plan]': plan,
    });

    params.set('customer_creation', 'always');

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const session = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: session.error?.message || 'Errore Stripe' });
    }

    return res.status(200).json({ url: session.url });

  } catch (err) {
    return res.status(500).json({ error: 'Errore interno del server' });
  }
}
