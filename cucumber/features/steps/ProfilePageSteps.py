from behave import *
from helper.urls import *

use_step_matcher("re")


@step("User is on Profile page")
def step_impl(context):
    context.driver.open(PROFILE_URL)
    context.driver.location_should_be(PROFILE_URL)
