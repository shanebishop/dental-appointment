from behave import *
from helper.common import *

use_step_matcher("re")


@step("Staff member is on Clients page")
def step_impl(context):
    context.driver.open(CLIENTS_URL)
    context.driver.location_should_be(CLIENTS_URL)


@step("Clients table has loaded")
def step_impl(context):
    context.driver.find_by_id('client|key=bobb|name=username')


@then("Location should become Profile page within 2 seconds")
def step_impl(context):
    context.driver.wait_until_location_is(PROFILE_URL, 2)
