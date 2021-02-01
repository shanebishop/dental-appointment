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

  Scenario: Sign in button initially disabled
    Given User is on login page
    Then Element with name sign-in-btn is disabled

  Scenario: Sign in button should be disabled if password is not set
    Given User is on login page
    When User enters username "foo"
    Then Element with name sign-in-btn is disabled

  Scenario: Sign in button should be disabled if username is not set
    Given User is on login page
    When User enters password "foo"
    Then Element with name sign-in-btn is disabled

  Scenario: Sign in button should be enabled if username and password set
    Given User is on login page
    When User enters username "foo"
    And User enters password "bar"
    Then Element with name sign-in-btn is enabled
