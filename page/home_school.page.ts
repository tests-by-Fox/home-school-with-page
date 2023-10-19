import BasePage from "./base.page";
import { Locator, Page } from "@playwright/test";

export class HomeSchool extends BasePage {
    private readonly toEnrollInSchool; //кнопка Поступить в школу
    private readonly toTryFree; // кнопка Попробовать бесплатно
    private readonly toLearnMorePrimary; // кнопка Узнать больше 1-4 классы
    private readonly toLearnMoreMiddle; // кнопка Узнать больше 5-8 классы
    private readonly toLearnMoreHigh; // кнопка Узнать больше 9-11 классы
    private readonly requestBlock; // блок Оставить завявку на обучение
    private readonly onlineLessonButton; //кнопка Онлайн-урока
    private readonly scheldueButton; //кнопка Расписание
    private readonly homeworkButton; //кнопка Домашнее задание
    private readonly schoolPerformanceButton; //кнопка Успеваемость
    private readonly onlineLessonScreen; //экран Онлайн уроков
    private readonly scheldueScreen; // экран Расписания
    private readonly homeworkScreen; // экран Домашнего задания
    private readonly schoolPerformanceScreen; // экран Успеваемости
    private readonly startLearnButtun; // кнопка Начать учиться
    private readonly moreAboutAttestation; //кнопка Подробнее об аттесатции
    private readonly downloadGuide; // кнопка Скачать гайд
    private readonly viewLicense; // кнопка Посмотреть лицензию
    private readonly discountElemOne; //плашка скидки в первом блоке старницы
    private readonly discountElemTwo; //плашка скидки в блоке форматов обучения



    constructor(page: Page) {
        super(page)
        this.toEnrollInSchool = page.getByText('Поступить в школу');
        this.toTryFree = page.getByText('Попробовать бесплатно');
        this.toLearnMorePrimary = page.getByRole('link', { name: '1-4 классы' });
        this.toLearnMoreMiddle = page.getByRole('link', { name: '5-8 классы' })
        this.toLearnMoreHigh = page.getByRole('link', { name: '9-11 классы' })
        this.requestBlock = page.locator('#request');
        this.moreAboutAttestation = page.getByText('Подробнее об аттестации');
        this.downloadGuide = page.getByText('Скачать гайд');
        this.viewLicense = page.getByText('Посмотреть лицензию');

        this.onlineLessonButton = page.locator('//div[text()="Онлайн-уроки"]');
        this.scheldueButton = page.locator('//div[text()="Расписание"]');
        this.homeworkButton = page.locator('//div[text()="Домашние задания"]');
        this.schoolPerformanceButton = page.locator('//div[text()="Успеваемость"]');
        this.onlineLessonScreen = page.locator('//img[@alt="Онлайн-уроки"]');
        this.scheldueScreen = page.locator('//img[@alt="Расписание"]');
        this.homeworkScreen = page.locator('//img[@alt="Домашние задания"]');
        this.schoolPerformanceScreen = page.locator('//img[@alt="Успеваемость"]');
        this.startLearnButtun = page.locator('//div[@tabindex="-1"]//div[text()="Начать учиться"]');

        this.discountElemOne = page.locator('.styled__DiscountText-jZzMO');
        this.discountElemTwo = page.locator('.styled__Sale-cxmyYd');



    }

    // Клик на кнопку "Поступить в школу"
    public async toEnrollInSchoolClick() {
        await this.toEnrollInSchool.click();
    }

    // Определяем кнопки "Попробовать бесплатно"
    public async toTryFreeClick() {
        const buttons = await this.toTryFree.all();
        return buttons;
    }

    //Видимость блока "Оставить заявку на обучение"
    public async isRequestBlock() {
        return await this.requestBlock.isVisible()
    }

    // Клик на кнопку.ссылку "Узнать больше" 1-4 класс
    public async toLearnMorePrimaryClick() {
        await this.toLearnMorePrimary.click();
    }

    // Клик на кнопкиюссылку "Узнать больше" 5-8 класс
    public async toLearnMoreMiddleClick() {
        await this.toLearnMoreMiddle.click();
    }

    // Клик на кнопкиюссылку "Узнать больше" 9-11 класс
    public async toLearnMoreHighClick() {
        await this.toLearnMoreHigh.click();
    }

    //Клик по кнопке "Подробнее об аттесатции"
    public async moreAboutAttestationClick() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.moreAboutAttestation.click(),
        ]);

        return newPage
    }

    //Клик по кнопке "Скачать гайд"
    public async downloadGuideClick() {

        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.downloadGuide.click(),
        ]);

        return newPage;

    }

    //Клик по кнопке "Посмотреть лицензию"
    public async viewLicenseClick() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.viewLicense.click(),
        ]);

        return newPage;

    }



    // Клик по кнопке "Онлайн-уроки"7
    public async onlineLessonCLick() {
        await this.onlineLessonButton.click();
    }

    // Клик по кнопке "Расписание"
    public async scheldueClick() {
        await this.scheldueButton.click();
    }

    // Клик по кнопке "Домашние задания"
    public async homeworkClick() {
        await this.homeworkButton.click();
    }

    // Клик по кнопке "Успеваемость"
    public async schoolPerformanceClick() {
        await this.schoolPerformanceButton.click();
    }

    // Определяем кнопку "Начать учиться" в блоке Онлайн-платформа
    public async isStartLearnButtons() {
        const buttons = await this.startLearnButtun.all();
        return buttons;
    }

    //Видимость блока "Онлайн-уроки"
    public async isOnlineLessonScreen() {
        return await this.onlineLessonScreen.isVisible();
    }

    //Видимость блока "Расписание"
    public async isScheldueScreen() {
        return await this.scheldueScreen.isVisible();
    }

    //Видимость блока "Домашние задания"
    public async isHomeworkScreen() {
        return await this.homeworkScreen.isVisible()
    }

    //Видимость блока "Успеваемость"
    public async isSchoolPerformanceScreen() {
        return await this.schoolPerformanceScreen.isVisible();
    }


    
    // Просто возвращаем плашки со скидками, чтобы использовать их в тесте
    public async discountOne() {
        return this.discountElemOne;
    }

    public async discountTwo() {
        return this.discountElemTwo;
    }

    //Функция для форматирования даты
    public async formatDate(dateString: any) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        return `${day} ${month}`;
    }

}