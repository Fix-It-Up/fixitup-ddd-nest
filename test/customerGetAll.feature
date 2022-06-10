Feature: Get Customer with API

  Scenario: Customer's information is needed
    Given the endpoint http://localhost:8080/customer
    When a get customer request is sent
    Then we get an Array with data of all customers registered
