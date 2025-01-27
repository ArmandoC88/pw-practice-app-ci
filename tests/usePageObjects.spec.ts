import {test,expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

// import {NavigationPage} from '../page-objects/navigationPage' //import navigation page class inside of the test file 
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
// import { DatepickerPage } from '../page-objects/datepickerPage'

test.beforeEach(async({page})=>{
    //env url base url
    await page.goto(('/'))
    //await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
    //create a new instance of this PO
    // const navigateTo = new NavigationPage(page)
    // await navigateTo.formLayoutsPage()
    // await navigateTo.datepickerPage()
    // await navigateTo.smartTablePage()
    // await navigateTo.toastrPage()
    // await navigateTo.tooltipPage()
})

test('Parametrized methods',async({page})=>{
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    //await pm.onFormLayoutsPage().submitUsingTheGrigFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pm.onFormLayoutsPage().submitUsingTheGrigFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    //adding screenshoots
    await page.screenshot({path:'screenshoots/formLayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))

    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail,false)
    //await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('John Smith', 'JohnWeeck@film.com',false)
    await page.locator('nb-card',{hasText:"Inline form"}).screenshot({path:'screenshoots/inlineForm.png'})

    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(1)
    await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(2, 3)

    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatePickerPage = new DatepickerPage(page)

    // await navigateTo.formLayoutsPage()
    // await onFormLayoutsPage.submitUsingTheGrigFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    // await onFormLayoutsPage.submitInLineFormWithNameEmailAndCheckbox('John Smith', 'JohnWeeck@film.com',false)

    // await navigateTo.datepickerPage()
    // await onDatePickerPage.selectCommonDatePickerDateFromToday(2)
    // await onDatePickerPage.selectDatepickerWithRangeFromToday(3, 9)
})

test.only('testing with argos ci', async({page})=>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
   
})