*** Settings ***
Documentation    Tests for Sign In page.
Library          SeleniumLibrary    run_on_failure=None
Variables        variables
Suite Setup      Open Browser To Login Page
Suite Teardown   Close Browser

*** Variables ***
${VALID USER}    admin
${VALID PASSWORD}    admin

*** Keywords ***
Open Browser To Login Page
    Log     Browser: ${BROWSER}                 INFO    console=True
    Log     Browser options: ${BROWSER OPTS}    INFO    console=True
    Log     Server: ${SERVER}                   INFO    console=True
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Login Page Should Be Open

Login Page Should Be Open
    Location Should Be    ${LOGIN URL}

Go To Login Page
    Go To    ${LOGIN URL}
    Login Page Should Be Open

Input Username
    [Arguments]    ${username}
    Input Text    username    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    sign-in-btn

Home Page Should Be Open
    Wait Until Location Is    ${HOME URL}   2

Invalid Login Should Fail
    [Arguments]     ${username}     ${password}
    Go To Login Page
    Input Username    ${username}
    Input Password    ${password}
    Submit Credentials
    Wait Until Element Is Visible   failed-login-dialog     5
    Element Text Should Be  login-err-msg   Username or password is incorrect.

*** Test Cases ***
Valid Login Should Succeed
    Go To Login Page
    Input Username    ${VALID USER}
    Input Password    ${VALID PASSWORD}
    Submit Credentials
    Home Page Should Be Open

Invalid Login Tests
    [Template]  Invalid Login Should Fail
    invalid         invalid
    invalid         ${VALID PASSWORD}
    ${VALID USER}   invalid
    invalid         whatever

Sign In Button Initially Disabled
    Go To Login Page
    Element Should Be Disabled  sign-in-btn

Sign In Button Should Be Disabled If Password Is Not Set
    Go To Login Page
    Input Username  foo
    Element Text Should Be  password    ${EMPTY}
    Element Should Be Disabled  sign-in-btn

Sign In Button Should Be Disabled If Username Is Not Set
    Go To Login Page
    Input Password  foo
    Element Text Should Be  username    ${EMPTY}
    Element Should Be Disabled  sign-in-btn

Sign In Button Should Be Enabled If Username And Password Set
    Go To Login Page
    Input Username  foo
    Input Password  bar
    Element Should Be Enabled  sign-in-btn

Clearing Username Should Disable Sign In Button
    Pass Execution If   '${BROWSER}' == 'Headless Chrome'   Skipping
    Go To Login Page
    Input Username  foo
    Input Password  bar
    Element Should Be Enabled  sign-in-btn
    Input Username  ${EMPTY}
    Element Should Be Disabled  sign-in-btn

Clearing Password Should Disable Sign In Button
    Pass Execution If   '${BROWSER}' == 'Headless Chrome'   Skipping
    Go To Login Page
    Input Username  foo
    Input Password  bar
    Element Should Be Enabled  sign-in-btn
    Input Password  ${EMPTY}
    Element Should Be Disabled  sign-in-btn
