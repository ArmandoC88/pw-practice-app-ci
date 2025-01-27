import {test,expect} from '@playwright/test'

test.beforeEach(async({page})=>{
    //env variable
    await page.goto('/') 
    //await page.goto('http://localhost:4200/') 
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page})=>{
    //by tag name
    page.locator('input')

    //by ID
    await page.locator('#inputEmail1').click()

    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combinedifferent selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath
    page.locator('//*[@id="inputEmail"]')

    //by partial locator
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User Facing Locators', async({page})=>{
    await page.getByRole('textbox',{name:"Email"}).first().click()
    await page.getByRole('button',{name:"Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click()
   // await page.getByTitle('IoT Dashboard').click()

})

test('location child elements', async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('location parent elements',async({page})=>{
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox',{name:"Email"}).click()
    await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox',{name:"Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click()
})

test('Reusing the locators',async({page})=>{
    const basicForm= page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name:"Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name:"Password"}).fill('welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    //assertion
    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page})=>{
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox',{name:"Email"})
    await emailField.fill('test@test.com')
    const emailvalue = await emailField.inputValue()
    expect(emailvalue).toEqual('test@test.com')

    //atrribute value
    const placeholdervalue = await emailField.getAttribute('placeholder')
    expect(placeholdervalue).toEqual('Email')
})

test('assertions', async({page})=>{
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const textButton = await basicFormButton.textContent()
    expect(textButton).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit')//original Submit5
    await basicFormButton.click()
})