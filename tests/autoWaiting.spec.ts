import {test,expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach(async({page},testInfo)=>{
    await page.goto(process.env.URL)
    //await page.goto('http://uitestingplayground.com/ajax') 
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('Auto waiting test', async({page})=>{
    const successButton = await page.locator('.bg-success')
    //await successButton.click()
    
    //const textContenido = await successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const textContenido = await successButton.allTextContents()
    // expect(textContenido).toContain('Data loaded with AJAX get request.')
    //expect(textContenido).toEqual('Data loaded with AJAX get request.')

    //locator types of assertion time out 5 seg
    await expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})

test.skip('Alternative waits', async({page})=>{
    const successButton = await page.locator('.bg-success')
    //1.-wait for element
    //await page.waitForSelector('.bg-success')

    //2.-wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //3.-wait for network calls to be completed ('NOT RECOMENDED')
    await page.waitForLoadState('networkidle')

    const textContenido = await successButton.allTextContents()
    expect(textContenido).toContain('Data loaded with AJAX get request.')
})

test.skip('Timeouts',async({page})=>{
    //test.setTimeout(10000)
    test.slow()
    const successButton = await page.locator('.bg-success')
    await successButton.click()
    //await successButton.click({timeout:16000})
})