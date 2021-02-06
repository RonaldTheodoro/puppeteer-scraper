/**
 * Web scraper fo books
 */

const puppeteer = require('puppeteer')
const { url } = require('./config')

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setDefaultTimeout(10000)
  await page.setDefaultNavigationTimeout(20000)
  await page.setViewport({ width: 1368, height: 768 })
  await page.goto(url)

  await browser.close()
})().catch((error) => {
  console.log(error)
  process.exit(1)
})
