// ===================================
// Vercel Serverless Function
// Email Validation with ZeroBounce
// ===================================

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Get API key from environment variable
    const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;
    
    if (!ZEROBOUNCE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        // Call ZeroBounce API
        const url = `https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&ip_address=`;
        
        const response = await fetch(url);
        const data = await response.json();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ 
            error: 'Validation failed', 
            message: error.message 
        });
    }
}

