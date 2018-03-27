const puppeteer = require('puppeteer');

/**
 * Get url from YouTube search result.
 *
 * @param {object} page Puppeteer page object.
 * @param {string} query Search query.
 * @see https://qiita.com/go_sagawa/items/85f97deab7ccfdce53ea
 */
async function searchYoutubeUrl(page, query) {
  await page.goto(`https://www.youtube.com/results?search_query=${query}`);
  await page.waitForSelector('#video-title');
  return page.evaluate((selector) => {
    return document.querySelector(selector).href;
  }, '#video-title');
}

// Sample
(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();

  const url = await searchYoutubeUrl(page, 'Influencer');

  console.log(url);

  browser.close();
})();
