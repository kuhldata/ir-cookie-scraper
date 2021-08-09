# ir-cookie-scraper

This package scrapes a cookie from the iRacing member website for you using (puppeteer)[https://github.com/puppeteer/puppeteer].

## how to install
Just do the usual

`npm i ir-cookie-scraper`

and you are done.

## usage

**1. get the cookie**

```js
const scraper = require('ir-cookie-scraper`);

const yourFunction = async () => {
  const cookieString = scraper.scrapeCookie('user@example.com', 'superSecretPassword');
  console.log(cookieString);
  // Should log the cookie string: Pretty long, pretty ugly, multiple parts separated by ";"

}
```

**2. use cookie**

After you get the pretty ugly cookie string, just put it into the `Cookie` header in your requests to the iRacing API.

**