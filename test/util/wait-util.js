export async function waitForElementToAppear(element, timeout = 15000) {
    await element.waitForExist({ timeout: timeout });
    await element.waitForDisplayed({ timeout: timeout });
}

export async function waitForElementToDisappear(element, timeout = 5000) {
    await browser.waitUntil(
        async () => {
            const isButtonPresent = await element.isExisting();
            return !isButtonPresent;  // Returns true when the element no longer exists
        },
        {
            timeout: timeout,  // Customizable timeout
            timeoutMsg: 'Element did not disappear after waiting for ' + timeout + 'ms',
        }
    );
}