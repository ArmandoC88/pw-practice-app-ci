import { Page } from "@playwright/test";
import {NavigationPage} from '../page-objects/navigationPage' //import navigation page class inside of the test file 
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'


export class PageManager{

   private readonly page:Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepicketPage: DatepickerPage

    constructor (page:Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepicketPage = new DatepickerPage(this.page)
    }

    //create method that will return all the instances of the page object

    navigateTo(){ 
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatePickerPage(){
        return this.datepicketPage
    }
}