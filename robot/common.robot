*** Settings ***
Documentation    A set of common keywords used by multiple Robot test suites.
Library          Collections
Library          RequestsLibrary
Library          CustomHelpers/Users.py
Library          CustomHelpers/BasicAuth.py

*** Keywords ***
Login
    [Documentation]   Logs a user in. This can only be called when on the login page.
    [Arguments]    ${username}    ${password}
    Login Page Should Be Open
    Input Text    username    ${username}
    Input Text    password    ${password}
    Click Button    sign-in-btn
    Wait Until Location Is    ${HOME_URL}    2

Login As Admin
    Go To    ${LOGIN_URL}
    Login    admin    admin

Login As Client
    [Arguments]    ${username}    ${password}
    Go To    ${LOGIN_URL}
    Login    ${username}    ${password}

Go To Login Page
    Go To    ${LOGIN_URL}
    Login Page Should Be Open

Go To Register User Page
    Go To    ${REGISTER_URL}
    Location Should Be    ${REGISTER_URL}

Go To Appointments Page
    Go To   ${APPOINTMENTS_URL}
    Location Should Be    ${APPOINTMENTS_URL}

Go To Create Appointment Page
    Go To    ${EDIT_APPOINTMENT_URL}
    Location Should Be    ${EDIT_APPOINTMENT_URL}

Go To Profile Page
    Go To   ${PROFILE_URL}
    Location Should Be    ${PROFILE_URL}

Login Page Should Be Open
    Location Should Be    ${LOGIN_URL}

Get Admin Auth Token
    ${basic auth}=    Generate Basic Auth    admin    admin
    Create Session    session    ${SERVER}
    # The /api/auth/login/ endpoint uses knox, and knox expects an `email` key, rather than a `username` key
    &{data}=        Create dictionary   email=admin  password=admin
    ${headers}=     Create dictionary   Authorization=${basic auth}
    ${resp}=    Post request    session      /api/auth/login/     json=${data}    headers=${headers}
    Status Should Be    200     ${resp}
    Dictionary Should Contain Key   ${resp.json()}      token
    ${temp auth token}=      Get From Dictionary    ${resp.json()}   token
    Set Suite Variable      ${AUTH TOKEN}   ${temp auth token}

Enter User Registration Data
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

Enter Appointment Data
    [Arguments]    ${date}    ${time}    ${username}    ${hygienist}    ${operation}    ${extra_notes}
    Input Text    date    ${date}
    Input Text    time    ${time}
    Input Text    client    ${username}
    Input Text    hygienist    ${hygienist}
    Select From List By Label    operation-dropdown    ${operation}
    Input Text    extra_notes    ${extra_notes}

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

Appointment Shows Client
    [Arguments]    ${client_display_name}
    Element Text Should Be    appointment-client-display-name    Client: ${client_display_name}
