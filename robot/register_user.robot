*** Settings ***
Documentation     Tests for staff user registration page.
Library           SeleniumLibrary    run_on_failure=None
Suite Setup       Setup
Suite Teardown    Close Browser

*** Variables ***
${SERVER}         http://localhost
${BROWSER}        Firefox
${HOME URL}       ${SERVER}/
${LOGIN URL}      ${SERVER}/auth/sign-in
${REGISTER URL}    ${SERVER}/register-user

*** Keywords ***
Setup
    Log    Browser: ${BROWSER}    INFO    console=True
    Log    Browser options: ${BROWSER OPTS}    INFO    console=True
    Log    Server: ${SERVER}    INFO    console=True
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Login Page Should Be Open
    Login

Login
    Input Text    email    admin
    Input Text    password    admin
    Click Button    sign-in-btn
    Wait Until Location Is    ${HOME URL}    2

Go To Login Page
    Go To    ${LOGIN URL}
    Login Page Should Be Open

Login Page Should Be Open
    Location Should Be    ${LOGIN URL}

Go To Register User Page
    Go To    ${REGISTER URL}
    Location Should Be    ${REGISTER URL}

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
