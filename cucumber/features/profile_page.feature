Feature: Tests for Profile page

  Scenario: Contact information is not displayed for admin user
    When User logs in with username "admin" and password "admin"
    And User is on Profile page
    Then Element with ID "username-lbl" should have text "Username: admin"
    And Element with ID "display-name-lbl" should have text "Display name: admin"
    And No element should exist with ID "contact-info-card"

  Scenario: Client information is displayed for client
    When Client has logged in with credentials "bobb" "bobb"
    And User is on Profile page
    And Client profile has loaded
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
