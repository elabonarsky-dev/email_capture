// ===================================
// Vercel Serverless Function
// Subscribe to Beehiiv
// ===================================

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, eventTag = 'Event Signup' } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Get API credentials from environment variables
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
    
    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
        return res.status(500).json({ error: 'Beehiiv not configured' });
    }

    try {
        // Call Beehiiv API
        const url = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;
        
        const payload = {
            email: email,
            reactivate_existing: false,
            send_welcome_email: true, // Triggers autoresponder
            utm_source: eventTag,
            utm_medium: 'kiosk',
            utm_campaign: 'event_signup',
            referring_site: 'kiosk'
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ 
            error: 'Subscription failed', 
            message: error.message 
        });
    }
}

