import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";

describe("Test the website.", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  after(async function () {
    await driver.quit();
  });

  it("First test is this.", async function () {
    await driver.get("https://demoqa.com/text-box");
    const waitTime = 5000;

    async function filler(byLocator, timer) {
      try {
        let element = await driver.wait(until.elementLocated(byLocator), timer);
        return element;
      } catch (error) {
        console.error("Error for locator:", error);
        throw error;
      }
    }

    const arr = [
      { tUser: "User" },
      { tEmail: "user@gmail.com" },
      { tAddres: "Random address N777" },
      { tPeraddres: "Random permanent address N777" },
    ];

    try {
      let username = await filler(By.id("userName"), waitTime);
      await username.sendKeys(arr[0].tUser);
      let usernameValue = await username.getAttribute("value");
      expect(usernameValue).to.equal(arr[0].tUser);

      let userEmail = await filler(By.id("userEmail"), waitTime);
      await userEmail.sendKeys(arr[1].tEmail);
      let userEmailValue = await userEmail.getAttribute("value");
      expect(userEmailValue).to.equal(arr[1].tEmail);

      let currentAddress = await filler(By.id("currentAddress"), waitTime);
      await currentAddress.sendKeys(arr[2].tAddres);
      let currentAddressValue = await currentAddress.getAttribute("value");
      expect(currentAddressValue).to.equal(arr[2].tAddres);

      let permanentAddress = await filler(By.id("permanentAddress"), waitTime);
      await permanentAddress.sendKeys(arr[3].tPeraddres, Key.RETURN);
      let permanentAddressValue = await permanentAddress.getAttribute("value");
      expect(permanentAddressValue.trim()).to.equal(arr[3].tPeraddres);
    } catch (error) {
      console.error("Error has been caught", error);
    }
  });
});
