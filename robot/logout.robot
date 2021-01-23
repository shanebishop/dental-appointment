*** Settings ***
Documentation    Tests for logout.
Library          SeleniumLibrary    run_on_failure=None
Resource         common.robot
Variables        variables
Suite Setup      Suite Setup
Suite Teardown   Close Browser

*** Keywords ***
Suite Setup
    Log    Browser: ${BROWSER}    INFO    console=True
    Log    Browser options: ${BROWSER OPTS}    INFO    console=True
    Log    Server: ${SERVER}    INFO    console=True
    Open Browser    ${LOGIN_URL}    ${BROWSER}    service_log_path=${{os.path.devnull}}

*** Test Cases ***
Logout
    # Log in
    Login As Admin
    # Check localStorage values are set
    ${user_token}=    Execute Javascript    return localStorage.getItem('user-token');
    Log    User token is ${user_token}    INFO    console=True
    # We must use $var instead of ${var} to get the actual variable in the correct type
    # See https://robotframework.org/robotframework/latest/libraries/BuiltIn.html#Using%20variables for details
    Should Be True    $user_token is not None
    # Here we need to use Object.prototype.hasOwnProperty() because for the admin user (although not for clients),
    # it is legal for the user to have no user data, in which case the user-data value will be null (or None in python)
    ${user_data_key_exists}=    Execute Javascript    return Object.prototype.hasOwnProperty.call(localStorage, 'user-data');
    Log    User data key exists: ${user_data_key_exists}    INFO    console=True
    Should Be True    $user_data_key_exists
    # Log out
    Click Element    navbar-dropdown
    Click Element    sign-out-dropdown-item
    Wait Until Location Is    ${LOGOUT_URL}
    # Check localStorage was cleared
    ${user_token_key_exists}=    Execute Javascript    Object.prototype.hasOwnProperty.call(localStorage, 'user-token')
    Should Not Be True    $user_token_key_exists
    ${user_data_key_exists}=    Execute Javascript    Object.prototype.hasOwnProperty.call(localStorage, 'user-data')
    Should Not Be True    $user_data_key_exists
