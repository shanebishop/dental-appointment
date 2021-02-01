# Based on https://www.lambdatest.com/blog/selenium-python-behave-tutorial-bdd/

import os
from configparser import ConfigParser
from helper.helper_web import get_browser


def before_all(context):
    config = ConfigParser()
    my_file = (os.path.join(os.getcwd(), 'setup.cfg'))
    config.read(my_file)

    # Reading the browser type from the configuration file for Selenium Python Tutorial
    helper_func = get_browser(config.get('Environment', 'Browser'))
    context.helperfunc = helper_func


def after_all(context):
    context.helperfunc.close()
