*** Settings ***
Documentation    Tests for Complete Registration page.
Library          SeleniumLibrary    run_on_failure=None
Library          CustomHelpers/Users.py
Resource         common.robot
Variables        variables
Suite Setup      Setup
Suite Teardown   Close Browser

*** Keywords ***
Setup
    Log    Browser: ${BROWSER}    INFO    console=True
    Log    Browser options: ${BROWSER OPTS}    INFO    console=True
    Log    Server: ${SERVER}    INFO    console=True
    Get Admin Auth Token
    Delete All Nonadmin Users    ${AUTH TOKEN}    ${DEREGISTER_URL}    ${GET_ALL_USERS_URL}
    Open Browser    ${LOGIN_URL}    ${BROWSER}    service_log_path=${{os.path.devnull}}
    Login As Admin

Complete Registration
    [Arguments]    ${username}    ${token}    ${password}    ${confirm_password}
    Go To    ${COMPLETE_REGISTRATION_URL}
    Location Should Be    ${COMPLETE_REGISTRATION_URL}
    Wait Until Element Is Visible    username    2
    Input Text    username    ${username}
    Input Text    register-token       ${token}
    Input Text    password    ${password}
    Input Text    password-confirm    ${confirm_password}
    Click Button    submit-btn

Staff Completes Initial Registration For Client
    [Arguments]    ${username}
    Go To Login Page
    Login As Admin
    Go To    ${REGISTER_URL}
    Enter User Registration Data    John    Doe    ${username}    john@company.com    1234 Main St    Appt 4    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    # Since registering a user involves sending an email out, and the
    # registration dialog is not displayed unti the email has been sent,
    # we need to wait a while for the dialog to appear
    Wait Until Element Is Visible    register-dialog    40
    Element Text Should Be    register-dialog-msg    Registered ${username}.

*** Test Cases ***
# UC4 path 1,2,3,4,5a,6a,7a,8a,9,10
Client Can Be Fully Registered
    Staff Completes Initial Registration For Client    user1
    ${token}=    Get Register Token    user1
    Complete Registration    user1    ${token}    password1    password1
    Wait Until Location Is    ${LOGIN_URL}    4
    Login    user1    password1

# UC4 path 1,2,3,4,5a,6b
Completing Registration Fails If Username Is Invalid
    Staff Completes Initial Registration For Client    user2
    ${token}=    Get Register Token    user2
    Complete Registration    unregistered    ${token}    password1    password1
    Wait Until Element Is Visible    confirm-dialog    2
    Element Text Should Be    confirm-dialog-msg    Invalid username/password.

# UC4 path 1,2,3,4,5a,6a,7a,8b
Completing Registration Fails If Registration Token Is Invalid
    # Initial registration completed for user2 in previous test case
    Complete Registration    user2    invalid-token    password1    password1
    Wait Until Element Is Visible    confirm-dialog    2
    Element Text Should Be    confirm-dialog-msg    Error: provided registration token is invalid

# UC4 path 1,2,3,4,5b
Completing Registration Fails If Passwords Do Not Match
    # Initial registration completed for user2 in a previous test case
    ${token}=    Get Register Token    user2
    Complete Registration    user2    ${token}    password1    password-does-not-match
    Wait Until Element Is Visible    confirm-dialog    2
    Element Text Should Be    confirm-dialog-msg    Passwords do not match.
    # Confirm we stayed on the complete registration page
    Location Should Be    ${COMPLETE_REGISTRATION_URL}

# UC4 path 1,2,3,4,5a,6a,7b
Completing Registration Fails If User Does Not Have Incomplete Registration Status
    # bobb is already fully registered
    Complete Registration    bobb    we-have-no-token    password1    password1
    Wait Until Element Is Visible    confirm-dialog    2
    Element Text Should Be    confirm-dialog-msg    Invalid username/password.
