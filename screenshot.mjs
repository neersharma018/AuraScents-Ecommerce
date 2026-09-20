import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  
  console.log('Navigating to http://localhost:5173');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait for animations to finish
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'screenshot.png', fullPage: false });
  console.log('Screenshot saved to screenshot.png');
  
  await browser.close();
})();
