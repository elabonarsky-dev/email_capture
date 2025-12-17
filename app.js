// ===================================
// Email Capture Application
// ===================================

class EmailCaptureApp {
    constructor() {
        // State management
        this.state = {
            isOnline: navigator.onLine,
            isMockMode: CONFIG.MOCK_MODE_DEFAULT,
            isSimulatedOffline: false,
            currentScreen: 'form',
            isProcessing: false,
            eventTag: CONFIG.DEFAULT_EVENT_TAG,
            queueProcessingInterval: null,
        };

        // Storage keys
        this.STORAGE_KEYS = {
            QUEUE: 'email_queue',
            CAPTURED: 'captured_emails',
            EVENT_TAG: 'event_tag',
            MOCK_MODE: 'mock_mode',
        };

        // Initialize the application
        this.init();
    }

    // ===================================
    // Initialization
    // ===================================
    init() {
        this.log('Initializing Email Capture App...');
        
        // Load saved settings
        this.loadSettings();
        
        // Bind DOM elements
        this.bindElements();
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Setup online/offline detection
        this.setupNetworkMonitoring();
        
        // Start queue processing
        this.startQueueProcessing();
        
        // Update UI
        this.updateUI();
        
        // Check configuration
        this.checkConfiguration();
        
        this.log('App initialized successfully');
    }

    bindElements() {
        // Screens
        this.formScreen = document.getElementById('formScreen');
        this.confirmationScreen = document.getElementById('confirmationScreen');
        
        // Form elements
        this.emailForm = document.getElementById('emailForm');
        this.emailInput = document.getElementById('emailInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.btnText = this.submitBtn.querySelector('.btn-text');
        this.btnLoader = this.submitBtn.querySelector('.btn-loader');
        
        // Status and info
        this.statusMessage = document.getElementById('statusMessage');
        this.offlineInfo = document.getElementById('offlineInfo');
        this.queueCount = document.getElementById('queueCount');
        
        // Control panel
        this.controlPanel = document.getElementById('controlPanel');
        this.togglePanelBtn = document.getElementById('togglePanel');
        this.panelContent = document.getElementById('panelContent');
        this.mockModeCheckbox = document.getElementById('mockMode');
        this.offlineModeCheckbox = document.getElementById('offlineMode');
        this.eventTagInput = document.getElementById('eventTag');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Control panel buttons
        this.processQueueBtn = document.getElementById('processQueue');
        this.viewQueueBtn = document.getElementById('viewQueue');
        this.addTestDataBtn = document.getElementById('addTestData');
        this.viewDataBtn = document.getElementById('viewData');
        this.exportCsvBtn = document.getElementById('exportCsv');
        this.clearDataBtn = document.getElementById('clearData');
        
        // Stats
        this.queueSizeSpan = document.getElementById('queueSize');
        this.validatedEmailsSpan = document.getElementById('validatedEmails');
        this.totalEmailsSpan = document.getElementById('totalEmails');
        this.queuedEmailsSpan = document.getElementById('queuedEmails');
        this.systemStatusSpan = document.getElementById('systemStatus');
    }

    attachEventListeners() {
        // Form submission
        this.emailForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetForm());
        
        // Control panel toggle
        this.togglePanelBtn.addEventListener('click', () => this.togglePanel());
        
        // Mock mode toggle
        this.mockModeCheckbox.addEventListener('change', (e) => {
            this.state.isMockMode = e.target.checked;
            this.saveSettings();
            this.showStatus('Mock mode ' + (e.target.checked ? 'enabled' : 'disabled'), 'info');
        });
        
        // Offline simulation toggle
        this.offlineModeCheckbox.addEventListener('change', (e) => {
            this.state.isSimulatedOffline = e.target.checked;
            this.updateUI();
            this.showStatus('Offline simulation ' + (e.target.checked ? 'enabled' : 'disabled'), 'info');
        });
        
        // Event tag input
        this.eventTagInput.addEventListener('change', (e) => {
            this.state.eventTag = e.target.value || CONFIG.DEFAULT_EVENT_TAG;
            this.saveSettings();
        });
        
        // Control panel buttons
        this.processQueueBtn.addEventListener('click', () => this.processQueue());
        this.viewQueueBtn.addEventListener('click', () => this.viewQueue());
        this.addTestDataBtn.addEventListener('click', () => this.addTestData());
        this.viewDataBtn.addEventListener('click', () => this.viewStoredData());
        this.exportCsvBtn.addEventListener('click', () => this.exportToCsv());
        this.clearDataBtn.addEventListener('click', () => this.clearAllData());
    }

    // ===================================
    // Settings Management
    // ===================================
    loadSettings() {
        // Load mock mode
        const savedMockMode = localStorage.getItem(this.STORAGE_KEYS.MOCK_MODE);
        if (savedMockMode !== null) {
            this.state.isMockMode = savedMockMode === 'true';
        }
        
        // Load event tag
        const savedEventTag = localStorage.getItem(this.STORAGE_KEYS.EVENT_TAG);
        if (savedEventTag) {
            this.state.eventTag = savedEventTag;
        }
    }

