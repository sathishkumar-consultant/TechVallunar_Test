import { randomInt } from 'crypto';
import PARFUM from '../locators/parfum_locators';
class Parfum {
    async openFilter(filterName) {
        await browser.waitUntil(async () => {
            return await $(`[data-testid="${filterName}"]`).isDisplayed(); // Wait for the tab to be visible using the argument
        }, { timeout: 15000, timeoutMsg: 'Tab not displayed within 15 seconds' });
    
        const filter = await $(`[data-testid="${filterName}"]`);
        await filter.scrollIntoView();
        await filter.click(); // Click the tab
    }
    async setFilter(value) {
        await $(PARFUM.FILTER_INPUT).setValue(`${value}`);
        await $(PARFUM.DROPDOWN_LIST+`//div[text()="${value}"]/ancestor::a//input`).waitForExist();
        await $(PARFUM.DROPDOWN_LIST+`//div[text()="${value}"]/ancestor::a//input`).click();
    }

    async setGender() {
        await $(PARFUM.DROPDOWN_LIST+`//input`).waitForExist();
        const gender = await $(PARFUM.DROPDOWN_LIST+`//div[@class='facet-option__label']/div`).getText()
        console.log(`Gender: ${gender}`)
        await $(PARFUM.DROPDOWN_LIST+`//input`).click();
    }

    async listProducts() {
        const detailsLink = await $(PARFUM.PRODUCT_DETAILS);
        await detailsLink.waitForDisplayed({ timeout: 15000 });
        const textContent = await detailsLink.getText();
        console.log('Text content of the link:', textContent);
    }
}

export default new Parfum();
