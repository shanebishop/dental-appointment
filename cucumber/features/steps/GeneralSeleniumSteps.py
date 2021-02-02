import selenium
from behave import *

from helper.common import *

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


@then('Element with ID "{html_id}" should have text "{expected_text}"')
def step_impl(context, html_id, expected_text):
    element_with_id_should_have_text(context, html_id, expected_text)


@then('Element with name "{html_name}" should have text "{expected_text}"')
def step_impl(context, html_name, expected_text):
    element_with_name_should_have_text(context, html_name, expected_text)


@step('No element should exist with ID "{html_id}"')
def step_impl(context, html_id):
    element_with_id_not_present(context, html_id)


@step('No element should exist with name "{html_name}"')
def step_impl(context, html_name):
    element_with_name_not_present(context, html_name)


@step('User clicks on element with ID "{html_id}"')
def step_impl(context, html_id):
    context.driver.find_by_id(html_id).click()


@step('User clicks on element with name "{html_name}"')
def step_impl(context, html_name):
    context.driver.find_by_name(html_name).click()


@step('Element with name "{html_name}" is visible')
def step_impl(context, html_name):
    assert_that(
        context.driver.find_by_name(html_name).is_displayed(),
        equal_to(True)
    )
