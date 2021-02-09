@database-reset-required
Feature: Tests for Complete Registration page

  # UC4 path 1,2,3,4,5a,6a,7a,8a,9,10
  Scenario: Client can be fully registered
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Doe" "user1" "john@company.com" "1234 Main St" "Appt 4" "Toronto" "Ontario" "A1A 1A1"
    And Client goes to Complete Registration page
    And User sets text for element with name "username" to "user1"
    And Client "user1" sets register token correctly
    And User sets text for element with name "password" to "password1"
    And User sets text for element with name "password-confirm" to "password1"
    And User clicks on element with name "submit-btn"
    Then Location should become Login page within 4 seconds
    And Login fields have loaded
    And Client can login with credentials "user1" "password1"

  # UC4 path 1,2,3,4,5a,6b
  Scenario: Completing registration fails if username is invalid
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Doe" "user2" "john@company.com" "1234 Main St" "Appt 4" "Toronto" "Ontario" "A1A 1A1"
    And Client goes to Complete Registration page
    # Note this username does not match the username the user registered with
    And User sets text for element with name "username" to "unregistered"
    And Client "user2" sets register token correctly
    And User sets text for element with name "password" to "password1"
    And User sets text for element with name "password-confirm" to "password1"
    And User clicks on element with name "submit-btn"
    Then Complete registration dialog should display message "Invalid username/password."

  # UC4 path 1,2,3,4,5a,6a,7a,8b
  Scenario: Completing registration fails if registration token is invalid
    # Initial registration completed for user2 in previous scenario
    When Client goes to Complete Registration page
    And User sets text for element with name "username" to "user2"
    And User sets text for element with name "register-token" to "invalid-token"
    And User sets text for element with name "password" to "password1"
    And User sets text for element with name "password-confirm" to "password1"
    And User clicks on element with name "submit-btn"
    Then Complete registration dialog should display message "Error: provided registration token is invalid"

  # UC4 path 1,2,3,4,5b
  Scenario: Completing registration fails if passwords do not match
    # Initial registration completed for user2 in a previous scenario
    When Client goes to Complete Registration page
    And User sets text for element with name "username" to "user2"
    And Client "user2" sets register token correctly
    And User sets text for element with name "password" to "password1"
    And User sets text for element with name "password-confirm" to "password-does-not-match"
    And User clicks on element with name "submit-btn"
    Then Complete registration dialog should display message "Passwords do not match."

  # UC4 path 1,2,3,4,5a,6a,7b
  Scenario: Completing registration fails if user does not have incomplete registration status
    # bobb is already fully registered
    When Client goes to Complete Registration page
    And User sets text for element with name "username" to "bobb"
    And User sets text for element with name "register-token" to "we-have-no-token"
    And User sets text for element with name "password" to "password1"
    And User sets text for element with name "password-confirm" to "password1"
    And User clicks on element with name "submit-btn"
    Then Complete registration dialog should display message "Invalid username/password."
