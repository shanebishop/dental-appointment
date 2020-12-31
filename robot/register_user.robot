*** Settings ***
Documentation     Tests for staff user registration page.
Library           Collections
Library           SeleniumLibrary    run_on_failure=None
Library           RequestsLibrary
Library           CustomHelpers/BasicAuth.py
Library           CustomHelpers/Users.py
Variables         variables
Suite Setup       Setup
Suite Teardown    Close Browser

*** Keywords ***
Setup
    Log    Browser: ${BROWSER}    INFO    console=True
    Log    Browser options: ${BROWSER OPTS}    INFO    console=True
    Log    Server: ${SERVER}    INFO    console=True
    Get Admin Auth Token
    Delete All Nonadmin Users    ${AUTH TOKEN}    ${DEREGISTER_URL}    ${GET_ALL_USERS_URL}
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Login Page Should Be Open
    Login

Get Admin Auth Token
    ${basic auth}=    Generate Basic Auth    admin    admin
    Create Session    session    ${SERVER}
    &{data}=        Create dictionary   email=admin  password=admin
    ${headers}=     Create dictionary   Authorization=${basic auth}
    ${resp}=    Post request    session      /api/auth/login/     json=${data}    headers=${headers}
    Status Should Be    200     ${resp}
    Dictionary Should Contain Key   ${resp.json()}      token
    ${temp auth token}=      Get From Dictionary    ${resp.json()}   token
    Set Suite Variable      ${AUTH TOKEN}   ${temp auth token}

Login
    Input Text    email    admin
    Input Text    password    admin
    Click Button    sign-in-btn
    Wait Until Location Is    ${HOME_URL}    2

Go To Login Page
    Go To    ${LOGIN_URL}
    Login Page Should Be Open

Login Page Should Be Open
    Location Should Be    ${LOGIN_URL}

Go To Register User Page
    Go To    ${REGISTER_URL}
    Location Should Be    ${REGISTER_URL}

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
Register User Page Can Be Accessed
    Go To Register User Page

Staff Can Register A New Client User
    Go To Register User Page
    Enter Registration Data    John    Doe    john.doe    john@company.com    1234 Main St.    22    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Registered john.doe.

Username Cannot Be Reused
    Go To Register User Page
    Enter Registration Data    John    Doe    john.doe    john@company.com    1234 Main St.    22    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: username john.doe taken

Staff Are Prevented From Entering An Invalid Postal Code
    Go To Register User Page
    Enter Registration Data    John    Smith    john.smith    johns@company.com    1234 Main St.    22    Toronto    Ontario    A1A 1A12
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: postalCode exceeds max length
