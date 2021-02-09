*** Settings ***
Documentation    Tests for updating appointments in the frontend.
Library          SeleniumLibrary    run_on_failure=None
Library          CustomHelpers/Users.py
Library          CustomHelpers/Appointments.py
Resource         common.robot
Variables        variables
Suite Setup      Suite Setup
Suite Teardown   Suite Teardown

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

Suite Teardown
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Close Browser

Check Appointment Data Fields
    [Arguments]    ${date}    ${time}    ${username}    ${hygienist}    ${operation}    ${extra_notes}
    Element Attribute Value Should Be    date    value    ${date}
    Element Attribute Value Should Be    time    value    ${time}
    Element Attribute Value Should Be    client    value    ${username}
    Element Attribute Value Should Be    hygienist    value    ${hygienist}
    Element Attribute Value Should Be    extra_notes    value    ${extra_notes}
    List Selection Should Be    operation-dropdown    ${operation}

Press Submit Button
    Click Button    submit-btn

Dialog Shows Message
    [Arguments]    ${message}
    Wait Until Element Is Visible    edit-appointment-dialog    2
    Element Text Should Be    edit-appointment-dialog-msg    ${message}
    Click Button    edit-appointment-dialog-btn

Dialog Shows Success
    Dialog Shows Message    Appointment updated.

*** Test Cases ***
Edit Appointment Fields Are Populated Correctly
    # Test for first appointment
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Check Appointment Data Fields    2021-05-23    14:30:00    bobb    Cheryl Holder    Checkup    Yearly checkup
    # Test for second appointment
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-1-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Check Appointment Data Fields    2021-06-03    10:00:00    bobb    Tonya Combs    Fillings    ${EMPTY}

# UC7 path 1,2,3,4,5a,6a,7a,8a,9a,10
Staff Can Update Appointments
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Check Appointment Data Fields    2021-05-23    14:30:00    bobb    Cheryl Holder    Checkup    Yearly checkup
    # Update fields and submit
    Enter Appointment Data    2021-05-22    10:00:00    bobb    Tonya Combs    Cosmetic surgery    Test notes
    Press Submit Button
    Dialog Shows Success
    # Verify changes were successful
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Appointment Shows Details    2021-05-22    10:00:00    Tonya Combs    Cosmetic surgery
    Appointment Details Shows Extra Notes    Test notes
    Appointment Shows Client    Bob Buchanan

# UC7 path 1,2,3,4,5a,6b
Updating Fails When Date Is Invalid
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Input Text    date    foo
    Press Submit Button
    Dialog Shows Message    Error: Date 'foo' does not match YYYY-MM-DD format

# UC7 path 1,2,3,4,5a,6a,7b
Updating Fails When Time Is Invalid
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Input Text    time    foo
    Press Submit Button
    Dialog Shows Message    Error: Time 'foo' does not match either HH:MM:SS or HH:MM

# UC7 path 1,2,3,4,5b
Updating Fails When Username Is Not Registered
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Input Text    client    notindb
    Press Submit Button
    Dialog Shows Message    Error: No user found with username "notindb"

# UC7 path 1,2,3,4,5a,6a,7a,8a,9b
Updating Fails When New Time Would Conflict With Another Appointment
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Input Text    date    2021-06-03
    Input Text    time    10:00:00
    Press Submit Button
    Dialog Shows Message    Error: Time and date conflict with an existing appointment for this client

# UC7 path 1,2,3,4,5a,6a,7a,8b
Updating Fails When Client Is Changed
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    Click Element    appointment-0-time
    Click Button    update-appointment-btn
    Location Should Be    ${EDIT_APPOINTMENT_URL}
    Input Text    client    jamesg
    Press Submit Button
    Dialog Shows Message    Error: Cannot change client for an appointment
