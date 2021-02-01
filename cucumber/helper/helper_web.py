# Based on https://www.lambdatest.com/blog/selenium-python-behave-tutorial-bdd/

import os
from selenium import webdriver
from helper.webdriver_wrapper import WebdriverWrapper


def get_browser(browser):
    if browser == 'chrome':
        return WebdriverWrapper(webdriver.Chrome(service_log_path=os.devnull))
    elif browser == 'firefox':
        return WebdriverWrapper(webdriver.Firefox(service_log_path=os.devnull))
    else:
        raise Exception(f'Currently unsupported browser provided: "{browser}"')
