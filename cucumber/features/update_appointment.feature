@database-reset-required
Feature: Tests for updating appointments

  Scenario: Edit appointment fields are populated correctly
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    And Appointment fields have data "2021-05-23" "14:30:00" "bobb" "Cheryl Holder" "Checkup" "Yearly checkup"

  # UC7 path 1,2,3,4,5a,6a,7a,8a,9a,10
  Scenario: Staff members can update appointments
    When Staff member is logged in
    And User is on Appointments page
    And Appointments table has loaded
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    And Appointment fields have data "2021-05-23" "14:30:00" "bobb" "Cheryl Holder" "Checkup" "Yearly checkup"
    # Update fields and submit
    When Staff member enters appointment data "2021-05-22" "10:00:00" "bobb" "Tonya Combs" "Cosmetic surgery" "Test notes"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Appointment updated."
    # Verify changes were successful
    When User is on Appointments page
    And Appointments table has loaded
    And User clicks on element with ID "appointment-0-time"
    Then Appointment shows date "2021-05-22", time "10:00:00", hygienist "Tonya Combs", operation "Cosmetic surgery"
    And Appointment shows extra notes "Test notes"
    And Appointment shows client "Bob Buchanan"

  # UC7 path 1,2,3,4,5a,6b
  Scenario: Updating fails when date is invalid
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    When User sets text for element with name "date" to "foo"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Date 'foo' does not match YYYY-MM-DD format"

  # UC7 path 1,2,3,4,5a,6a,7b
  Scenario: Updating fails when time is invalid
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    When User sets text for element with name "time" to "foo"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Time 'foo' does not match either HH:MM:SS or HH:MM"

  # UC7 path 1,2,3,4,5b
  Scenario: Updating fails when username is not registered
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    When User sets text for element with name "client" to "notindb"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: No user found with username "notindb""

  # UC7 path 1,2,3,4,5a,6a,7a,8a,9b
  Scenario: Updating fails when new time would conflict with another appointment
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    When User sets text for element with name "date" to "2021-06-03"
    And User sets text for element with name "time" to "10:00:00"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Time and date conflict with an existing appointment for this client"

  # UC7 path 1,2,3,4,5a,6a,7a,8b
  Scenario: Updating fails when client in changed
    When Staff member is logged in
    And User is on Appointments page
    And User clicks on element with ID "appointment-0-time"
    And User clicks on element with name "update-appointment-btn"
    Then User is on Edit Appointment page
    When User sets text for element with name "client" to "jamesg"
    And User clicks on element with name "submit-btn"
    Then Edit appointment dialog shows message "Error: Cannot change client for an appointment"
