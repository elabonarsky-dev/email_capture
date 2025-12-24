// ===================================
// Netlify Serverless Function
// Email Validation with ZeroBounce
// ===================================

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Invalid request body' }),
        };
    }

    if (!email) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Email is required' }),
        };
    }

    // Get API key from environment variable
    const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;
    
    // Debug logging (remove after testing)
    console.log('Environment check:');
    console.log('API_KEY exists:', !!ZEROBOUNCE_API_KEY);
    
    if (!ZEROBOUNCE_API_KEY) {
        console.error('Missing ZeroBounce API key');
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                error: 'ZeroBounce API key not configured',
                debug: {
                    hasApiKey: !!ZEROBOUNCE_API_KEY,
                    allEnvVars: Object.keys(process.env).filter(key => key.includes('ZEROBOUNCE'))
                }
            }),
        };
    }

    try {
        // Call ZeroBounce API
        const url = `https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&ip_address=`;
        
        console.log('Calling ZeroBounce API for email:', email);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('ZeroBounce API response:', {
            status: response.status,
            email: email,
            result: data.status
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('ZeroBounce API error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                error: 'Validation failed', 
                message: error.message 
            }),
        };
    }
};

