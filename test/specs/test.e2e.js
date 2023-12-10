import { assert } from 'chai';
import tariffsPage from "../pageobjects/tariffs.page.js";

describe('Tariffs page', () => {
    it('[case 1] should check availability of tariffs', async () => {
        await tariffsPage.isVisibleTariffCardPrimary();
        await tariffsPage.isVisibleTariffCardRecruting();
        await tariffsPage.isVisibleTariffCardHr();
    });
    it('[case 2] should check the change in cost depending on the number of employees', async () => {
        const initialPrice = await tariffsPage.priceValue.getText();
        await tariffsPage.clickOnCustomSelectRow();
        await tariffsPage.selectFirstOptionValue1();
        await tariffsPage.priceValue.waitForDisplayed({ timeout: 5000 });
        const updatedPrice = await tariffsPage.priceValue.getText();
        assert.notEqual(initialPrice, updatedPrice, 'The price has not changed after selecting the number of employees');
    });
    it('[case 3] should checking the clickability of buttons to get a consultation', async () => {
        await tariffsPage.checkButtonsClickableAndRedirect();
    });
});

