Feature: Tests for Clients page

  Scenario: Data on Clients page is displayed correctly
    When Staff member is logged in
    And Staff member is on Clients page
    And Clients table has loaded
    # Check each row in the table has correct data
    Then Element with ID "client|key=bobb|name=username" should have text "bobb"
    And Element with ID "client|key=bobb|name=first_name" should have text "Bob"
    And Element with ID "client|key=bobb|name=last_name" should have text "Buchanan"
    And Element with ID "client|key=frankb|name=username" should have text "frankb"
    And Element with ID "client|key=frankb|name=first_name" should have text "Frank"
    And Element with ID "client|key=frankb|name=last_name" should have text "Brandt"
    And Element with ID "client|key=jamesg|name=username" should have text "jamesg"
    And Element with ID "client|key=jamesg|name=first_name" should have text "James"
    And Element with ID "client|key=jamesg|name=last_name" should have text "Good"
    And Element with ID "client|key=martinm|name=username" should have text "martinm"
    And Element with ID "client|key=martinm|name=first_name" should have text "Martin"
    And Element with ID "client|key=martinm|name=last_name" should have text "Meza"
    And Element with ID "client|key=rebeccag|name=username" should have text "rebeccag"
    And Element with ID "client|key=rebeccag|name=first_name" should have text "Rebecca"
    And Element with ID "client|key=rebeccag|name=last_name" should have text "Garcia"
    And Element with ID "client|key=ruthm|name=username" should have text "ruthm"
    And Element with ID "client|key=ruthm|name=first_name" should have text "Ruth"
    And Element with ID "client|key=ruthm|name=last_name" should have text "Murray"

  # UC11 (only one possible path)
  Scenario: Staff members can view client profiles
    When Staff member is logged in
    And Staff member is on Clients page
    And Clients table has loaded
    And User clicks on element with ID "client|key=bobb|name=view-profile"
    Then Location should become Profile page within 2 seconds
    When Client profile has loaded
    Then Element with ID "username-lbl" should have text "Username: bobb"
    And Element with ID "display-name-lbl" should have text "Display name: Bob Buchanan"
    And Element with ID "firstName" should have value "Bob"
    And Element with ID "lastName" should have value "Buchanan"
    And Element with ID "email" should have value "honours.proj.dental@gmail.com"
    And Element with ID "address" should have value "89 Thurston Dr"
    And Element with ID "address2" should have value "Appt 23"
    And Element with ID "city" should have value "Ottawa"
    And Element with ID "province" should have value "Ontario"
    And Element with ID "postalCode" should have value "K1P 5G8"
