import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TranslatePage extends BasePage {
    readonly rejectCookies: Locator;
    readonly rejectCookiesButton: Locator;
    readonly sourceText: Locator
    readonly filledText: Locator

    constructor(page: Page) {
        super(page)
        this.rejectCookies = page.locator('//button//*[text()="Reject all"]')
        this.rejectCookiesButton = page.locator('(//button//*[text()="Reject all"])[1]')
        this.sourceText = page.locator('//textarea[@aria-label="Source text"]')
        this.filledText = page.locator('//textarea[@aria-label="Source text"]/following-sibling::div[1]')
    }
    //nav/div[1]//span[text()="Text"]
    /**
     * This method fill out the Inline form with user details
     * @param translationLanguages - should be "More source languages" or "More target languages"
     * @param language - languages that selected from drop down menu
     */

    

    getDropDownMenuLanguages(translationLanguages: string) {
        return this.page.locator(`(//button[@aria-label="${translationLanguages}"])[1]`)
    }

    getInputSearchLanguage(translationLanguages: string) {
        const searchField = translationLanguages === "More source languages" ? 1 : 2
        return this.page.locator(`(//input[@aria-label="Search languages"])[${searchField}]`)
    }

    getLanguageSelectionTab(language: string, translationLanguages: string) {
        return this.page.locator(`(//button[@aria-label="${translationLanguages}"])[1]/..//button//*[text()="${language}"]/../..`)
    }

    getLanguageSearchResults(language: string) {
        return this.page.locator(`//*[@aria-label="Language search results"]//*[text()="${language}"]`)
    }

    getTranslationResult(translationResult: string) {
        return this.page.locator(`((//textarea[@aria-label="Source text"]//ancestor::node()[6])[1]/c-wiz/div/div[6]//span[text()="${translationResult}"])[1]`)
    }

    // if the page is loaded with a request to select cookie settings
    async handleCookies() {
        const getCookies = await this.rejectCookies.count()

        if (getCookies > 0) {
            await this.rejectCookiesButton.click()
        }
    }

    // * Select language *
    async selectLanguage(language: string, translationLanguages: string) {
        await this.getDropDownMenuLanguages(translationLanguages).click()

        await expect(this.getInputSearchLanguage(translationLanguages)).toBeVisible()
        await this.getInputSearchLanguage(translationLanguages).fill(language)
        await this.getLanguageSearchResults(language).click()
        await this.page.waitForTimeout(5000)
        await expect(this.getInputSearchLanguage(translationLanguages)).not.toBeVisible()
    }

    async checkSelectedSourceTab(language: string, translationLanguages: string) {
        const getAriaSelectedValue = await this.getLanguageSelectionTab(language, translationLanguages).getAttribute('aria-selected')
        expect(getAriaSelectedValue).toBe('true')
    }

    async typeText(text: string) {
        await this.sourceText.fill(text)
        const getFilledText = await this.filledText.textContent()
        expect(getFilledText).toBe(text)
    }

    async checkTranslationResult(translationResult: string) {
        await expect(this.getTranslationResult(translationResult)).toBeVisible()
    }

}
