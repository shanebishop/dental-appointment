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
    Open Browser    ${LOGIN_URL}    ${BROWSER}
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
    Go To    ${REGISTER_URL}
    Enter Registration Data    John    Doe    ${username}    john@company.com    1234 Main St    Appt 4    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    # Since registering a user involves sending an email out, and the
    # registration dialog is not displayed unti the email has been sent,
    # we need to wait a while for the dialog to appear
    Wait Until Element Is Visible    register-dialog    40
    Element Text Should Be    register-dialog-msg    Registered ${username}.

Enter Registration Data
    [Arguments]    ${first_name}    ${surname}    ${username}    ${email}    ${address1}    ${address2}    ${city}    ${province}    ${postal_code}
    Input Text    first-name    ${first_name}
    Input Text    surname    ${surname}
    Input Text    username    ${username}
    Input Text    email    ${email}
    Input Text    address    ${address1}
    Input Text    address2    ${address2}
    Input Text    city    ${city}
    Input Text    postal-code    ${postal_code}
    Select From List By Label    province    ${province}

*** Test Cases ***
Client Can Be Fully Registered
    Staff Completes Initial Registration For Client    user1
    ${token}=    Get Register Token    user1
    Complete Registration    user1    ${token}    password1    password1
    Login Page Should Be Open
    Login    user1    password1
