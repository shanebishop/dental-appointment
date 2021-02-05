from behave import *
from hamcrest import *

use_step_matcher("parse")


@then('Registration dialog should display message "{expected_message}"')
def step_impl(context, expected_message):
    context.driver.find_by_name('register-dialog')
    actual_message = context.driver.find_by_name('register-dialog-msg').text

    assert_that(actual_message, equal_to(expected_message))