    saveSettings() {
        localStorage.setItem(this.STORAGE_KEYS.MOCK_MODE, this.state.isMockMode.toString());
        localStorage.setItem(this.STORAGE_KEYS.EVENT_TAG, this.state.eventTag);
    }

    // ===================================
    // Network Monitoring
    // ===================================
    setupNetworkMonitoring() {
        window.addEventListener('online', async () => {
            this.state.isOnline = true;
            this.updateUI();
            
            // Check if there are pending items
            const queue = this.getQueue();
            const pendingItems = queue.filter(item => item.status === 'pending');
            
            if (pendingItems.length > 0) {
                this.showStatus(`🔄 Connection restored! Validating and processing ${pendingItems.length} queued email(s)...`, 'success');
                this.log(`Network back online. Auto-processing ${pendingItems.length} queued items...`);
                
                // Wait a moment for connection to stabilize
                await this.sleep(1000);
                
                // Process queue immediately
                await this.processQueue();
            } else {
                this.showStatus('✅ Connection restored!', 'success');
            }
        });
        
        window.addEventListener('offline', () => {
            this.state.isOnline = false;
            this.updateUI();
            this.showStatus('📱 You are offline. Emails will be queued and validated when connection returns.', 'warning');
        });
    }

    isEffectivelyOnline() {
        return this.state.isOnline && !this.state.isSimulatedOffline;
    }

