@database-reset-required
Feature: Tests for updating appointments

  Scenario: Staff members can update appointments
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    #Then Lo
