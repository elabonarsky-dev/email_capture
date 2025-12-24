// ===================================
// Netlify Serverless Function
// Email Validation with ZeroBounce
// ===================================

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    // Parse request body
    let email;
    try {
        const body = JSON.parse(event.body);
        email = body.email;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request body' }),
        };
    }

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Email is required' }),
        };
    }

    // Get API key from environment variable
    const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;
    
    if (!ZEROBOUNCE_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API key not configured' }),
        };
    }

    try {
        // Call ZeroBounce API
        const url = `https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&ip_address=`;
        
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Adjust for production
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Validation failed', message: error.message }),
        };
    }
};