    // ===================================
    // Form Submission Handler
    // ===================================
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.state.isProcessing) return;
        
        const email = this.emailInput.value.trim();
        
        if (!email) {
            this.showStatus('Please enter an email address.', 'error');
            return;
        }
        
        // Basic email format validation
        if (!this.isValidEmailFormat(email)) {
            this.showStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        this.state.isProcessing = true;
        this.setLoadingState(true);
        
        try {
            if (this.isEffectivelyOnline() && !this.state.isMockMode) {
                // Online: Validate with ZeroBounce
                const validationResult = await this.validateEmailWithZeroBounce(email);
                
                if (!validationResult.isValid) {
                    this.showStatus(validationResult.message, 'error');
                    this.setLoadingState(false);
                    this.state.isProcessing = false;
                    // Clear email field even on error (kiosk requirement)
                    this.emailInput.value = '';
                    return;
                }
                
                // Email is valid, try to send to Beehiiv
                const beehiivResult = await this.sendToBeehiiv(email);
                
                if (beehiivResult.success) {
                    // ✅ ONLY SHOW SUCCESS when validated AND sent to Beehiiv
                    this.saveEmail(email, 'sent');
                    this.emailInput.value = ''; // Clear email field
                    this.showSuccessScreen();
                } else {
                    // Failed to send to Beehiiv - queue it but DON'T show success screen
                    this.saveEmail(email, 'queued');
                    this.addToQueue(email, validationResult.data);
                    this.emailInput.value = ''; // Clear email field
                    
                    // Show pending state (NOT success screen)
                    await this.showModal({
                        title: 'Saved - Pending Confirmation',
                        message: '✅ Email validated and saved.\n\n⏳ Waiting to connect to email service.\n\nThis will be processed automatically when connection is available.\n\nThank you!',
                        icon: '⏳',
                        primaryText: 'OK',
                        showCancel: false,
                        type: 'warning'
                    });
                    
                    // Return to form (no success screen)
                    this.resetForm();
                }
            } else {
                // Offline or Mock Mode
                if (this.state.isMockMode) {
                    // Mock mode: show success for testing
                    this.showStatus('Mock mode: Email would be validated and sent.', 'info');
                    await this.sleep(1000);
                    this.saveEmail(email, 'mock');
                    this.emailInput.value = ''; // Clear email field
                    this.showSuccessScreen();
                } else {
                    // ❌ OFFLINE: DON'T show success screen - show pending state instead
                    this.saveEmail(email, 'queued');
                    this.addToQueue(email);
                    this.emailInput.value = ''; // Clear email field
                    
                    // Show pending/queued state modal (NOT success screen)
                    await this.showModal({
                        title: 'Saved - Pending Validation',
                        message: '📱 You are currently offline.\n\n💾 Email has been saved and will be:\n  1. Validated when connection returns\n  2. Sent to our email system\n  3. Confirmed automatically\n\nThank you for your submission!',
                        icon: '💾',
                        primaryText: 'OK',
                        showCancel: false,
                        type: 'info'
                    });
                    
                    // Return to form (no success screen)
                    this.resetForm();
                }
            }
        } catch (error) {
            this.log('Error in handleSubmit:', error);
            this.showStatus('An error occurred. Email has been queued for retry.', 'error');
            this.addToQueue(email);
            this.emailInput.value = ''; // Clear email field even on error
            
            // Show error modal
            await this.showError(
                'Email has been saved and will be processed when connection is available.',
                'Saved for Processing'
            );
            this.resetForm();
        } finally {
            this.setLoadingState(false);
            this.state.isProcessing = false;
        }
    }

    // ===================================
    // ZeroBounce Email Validation
    // ===================================
    async validateEmailWithZeroBounce(email) {
        this.log('Validating email with ZeroBounce:', email);
        
        if (!CONFIG.ZEROBOUNCE_API_KEY || CONFIG.ZEROBOUNCE_API_KEY === 'YOUR_ZEROBOUNCE_API_KEY_HERE') {
            this.log('ZeroBounce API key not configured');
            return { isValid: false, message: 'Email validation service not configured.' };
        }
        
        try {
            const url = `${CONFIG.ZEROBOUNCE_API_URL}?api_key=${CONFIG.ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&ip_address=`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`ZeroBounce API error: ${response.status}`);
            }
            
            const data = await response.json();
            this.log('ZeroBounce response:', data);
            
            return this.interpretZeroBounceResponse(data);
        } catch (error) {
            this.log('ZeroBounce validation error:', error);
            // If validation service fails, we queue the email for later processing
            throw error;
        }
    }

    interpretZeroBounceResponse(data) {
        const status = data.status.toLowerCase();
        const subStatus = data.sub_status ? data.sub_status.toLowerCase() : '';
        
        // Check if email is valid
        if (CONFIG.ACCEPTED_ZEROBOUNCE_STATUSES.includes(status)) {
            return {
                isValid: true,
                message: 'Email validated successfully',
                data: data
            };
        }
        
        // Handle different error cases with user-friendly messages
        const errorMessages = {
            'invalid': 'This email address is invalid. Please check for typos.',
            'do_not_mail': 'This email address cannot receive mail. Please use a different email.',
            'spamtrap': 'This email address is flagged as a spam trap. Please use a different email.',
            'abuse': 'This email address is flagged for abuse. Please use a different email.',
            'disposable': 'Disposable email addresses are not allowed. Please use a permanent email address.',
            'unknown': 'We couldn\'t verify this email address. Please check and try again.',
        };
        
        // Check for typo suggestions
        if (data.did_you_mean && data.did_you_mean !== '') {
            return {
                isValid: false,
                message: `Did you mean "${data.did_you_mean}"? Please check your email address.`,
                data: data
            };
        }
        
        // Check for MX record issues
        if (subStatus.includes('no_dns_entries') || subStatus.includes('failed_smtp_connection')) {
            return {
                isValid: false,
                message: 'This email domain cannot receive emails. Please check the email address.',
                data: data
            };
        }
        
        return {
            isValid: false,
            message: errorMessages[status] || 'This email address could not be validated. Please use a different email.',
            data: data
        };
    }

    // ===================================
    // Beehiiv Integration
    // ===================================
    async sendToBeehiiv(email) {
        this.log('Sending to Beehiiv:', email);
        
        try {
            const payload = {
                email: email,
                eventTag: this.state.eventTag,  // Used by proxy/serverless function
                reactivate_existing: false,
                send_welcome_email: true,
                utm_source: this.state.eventTag,
                utm_medium: 'kiosk',
                utm_campaign: 'event_signup',
                referring_site: 'kiosk'
            };
            
            this.log('Beehiiv payload:', payload);
            
            // Try Netlify serverless function
            let response;
            try {
                this.log('Attempting Netlify serverless function...');
                response = await fetch('/.netlify/functions/subscribe-beehiiv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                
                if (response.ok) {
                    const responseData = await response.json();
                    this.log('✅ Beehiiv response (Netlify):', responseData);
                    return { success: true, data: responseData };
                }
            } catch (netlifyError) {
                this.log('Netlify function not available, trying Vercel...');
            }
            
            // Try Vercel serverless function
            try {
                this.log('Attempting Vercel serverless function...');
                response = await fetch('/api/subscribe-beehiiv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                
                if (response.ok) {
                    const responseData = await response.json();
                    this.log('✅ Beehiiv response (Vercel):', responseData);
                    return { success: true, data: responseData };
                } else {
                    const errorData = await response.json();
                    this.log('❌ Serverless error:', errorData);
                    throw new Error(errorData.error || errorData.message || 'Serverless function error');
                }
            } catch (vercelError) {
                this.log('❌ Serverless functions not available:', vercelError.message);
                throw new Error('Beehiiv integration not configured. Please deploy to Netlify/Vercel.');
            }
            
        } catch (error) {
            this.log('❌ Beehiiv integration failed:', error.message);
            return { success: false, message: error.message };
        }
    }

    // ===================================
    // Queue Management
    // ===================================
    addToQueue(email, validationData = null) {
        const queue = this.getQueue();
        
        // Check if email already in queue
        const exists = queue.some(item => item.email === email && item.status === 'pending');
        if (exists) {
            this.log('Email already in queue:', email);
            return;
        }
        
        queue.push({
            email: email,
            timestamp: Date.now(),
            status: 'pending',
            retryCount: 0,
            validationData: validationData,
            eventTag: this.state.eventTag,
        });
        
        this.saveQueue(queue);
        this.updateUI();
        this.log('Added to queue:', email);
    }

    getQueue() {
        const queueJson = localStorage.getItem(this.STORAGE_KEYS.QUEUE);
        return queueJson ? JSON.parse(queueJson) : [];
    }

    saveQueue(queue) {
        localStorage.setItem(this.STORAGE_KEYS.QUEUE, JSON.stringify(queue));
    }

    async processQueue() {
        if (!this.isEffectivelyOnline()) {
            this.showStatus('Cannot process queue while offline.', 'warning');
            return;
        }
        
        const queue = this.getQueue();
        const pendingItems = queue.filter(item => item.status === 'pending');
        
        if (pendingItems.length === 0) {
            this.showStatus('Queue is empty.', 'info');
            return;
        }
        
        this.log(`Processing ${pendingItems.length} items in queue...`);
        this.showStatus(`Processing ${pendingItems.length} queued email(s)...`, 'info');
        
        let successCount = 0;
        let failCount = 0;
        
        for (const item of pendingItems) {
            try {
                // If we don't have validation data, validate first
                if (!item.validationData && !this.state.isMockMode) {
                    this.log(`Validating queued email: ${item.email}`);
                    this.showStatus(`🔍 Validating: ${item.email}...`, 'info');
                    
                    const validationResult = await this.validateEmailWithZeroBounce(item.email);
                    
                    if (!validationResult.isValid) {
                        // Mark as failed
                        item.status = 'failed';
                        item.error = validationResult.message;
                        failCount++;
                        this.log(`❌ Validation failed for ${item.email}: ${validationResult.message}`);
                        continue;
                    }
                    
                    this.log(`✅ Validation passed for ${item.email}`);
                    item.validationData = validationResult.data;
                }
                
                // Send to Beehiiv
                if (!this.state.isMockMode) {
                    const beehiivResult = await this.sendToBeehiiv(item.email);
                    if (beehiivResult.success) {
                        item.status = 'sent';
                        this.saveEmail(item.email, 'sent');
                        successCount++;
                    } else {
                        item.retryCount++;
                        if (item.retryCount >= CONFIG.MAX_RETRY_ATTEMPTS) {
                            item.status = 'failed';
                            item.error = beehiivResult.message;
                            failCount++;
                        }
                    }
                } else {
                    // Mock mode
                    item.status = 'sent';
                    this.saveEmail(item.email, 'mock');
                    successCount++;
                }
                
                // Small delay between requests
                await this.sleep(500);
            } catch (error) {
                this.log('Error processing queue item:', error);
                item.retryCount++;
                if (item.retryCount >= CONFIG.MAX_RETRY_ATTEMPTS) {
                    item.status = 'failed';
                    item.error = error.message;
                    failCount++;
                }
            }
        }
        
        this.saveQueue(queue);
        this.updateUI();
        
        // Create detailed message
        let message = `✅ Queue processed: ${successCount} sent`;
        if (failCount > 0) {
            message += `, ❌ ${failCount} failed validation`;
        }
        
        // Show notification with details
        if (failCount > 0) {
            const failedEmails = queue.filter(item => item.status === 'failed');
            let failDetails = `${successCount} email(s) validated and sent to Beehiiv.\n\n`;
            failDetails += `${failCount} email(s) FAILED validation:\n\n`;
            failedEmails.forEach((item, index) => {
                failDetails += `${index + 1}. ${item.email}\n   Reason: ${item.error}\n\n`;
            });
            
            this.log(message);
            this.log('Failed emails:', failedEmails);
            
            // Show modal with failed details
            setTimeout(() => {
                this.showWarning(failDetails, '⚠️ Validation Results');
            }, 1000);
        }
        
        this.showStatus(message, successCount > 0 ? 'success' : 'warning');
        this.log(message);
    }

    startQueueProcessing() {
        // Process queue periodically if online
        this.state.queueProcessingInterval = setInterval(() => {
            if (this.isEffectivelyOnline() && !this.state.isProcessing) {
                const queue = this.getQueue();
                const pendingItems = queue.filter(item => item.status === 'pending');
                if (pendingItems.length > 0) {
                    this.log('Auto-processing queue...');
                    this.processQueue();
                }
            }
        }, CONFIG.RETRY_INTERVAL);
    }

    // ===================================
    // Email Storage
    // ===================================
    saveEmail(email, status = 'sent') {
        const captured = this.getCapturedEmails();
        captured.push({
            email: email,
            timestamp: Date.now(),
            status: status,
            eventTag: this.state.eventTag,
        });
        localStorage.setItem(this.STORAGE_KEYS.CAPTURED, JSON.stringify(captured));
        this.updateUI();
    }

    getCapturedEmails() {
        const captured = localStorage.getItem(this.STORAGE_KEYS.CAPTURED);
        return captured ? JSON.parse(captured) : [];
    }

    // ===================================
    // UI Management
    // ===================================
    showStatus(message, type = 'info') {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `status-message ${type}`;
        this.log(`Status (${type}): ${message}`);
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.btnText.style.display = 'none';
            this.btnLoader.style.display = 'flex';
        } else {
            this.submitBtn.disabled = false;
            this.btnText.style.display = 'block';
            this.btnLoader.style.display = 'none';
        }
    }

    showSuccessScreen() {
        this.formScreen.classList.remove('active');
        this.confirmationScreen.classList.add('active');
        this.state.currentScreen = 'confirmation';
        
        // Auto-reset if configured
        if (CONFIG.AUTO_RESET_DELAY > 0) {
            setTimeout(() => this.resetForm(), CONFIG.AUTO_RESET_DELAY);
        }
    }

    resetForm() {
        this.emailInput.value = '';
        this.statusMessage.textContent = '';
        this.statusMessage.className = 'status-message';
        this.confirmationScreen.classList.remove('active');
        this.formScreen.classList.add('active');
        this.state.currentScreen = 'form';
        this.emailInput.focus();
    }

    togglePanel() {
        const isVisible = this.panelContent.style.display === 'block';
        this.panelContent.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            this.updateUI();
        }
    }

    updateUI() {
        // Update control panel checkboxes
        this.mockModeCheckbox.checked = this.state.isMockMode;
        this.offlineModeCheckbox.checked = this.state.isSimulatedOffline;
        this.eventTagInput.value = this.state.eventTag;
        
        // Update queue info
        const queue = this.getQueue();
        const pendingCount = queue.filter(item => item.status === 'pending').length;
        
        this.queueSizeSpan.textContent = pendingCount;
        this.queuedEmailsSpan.textContent = pendingCount;
        
        // Update captured emails count
        const captured = this.getCapturedEmails();
        const validatedCount = captured.filter(e => e.status === 'sent').length;
        this.validatedEmailsSpan.textContent = validatedCount;
        this.totalEmailsSpan.textContent = captured.length;
        
        // Update online status
        const effectivelyOnline = this.isEffectivelyOnline();
        this.systemStatusSpan.textContent = effectivelyOnline ? 'Online' : 'Offline';
        this.systemStatusSpan.style.color = effectivelyOnline ? 'var(--success-color)' : 'var(--error-color)';
        
        // Show/hide offline info
        if (!effectivelyOnline && pendingCount > 0) {
            this.offlineInfo.style.display = 'flex';
            this.queueCount.textContent = `${pendingCount} email(s) queued`;
        } else if (!effectivelyOnline) {
            this.offlineInfo.style.display = 'flex';
            this.queueCount.textContent = 'Submissions will be queued';
        } else if (pendingCount > 0) {
            this.offlineInfo.style.display = 'flex';
            this.offlineInfo.querySelector('.offline-badge').textContent = '⏳ Processing Queue';
            this.queueCount.textContent = `${pendingCount} email(s) queued`;
        } else {
            this.offlineInfo.style.display = 'none';
        }
    }

    // ===================================
    // Control Panel Actions
    // ===================================
    addTestData() {
        const testEmails = [
            'alice@example.com',
            'bob@test.com',
            'charlie@demo.com',
            'diana@sample.com',
            'eve@testing.com'
        ];
        
        let added = 0;
        testEmails.forEach(email => {
            this.saveEmail(email, 'test');
            added++;
        });
        
        this.updateUI();
        this.showStatus(`✅ Added ${added} test emails. Now try Export CSV!`, 'success');
        this.log(`Added ${added} test emails`);
    }

    async viewStoredData() {
        const captured = this.getCapturedEmails();
        
        if (captured.length === 0) {
            await this.showAlert(
                'No emails stored yet.\n\nTo test:\n1. Submit an email (Mock Mode recommended)\n2. Or click "Add Test Data"\n3. Then try this button again',
                'No Data',
                '📭'
            );
            return;
        }
        
        // Count by status
        const validatedCount = captured.filter(e => e.status === 'sent').length;
        const queuedCount = captured.filter(e => e.status === 'queued').length;
        const failedCount = captured.filter(e => e.status === 'failed').length;
        const testCount = captured.filter(e => e.status === 'test' || e.status === 'mock').length;
        
        let message = `Total: ${captured.length} email(s)\n`;
        message += `✅ Validated: ${validatedCount}\n`;
        if (queuedCount > 0) message += `⏳ Queued: ${queuedCount}\n`;
        if (failedCount > 0) message += `❌ Failed: ${failedCount}\n`;
        if (testCount > 0) message += `🧪 Test: ${testCount}\n`;
        message += '\n';
        
        captured.forEach((item, index) => {
            const statusIcon = {
                'sent': '✅',
                'queued': '⏳',
                'failed': '❌',
                'test': '🧪',
                'mock': '🧪'
            }[item.status] || '•';
            
            message += `${statusIcon} ${index + 1}. ${item.email}\n`;
            message += `   Status: ${item.status}\n`;
            message += `   Event: ${item.eventTag || 'N/A'}\n`;
            message += `   Time: ${new Date(item.timestamp).toLocaleString()}\n\n`;
        });
        
        message += '💡 CSV export includes only validated (✅) emails!';
        
        await this.showAlert(message, `📊 Stored Emails (${captured.length})`, '📊');
        this.log('Viewed stored data:', captured.length, 'emails', `(${validatedCount} validated)`);
    }

    async viewQueue() {
        const queue = this.getQueue();
        if (queue.length === 0) {
            await this.showAlert('Queue is empty.', 'Email Queue', '📬');
            return;
        }
        
        let message = '';
        queue.forEach((item, index) => {
            message += `${index + 1}. ${item.email}\n`;
            message += `   Status: ${item.status}\n`;
            message += `   Retry: ${item.retryCount}/${CONFIG.MAX_RETRY_ATTEMPTS}\n`;
            message += `   Time: ${new Date(item.timestamp).toLocaleString()}\n\n`;
        });
        
        await this.showAlert(message, `📬 Email Queue (${queue.length})`, '📬');
    }

    async exportToCsv() {
        const captured = this.getCapturedEmails();
        
        this.log('Export CSV called. Total stored emails:', captured.length);
        
        // Filter to only include VALIDATED emails (status: 'sent')
        // Excludes: 'queued' (not validated yet), 'failed' (rejected), 'mock', 'test'
        const validatedEmails = captured.filter(item => item.status === 'sent');
        
        this.log('Validated emails (status=sent):', validatedEmails.length);
        
        if (captured.length === 0) {
            await this.showAlert(
                'No emails stored yet.\n\nTo add emails:\n1. Submit a real email with validation, OR\n2. Enable Mock Mode and submit an email\n\nThen try Export CSV again.',
                'No Data to Export',
                '📊'
            );
            return;
        }
        
        if (validatedEmails.length === 0) {
            const skippedCount = captured.length;
            await this.showWarning(
                `Found ${skippedCount} email(s) in storage, but NONE have been validated yet.\n\n` +
                `Statuses found: ${[...new Set(captured.map(e => e.status))].join(', ')}\n\n` +
                `Only validated emails (status: "sent") are included in CSV export.\n\n` +
                `Please wait for validation to complete, then try again.`,
                'No Validated Emails',
                '⚠️'
            );
            return;
        }
        
        // Show info about what's being exported vs. what's being excluded
        const excludedCount = captured.length - validatedEmails.length;
        if (excludedCount > 0) {
            const continueExport = await this.showModal({
                title: 'CSV Export - Validated Emails Only',
                message: `✅ ${validatedEmails.length} validated email(s) will be exported.\n\n` +
                         `⚠️ ${excludedCount} email(s) will be EXCLUDED:\n` +
                         `   • Not yet validated (queued)\n` +
                         `   • Failed validation (invalid)\n` +
                         `   • Test data\n\n` +
                         `Only validated emails are included in CSV.\n\n` +
                         `Continue with export?`,
                icon: '📊',
                primaryText: 'Export Validated Emails',
                secondaryText: 'Cancel',
                showCancel: true,
                type: 'info'
            });
            
            if (!continueExport) {
                this.showStatus('Export cancelled.', 'info');
                return;
            }
        }
        
        try {
            // Create CSV content with BOM for Excel compatibility
            const BOM = '\uFEFF';
            let csv = BOM + 'Email,Status,Event Tag,Timestamp,Date\n';
            
            validatedEmails.forEach(item => {
                const date = new Date(item.timestamp).toISOString();
                const eventTag = item.eventTag || 'N/A';
                csv += `"${item.email}","${item.status}","${eventTag}","${item.timestamp}","${date}"\n`;
            });
            
            this.log('CSV content created for validated emails:', validatedEmails.length);
            this.log('First email in CSV:', captured[0].email);
            
            // Store CSV in variable for fallback access
            window.lastCsvExport = csv;
            
            // Create blob and download
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const filename = `email-capture-${Date.now()}.csv`;
            
            // Try multiple download methods for better browser compatibility
            if (navigator.msSaveBlob) {
                // IE 10+
                navigator.msSaveBlob(blob, filename);
                this.log('Download via msSaveBlob (IE)');
                this.showStatus(`✅ Exported ${captured.length} email(s) to CSV`, 'success');
            } else {
                // Modern browsers
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = filename;
                a.target = '_blank';
                
                // Add to document
                document.body.appendChild(a);
                
                // Trigger download
                this.log('Triggering download...');
                a.click();
                
                // Show success message immediately
                this.showStatus(`✅ Exporting ${validatedEmails.length} validated email(s)... Check your Downloads folder!`, 'success');
                this.log('Download triggered successfully for', validatedEmails.length, 'validated emails');
                
                // Cleanup after delay
                setTimeout(() => {
                    try {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                        this.log('Cleanup complete');
                    } catch (cleanupError) {
                        this.log('Cleanup error (non-critical):', cleanupError);
                    }
                }, 500);
            }
            
            // Offer alternative if download might be blocked
            setTimeout(async () => {
                const openInWindow = await this.showModal({
                    title: 'CSV Export - Validated Emails',
                    message: `✅ Exported ${validatedEmails.length} validated email(s)\n\n` +
                             `Check your Downloads folder for:\n${filename}\n\n` +
                             `❌ If download didn't start, click "Open Window" to view CSV in a new window.`,
                    icon: '📥',
                    primaryText: 'Open Window',
                    secondaryText: 'Close',
                    showCancel: true,
                    type: 'info'
                });
                
                if (openInWindow) {
                    this.openCsvInNewWindow(csv);
                }
            }, 1500);
            
        } catch (error) {
            this.log('Error exporting CSV:', error);
            this.showStatus('Export error - trying alternative method...', 'warning');
            
            // Fallback: Open in new window
            try {
                this.openCsvInNewWindow(csv);
                this.showStatus('CSV opened in new window. Right-click and Save As.', 'info');
            } catch (popupError) {
                this.log('Popup also failed:', popupError);
                
                // Final fallback: Show data via modal
                const preview = csv.substring(0, 500);
                await this.showError(
                    `Download failed.\n\n${preview}${csv.length > 500 ? '\n\n... (truncated)\n\nFull data is in browser console (F12)' : ''}`,
                    'Export Failed'
                );
                console.log('=== FULL CSV DATA ===');
                console.log(csv);
                console.log('=== END CSV DATA ===');
                this.showStatus('❌ Export failed. Check console (F12) for full data.', 'error');
            }
        }
    }

    openCsvInNewWindow(csv) {
        const csvWindow = window.open('', '_blank');
        if (!csvWindow) {
            throw new Error('Popup blocked');
        }
        
        csvWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Email Export CSV - Right-click and Save As</title>
                <style>
                    body { 
                        font-family: monospace; 
                        padding: 20px; 
                        background: #f5f5f5;
                    }
                    .header {
                        background: #4CAF50;
                        color: white;
                        padding: 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                    pre { 
                        background: white; 
                        padding: 15px; 
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        overflow-x: auto;
                    }
                    .instructions {
                        background: #fff3cd;
                        padding: 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        border: 1px solid #ffc107;
                    }
                    button {
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        font-size: 16px;
                        cursor: pointer;
                        border-radius: 5px;
                        margin-right: 10px;
                    }
                    button:hover {
                        background: #45a049;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>📊 Email Export CSV</h1>
                </div>
                <div class="instructions">
                    <h3>📥 How to Save:</h3>
                    <ol>
                        <li><strong>Method 1:</strong> Click "Download CSV" button below</li>
                        <li><strong>Method 2:</strong> Right-click the text below → Select All → Copy → Paste into Excel or text editor → Save as .csv</li>
                        <li><strong>Method 3:</strong> File → Save As → Choose location → Save as "emails.csv"</li>
                    </ol>
                </div>
                <button onclick="downloadCsv()">📥 Download CSV</button>
                <button onclick="copyToClipboard()">📋 Copy to Clipboard</button>
                <br><br>
                <pre id="csvContent">${csv}</pre>
                <script>
                    function downloadCsv() {
                        const csv = document.getElementById('csvContent').textContent;
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'email-capture-' + Date.now() + '.csv';
                        a.click();
                        window.URL.revokeObjectURL(url);
                        // Show success message in parent window if available
                        if (window.opener && window.opener.emailCaptureApp) {
                            window.opener.emailCaptureApp.showSuccess('CSV downloaded! Check your Downloads folder.', 'Download Complete');
                        }
                    }
                    
                    function copyToClipboard() {
                        const csv = document.getElementById('csvContent').textContent;
                        navigator.clipboard.writeText(csv).then(function() {
                            // Show success message in parent window if available
                            if (window.opener && window.opener.emailCaptureApp) {
                                window.opener.emailCaptureApp.showSuccess('CSV copied to clipboard! Paste into Excel or text editor.', 'Copied');
                            } else {
                                document.querySelector('.instructions').innerHTML = '<h3 style="color: #4CAF50;">✅ Copied to Clipboard!</h3><p>Paste into Excel or text editor.</p>';
                            }
                        }, function() {
                            document.querySelector('.instructions').innerHTML = '<h3 style="color: #EF476F;">❌ Copy Failed</h3><p>Please select all text and copy manually (Ctrl+A, Ctrl+C).</p>';
                        });
                    }
                </script>
            </body>
            </html>
        `);
        
        csvWindow.document.close();
        this.log('CSV opened in new window');
    }

    async clearAllData() {
        const firstConfirm = await this.showModal({
            title: 'Erase All Data',
            message: 'Are you sure you want to clear all data?\n\nThis cannot be undone.',
            icon: '⚠️',
            primaryText: 'Continue',
            secondaryText: 'Cancel',
            showCancel: true,
            type: 'warning'
        });
        
        if (!firstConfirm) {
            return;
        }
        
        const secondConfirm = await this.showModal({
            title: 'Final Confirmation',
            message: 'This will DELETE all captured emails and queued items.\n\nAre you absolutely sure?',
            icon: '🗑️',
            primaryText: 'Yes, Delete All',
            secondaryText: 'No, Keep Data',
            showCancel: true,
            type: 'error'
        });
        
        if (!secondConfirm) {
            return;
        }
        
        localStorage.removeItem(this.STORAGE_KEYS.QUEUE);
        localStorage.removeItem(this.STORAGE_KEYS.CAPTURED);
        this.updateUI();
        
        await this.showSuccess('All data has been cleared.', 'Data Cleared');
        this.showStatus('All data cleared.', 'info');
    }

    // ===================================
    // Validation Helpers
    // ===================================
    isValidEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===================================
    // Configuration Check
    // ===================================
    checkConfiguration() {
        const config = isConfigurationComplete();
        if (!config.complete && !this.state.isMockMode) {
            console.warn('Configuration incomplete:', config.warnings);
            if (CONFIG.DEBUG_MODE) {
                this.showStatus('Configuration incomplete. Enable Mock Mode for testing.', 'warning');
            }
        }
    }

    // ===================================
    // Custom Modal Dialogs (iPad-friendly)
    // ===================================
    showModal(options) {
        return new Promise((resolve) => {
            const modal = document.getElementById('customModal');
            const modalContent = modal.querySelector('.modal-content');
            const iconEl = modal.querySelector('.modal-icon');
            const titleEl = modal.querySelector('.modal-title');
            const messageEl = modal.querySelector('.modal-message');
            const primaryBtn = modal.querySelector('.modal-btn-primary');
            const secondaryBtn = modal.querySelector('.modal-btn-secondary');
            
            // Set content
            iconEl.textContent = options.icon || 'ℹ️';
            titleEl.textContent = options.title || 'Message';
            messageEl.textContent = options.message || '';
            primaryBtn.textContent = options.primaryText || 'OK';
            
            // Set modal type class
            modalContent.className = 'modal-content';
            if (options.type) {
                modalContent.classList.add(`modal-${options.type}`);
            }
            
            // Show/hide secondary button
            if (options.showCancel) {
                secondaryBtn.style.display = 'inline-block';
                secondaryBtn.textContent = options.secondaryText || 'Cancel';
            } else {
                secondaryBtn.style.display = 'none';
            }
            
            // Handle button clicks
            const handlePrimary = () => {
                cleanup();
                resolve(true);
            };
            
            const handleSecondary = () => {
                cleanup();
                resolve(false);
            };
            
            const handleOverlay = (e) => {
                if (e.target.classList.contains('modal-overlay')) {
                    cleanup();
                    resolve(false);
                }
            };
            
            const cleanup = () => {
                modal.classList.remove('active');
                primaryBtn.removeEventListener('click', handlePrimary);
                secondaryBtn.removeEventListener('click', handleSecondary);
                modal.removeEventListener('click', handleOverlay);
            };
            
            // Attach listeners
            primaryBtn.addEventListener('click', handlePrimary);
            secondaryBtn.addEventListener('click', handleSecondary);
            modal.addEventListener('click', handleOverlay);
            
            // Show modal
            modal.classList.add('active');
            
            // Focus primary button for accessibility
            setTimeout(() => primaryBtn.focus(), 100);
        });
    }
    
    showAlert(message, title = 'Message', icon = 'ℹ️') {
        return this.showModal({
            title: title,
            message: message,
            icon: icon,
            primaryText: 'OK',
            showCancel: false,
            type: 'info'
        });
    }
    
    showConfirm(message, title = 'Confirm', icon = '⚠️') {
        return this.showModal({
            title: title,
            message: message,
            icon: icon,
            primaryText: 'Yes',
            secondaryText: 'No',
            showCancel: true,
            type: 'confirm'
        });
    }
    
    showSuccess(message, title = 'Success') {
        return this.showModal({
            title: title,
            message: message,
            icon: '✅',
            primaryText: 'OK',
            showCancel: false,
            type: 'success'
        });
    }
    
    showError(message, title = 'Error') {
        return this.showModal({
            title: title,
            message: message,
            icon: '❌',
            primaryText: 'OK',
            showCancel: false,
            type: 'error'
        });
    }
    
    showWarning(message, title = 'Warning') {
        return this.showModal({
            title: title,
            message: message,
            icon: '⚠️',
            primaryText: 'OK',
            showCancel: false,
            type: 'warning'
        });
    }

    // ===================================
    // Utility Functions
    // ===================================
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    log(...args) {
        if (CONFIG.DEBUG_MODE) {
            console.log('[EmailCapture]', ...args);
        }
    }
}

// ===================================
// Initialize Application
// ===================================
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new EmailCaptureApp();
    
    // Enable kiosk mode on body
    document.body.classList.add('kiosk-mode');
    
    // Prevent context menu in kiosk mode
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName !== 'INPUT') {
            e.preventDefault();
        }
    });
});

// Make app accessible globally for debugging
window.emailCaptureApp = app;

