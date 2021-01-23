*** Settings ***
Documentation    Tests for Profile page.
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
    Reset User Data
    Open Browser    ${LOGIN_URL}    ${BROWSER}    service_log_path=${{os.path.devnull}}

*** Test Cases ***
Contact Information Is Not Displayed For Admin User
    Login As Admin
    Go To Profile Page
    Element Text Should Be    username-lbl    Username: admin
    Element Text Should Be    display-name-lbl    Display name: admin
    Element Should Not Be Visible    contact-info-card

Contact Information Is Displayed For Client
    Login As Client    bobb    bobb
    Go To Profile Page
    Wait Until Element Is Visible    firstName    2
    Element Text Should Be    username-lbl    Username: bobb
    Element Text Should Be    display-name-lbl    Display name: Bob Buchanan
    Element Attribute Value Should Be    firstName    value    Bob
    Element Attribute Value Should Be    lastName    value    Buchanan
    Element Attribute Value Should Be    email    value    honours.proj.dental@gmail.com
    Element Attribute Value Should Be    address    value    89 Thurston Dr
    Element Attribute Value Should Be    address2    value     Appt 23
    Element Attribute Value Should Be    city   value    Ottawa
    Element Attribute Value Should Be    province    value    Ontario
    Element Attribute Value Should Be    postalCode    value    K1P 5G8
