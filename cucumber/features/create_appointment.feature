@database-reset-required
Feature: Tests for creating appointments in the frontend

  # UC8 path 1,2,3,4,5a,6a,7a,8a,9
  Scenario: Staff members can create appointments
    When Staff member is logged in
    And Staff member is on Create Appointment page
    And Staff member enters appointment data "2021-05-13" "11:15" "bobb" "Tonya Combs" "Fillings" "2 fillings"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Appointment created."

  # UC8 path 1,2,3,4,5a,6b
  Scenario: Error message is displayed if date is invalid
    When Staff member is logged in
    And Staff member is on Create Appointment page
    And Staff member enters appointment data "foo" "11:15" "bobb" "Tonya Combs" "Fillings" "2 fillings"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Date 'foo' does not match YYYY-MM-DD format"

  # UC8 path 1,2,3,4,5a,6a,7b
  Scenario: Error message is displayed if time is invalid
    When Staff member is logged in
    And Staff member is on Create Appointment page
    And Staff member enters appointment data "2021-05-14" "foo" "bobb" "Tonya Combs" "Fillings" "2 fillings"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Time 'foo' does not match either HH:MM:SS or HH:MM"

  # UC8 path 1,2,3,4,5b
  Scenario: Error message is displayed if username is not registered
    When Staff member is logged in
    And Staff member is on Create Appointment page
    And Staff member enters appointment data "2021-05-14" "11:15" "notindb" "Tonya Combs" "Fillings" "2 fillings"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: No user found with username "notindb""

  # UC8 path 1,2,3,4,5a,6a,7a,8b
  Scenario: Appointment cannot be created if it would conflict with another appointment
    When Staff member is logged in
    And Staff member is on Create Appointment page
    And Staff member enters appointment data "2021-05-23" "14:30" "bobb" "Tonya Combs" "Fillings" "2 fillings"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Time and date conflict with an existing appointment for this client"
