import { test, expect, BrowserContext, Page } from '@playwright/test';
import { TranslatePage } from '../pages/TranslatePage'
import { NavBar } from '../pages/NavBar'
import { DATA } from '../test-data/google_translate'

test.describe('Google Translate', () => {
  let browserWindow: BrowserContext;
  let page: Page

  let translatePage: TranslatePage,
    navBar: NavBar

  test.beforeEach(async ({ browser }) => {
    // Create a new incognito browser context
    browserWindow = await browser.newContext();
    // Create a new page inside context.
    page = await browserWindow.newPage();

    translatePage = new TranslatePage(page)
    navBar = new NavBar(page)

    await page.goto('/')
    await translatePage.handleCookies()
  })

  test.afterEach(async () => {
    await browserWindow.close()
  })

  // const { SOURCE_LANGUAGE } = process.env
  // const SOURCE_LANGUAGES = SOUTCE_LANGUAGE ? [SOURCE_LANGUAGE]

  const SOURCE_LANGUAGES = Object.keys(DATA.LANGUAGES.SOURCE)
  const TARGET_LANGUAGES = Object.keys(DATA.LANGUAGES.TARGET)

  SOURCE_LANGUAGES.forEach((sourceLanguage: string, sourceLanguageIdx: number) => {
    TARGET_LANGUAGES.forEach((targetLanguage: string, targetLanguagesIdx: number) => {
      const SOURCE_TEXT = DATA.LANGUAGES.SOURCE[sourceLanguage].TEXT[0]
      const TRANSLATION_RESULT = DATA.LANGUAGES.TARGET[targetLanguage][0]
      test(`It checks the translation type "Text" from ${sourceLanguage} to ${targetLanguage}`, async () => {

        await test.step('Step 1: select tab of Navigation Bar', async () => {
          await navBar.selectNavBarTab('Text')
        })

        await test.step('Step 2: select source language', async () => {
          await translatePage.selectLanguage(sourceLanguage, 'More source languages')
          await translatePage.checkSelectedSourceTab(sourceLanguage, 'More source languages')

        })

        await test.step('Step 3: select target language', async () => {
          await translatePage.selectLanguage(targetLanguage, 'More target languages')
          await translatePage.checkSelectedSourceTab(targetLanguage, 'More target languages')
        })

        await test.step('Step 4: type text in "More source languages"', async () => {
          await translatePage.typeText(SOURCE_TEXT)
        })

        await test.step('Step 5: verify translation result', async () => {
          await translatePage.checkTranslationResult(TRANSLATION_RESULT)
        })

      })
    })

  })


})