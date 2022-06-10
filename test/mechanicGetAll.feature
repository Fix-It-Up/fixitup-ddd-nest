Feature: Get Mechanic with API

  Scenario: Mechanic's information is needed
    Given the endpoint http://localhost:8080/mechanic
    When a get mechanic request is sent
    Then we get an Array with data of all mechanics registered
