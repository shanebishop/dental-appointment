@database-reset-required
Feature: Tests for updating appointments

  # TODO Add edit appointment fields populated correctly scenario here

  Scenario: Staff members can update appointments
    # Test for first appointment
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    And Appointment fields have data "2021-05-23" "14:30:00" "bobb" "Cheryl Holder" "Checkup" "Yearly checkup"
    # Test for second appointment
    # TODO Add tests for second appointmenet
