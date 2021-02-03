"""
Provides common helper functions used by the various cucumber steps.
"""

import selenium
from hamcrest import *

from .urls import *


def login(context, username, password):
    """Logs a user in. This can only be called when on the login page."""

    # Go to login page
    context.driver.open(LOGIN_URL)

    # Login page should be open
    assert_that(context.driver.location(), equal_to(LOGIN_URL))

    # Enter username and password
    context.driver.find_by_name('username').send_keys(username)
    context.driver.find_by_name('password').send_keys(password)

    # Click sign in button
    context.driver.find_by_name('sign-in-btn').click()

    # Confirm login was successful
    context.driver.wait_until_location_is('http://localhost/', 1)


def login_as_admin(context):
    login(context, 'admin', 'admin')


def element_with_id_should_have_text(context, html_id=None, expected_text=None):
    actual_text = context.driver.find_by_id(html_id).text
    assert_that(expected_text, equal_to(actual_text))


def element_with_name_should_have_text(context, html_name=None, expected_text=None):
    actual_text = context.driver.find_by_name(html_name).text
    assert_that(expected_text, equal_to(actual_text))


def element_with_id_not_present(context, html_id):
    assert_that(
        calling(context.driver.driver().find_element_by_id).with_args(html_id),
        raises(selenium.common.exceptions.NoSuchElementException)
    )


def element_with_name_not_present(context, html_name):
    assert_that(
        calling(context.driver.driver().find_element_by_name).with_args(html_name),
        raises(selenium.common.exceptions.NoSuchElementException)
    )
