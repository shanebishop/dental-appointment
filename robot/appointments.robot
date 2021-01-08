*** Settings ***
Documentation    Tests for Appointments page.
Library          SeleniumLibrary    run_on_failure=None
Library          CustomHelpers/Users.py
Library          CustomHelpers/Appointments.py
Resource         common.robot
Variables        variables
Suite Setup      Suite Setup
Suite Teardown   Close Browser
Test Teardown    Test Teardown

*** Keywords ***
Suite Setup
    Log    Browser: ${BROWSER}    INFO    console=True
    Log    Browser options: ${BROWSER OPTS}    INFO    console=True
    Log    Server: ${SERVER}    INFO    console=True
    Get Admin Auth Token
    Reset Users    ${AUTH TOKEN}    ${DEREGISTER_URL}    ${GET_ALL_USERS_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Open Browser    ${LOGIN_URL}    ${BROWSER}    service_log_path=${{os.path.devnull}}

Test Teardown
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}

Full Appointments Are Displayed Chronologically
    Location Should Be    ${APPOINTMENTS_URL}
    Element Text Should Be    appointment-0-time    2021-05-23 14:30:00
    Element Text Should Be    appointment-1-time    2021-06-03 10:00:00
    Element Text Should Be    appointment-2-time    2021-06-03 10:00:00
    Element Text Should Be    appointment-3-time    2021-06-03 11:15:00
    Element Text Should Be    appointment-4-time    2021-07-14 16:10:00
    Element Text Should Be    appointment-5-time    2021-08-07 15:20:00
    # Check there are no additional appointments
    Element Should Not Be Visible    appointment-6-time

Appointment Shows Details
    [Arguments]    ${date}    ${time}    ${hygienist}    ${operation}
    Element Text Should Be    selected-appointment-details-card-title    ${date} ${time}
    Element Text Should Be    appointment-date    Date: ${date}
    Element Text Should Be    appointment-time    Time: ${time}
    Element Text Should Be    appointment-hygienist    Hygienist: ${hygienist}
    Element Text Should Be    appointment-operation    Operation: ${operation}

Appointment Details Shows Extra Notes
    [Arguments]    ${extra_notes}
    Element Should Be Visible    appointment-extra-notes-label
    Element Text Should Be    appointment-extra-notes-content    ${extra_notes}

Appointment Details Does Not Show Extra Notes
    Element Should Not Be Visible    appointment-extra-notes-label

*** Test Cases ***
# TODO Uncomment
Staff Appointments Are Displayed Chronologically
    Login As Admin
    Go To Appointments Page
    Full Appointments Are Displayed Chronologically

Client Bob's Appointments Are Displayed Chronologically
    Login As Client    bobb    bobb
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    # Check all of bobb's appointments are displayed chronologically
    Element Text Should Be    appointment-0-time    2021-05-23 14:30:00
    Element Text Should Be    appointment-1-time    2021-06-03 10:00:00
    Element Text Should Be    appointment-2-time    2021-06-03 11:15:00
    # Check there are no additional appointments
    Element Should Not Be Visible    appointment-3-time

Client Ruth's Appointments Are Displayed Chronologically
    Login As Client    ruthm    ruthm
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    # Check all of ruthm's appointments are displayed chronologically
    Element Text Should Be    appointment-0-time    2021-06-03 10:00:00
    Element Text Should Be    appointment-1-time    2021-08-07 15:20:00
    # Check there are no additional appointments
    Element Should Not Be Visible    appointment-2-time

Client Message Is Displayed If Client Has No Appointments
    Login As Client    martinm    martinm
    Go To Appointments Page
    Wait Until Element Is Visible    no-appointments-paragraph    1
    Element Text Should Be    no-appointments-paragraph    No appointments

Server Message Is Displayed If No Appointments
    Delete All Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Login As Admin
    Go To Appointments Page
    Wait Until Element Is Visible    no-appointments-paragraph    1
    Element Text Should Be    no-appointments-paragraph    No appointments

Client View Appointment Details
    Login As Client    bobb    bobb
    Go To Appointments Page
    Wait Until Element Is Visible    appointment-0-time    2
    # Check second appointment in display
    Click Element    appointment-1-time
    Appointment Shows Details    2021-06-03    10:00:00    Tonya Combs    Fillings
    Appointment Details Does Not Show Extra Notes
    # Check no buttons were rendered, since this is a client
    Element Should Not Be Visible    cancel-appointment-btn
    Element Should Not Be Visible    update-appointment-btn
    # Check first appointment in display
    Click Element    appointment-0-time
    Appointment Shows Details    2021-05-23    14:30:00    Cheryl Holder    Checkup
    Appointment Details Shows Extra Notes    Yearly checkup
    # Check third appointment in display
    Click Element    appointment-2-time
    Appointment Shows Details    2021-06-03    11:15:00    Tonya Combs    Fillings
    Appointment Details Does Not Show Extra Notes
    # Check clicking on third appointment again works fine
    Click Element    appointment-2-time
    Appointment Shows Details    2021-06-03    11:15:00    Tonya Combs    Fillings
    Appointment Details Does Not Show Extra Notes

## More stuff, since there are buttons to confirm are rendered
#Staff View Appointment Details

