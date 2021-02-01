Feature: Tests for Sign In page

  Scenario: Valid login should succeed
    Given User is on login page
    When User enters username "admin"
    And User enters password "admin"
    And User submits credentials
    Then Home page should open

  Scenario Outline: Invalid login tests
    Given User is on login page
    When User enters username "<username>"
    And User enters password "<password>"
    And User submits credentials
    Then Failed login dialog contains message "Username or password is incorrect."

    Examples:
      | username | password |
      | invalid  | invalid  |
      | invalid  | admin    |
      | admin    | invalid  |
      | invalid  | whatever |
