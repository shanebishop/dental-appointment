from hamcrest import *


SERVER = 'http://localhost'

# Frontend URLs
HOME_URL = f'{SERVER}/'
LOGIN_URL = f'{SERVER}/auth/sign-in'
LOGOUT_URL = f'{SERVER}/auth/sign-out'
REGISTER_URL = f'{SERVER}/register-user'
COMPLETE_REGISTRATION_URL = f'{SERVER}/auth/complete-registration'
APPOINTMENTS_URL = f'{SERVER}/appointments/'
EDIT_APPOINTMENT_URL = f'{SERVER}/edit-appointment'
PROFILE_URL = f'{SERVER}/profile'
CLIENTS_URL = f'{SERVER}/clients'

# API URLs
DEREGISTER_URL = f'{SERVER}/api/user/deregister/'
GET_ALL_USERS_URL = f'{SERVER}/api/user/all/'
APPOINTMENTS_DETAILS_API_URL = f'{SERVER}/api/appointments/detail/'
APPOINTMENTS_LIST_API_URL = f'{SERVER}/api/appointments/list/'


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
