import { Page } from '@playwright/test';

export default class BasePage {
    readonly page: Page;
    readonly path: string;

    constructor(page: Page) {
        this.page = page;
        this.path = 'https://foxford.ru/home-school';
    }

    async openPage() {
        await this.page.goto(`${'https://foxford.ru/home-school'}`);
    }
}