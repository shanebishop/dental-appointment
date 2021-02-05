@database-reset-required
Feature: Tests for staff User Registration page

  Scenario: Staff members can register new client users
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Doe" "john.doe" "john@company.com" "1234 Main St." "22" "Toronto" "Ontario" "A1A 1A1"
    # Since registering a user involves sending an email out, and the
    # registration dialog is not displayed until the email has been sent,
    # we need to wait a while for the dialog to appear
    And 7 seconds have elapsed
    Then Registration dialog should display message "Registered john.doe."

  Scenario: Username cannot be reused
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Doe" "john.doe" "john@company.com" "1234 Main St." "22" "Toronto" "Ontario" "A1A 1A1"
    Then Registration dialog should display message "Error: username john.doe taken"

  Scenario: Staff members are prevented from entering an invalid postal code
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Smith" "john.smith" "john@company.com" "1234 Main St." "22" "Toronto" "Ontario" "A1A 1A12"
    Then Registration dialog should display message "Error: postalCode exceeds max length"

  Scenario: Address 1 value cannot be too long
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Smith" "john.smith" "john@company.com" "ierigkyrcrzyvsvbwdhpdfgvbexwswicimgtsdoqwntggqrsmgrhjsjkhnfvoqwhtbpjxpkrzrpythdbtqeluworputyilowgusxgpmslmefokboppqbkksthybyiwgwmxvsfnmncglkiyxcrhglzmwomkkcqnwujdsnzpfudpyskanubofuqpfwmqrdjjjdzmkjofdvi" "22" "Toronto" "Ontario" "A1A 1A1"
    Then Registration dialog should display message "Error: address1 exceeds max length"

  Scenario: Address 2 value cannot be too long
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Smith" "john.smith" "john@company.com" "1234 Main St." "ierigkyrcrzyvsvbwdhpdfgvbexwswicimgtsdoqwntggqrsmgrhjsjkhnfvoqwhtbpjxpkrzrpythdbtqeluworputyilowgusxgpmslmefokboppqbkksthybyiwgwmxvsfnmncglkiyxcrhglzmwomkkcqnwujdsnzpfudpyskanubofuqpfwmqrdjjjdzmkjofdvi" "Toronto" "Ontario" "A1A 1A1"
    Then Registration dialog should display message "Error: address2 exceeds max length"

  Scenario: City value cannot be too long
    When Staff member is logged in
    And Staff member is on User Registration page
    And Staff member enters user registration data "John" "Smith" "john.smith" "john@company.com" "1234 Main St." "22" "yeifdcopytmkwxnivbhqijbczmtawynsgihhhkxwfdifiihzajicngdgytkdwsgtewairlonljduhusfo" "Ontario" "A1A 1A1"
    Then Registration dialog should display message "Error: city exceeds max length"

  # There is no check for the province being too long, because the province value can
  # only be entered by the dropdown
