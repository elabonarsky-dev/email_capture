// ===================================
// Configuration File
// ===================================
// Edit these values to customize your email capture system

const CONFIG = {
    // ⚠️ SECURITY: API keys should NEVER be stored here in production
    // All API keys are stored in Netlify Environment Variables
    // Serverless functions handle all API calls securely

    // ZeroBounce - DO NOT ADD API KEY HERE
    // API key is in Netlify Environment Variables: ZEROBOUNCE_API_KEY
    ZEROBOUNCE_API_KEY: '', // Handled by serverless function
    ZEROBOUNCE_API_URL: '', // Not used - serverless function handles this

    // Beehiiv - DO NOT ADD API KEYS HERE
    // API keys are in Netlify Environment Variables:
    //   - BEEHIIV_API_KEY
    //   - BEEHIIV_PUBLICATION_ID
    BEEHIIV_API_KEY: '', // Handled by serverless function
    BEEHIIV_PUBLICATION_ID: '', // Handled by serverless function
    BEEHIIV_API_URL: '', // Not used - serverless function handles this

    // Event Configuration
    // Change this tag for each event (e.g., "Anime LA", "BCD", "Comic Con")
    DEFAULT_EVENT_TAG: 'Anime LA',

    // UI Configuration
    BRAND_NAME: 'Hive Access',
    SUCCESS_MESSAGE: 'HIVE ACCESS CONFIRMED',
    SUCCESS_SUBTITLE: 'Show this screen to receive your ashcan',

    // Behavior Configuration
    AUTO_RESET_DELAY: 0, // Auto-reset after success (0 = manual reset only)
    RETRY_INTERVAL: 30000, // Retry queue processing every 30 seconds
    MAX_RETRY_ATTEMPTS: 5, // Maximum retry attempts for failed submissions

    // Validation Settings
    ACCEPTED_ZEROBOUNCE_STATUSES: [
        'valid',
        'catch-all', // Accept catch-all emails (can be removed if too risky)
    ],

    // Mock Mode (for testing without API calls)
    MOCK_MODE_DEFAULT: false, // Set to true for demo without API keys

    // Development/Debug Settings
    DEBUG_MODE: true, // Enable console logging for debugging
    SHOW_CONTROL_PANEL: true, // Show/hide the control panel
};

// Helper function to check if configuration is complete
function isConfigurationComplete() {
    const warnings = [];

    // ⚠️ Note: API keys are now stored in Netlify Environment Variables
    // This function only checks front-end configuration
    // To verify API keys are configured, use the "Test API Connection" button in Control Panel

    if (!CONFIG.DEFAULT_EVENT_TAG) {
        warnings.push('Default event tag not configured');
    }

    if (warnings.length > 0 && CONFIG.DEBUG_MODE) {
        console.warn('Configuration warnings:', warnings);
        console.info('💡 API keys are stored securely in Netlify Environment Variables');
        console.info('💡 Use Control Panel → Test API Connection to verify setup');
    }

    return {
        complete: warnings.length === 0,
        warnings: warnings
    };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

