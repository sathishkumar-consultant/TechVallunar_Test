import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page.js';
import parfumPage from '../pageobjects/parfum.page.js';

describe('Douglas Parfum Product Filter Test', () => {
    it('should handle cookie consent and filter products', async () => {
        await HomePage.open('/');
        await HomePage.handlePrivacy();
    });

    it('should navigate to the Parfum section', async () => {
        await HomePage.clickTab('PARFUM');
    });

    it('should list products based on filters', async () => {
        await parfumPage.openFilter('classificationClassName');
        await parfumPage.setFilter('After Shave');
        await parfumPage.openFilter('brand');
        await parfumPage.setFilter('Aigner');
        await parfumPage.openFilter('gender');
        await parfumPage.setGender('Männlich');
        const productContent = await parfumPage.listProducts();
        expect(productContent).toContain('AIGNER', 'Text content details do not match the applied filters.');
    });
});
