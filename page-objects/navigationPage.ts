import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

//when use inerance HelperBase  delete reandoly page:Page & change constructor this.page = page for super(page)
export class NavigationPage extends HelperBase{//type export to use the class in other files
    
    //readonly page:Page //new field inside this class
    //new field to use in locators appers on import, and remove locators in each method
    // readonly fromLayoutsMenuItem: Locator
    // readonly datePickerMenu:Locator
    // readonly smartTableMenu:Locator
    // readonly toastrMenuItem:Locator
    // readonly tooltipMenuItem:Locator  //asign the value of locator inside constructor and modify method
    //create constructor
    constructor(page:Page){
        super(page)
        //this.page = page
        // this.fromLayoutsMenuItem = page.getByText('Form Layouts')
        // this.datePickerMenu = page.getByText('Datepicker')
        // this.smartTableMenu = page.getByText('Smart Table')
        // this.toastrMenuItem = page.getByText('Toastr')
        // this.tooltipMenuItem = page.getByText('Tooltip')
    }

    //method to use the page fixture inside this method
    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')

        //await this.fromLayoutsMenuItem.click()
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        //await this.page.waitForTimeout(1000)

        //await this.datePickerMenu.click()
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')

        //await this.smartTableMenu.click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')

        //await this.toastrMenuItem.click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')

        //await this.tooltipMenuItem.click()
        await this.page.getByText('Tooltip').click()
    }

    //method to be only use in this page object
    private async selectGroupMenuItem(gropuItemTitle: string){
        const groupMenuItem = this.page.getByTitle(gropuItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState =="false"){
            await groupMenuItem.click()
        }
    }
}