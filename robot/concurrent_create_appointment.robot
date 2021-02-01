*** Settings ***
Documentation    Tests for concurrent creation of appointments for same client with same date.
Library          CustomHelpers/Appointments.py
Resource         common.robot
Variables        variables

*** Test Cases ***
Test Concurrent Appointment Creation For Same Client And Time
    # Setup
    Get Admin Auth Token
    Reset Users    ${AUTH TOKEN}    ${DEREGISTER_URL}    ${GET_ALL_USERS_URL}
    Reset User Data
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    # Run the same keyword several times, since ordering might differ between executions
    Create Appointments Concurrently    ${AUTH TOKEN}    ${APPOINTMENTS_LIST_API_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Create Appointments Concurrently    ${AUTH TOKEN}    ${APPOINTMENTS_LIST_API_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Create Appointments Concurrently    ${AUTH TOKEN}    ${APPOINTMENTS_LIST_API_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Create Appointments Concurrently    ${AUTH TOKEN}    ${APPOINTMENTS_LIST_API_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
    Create Appointments Concurrently    ${AUTH TOKEN}    ${APPOINTMENTS_LIST_API_URL}
    Reset Appointments    ${AUTH TOKEN}    ${APPOINTMENTS_DETAILS_API_URL}    ${APPOINTMENTS_LIST_API_URL}
