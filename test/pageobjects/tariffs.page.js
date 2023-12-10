import { Page } from "./page.js";
class TariffsPage extends Page {
    get tariffCardPrimary() {
        return $(".tariff-card:nth-child(1)");
    }
    get tariffCardRecruting() {
        return $(".tariff-card:nth-child(2)")
    }
    get tariffCardHr() {
        return $(".tariff-card:nth-child(3)")
    }
    get priceValue() {
        return $("div.tariff-card.primary span.price-value")
    }
    get customSelectRow() {
        return $("div.tariff-card.primary div.custom-select")
    }
    get allOptionValue1() {
        return $$("div:nth-child(1) > div > select > option:nth-child(2)")
    }
    get getConsultationButtons() {
        return $$('#tariff-page .button');
    }
    async isVisibleTariffCardPrimary() {
        await expect(this.tariffCardPrimary).toBeDisplayed();
    }
    async isVisibleTariffCardRecruting() {
        await expect(this.tariffCardRecruting).toBeDisplayed();
    }
    async isVisibleTariffCardHr() {
        await expect(this.tariffCardHr).toBeDisplayed();
    }
    async clickOnCustomSelectRow() {
        await this.waitForClickableAndClick(this.customSelectRow);
    }
    async selectFirstOptionValue1() {
        const firstOptionValue1 = this.allOptionValue1[0];
        await firstOptionValue1.click();
    }
    static EXPECTED_URL = 'https://hurma.work/request/';
    async checkGetConsultationButtonsClickableAndRedirect() {
        this.getConsultationButtons.forEach((button, index) => {
            expect(button.isClickable(), 'Button ${index + 1} should be clickable').to.be.true;
            button.click();
            const currentUrl = browser.getUrl();
            expect(currentUrl, 'Button ${index + 1} should lead to the correct page').to.equal(TariffsPage.EXPECTED_URL);
        });
    }
}

export default new TariffsPage()
