// ===================================
// Configuration File
// ===================================
// Edit these values to customize your email capture system

const CONFIG = {
    // ZeroBounce API Configuration
    // Your ZeroBounce API key for email validation
    ZEROBOUNCE_API_KEY: '7a553a0a9a504089ba1d2d05d9ce751c',
    ZEROBOUNCE_API_URL: 'https://api.zerobounce.net/v2/validate',
    
    // Beehiiv API Configuration
    // IMPORTANT: API keys are handled by serverless functions in production
    // Set these values as environment variables in your deployment platform (Netlify/Vercel)
    // Leave these empty - the serverless functions will handle authentication
    BEEHIIV_API_KEY: '', // Handled by serverless function environment variables
    BEEHIIV_PUBLICATION_ID: '', // Handled by serverless function environment variables
    BEEHIIV_API_URL: 'https://api.beehiiv.com/v2/publications',
    
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
    
    if (!CONFIG.ZEROBOUNCE_API_KEY || CONFIG.ZEROBOUNCE_API_KEY === 'YOUR_ZEROBOUNCE_API_KEY_HERE') {
        warnings.push('ZeroBounce API key not configured');
    }
    
    if (!CONFIG.BEEHIIV_API_KEY || CONFIG.BEEHIIV_API_KEY === '') {
        warnings.push('Beehiiv API key not configured');
    }
    
    if (!CONFIG.BEEHIIV_PUBLICATION_ID || CONFIG.BEEHIIV_PUBLICATION_ID === '') {
        warnings.push('Beehiiv Publication ID not configured');
    }
    
    if (warnings.length > 0 && CONFIG.DEBUG_MODE) {
        console.warn('Configuration warnings:', warnings);
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

