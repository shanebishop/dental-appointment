from time import sleep
from behave import *
from helper.common import *

use_step_matcher("parse")


@when('Client has logged in with credentials "{username}" "{password}"')
def step_impl(context, username, password):
    login(context, username, password)


@then('Appointment shows date "{date}", time "{time}", hygienist "{hygienist}", operation "{operation}"')
def step_impl(context, date, time, hygienist, operation):
    element_with_id_should_have_text(context, 'selected-appointment-details-card-title', f'{date} {time}')
    element_with_id_should_have_text(context, 'appointment-date', f'Date: {date}')
    element_with_id_should_have_text(context, 'appointment-time', f'Time: {time}')
    element_with_id_should_have_text(context, 'appointment-hygienist', f'Hygienist: {hygienist}')
    element_with_id_should_have_text(context, 'appointment-operation', f'Operation: {operation}')


@step('Appointment shows extra notes "{extra_notes}"')
def step_impl(context, extra_notes):
    element_with_id_should_have_text(
        context, html_id='appointment-extra-notes-content', expected_text=extra_notes)


@step("Appointment details does not show extra notes")
def step_impl(context):
    element_with_id_not_present(context, 'appointment-extra-notes-label')


@step('Appointment shows client "{expected_client_name}"')
def step_impl(context, expected_client_name):
    element_with_id_should_have_text(
        context, html_id='appointment-client-display-name',
        expected_text=f'Client: {expected_client_name}'
    )


@when('User enters "{text}" into element with name "{html_name}"')
def step_impl(context, text, html_name):
    context.driver.find_by_name(html_name).send_keys(text)


@when('User enters "{text}" into element with id "{html_id}"')
def step_impl(context, text, html_id):
    context.driver.find_by_id(html_id).send_keys(text)


@when('User clears text for element with name "{html_name}"')
def step_impl(context, html_name):
    # Note that webElement.clear() does not send any keyboard or mouse events
    context.driver.find_by_name(html_name).clear()


@when('User clears text for element with id "{html_name}"')
def step_impl(context, html_id):
    # Note that webElement.clear() does not send any keyboard or mouse events
    context.driver.find_by_id(html_id).clear()


@step("{seconds} seconds have elapsed")
def step_impl(context, seconds):
    sleep(float(seconds))
