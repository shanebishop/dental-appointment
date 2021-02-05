from behave import *
from hamcrest import *
from helper.urls import *

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


@when(
    'Staff member enters appointment data "{date}" "{time}" "{username}" "{hygienist}" "{operation}" "{extra_notes}"')
def step_impl(context, date, time, username, hygienist, operation, extra_notes):
    context.driver.set_text_of_el_with_name('date', date)
    context.driver.set_text_of_el_with_name('time', time)
    context.driver.set_text_of_el_with_name('client', username)
    context.driver.set_text_of_el_with_name('hygienist', hygienist)
    context.driver.set_text_of_el_with_name('extra_notes', extra_notes)

    # Make selection on operation dropdown
    operation_el = context.driver.find_by_id('operation-dropdown')
    context.driver.set_dropdown_selection(operation_el, operation)


@step("Staff member is on Create Appointment page")
def step_impl(context):
    context.driver.open(EDIT_APPOINTMENT_URL)
    context.driver.location_should_be(EDIT_APPOINTMENT_URL)
