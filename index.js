const puppeteer = require('puppeteer');
const fs = require('fs')

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
    await page.goto('https://www.pexels.com/search/splash/');
    await page.setViewport({ width: 1366, height: 768 });
    await delay(3)
    await page.screenshot({ path: 'pexels.png' })

    const imgList = await page.evaluate(() => {
        // getting images
        const nodeList = document.querySelectorAll('article img')
        // nodelist to array
        const imgArray = [...nodeList]
        // nodes to object js
        const imgList = imgArray.map(img => ({
            src: img.src
        }))
        // put out of function
        return imgList
    });

    fs.writeFile('pexels.json', JSON.stringify(imgList, null, 2), err => {
        if(err) throw new Error('Something Wrong')

        console.log('Well Done!')
    })

    await browser.close();
})();