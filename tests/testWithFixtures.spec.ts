import {test} from '../test-options'
//import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

// test.beforeEach(async({page})=>{
//     //env url base url
//     await page.goto(('/'))
//     //await page.goto('http://localhost:4200/')
// })

//test('Parametrized methods',async({page})=>{
test('Parametrized methods',async({pageManager})=>{
    //const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    //await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGrigFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail,false)
    //await pm.onFormLayoutsPage().submitUsingTheGrigFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
   // await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail,false)
   

})