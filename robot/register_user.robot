*** Settings ***
Documentation     Tests for staff user registration page.
Library           Collections
Library           SeleniumLibrary    run_on_failure=None
Library           RequestsLibrary
Library           CustomHelpers/BasicAuth.py
Library           CustomHelpers/Users.py
Resource          common.robot
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
    Open Browser    ${LOGIN URL}    ${BROWSER}    service_log_path=${{os.path.devnull}}
    Login Page Should Be Open
    Login As Admin

*** Test Cases ***
Register User Page Can Be Accessed
    Go To Register User Page

# UC3 path 1,2,3,4,5a,6a,7,8,9
Staff Can Register A New Client User
    Go To Register User Page
    Enter User Registration Data    John    Doe    john.doe    john@company.com    1234 Main St.    22    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    # Since registering a user involves sending an email out, and the
    # registration dialog is not displayed unti the email has been sent,
    # we need to wait a while for the dialog to appear
    Wait Until Element Is Visible    register-dialog    40
    Element Text Should Be    register-dialog-msg    Registered john.doe.

# UC3 path 1,2,3,4,5b
Username Cannot Be Reused
    Go To Register User Page
    Enter User Registration Data    John    Doe    john.doe    john@company.com    1234 Main St.    22    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: username john.doe taken

# UC3 path 1,2,3,4,5a,6b
Staff Are Prevented From Entering An Invalid Postal Code
    Go To Register User Page
    Enter User Registration Data    John    Smith    john.smith    johns@company.com    1234 Main St.    22    Toronto    Ontario    A1A 1A12
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: postalCode exceeds max length

# UC3 path 1,2,3,4,5a,6b
Address 1 Value Cannot Be Too Long
    Go To Register User Page
    Enter User Registration Data    John    Smith    john.smith    johns@company.com    ogzsgqbgenhwhyezrquwiokvcnkcihmuiombdwzyqcherqrgolthiazuiutzhkzcalgeqbjuopfglfuvweajfsnyqyjqgflazonqlsvpfidytlpawyrrinmoekivkmpjvnzfcljmdzkenakevzckdotrbyeopddautcvspdnvuhciemhmguddfqejbjdzfbbjpnkvmmog    22    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: address1 exceeds max length

# UC3 path 1,2,3,4,5a,6b
Address 2 Value Cannot Be Too Long
    Go To Register User Page
    Enter User Registration Data    John    Smith    john.smith    johns@company.com    1234 Main St.    ierigkyrcrzyvsvbwdhpdfgvbexwswicimgtsdoqwntggqrsmgrhjsjkhnfvoqwhtbpjxpkrzrpythdbtqeluworputyilowgusxgpmslmefokboppqbkksthybyiwgwmxvsfnmncglkiyxcrhglzmwomkkcqnwujdsnzpfudpyskanubofuqpfwmqrdjjjdzmkjofdvi    Toronto    Ontario    A1A 1A1
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: address2 exceeds max length

# UC3 path 1,2,3,4,5a,6b
City Value Cannot Be Too Long
    Go To Register User Page
    Enter User Registration Data    John    Smith    john.smith    johns@company.com    1234 Main St.    22    yeifdcopytmkwxnivbhqijbczmtawynsgihhhkxwfdifiihzajicngdgytkdwsgtewairlonljduhusfo    Ontario    A1A 1A1
    Click Button    register-btn
    Wait Until Element Is Visible    register-dialog    1
    Element Text Should Be    register-dialog-msg    Error: city exceeds max length

# There is no check for the province being too long, because the province value can
# only be entered by the dropdown
