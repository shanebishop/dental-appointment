from selenium import webdriver
import os
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
import time
from behave import given, when, then


@given('A thing happens')
def a_thing_happens(context):
    pass

@then('A thing happened')
def a_thing_happened(context):
    pass
