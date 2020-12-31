*** Settings ***
Documentation   Tests for staff user registration page.
Library         SeleniumLibrary
Suite Setup     Login
Suite Teardown  Close Browser

*** Variables ***
${SERVER}           http://localhost
${BROWSER}          Firefox
${HOME URL}         ${SERVER}/
${LOGIN URL}        ${SERVER}/auth/sign-in
${REGISTER URL}     ${SERVER}/register-user

*** Keywords ***
Login
    Open Browser To Login Page
    Input Text    email     admin
    Input Text    password  admin
    Click Button    sign-in-btn
    Wait Until Location Is      ${HOME URL}     2

Open Browser To Login Page
    Log     Browser: ${BROWSER}                 INFO    console=True
    Log     Browser options: ${BROWSER OPTS}    INFO    console=True
    Log     Server: ${SERVER}                   INFO    console=True
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Login Page Should Be Open

Login Page Should Be Open
    Location Should Be    ${LOGIN URL}

Go To Register User Page
    Go To   ${REGISTER URL}
    Location Should Be  ${REGISTER URL}

*** Test Cases ***
Register User Page Can Be Accessed
    Go To Register User Page
