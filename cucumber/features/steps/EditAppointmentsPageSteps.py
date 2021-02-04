from behave import *
from hamcrest import *
from selenium.webdriver.support.ui import Select

use_step_matcher("parse")


@step('Appointment fields have data "{date}" "{time}" "{username}" "{hygienist}" "{operation}" "{extra_notes}"')
def step_impl(context, date, time, username, hygienist, operation, extra_notes):
    actual_date = context.driver.value_of_el_with_name('date')
    actual_time = context.driver.value_of_el_with_name('time')
    actual_username = context.driver.value_of_el_with_name('client')
    actual_hygienist = context.driver.value_of_el_with_name('hygienist')
    actual_extra_notes = context.driver.value_of_el_with_name('extra_notes')

    assert_that(date, equal_to(actual_date))
    assert_that(time, equal_to(actual_time))
    assert_that(username, equal_to(actual_username))
    assert_that(hygienist, equal_to(actual_hygienist))
    assert_that(extra_notes, equal_to(actual_extra_notes))

    operation_el = context.driver.find_by_id('operation-dropdown')
    actual_selected = context.driver.get_dropdown_selected(operation_el)
    assert_that({operation}, equal_to(actual_selected))
