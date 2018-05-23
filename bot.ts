// This file just automates logging into TradingView.com - only a nice to have but can be extended to do anything on any website

import { Chromeless } from 'chromeless';

declare var TradingView;

// Make this runnable from package.json through NPM scripts using `make-runnable`
module.exports = {

    loadAutoview: async function () {
        const chromeless = new Chromeless({
            launchChrome: true
        });

        const screenshot = await
            chromeless
                .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3430.0 Safari/537.36')
                // .setViewport({width: 800, height: 600, scale: 1})
                .goto('chrome-extension://okdhadoplaoehmeldlpakhpekjcpljmb/_generated_background_page.html')
                .wait(2000)
                .screenshot()
                .catch((err) => {
                    console.error(err);
                });

        console.log(screenshot); // prints local file path or S3 url
        // await chromeless.end();
    },

    tradingViewSignout: async function () {
        const chromeless = new Chromeless({
            launchChrome: true
        });

        const screenshot = await
            chromeless
                .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3430.0 Safari/537.36')
                // .setViewport({width: 1920, height: 1080, scale: 1})
                .goto('https://www.tradingview.com/')
                .wait(4000)
                .evaluate(() => {
                    if (TradingView.isPro()) {
                        TradingView.signOut();
                        return false;
                    }
                })
                .screenshot()
                .catch((err) => {
                    console.error(err);
                });
        console.log(screenshot); // prints local file path or S3 url
        await chromeless.end();
    },

    tradingViewLogin: async function () {
        const chromeless = new Chromeless({
            launchChrome: true,
            waitTimeout: 20000
        });

        const screenshot = await chromeless
            .setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3430.0 Safari/537.36')
            // .setViewport({width: 2485, height: 1380, scale: 1})
            .goto('https://www.tradingview.com/')
            .wait('.tv-header')
            .wait(9000)
            .evaluate(() => {
                if (TradingView.isPro()) {
                    TradingView.signOut();
                    return false;
                }
            })
            .wait(9000)
            .wait('a.tv-header__link--signin')
            .click('a.tv-header__link--signin')
            .wait(1000)
            .type('', 'input[name="username"]') // enter your TradingView.com user name here
            .type('', 'input[name="password"]') // enter your TradingView.com password here
            .wait(10000)
            .click('button[type="submit"]')
            .wait(6000)
            .goto('https://www.tradingview.com/chart/')
            .wait('.chart-markup-table', 30000)
            .wait(7000)
            .screenshot()
            .catch((err) => {
                console.error(err);
            });

        console.log(screenshot); // prints local file path or S3 url

    }
}

require('make-runnable'); // must be at the END of the file

// Run directly from this script
// login().catch(console.error.bind(console));

// Run directly from this script
// module.exports.tradingViewLogin().catch(console.error.bind(console));

// Run directly from this script
// signout().catch(console.error.bind(console));