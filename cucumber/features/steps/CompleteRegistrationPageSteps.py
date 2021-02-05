import os
import shlex
import subprocess
import sys

from behave import *
from helper.urls import *
from hamcrest import *

use_step_matcher("parse")


@step("Client goes to Complete Registration page")
def step_impl(context):
    context.driver.open(COMPLETE_REGISTRATION_URL)
    context.driver.location_should_be(COMPLETE_REGISTRATION_URL)


@step('Client "{username}" sets register token correctly')
def step_impl(context, username):
    # Get registration token from Django database
    token = get_register_token(username)

    # Set username on page
    context.driver.set_text_of_el_with_name('register-token', token)


def get_register_token(username):
    this_file_path = os.path.dirname(os.path.realpath(__file__))
    register_token_path = os.path.realpath(
        os.path.join(this_file_path, '..', '..', '..', 'robot', 'CustomHelpers', 'get_register_token.py')
    )

    cmd = f"sh -c 'docker exec -i -e '\\''USERNAME={username}'\\'' backend backend/manage.py shell < " \
          f"{register_token_path}'"

    # 'universal_newlines' is replaced with 'text' in python 3.7, but I'm using 3.6
    process = subprocess.Popen(
        shlex.split(cmd), stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    stdout, stderr = process.communicate()

    if process.returncode != 0:
        print(stderr, file=sys.stderr)
        raise Exception(f'docker exec command had non-zero exit code {process.returncode}')

    return stdout.rstrip()


@then("Location should become Login page within 4 seconds")
def step_impl(context):
    context.driver.wait_until_location_is(LOGIN_URL, 4)


@step('Client can login with credentials "{username}" "{password}"')
def step_impl(context, username, password):
    context.driver.set_text_of_el_with_name('username', username)
    context.driver.set_text_of_el_with_name('password', password)
    context.driver.find_by_name('sign-in-btn').click()
    context.driver.wait_until_location_is('http://localhost/', 0.5)


@then('Complete registration dialog should display message "{expected_message}"')
def step_impl(context, expected_message):
    context.driver.find_by_name('confirm-dialog')
    actual_message = context.driver.find_by_name('confirm-dialog-msg').text

    assert_that(actual_message, equal_to(expected_message))
