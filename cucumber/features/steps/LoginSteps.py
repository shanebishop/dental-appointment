from behave import *
from hamcrest import *

use_step_matcher("parse")


@given("User is on login page")
def step_impl(context):
    context.driver.open('http://localhost/auth/sign-in')


@when('User enters username "{username}"')
def step_impl(context, username):
    context.driver.find_by_name('username').send_keys(username)


@step('User enters password "{password}"')
def step_impl(context, password):
    context.driver.find_by_name('password').send_keys(password)


@step("User submits credentials")
def step_impl(context):
    context.driver.find_by_name('sign-in-btn').click()


@then("Home page should open")
def step_impl(context):
    context.driver.wait_until_location_is('http://localhost/', 1)


@then('Failed login dialog contains message "{expected_msg}"')
def step_impl(context, expected_msg):
    actual_msg = context.driver.find_by_name('login-err-msg').text
    assert_that(expected_msg, equal_to(actual_msg))
