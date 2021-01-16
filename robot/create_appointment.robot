*** Settings ***
Documentation    Tests for creating appointments in the frontend.
Library          SeleniumLibrary    run_on_failure=None
Library          CustomHelpers/Users.py
Library          CustomHelpers/Appointments.py
Resource         common.robot
Variables        variables
Suite Setup      Suite Setup
Suite Teardown   Close Browser

*** Keywords ***
Suite Setup
    Log    Browser: ${BROWSER}    INFO    console=True
    Log    Browser options: ${BROWSER OPTS}    INFO    console=True
    Log    Server: ${SERVER}    INFO    console=True
    Get Admin Auth Token
    Reset Users    ${AUTH TOKEN}    ${DEREGISTER_URL}    ${GET_ALL_USERS_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Open Browser    ${LOGIN_URL}    ${BROWSER}    service_log_path=${{os.path.devnull}}
    Login As Admin

Test Teardown
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}

Press Submit Button
    Click Button    submit-btn

Dialog Shows Message
    [Arguments]    ${message}
    Wait Until Element Is Visible    edit-appointment-dialog    2
    Element Text Should Be    edit-appointment-dialog-msg    ${message}
    Click Button    edit-appointment-dialog-btn

Dialog Shows Success
    Dialog Shows Message    Appointment created.

*** Test Cases ***
Staff Can Create Appointment
    Go To Create Appointment Page
    Enter Appointment Data    2021-05-13    11:15    bobb    Tonya Combs    Fillings    2 fillings
    Press Submit Button
    Dialog Shows Success
    Appointment Exists    ${AUTH TOKEN}    2021-05-13    11:15    bobb    ${APPOINTMENTS_LIST_API_URL}
    Test Teardown

Error Message Is Displayed If Date Is Invalid
    Go To Create Appointment Page
    Enter Appointment Data    foo    11:15    bobb    Tonya Combs    Fillings    2 fillings
    Press Submit Button
    Dialog Shows Message    Error: Date 'foo' does not match YYYY-MM-DD format

Error Message Is Displayed If Time Is Invalid
    Go To Create Appointment Page
    Enter Appointment Data    2021-05-13    foo    bobb    Tonya Combs    Fillings    2 fillings
    Press Submit Button
    Dialog Shows Message    Error: Time 'foo' does not match either HH:MM:SS or HH:MM

Error Message Is Displayed If Username Is Not Registered
    Go To Create Appointment Page
    Enter Appointment Data    2021-05-13    11:15    notindb    Tonya Combs    Fillings    2 fillings
    Press Submit Button
    Dialog Shows Message    Error: No user found with username "notindb"

Appointment Cannot Be Created If It Would Conflict With Another Appointment
    Go To Create Appointment Page
    Enter Appointment Data    2021-05-23    14:30    bobb    Tonya Combs    Fillings    2 fillings
    Press Submit Button
    Dialog Shows Message    Error: Time and date conflict with an existing appointment for this client
