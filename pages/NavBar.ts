import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';



export class NavBar extends BasePage {
    
    constructor(page: Page) {
        super(page)
    }

    getNavBarButton(tab: string) {
        const numberOfTab = tab === "Text"
            ? 1
            : tab === "Images"
                ? 2
                : tab === "Documents"
                    ? 3
                    : 4
        return this.page.locator(`(//nav//button)[${numberOfTab}]`)
    }

    // * Select tab Of Navigation Bar
    async selectNavBarTab(tab: string) {
        await this.getNavBarButton(tab).click()
        await expect(this.getNavBarButton(tab)).toHaveText('Text')
        await expect(this.getNavBarButton(tab)).toHaveCSS('background-color', 'rgba(66, 133, 244, 0.12)')
    }

}