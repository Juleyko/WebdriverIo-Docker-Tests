import { Page } from "./page.js";

export class TariffsPage extends Page {
    _requestPageUrl = 'https://hurma.work/request/';

    static tariffs = {
        allIncluded: 'All included',
        recruiting: 'Recruiting',
        hr: 'HR',
    }

    static subscriptionPeriod = {
        oneMonth: 'One month',
        threeMonths: 'Three months',
        sixMonths: 'Six months',
        twelveMonths: 'Twelve months',
    }

    static subscriptionCurrency = {
        dollar: 'usd',
        hryvna: 'uah',
        euro: 'eur',
    }

    static subscriptionModels = {
        [this.subscriptionPeriod.oneMonth]: {
            [TariffsPage.tariffs.allIncluded]: {
                [this.subscriptionCurrency.euro]: 106.7,
                [this.subscriptionCurrency.dollar]: 115,
                [this.subscriptionCurrency.hryvna]: 4225.4,
            },
            [TariffsPage.tariffs.recruiting]: {
                [this.subscriptionCurrency.euro]: 41.8,
                [this.subscriptionCurrency.dollar]: 45,
                [this.subscriptionCurrency.hryvna]: 1653.4,
            },
            [TariffsPage.tariffs.hr]: {
                [this.subscriptionCurrency.euro]: 64.9,
                [this.subscriptionCurrency.dollar]: 70,
                [this.subscriptionCurrency.hryvna]: 2572,
            }
        },
        [this.subscriptionPeriod.threeMonths]: {
            [TariffsPage.tariffs.allIncluded]: {
                [this.subscriptionCurrency.euro]: 96,
                [this.subscriptionCurrency.dollar]: 103.5,
                [this.subscriptionCurrency.hryvna]: 3802.8,
            },
            [TariffsPage.tariffs.recruiting]: {
                [this.subscriptionCurrency.euro]: 37.6,
                [this.subscriptionCurrency.dollar]: 40.5,
                [this.subscriptionCurrency.hryvna]: 1488.1,
            },
            [TariffsPage.tariffs.hr]: {
                [this.subscriptionCurrency.euro]: 58.5,
                [this.subscriptionCurrency.dollar]: 63,
                [this.subscriptionCurrency.hryvna]: 2314.8,
            }
        },
        [this.subscriptionPeriod.sixMonths]: {
            [TariffsPage.tariffs.allIncluded]: {
                [this.subscriptionCurrency.euro]: 90.7,
                [this.subscriptionCurrency.dollar]: 97.8,
                [this.subscriptionCurrency.hryvna]: 3591.6,
            },
            [TariffsPage.tariffs.recruiting]: {
                [this.subscriptionCurrency.euro]: 35.5,
                [this.subscriptionCurrency.dollar]: 38.3,
                [this.subscriptionCurrency.hryvna]: 1405.4,
            },
            [TariffsPage.tariffs.hr]: {
                [this.subscriptionCurrency.euro]: 55.2,
                [this.subscriptionCurrency.dollar]: 59.5,
                [this.subscriptionCurrency.hryvna]: 2186.2,
            }
        },
        [this.subscriptionPeriod.twelveMonths]: {
            [TariffsPage.tariffs.allIncluded]: {
                [this.subscriptionCurrency.euro]: 85.4,
                [this.subscriptionCurrency.dollar]: 92,
                [this.subscriptionCurrency.hryvna]: 3380.3,
            },
            [TariffsPage.tariffs.recruiting]: {
                [this.subscriptionCurrency.euro]: 33.4,
                [this.subscriptionCurrency.dollar]: 36,
                [this.subscriptionCurrency.hryvna]: 1322.7,
            },
            [TariffsPage.tariffs.hr]: {
                [this.subscriptionCurrency.euro]: 52,
                [this.subscriptionCurrency.dollar]: 56,
                [this.subscriptionCurrency.hryvna]: 2057.6,
            }
        },
    }

    get firstTariffsDropdownSelector() {
        return '.inputs-row:first-of-type select';
    }

    get tariffCardAllIncluded() {
        return $(".tariff-card:nth-child(1)");
    }

    get tariffCardRecruting() {
        return $(".tariff-card:nth-child(2)")
    }

    get tariffCardHr() {
        return $(".tariff-card:nth-child(3)")
    }

    get currencyDropdown() {
        return $('.currency-select select')
    }

    get periodElements() {
        return $$('.period-control .period-element')
    }

    async getTariffCard(tariff) {
        switch (tariff) {
            case TariffsPage.tariffs.allIncluded:
                return this.tariffCardAllIncluded;
            case TariffsPage.tariffs.recruiting:
                return this.tariffCardRecruting;
            case TariffsPage.tariffs.hr:
                return this.tariffCardHr;
            default:
                throw new Error('Wrong tariff provided')
        }
    }

    async getPriceElementByTariff(tariff) {
        const tariffElement = await this.getTariffCard(tariff)

        return tariffElement.$("span.price-value")
    }

    async getConsultationButtonByTarrif(tariff) {
        const tariffElement = await this.getTariffCard(tariff)

        return tariffElement.$('.btn-wrap .button')
    }

    async isAllIncludedTariffCardVisible() {
        await expect(this.tariffCardAllIncluded).toBeDisplayed();
    }

    async isRecrutingTariffCardVisible() {
        await expect(this.tariffCardRecruting).toBeDisplayed();
    }

    async isHrTariffCardVisible() {
        await expect(this.tariffCardHr).toBeDisplayed();
    }

    async getEmployeesDropdownByTariff(tarrif) {
        switch (tarrif) {
            case TariffsPage.tariffs.allIncluded:
                return (await this.tariffCardAllIncluded).$(this.firstTariffsDropdownSelector)
            default:
                return null
        }
    }

    async checkConsultationButtonRedirectByTariff(tariff) {
        const consultationButton = await this.getConsultationButtonByTarrif(tariff);

        await this.waitForClickableAndClick(consultationButton);
        await expect(browser).toHaveUrl(this._requestPageUrl)
    }

    async setTariffCurrency(currency) {
        const dropdown = await this.currencyDropdown;
        await dropdown.selectByAttribute('value', currency);
    }
}


export default new TariffsPage()
