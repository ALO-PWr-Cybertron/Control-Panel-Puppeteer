"use strict";

const puppeteer = require("puppeteer");

const url = process.env.URL;
const admin_password = process.env.ADMIN_PASSWORD;
const interval = process.env.INTERVAL;
console.log({ url, admin_password, interval });

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 800, height: 450 },
    });
    const page = await browser.newPage();

    page.on("dialog", async (dialog) => {
        await dialog.dismiss();
    });

    while (true) {
        console.info("Refreshing...");

        await page.goto(url, { waitUntil: "networkidle0" });

        if (page.url().endsWith("login.php")) {
            await page.type("input[name='username']", "admin");
            await page.type("input[name='password']", admin_password);
            await page.click("button[type='submit']");
        }

        await page.waitForTimeout(interval);
    }
})();
