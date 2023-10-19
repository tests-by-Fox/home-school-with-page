import { test, expect } from "@playwright/test";
import { HomeSchool } from "../page/home_school.page";
import BasePage from "../page/base.page";


test.describe('Check click buttons in page Home-school', async () => {

    let externatSchool: HomeSchool;
    let open: BasePage;
    test.beforeEach(async ({ page }) => {
        externatSchool = new HomeSchool(page);
        open = new BasePage(page);
        await open.openPage();
    });

    // При клике на кнопку "Поступить в школу" - скроллит к блоку заявки на поступление
    test('Check click "to Enroll In School"', async () => {
        await externatSchool.toEnrollInSchoolClick();
        const block = await externatSchool.isRequestBlock()
        expect(block).toBe(true)
    });

    //При клике на кнопки(их две) "Попробовать бесплатно" переходим на страницу демо
    test('Check click "to Try Free"', async ({ page }) => {
        const buttons = await externatSchool.toTryFreeClick()
        for (const button of buttons) {
            await button.click();
            expect(page.url()).toContain('/demo');
            await page.goBack();
        }
    });

    //При клике на кнопку "Узнать больше" 1-4 классов редирект на страницу /primary
    test('Check click "to Learn More" by 1-4 class', async ({ page }) => {
        await externatSchool.toLearnMorePrimaryClick();
        expect(page.url()).toContain('/primary')
    })

    // При клике на кнопку "Узнать больше" 5-8 классов редирект на страницу /middle
    test('Check click "to Learn More" by 5-8 class', async ({ page }) => {
        await externatSchool.toLearnMoreMiddleClick();
        expect(page.url()).toContain('/middle')
    })

    // При клике на кнопку "Узнать больше" 9-11 классов редирект на страницу /high
    test('Check click "to Learn More" by 9-11 class', async ({ page }) => {
        await externatSchool.toLearnMoreHighClick();
        expect(page.url()).toContain('/high')
    })

    // При клике на кнопку "Подробнее об аттесатции" редирект на страницу /attestation
    test('Check click "more About Attestation" ', async () => {
        const newPage: any = await externatSchool.moreAboutAttestationClick();
        expect(newPage.url()).toContain('/attestation');
    })

    // При клике на кнопку "Скачать" редирект на страницу /perehod-na-semeynoe-obrazovanie
    test('Check click "download  Guide" ', async () => {
        const newPage: any = await externatSchool.downloadGuideClick();
        expect(newPage.url()).toContain('/perehod-na-semeynoe-obrazovanie');
    })

    // При клике на кнопку "Посмотреть лицензию" редирект на страницу открывается лицензия
    test('Check click "view License" ', async () => {
        const newPage: any = await externatSchool.viewLicenseClick();
        expect(newPage.url()).toContain('https://a.foxford.ngcdn.ru/assets/webpack/images/license.27ddeacf.jpg')
    })
});



// Блок онлайн-платформы
test.describe('Check click buttons in block online-platform in page Home-school', async () => {

    let externatSchool: HomeSchool;
    let open: BasePage;
    let screen;

    test.beforeEach(async ({ page }) => {
        externatSchool = new HomeSchool(page);
        open = new BasePage(page);
        await open.openPage();
    });

    // При клике на кнопку "Онлайн уроки" вижу экран Онлайн-уроков 
    test('Check click "online lesson" button', async () => {
        await externatSchool.onlineLessonCLick();
        screen = await externatSchool.isOnlineLessonScreen();
        expect(screen).toBe(true);
    });

    // При клике на кнопку "Расписание" вижу экран Расписание
    test('Check click "scheldue" button', async () => {
        await externatSchool.scheldueClick()
        screen = await externatSchool.isScheldueScreen()
        expect(screen).toBe(true);
    });

    // При клике на кнопку "Домашние задания" вижу экран Домашняя работа
    test('Check click "homework" button', async () => {
        await externatSchool.homeworkClick()
        screen = await externatSchool.isHomeworkScreen()
        expect(screen).toBe(true);
    });

    // При клике на кнопку "Успеваемость" вижу экран Успеваемость
    test('Check click "school performance" button', async () => {
        await externatSchool.schoolPerformanceClick()
        screen = await externatSchool.isSchoolPerformanceScreen()
        expect(screen).toBe(true);
    });

    // При клике по кнопкам "Начать учиться" скроллит к блоку "Оставить заявку на обучение"
    test('Check click "start learn" buttons', async () => {
        const buttons = await externatSchool.isStartLearnButtons();
        const block = await externatSchool.isRequestBlock()
        for (const button of buttons) {
            await button.click();
            expect(block).toBe(true);
        }
    });

    //Плашка скидки на обучение
    test.describe('Check discount element', async () => {

        let externatSchool: HomeSchool;
        let open: BasePage;
        let data: any;
        let discount: any;

        test.beforeEach(async ({ page }) => {
            externatSchool = new HomeSchool(page);
            open = new BasePage(page);
            await open.openPage();
            let response = await fetch("https://foxford.ru/api/externship/products/prices?year=2023");
            data = await response.json();
            discount = data.full_payment?.discount; //(data.full_payment && data.full_payment.discount)
        });

        // Данные из первой плашки скидки тянуться из апи полной оплаты (скидка и дата окончания)
        test('Show correct discount in card one', async () => {

            if (data && data.full_payment && data.full_payment.discount && data.full_payment.ends_at) {

                const element = await externatSchool.discountOne();
                const elementText = await element.innerText();

                const discount = data.full_payment.discount;
                const endsAt = new Date(data.full_payment.ends_at);
                const formattedExpectedText = `–${discount}% ДО ${externatSchool.formatDate(endsAt)}`;

                expect(elementText).toBe(formattedExpectedText);
            }

        });

        // Если скидки в апишке в полной оплате равна нулю, то не показываем первую плашку скидки
        test('If in offer no discount,do not show card one', async () => {

            if (data.full_payment.discount === 0) {
                const element = await externatSchool.discountOne();
                expect(element).toBeHidden();
            }

        });

        // Данные из второй плашки скидки тянуться из апи полной оплаты (скидка и дата окончания)
        test('Show correct discount in card two', async () => {
            if (data && data.full_payment && data.full_payment.discount && data.full_payment.ends_at) {

                const element = await externatSchool.discountTwo();
                const elementText = await element.innerText();

                const discount = data.full_payment.discount;
                const endsAt = new Date(data.full_payment.ends_at);
                const formattedExpectedText = `–${discount}% ДО ${externatSchool.formatDate(endsAt)}`;

                expect(elementText).toBe(formattedExpectedText);
            }

        })

        // Если скидки в апишке в полной оплате равна нулю, то не показываем вторую плашку скидки
        test('If in offer no discount,do not show card two', async () => {
            if (data.full_payment.discount === 0) {
                const element = await externatSchool.discountTwo();
                expect(element).toBeHidden();
            }
        });


    });

    //     //Блок заявки на обучения
    //     //хочу проверить, что должны быть заполнены все обязаутльные поля и чекбокс и что при отправке отлетает лид-реквест

    //     test.describe('', async () => {
    //         test('', async () => {

    //         })


    //     });

    //      //Блок форматов обучения
    // тесты нужно написать для каждого таба
    // внутри таба проверить соответсвие цен из апишки и класс, откуда тянем, и оффер, плюс все кнопки
    //     test.describe('', async () => {
    //         test('', async () => {

    //         })


    //     });


    //     //Блок учителей
    //     test.describe('', async () => {
    //         test('', async () => {

    //         })


    //     });



});
