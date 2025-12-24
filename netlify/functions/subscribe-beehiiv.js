// ===================================
// Netlify Serverless Function
// Subscribe to Beehiiv
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
    let email, eventTag;
    try {
        const body = JSON.parse(event.body);
        email = body.email;
        eventTag = body.eventTag || 'Event Signup';
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

    // Get API credentials from environment variables
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
    
    // Debug logging (remove after testing)
    console.log('Environment check:');
    console.log('API_KEY exists:', !!BEEHIIV_API_KEY);
    console.log('PUB_ID exists:', !!BEEHIIV_PUBLICATION_ID);
    
    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
        console.error('Missing credentials:', {
            hasApiKey: !!BEEHIIV_API_KEY,
            hasPubId: !!BEEHIIV_PUBLICATION_ID
        });
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Beehiiv not configured',
                debug: {
                    hasApiKey: !!BEEHIIV_API_KEY,
                    hasPubId: !!BEEHIIV_PUBLICATION_ID,
                    allEnvVars: Object.keys(process.env).filter(key => key.includes('BEEHIIV'))
                }
            }),
        };
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
        
        // Enhanced logging for debugging
        if (!response.ok) {
            console.error('Beehiiv API Error:', {
                status: response.status,
                statusText: response.statusText,
                data: data
            });
        } else {
            console.log('Beehiiv API Success:', data);
        }

        return {
            statusCode: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Adjust for production
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Subscription failed', message: error.message }),
        };
    }
};

