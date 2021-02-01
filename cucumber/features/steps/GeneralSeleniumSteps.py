from behave import *
from hamcrest import *

use_step_matcher("parse")


@then("Element with name {name} is disabled")
def step_impl(context, name):
    name = '' if name == '${EMPTY}' else name
    el = context.driver.find_by_name(name)
    assert_that(el.is_enabled(), equal_to(False))


@then("Element with name {name} is enabled")
def step_impl(context, name):
    name = '' if name == '${EMPTY}' else name
    el = context.driver.find_by_name(name)
    assert_that(el.is_enabled(), equal_to(True))
