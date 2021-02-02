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
    raise NotImplementedError(u'STEP: Then Full appointments are displayed chronologically')
