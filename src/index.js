const puppeteer = require('puppeteer')

/**
 * 
 * @param {string} user the email of the iracing user to use
 * @param {string} pass the password of the iracing user to use
 * @returns {string} the cookie string 
 */
module.exports.scrapeCookie = async (user, pass) => {
  let browser;
  try {
    browser = await puppeteer.launch();
  } catch(err) {
    const error = new Error(`Could not start browser / puppeteer: ${err.message}`);
    throw error;
  }

  const page = await browser.newPage();
  await page.goto('https://members.iracing.com/membersite/login.jsp');

  const userField = await page.$('[name="username"]');
  await userField.focus();
  await userField.type(user);

  const passwordField = await page.$('[name="password"]');
  await passwordField.focus();
  await passwordField.type(pass);

  const button = await page.$('input.log-in');
  await button.click();

  await page.waitForResponse('https://members.iracing.com/membersite/member/Home.do');

  const cookies = await page.cookies();

  // Generate Cookie string:
  let nextCookieString = '';
  for(let i = 0; i < cookies.length; i++) {
    if(i > 0) nextCookieString += '; ';
    nextCookieString += `${cookies[i].name}=${cookies[i].value}`;
  }
  await browser.close();
  return nextCookieString;
}