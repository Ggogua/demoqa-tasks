import { Builder, By } from "selenium-webdriver";

describe("Check the boxes", () => {
  let driver;

  async function clickVisibleArrows(newDriver) {
    try {
      const arrows = await newDriver.findElements(
        By.css("svg.rct-icon-expand-close")
      );

      for (let arrow of arrows) {
        const isDisplayed = await arrow.isDisplayed();
        if (isDisplayed) {
          await arrow.click();
          await newDriver.sleep(1000);
        }
      }
    } catch (error) {
      console.error("Error in clickVisibleArrows:", error);
    }
  }

  async function clickAllArrows(newDriver) {
    try {
      const arrows = await newDriver.findElements(
        By.css("svg.rct-icon-expand-close")
      );

      for (let arrow of arrows) {
        await arrow.click();
        await newDriver.sleep(1000);
      }
    } catch (error) {
      console.error("Error in clickAllArrows:", error);
    }
  }

  async function checkBoxes(newDriver) {
    try {
      await newDriver.findElement(By.css("svg.rct-icon-uncheck")).click();
    } catch (error) {
      console.error("Error in check:", error);
    }
  }

  before(async () => {
    driver = new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it("Checks the box successfully", async function () {
    await driver.get("https://demoqa.com/checkbox");

    await clickVisibleArrows(driver);

    await clickAllArrows(driver);

    await checkBoxes(driver);
  });
});
