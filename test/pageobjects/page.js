export class Page {
    async checkElementText(element, text) {
        await expect(element).toHaveText(text)
    }
    async scrollToElement(element) {
        await element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    async openUrl(url) {
        await browser.url(url)

    }
    async waitForClickableAndClick(element) {
        await element.waitUntil(async () => {
            return element.isClickable()
        })
        await element.click()
    }
}
