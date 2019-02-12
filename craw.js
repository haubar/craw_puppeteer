/*
* api
* https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md
*
*/


//抓取某頁圖片

require('dotenv').config()
//引入puppeteer
const puppeteer = require('puppeteer');
const fs        = require('fs');

/*
async function getPic() {
  //啟動一個puppeteer環境
  const browser = await puppeteer.launch();
  //開啟新瀏覽頁面
  const page = await browser.newPage();
  //指定頁面網址
  await page.goto(process.env.test_url);
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

    await page.goto(process.env.demo_url);
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


    await page.goto(process.env.dev_url);

    const allData = [];
    //抓取、寫入單頁資料
    const result = await page.evaluate(() => {
        let data = []; 
        let elements = document.querySelectorAll('.content');
            for (var element of elements){
                //節點以用google chrome console 做測試
                let title = element.childNodes[1].innerText; // get title
                let link = element.childNodes[1].children[0].href; // get href
                data.push(title, link);
            }
            return data; 
    });

    allData.push(result);

    // await crawContent(page, process.env.dev_url)



    //抓取該頁所有分頁位址
    var list = await page.$$('.pagination > .page > a');
    //加入預設第一頁的網址進入array
    var pageUrls = [];
    //排除第一頁
    for (let page = 1; page < list.length; page++) {
        pageUrls.push(await (await list[page].getProperty('href')).jsonValue())
    }

    for (let count = 0; count < pageUrls.length; count++) {
        let url = pageUrls[count];
        let result = await crawContent(page, url)
        allData.push(result)
    }


    async function crawContent (page, url) {
        await page.goto(url)
        const result = await page.evaluate(() => {
            let data = []; 
            let elements = document.querySelectorAll('.content');
                for (var element of elements){
                    //節點以用google chrome console 做測試
                    let title = element.childNodes[1].innerText; // get title
                    let link = element.childNodes[1].children[0].href; // get href
                    data.push(title, link);
                }
            return data; 
        })
        // await page.waitForNavigation();
        return result
    }

//------------end close & return data---------------------//

    browser.close();
    return allData;
    // return list;
    // return pageUrls;
    
};

dev_scrape().then((value) => {
    console.log(value); 
    // console.log(JSON.stringify(value)); 
    // Success! , 回傳或存入數據
    fs.writeFile('data.txt', (JSON.stringify(value)).replace(/,/gi, "\n") + "\n", function(err) {})
    
})



//------------------------------------------------------------------------//

//不好說
/*
let rr_scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

   

    await page.setCookie({
        'value': 'over18',
        'domain': 'twdvd.com',
        'expires': Date.now() / 1000 + 10,
        'name': 'viewadult'
      });

      await page.goto(process.env.r18_url);

    //設置動作，click、setcookie、input anything....
    // await page.click('.welcome_index > #main > #daily > .jscroll-inner > .daily > div > div');
    // await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let data = []; 
        let elements = document.querySelectorAll('.blog_subject');

            for (var element of elements){
                //節點以用google chrome console 做測試
                let title = element.childNodes[0].innerText; // get title
                let link = element.childNodes[0].href; // get href

                data.push(title, link); // push to object or array
            }
            return data; 

    });

    browser.close();
    return result;
};

rr_scrape().then((value) => {
    console.log(value); 
    // console.log(JSON.stringify(value)); 
    // Success! , 回傳或存入數據
    // fs.writeFile('data.txt', (JSON.stringify(value)).replace(/,/gi, "\n") + "\n", function(err) {})
    
})
*/
