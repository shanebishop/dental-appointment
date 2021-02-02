import selenium
from behave import *

from helper.common import *

use_step_matcher("parse")


@when("Staff member is logged in")
def step_impl(context):
    login_as_admin(context)


@step("User is on Appointments page")
def step_impl(context):
    context.driver.open(APPOINTMENTS_URL)
    context.driver.location_should_be(APPOINTMENTS_URL)


@then("Full appointments are displayed chronologically")
def step_impl(context):
    context.driver.location_should_be(APPOINTMENTS_URL)

    # Check text for each item
    assert_that(
        context.driver.find_by_id('appointment-0-time').text,
        equal_to('2021-05-23 14:30:00')
    )
    assert_that(
        context.driver.find_by_id('appointment-1-time').text,
        equal_to('2021-06-03 10:00:00')
    )
    assert_that(
        context.driver.find_by_id('appointment-2-time').text,
        equal_to('2021-06-03 10:00:00')
    )
    assert_that(
        context.driver.find_by_id('appointment-3-time').text,
        equal_to('2021-06-03 11:15:00')
    )
    assert_that(
        context.driver.find_by_id('appointment-4-time').text,
        equal_to('2021-07-14 16:10:00')
    )
    assert_that(
        context.driver.find_by_id('appointment-5-time').text,
        equal_to('2021-08-07 15:20:00')
    )

    # Check there are no additional appointments
    assert_that(
        calling(context.driver.driver().find_element_by_id).with_args('appointment-6-time'),
        raises(selenium.common.exceptions.NoSuchElementException)
    )


@step("Appointments table has loaded")
def step_impl(context):
    context.driver.find_by_id('appointment-0-time')
