Feature: Tests for Appointments page

  Scenario: Staff appointments are displayed chronologically
    When Staff member is logged in
    And User is on Appointments page
    Then Full appointments are displayed chronologically
