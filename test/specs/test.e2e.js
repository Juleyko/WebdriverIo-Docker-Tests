import { TariffsPage } from "../pageobjects/tariffs.page.js";
import tariffsPage from "../pageobjects/tariffs.page.js";

describe('Tariffs page', () => {
    beforeEach(async () => {
        const cookieAcceptButton = await $('.accept_gdpr.accept_button');

        if (cookieAcceptButton) {
            cookieAcceptButton.click()
        }
    })

    it('[case 1] should check tariffs availability', async () => {
        await tariffsPage.isAllIncludedTariffCardVisible();
        await tariffsPage.isRecrutingTariffCardVisible();
        await tariffsPage.isHrTariffCardVisible();
    });

    it('[case 2] should check tariffs starting price for each month and currency', async () => {
        const periodElements = await tariffsPage.periodElements;
        const subscriptionPeriods = Object.values(TariffsPage.subscriptionPeriod);
        const subscriptionCurrency = Object.values(TariffsPage.subscriptionCurrency);
        const tariffs = Object.values(TariffsPage.tariffs);

        for (let i = 0; i < subscriptionPeriods.length; i++) {
            const period = subscriptionPeriods[i]
            await periodElements[i].click();

            for (let j = 0; j < subscriptionCurrency.length; j++) {
                const currency = subscriptionCurrency[j];
                await tariffsPage.setTariffCurrency(currency);

                for (let k = 0; k < tariffs.length; k++) {
                    const tariff = tariffs[k];
                    const priceElement = await tariffsPage.getPriceElementByTariff(tariff);
                    const expectedPrice = TariffsPage.subscriptionModels[period][tariff][currency];

                    await expect(priceElement).toHaveText(String(expectedPrice));
                }
            }
        }
    })

    it('[case 3] should check the change in cost depending on the number of employees', async () => {
        const priceElement = await tariffsPage.getPriceElementByTariff(TariffsPage.tariffs.allIncluded);
        const dropdownEl = await tariffsPage.getEmployeesDropdownByTariff(TariffsPage.tariffs.allIncluded)
        await tariffsPage.selectDropdownOptionByIndex(dropdownEl, 1)
        const expectedPrice = 157.5
        expect(priceElement).toHaveText(expectedPrice)
    });

    it('[case 4] should check a functionality of a consultation button', async () => {
        await tariffsPage.checkConsultationButtonRedirectByTariff(TariffsPage.tariffs.allIncluded);
    });
});

