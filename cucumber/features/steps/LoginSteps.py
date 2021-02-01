from behave import *

use_step_matcher("re")


@given("User is on login page")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.driver.open('http://localhost/auth/sign-in')


@when('User enters username "admin"')
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.driver.find_by_name('username').send_keys('admin')


@step('User enters password "admin"')
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    print('Hello world')
    context.driver.find_by_name('password').send_keys('admin')


@step("User submits credentials")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.driver.find_by_name('sign-in-btn').click()


@then("Home page should open")
def step_impl(context):
    """
    :type context: behave.runner.Context
    """
    context.driver.wait_until_location_is('http://localhost/', 1)
