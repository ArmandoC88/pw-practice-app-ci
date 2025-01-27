import { expect, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

//when use inerance HelperBase  delete reandoly page:Page & change constructor this.page = page for super(page)
export class DatepickerPage extends HelperBase{
    //private readonly page:Page
    
    constructor(page:Page){
        super(page)
        //this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        
        // await expect(calendarInputField).toHaveValue('Jan 15, 2025')
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday:number, endDayFromToday:number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)

        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        //using JS object to improve dates
        let date = new Date()
        date.setDate(date.getDate()+numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        
        //constant for the month
        const expectMonthShot = date.toLocaleString('En-Us',{month:'short'})
        const expectMonthLong = date.toLocaleString('En-Us',{month:'long'})
        const expectYear = date.getFullYear()
        const dateToAssert = `${expectMonthShot} ${expectedDate}, ${expectYear}`
        
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectMonthAndYear = ` ${expectMonthLong} ${expectYear}`
        while(!calendarMonthAndYear.includes(expectMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate,{exact:true}).click()
        return dateToAssert
    }
}