/**
 * Web scraper fo books
 */

const puppeteer = require('puppeteer')
const random_useragent = require('random-useragent')

const { url } = require('./config')

;(async () => {
  // Open browser
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // Setup browser
  await page.setDefaultTimeout(10000)
  await page.setDefaultNavigationTimeout(20000)
  await page.setViewport({ width: 1368, height: 768 })
  await page.setUserAgent(random_useragent.getRandom())

  // Get data from bookstore
  const nameSelector = '.product_main > h1'
  const priceSelector = '.price_color'
  await page.goto(url)
  await page.waitForSelector(nameSelector)
  await page.waitForSelector(priceSelector)
  const name = await page.$eval(nameSelector, (e) => e.innerHTML)
  const price = await page.$eval(priceSelector, (e) => e.innerHTML)
  
  const date = new Date()
  const day = date.getDay()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const fullDate = `${day}/${month}/${year}`

  console.log(`name: ${name}`)
  console.log(`price: ${price}`)
  console.log(`date: ${fullDate}`)
  
  // Open browser
  await browser.close()
})().catch((error) => {
  console.log(error)
  process.exit(1)
})
