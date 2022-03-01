const puppeteer = require("puppeteer");
const loginLink ='https://www.hackerrank.com/auth/login';
const email ='vefeba9257@submic.com'
const password ='Temp@123'
const codeObj = require('./codes')

let browserOpen = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
})
let page;
browserOpen.then(function(browserobj){
    let browserOpenPromise = browserobj.newPage();
    return browserOpenPromise;

}).then(function(newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function(){
    let emailenterd = page.type("input[id='input-1']",email,{delay:50});
    return emailenterd
}).then(function(){
    let passwordenterd = page.type("input[type='password']",password,{delay:50});
    return passwordenterd
}).then(function(){
    let loginbuttonCick = page.click('button[data-analytics="LoginPassword"]',{delay:50})
    return loginbuttonCick
})
.then(function(){
    let clickonalgopromise = waitandclick('.topic-card a[data-attr1="algorithms"]',page)
    return clickonalgopromise
}).then(function(){
    let getTowarmup = waitandclick('input[value="warmup"]',page)
    return getTowarmup
}).then(function(){
    let waitfor3sec = page.waitFor(3000)
    return waitfor3sec;
}).then(function(){
    let allChalleng = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    console.log(allChalleng.length)
    return allChalleng
}).then(function(questionArr){
    console.log(questionArr.length)
    // console.log(codeObj.answer[0])
    let questionwillbesolved = questionSolver(page,questionArr[0],codeObj.answer[0])
    return questionwillbesolved
}).catch(function(err){
    console.log(err)
})



function waitandclick(selector,cpage){
    return new Promise(function(resolve,reject){
        let waitforModepromise =cpage.waitForSelector(selector);
        waitforModepromise.then(function(){
            let clickmodal = cpage.click(selector);
            return clickmodal;
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })

}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click();
         questionWillBeClicked.then(function(){
             let EditorInFocusPromise = waitandclick('.monaco-editor.no-user-select.vs',page)
             return EditorInFocusPromise

         }).then(function(){
             return waitandclick('.checkbox-input',page)
         }).then(function(){
             return page.waitForSelector('textarea.custominput',page)
         }).then(function(){
            return page.type('textarea.custominput',answer,{delay:20})
         }).then(function(){
             let ctrlisPressed = page.keyboard.down('Control')
             return ctrlisPressed
         }).then(function(){
             let Aispress = page.keyboard.press('A',{delay:100})
             return Aispress
         }).then(function(){
             let xIsPressed = page.keyboard.press('X',{delay:100})
             return xIsPressed
         }).then(function(){
             let ctrisunpressed  = page.keyboard.up('Control')
             return ctrisunpressed
         }).then(function(){
             let EditorInfocus = waitandclick('.monaco-editor.no-user-select.vs',page)
             return EditorInfocus
         }).then(function(){
            let ctrlisPressed = page.keyboard.down('Control')
            return ctrlisPressed
         }).then(function(){
            let Aispress = page.keyboard.press('A',{delay:100})
            return Aispress
         }).then(function(){
            let vispress = page.keyboard.press('V',{delay:100})
            return vispress
         }).then(function(){
            let ctrlisPressed = page.keyboard.up('Control')
            return ctrlisPressed
         }).then(function(){
             return page.click('.hr-monaco__run-code',{delay:50})
         }).then(function(){
             resolve()
         }).catch(function(err){
             reject()
         })
    })
}