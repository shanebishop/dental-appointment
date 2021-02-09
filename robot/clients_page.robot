*** Settings ***
Documentation    Tests for Clients page.
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
    Login As Admin

*** Test Cases ***
Data On Clients Page Is Displayed Correctly
    Go To Clients Page
    Wait Until Element Is Visible    client|key=bobb|name=username    2
    # Check each row in the table has correct data
    Element Text Should Be    client|key=bobb|name=username    bobb
    Element Text Should Be    client|key=bobb|name=first_name    Bob
    Element Text Should Be    client|key=bobb|name=last_name    Buchanan
    Element Text Should Be    client|key=frankb|name=username    frankb
    Element Text Should Be    client|key=frankb|name=first_name    Frank
    Element Text Should Be    client|key=frankb|name=last_name    Brandt
    Element Text Should Be    client|key=jamesg|name=username    jamesg
    Element Text Should Be    client|key=jamesg|name=first_name    James
    Element Text Should Be    client|key=jamesg|name=last_name    Good
    Element Text Should Be    client|key=martinm|name=username    martinm
    Element Text Should Be    client|key=martinm|name=first_name    Martin
    Element Text Should Be    client|key=martinm|name=last_name    Meza
    Element Text Should Be    client|key=rebeccag|name=username    rebeccag
    Element Text Should Be    client|key=rebeccag|name=first_name    Rebecca
    Element Text Should Be    client|key=rebeccag|name=last_name    Garcia
    Element Text Should Be    client|key=ruthm|name=username    ruthm
    Element Text Should Be    client|key=ruthm|name=first_name    Ruth
    Element Text Should Be    client|key=ruthm|name=last_name    Murray

# UC11 (only one possible path)
Staff Can View Client Profile
    Go To Clients Page
    Wait Until Element Is Visible    client|key=bobb|name=username    2
    Click Button    client|key=bobb|name=view-profile
    Wait Until Location Is    ${PROFILE_URL}    2
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
