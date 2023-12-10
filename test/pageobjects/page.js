export class Page {

    async waitForClickableAndClick(element) {
        await element.waitUntil(async () => {
            return element.isClickable()
        })
        await element.click()
    }

    async selectDropdownOptionByIndex(dropdownEl, optionIndex) {
        await dropdownEl.selectByIndex(optionIndex)
    }
}
