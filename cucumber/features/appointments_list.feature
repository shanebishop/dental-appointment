Feature: Tests for Appointments page

  Scenario: Staff appointments are displayed chronologically
    When Staff member is logged in
    And User is on Appointments page
    Then Full appointments are displayed chronologically

  Scenario: Client Bob's appointments are displayed chronologically
    When Client has logged in with credentials "bobb" "bobb"
    And User is on Appointments page
    And Appointments table has loaded
    # Check all of bobb's appointments are displayed chronologically
    Then Element with ID "appointment-0-time" should have text "2021-05-23 14:30:00"
    And Element with ID "appointment-1-time" should have text "2021-06-03 10:00:00"
    And Element with ID "appointment-2-time" should have text "2021-06-03 11:15:00"
    # Check there are no additional appointments
    And No element should exist with ID "appointment-3-time"

  Scenario: Client Ruth's appointments are displayed chronologically
    When Client has logged in with credentials "ruthm" "ruthm"
    And User is on Appointments page
    And Appointments table has loaded
    # Check all of ruthm's appointments are displayed chronologically
    Then Element with ID "appointment-0-time" should have text "2021-06-03 10:00:00"
    Then Element with ID "appointment-1-time" should have text "2021-08-07 15:20:00"
    # Check there are no additional appointments
    And No element should exist with ID "appointment-2-time"

  Scenario: Client message is displayed if client has no appointments
    When Client has logged in with credentials "martinm" "martinm"
    And User is on Appointments page
    Then Element with ID "no-appointments-paragraph" should have text "No appointments"

  Scenario: Clients can view appointment details
    When Client has logged in with credentials "bobb" "bobb"
    And User is on Appointments page
    And Appointments table has loaded
    # Check second appointment in display
    And User clicks on element with ID "appointment-1-time"
    Then Appointment shows date "2021-06-03", time "10:00:00", hygienist "Tonya Combs", operation "Fillings"
    And Appointment details does not show extra notes
    # Check no buttons were rendered, since this is a client
    And No element should exist with name "cancel-appointment-btn"
    And No element should exist with name "update-appointment-btn"
    # Check first appointment in display
    When User clicks on element with ID "appointment-0-time"
    Then Appointment shows date "2021-05-23", time "14:30:00", hygienist "Cheryl Holder", operation "Checkup"
    And Appointment shows extra notes "Yearly checkup"
    # Check third appointment in display
    When User clicks on element with ID "appointment-2-time"
    Then Appointment shows date "2021-06-03", time "11:15:00", hygienist "Tonya Combs", operation "Fillings"
    And Appointment details does not show extra notes
    # Check clicking on third appointment again works fine
    When User clicks on element with ID "appointment-2-time"
    Then Appointment shows date "2021-06-03", time "11:15:00", hygienist "Tonya Combs", operation "Fillings"
    And Appointment details does not show extra notes

  Scenario: Staff members can view appointment details
    When Staff member is logged in
    And User is on Appointments page
    And Appointments table has loaded
    # Check first appointment in display
    And User clicks on element with ID "appointment-0-time"
    Then Appointment shows date "2021-05-23", time "14:30:00", hygienist "Cheryl Holder", operation "Checkup"
    And Appointment shows extra notes "Yearly checkup"
    # Check staff buttons are visible
    And Element with name "cancel-appointment-btn" is visible
    And Element with name "update-appointment-btn" is visible
    # Check fourth appointment in display
    When User clicks on element with ID "appointment-3-time"
    Then Appointment shows date "2021-06-03", time "11:15:00", hygienist "Tonya Combs", operation "Fillings"
    And Appointment shows client "Bob Buchanan"
    And Appointment details does not show extra notes

  Scenario: Staff members can filter displayed appointments by client name
    When Staff member is logged in
    And User is on Appointments page
    And Appointments table has loaded
    Then Element with name "filter-input" is visible
    # Filter by "bob", expect three appointments
    When User enters "bob" into element with name "filter-input"
    Then Element with ID "appointment-0-time" should have text "2021-05-23 14:30:00"
    And Element with ID "appointment-1-time" should have text "2021-06-03 10:00:00"
    And Element with ID "appointment-2-time" should have text "2021-06-03 11:15:00"
    And No element should exist with ID "appointment-3-time"
    # Clearing filter should display all appointments
    When User clears text for element with name "filter-input"
    Then Full appointments are displayed chronologically
    # Filter by "billy", expect no appointments
    When User enters "billy" into element with name "filter-input"
    Then Element with id "no-appointments-paragraph" should have text "No appointments for filter"

  Scenario: Filter text field is not displayed for clients
    When Client has logged in with credentials "bobb" "bobb"
    And User is on Appointments page
    And Appointments table has loaded
    Then No element should exist with name "filter-input"

  # No scenario for cancel appointments because behave (and cucumber in general)
  # lacks a way to define setup and teardown code separately for each feature
