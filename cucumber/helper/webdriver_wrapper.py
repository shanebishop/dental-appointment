"""
Based on https://www.lambdatest.com/blog/selenium-python-behave-tutorial-bdd/
Provides a wrapper around selenium.webdriver.WebDriver.
"""

import time
from hamcrest import *

from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select


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

    def location(self):
        return self._driver.current_url

    def location_should_be(self, expected_uri):
        assert_that(self._driver.current_url, equal_to(expected_uri))

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

    def value_of_el_with_id(self, html_id):
        el = self._driver.find_element_by_id(html_id)
        return el.get_attribute('value')

    def value_of_el_with_name(self, html_name):
        el = self._driver.find_element_by_name(html_name)
        return el.get_attribute('value')

    def set_text_of_el_with_id(self, html_id, text):
        el = self._driver.find_element_by_id(html_id)
        WebdriverWrapper.set_text_of_el(el, text)

    def set_text_of_el_with_name(self, html_name, text):
        el = self._driver.find_element_by_name(html_name)
        WebdriverWrapper.set_text_of_el(el, text)

    @staticmethod
    def set_text_of_el(el, text):
        el.clear()
        el.send_keys(text)

    @staticmethod
    def get_dropdown_selected(dropdown_el):
        """Returns a set of all items selected in a dropdown"""
        el_select = Select(dropdown_el)
        options = el_select.all_selected_options
        selected = [opt.text for opt in options] + [opt.get_attribute('value') for opt in options]
        return set(selected)

    @staticmethod
    def set_dropdown_selection(dropdown_el, to_select):
        select = Select(dropdown_el)
        select.select_by_visible_text(to_select)

    def find_by_xpath(self, xpath):
        return self._driver_wait.until(EC.visibility_of_element_located((By.XPATH, xpath)))

    def find_by_name(self, name):
        return self._driver_wait.until(EC.visibility_of_element_located((By.NAME, name)))

    def find_by_id(self, id):
        return self._driver_wait.until(EC.visibility_of_element_located((By.ID, id)))
