const puppeteer = require("puppeteer");
const loginLink ='https://www.hackerrank.com/auth/login';
// const email ='vefeba9257@submic.com'
// const password2 ="Temp@123"
const codeObj = require('./codes');




(async function(){
    try{
        let browserInstance = await puppeteer.launch({
            headless:false,
            args:['--start-maximized'],
            defaultViewport:null
        })

        let newTab = await browserInstance.newPage()
        await newTab.goto(loginLink)
        await newTab.type("input[id='input-1']",'vefeba9257@submic.com',{delay:50})
        await newTab.type("input[type='password']","Temp@123",{delay:50})
        await newTab.click('button[data-analytics="LoginPassword"]',{delay:50})
        await waitAndClick('.topic-card a[data-attr1="algorithms"]',newTab)
        await waitAndClick('input[value="warmup"]',newTab)
        let allchalag = await newTab.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50})
        console.log(allchalag.length)
        await questionwillbesolved(page,allchalag[0],codeObj.answer[0])

    }catch(err){
        console.log(err)
    }
})();

async function waitAndClick(selector,cpage){
    await cpage.waitForSelector(selector)
    let SelectorClicked = cpage.click(selector)
    return SelectorClicked
}
async function questionwillbesolved(page,question,answer){
    let questionclicked =question.click();
    await waitAndClick('.monaco-editor.no-user-select.vs',newTab)
    await waitAndClick('.checkbox-input',newTab)
    await newTab.waitForSelector('textarea.custominput',newTab)
    await newTab.type('textarea.custominput',answer,{delay:20})
    await newTab.keyboard.down('Control')
    await newTab.keyboard.press('A',{delay:100})
    await newTab.keyboard.press('X',{delay:100})
    await newTab.keyboard.up('Control')
    await waitAndClick('.monaco-editor.no-user-select.vs',newTab)
    await newTab.keyboard.down('Control')
    await newTab.keyboard.press('A',{delay:100})
    await newTab.keyboard.press('V',{delay:100})
    await newTab.keyboard.up('Control')
    await newTab.click('.hr-monaco__run-code',{delay:50})
    

    



}