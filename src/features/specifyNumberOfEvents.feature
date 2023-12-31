Feature: Specify Number of Events
 Scenario: When user hasn’t specified a number, 32 events are shown by default
   Given the user does not specify the number of events
   When the user sees the entire list of events
   Then the default number of events is 32
 Scenario: User can change the number of events displayed.
   Given the user sees a list of events
   When the user changes the number to the desired one
   Then the amount changes according to the number selected by the user