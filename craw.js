
//抓取某頁圖片

//引入puppeteer
const puppeteer = require('puppeteer');

/*
async function getPic() {
  //啟動一個puppeteer環境
  const browser = await puppeteer.launch();
  //開啟新瀏覽頁面
  const page = await browser.newPage();
  //指定頁面網址
  await page.goto('https://google.com');
  //截圖
  await page.screenshot({path: 'google.png'});
  //關閉環境
  await browser.close();
}

getPic();
*/

// --------------------------------------------------------------------------

/*
puppeteer sample.....

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');
    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    // await page.waitFor(1000);

    // const result = await page.evaluate(() => {
    //     let title = document.querySelector('h1').innerText;
    //     let price = document.querySelector('.price_color').innerText;

    //     return {
    //         title,
    //         price
    //     }

    // });

    const result = await page.evaluate(() => {
        let data = []; // 
        let elements = document.querySelectorAll('.product_pod'); 

        for (var element of elements){ // 循环
            let title = element.childNodes[5].innerText; 
            let price = element.childNodes[7].children[0].innerText; 

            data.push({title, price}); // 存入数组
        }

        return data; 
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
})

*/


//-----------------------------------------------------------------------------//

//開發者頭條

let dev_scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://toutiao.io/');

    //設置動作，click、setcookie、input anything....
    // await page.click('.welcome_index > #main > #daily > .jscroll-inner > .daily > div > div');
    // await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let data = []; 
        let elements = document.querySelectorAll('.content');

            for (var element of elements){
                //節點以用google chrome console 做測試
                let title = element.childNodes[1].innerText; // get title
                let link = element.childNodes[1].children[0].href; // get href
                
                data.push({title, link}); // push to object
            }
            return data; 

    });

    browser.close();
    return result;
};

dev_scrape().then((value) => {
    console.log(value); 
    // Success! , 回傳或存入數據
})