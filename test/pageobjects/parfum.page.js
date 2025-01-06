import { randomInt } from 'crypto';
import PARFUM from '../locators/parfum_locators';

import { waitForElementToAppear, waitForElementToDisappear } from '../util/wait-util';
class Parfum {
    async   openFilter(filterName) {
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

    async clearFilter(value) {
        const selectedFacetsSelector = await $$('.selected-facets');
        
        await browser.waitUntil(async () => {
            return await $(`[class="selected-facets"]`).isDisplayed(); // Wait for the tab to be visible using the argument
        }, { timeout: 15000, timeoutMsg: 'Tab not displayed within 15 seconds' });
        
        const buttonSelector = await $$(PARFUM.SELECTED_FILTER + `//button[text()="${value}"]`);
        await waitForElementToAppear(buttonSelector[0]);
        await buttonSelector[0].click();
        await waitForElementToDisappear(buttonSelector[0]);
    }

    async setGender(argument) {
        try {
            const dropdownOptions = await $$(PARFUM.DROPDOWN_LIST + `//div[@class="facet-option__label"]/div`);
    
            const dropdownOption = dropdownOptions.find(async (option) => {
                const text = await option.getText();
                return text.trim() === argument;
            });
    
            if (dropdownOption) {
                console.log('Gender:', await dropdownOption.getText());
    
                const inputElement = await dropdownOption.$('ancestor::a//input');
    
                await inputElement.click();
            } else {
                console.error(`Element with text "${argument}" not found.`);
            }
        } catch (error) {
            console.error('An error occurred in setGender:', error);
        }
    }
     
    
    async listProducts() {
        const detailsLink = await $(PARFUM.PRODUCT_DETAILS);
        await detailsLink.waitForDisplayed({ timeout: 15000 });
        const textContent = await detailsLink.getText();
        console.log('Text content of the link:', textContent);
        return textContent; // Return the text content
    }
}

export default new Parfum();
