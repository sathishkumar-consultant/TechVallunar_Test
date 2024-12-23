import HOME from '../locators/home_locators';

class HomePage {
    // Define the selector for the accept all button
    get acceptAllButton() {
        return $(HOME.ACCEPT_ALL_BUTTON);
    }

    // Open the homepage with a specific locale
    async open(url) {
        await browser.url(url);
    }

    // Handle privacy by clicking the 'accept all' button
    async handlePrivacy() {
        await browser.waitUntil(async () => {
            return await this.acceptAllButton.isDisplayed(); // Wait for the accept button to be visible
        }, { timeout: 15000, timeoutMsg: 'Privacy acceptance button not displayed within 15 seconds' });

        await this.acceptAllButton.click(); // Click the button
    }

    async clickTab(tabName) {
        await browser.waitUntil(async () => {
            return await $(`a=${tabName}`).isDisplayed(); // Wait for the tab to be visible using the argument
        }, { timeout: 15000, timeoutMsg: 'Tab not displayed within 15 seconds' });
    
        const tab = await $(`a=${tabName}`);
        await tab.click(); // Click the tab
    }
}

export default new HomePage();
