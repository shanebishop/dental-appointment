from time import sleep

from behave import *
from hamcrest import *

use_step_matcher("re")


@given("User is on login page")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.helperfunc.open('http://localhost/auth/sign-in')


@when('User enters username "admin"')
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.helperfunc.find_by_name('username').send_keys('admin')


@step('User enters password "admin"')
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    print('Hello world')
    context.helperfunc.find_by_name('password').send_keys('admin')


@step("User submits credentials")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.helperfunc.find_by_name('sign-in-btn').click()


@then("Home page should open")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    sleep(0.5)
    assert_that(context.helperfunc.driver().current_url, equal_to('http://localhost/'))
