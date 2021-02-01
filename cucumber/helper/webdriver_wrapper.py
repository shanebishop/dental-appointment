# Based on https://www.lambdatest.com/blog/selenium-python-behave-tutorial-bdd/

import time

from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class WebdriverWrapper(object):
    __TIMEOUT = 2

    def __init__(self, driver):
        super(WebdriverWrapper, self).__init__()
        self._driver_wait = WebDriverWait(driver, WebdriverWrapper.__TIMEOUT)
        self._driver = driver

    def open(self, url):
        self._driver.get(url)

    def maximize(self):
        self._driver.maximize_window()

    def close(self):
        self._driver.quit()

    def driver(self):
        return self._driver

    def wait_until_location_is(self, expected_uri, timeout):
        WebdriverWrapper._wait_until(
            lambda: expected_uri == self._driver.current_url,
            f"Location did not become '{expected_uri}' in {timeout} seconds.",
            timeout,
        )

    @staticmethod
    def _wait_until(condition, error, timeout):
        max_time = time.time() + timeout
        not_found = None
        while time.time() < max_time:
            try:
                if condition():
                    return
            except StaleElementReferenceException as err:
                print('Suppressing StaleElementReferenceException from Selenium.')
                not_found = err
            else:
                not_found = None
            time.sleep(0.2)
        raise AssertionError(not_found or error)

    # Helper functions that are used to identify the web locators in Selenium Python tutorial

    def find_by_xpath(self, xpath):
        return self._driver_wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))

    def find_by_name(self, name):
        return self._driver_wait.until(EC.visibility_of_element_located((By.NAME, name)))

    def find_by_id(self, id):
        return self._driver_wait.until(EC.visibility_of_element_located((By.ID, id)))
