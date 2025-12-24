// ===================================
// Netlify Serverless Function
// Check API Connection & Environment Variables
// ===================================

exports.handler = async (event, context) => {
    // Get API credentials from environment variables
    const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
    
    const result = {
        timestamp: new Date().toISOString(),
        environment: {
            ZEROBOUNCE_API_KEY: {
                exists: !!ZEROBOUNCE_API_KEY,
                length: ZEROBOUNCE_API_KEY ? ZEROBOUNCE_API_KEY.length : 0,
                preview: ZEROBOUNCE_API_KEY ? `${ZEROBOUNCE_API_KEY.substring(0, 8)}...` : null
            },
            BEEHIIV_API_KEY: {
                exists: !!BEEHIIV_API_KEY,
                length: BEEHIIV_API_KEY ? BEEHIIV_API_KEY.length : 0,
                preview: BEEHIIV_API_KEY ? `${BEEHIIV_API_KEY.substring(0, 8)}...` : null
            },
            BEEHIIV_PUBLICATION_ID: {
                exists: !!BEEHIIV_PUBLICATION_ID,
                length: BEEHIIV_PUBLICATION_ID ? BEEHIIV_PUBLICATION_ID.length : 0,
                value: BEEHIIV_PUBLICATION_ID || null
            }
        },
        allEnvVars: Object.keys(process.env).filter(key => 
            key.includes('BEEHIIV') || key.includes('ZEROBOUNCE')
        )
    };

    // Test Beehiiv API connection
    if (BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID) {
        try {
            const testUrl = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}`;
            const testResponse = await fetch(testUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
                }
            });

            const testData = await testResponse.json();

            result.beehiiv_test = {
                status: testResponse.status,
                statusText: testResponse.statusText,
                success: testResponse.ok,
                response: testData
            };
        } catch (error) {
            result.beehiiv_test = {
                error: error.message,
                success: false
            };
        }
    } else {
        result.beehiiv_test = {
            error: 'Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID',
            success: false
        };
    }

    // Test ZeroBounce API connection
    if (ZEROBOUNCE_API_KEY) {
        try {
            const testUrl = `https://api.zerobounce.net/v2/getcredits?api_key=${ZEROBOUNCE_API_KEY}`;
            const testResponse = await fetch(testUrl);
            const testData = await testResponse.json();

            result.zerobounce_test = {
                status: testResponse.status,
                success: testResponse.ok,
                credits: testData.Credits || testData.credits || null,
                response: testData
            };
        } catch (error) {
            result.zerobounce_test = {
                error: error.message,
                success: false
            };
        }
    } else {
        result.zerobounce_test = {
            error: 'Missing ZEROBOUNCE_API_KEY',
            success: false
        };
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(result, null, 2),
    };
};

