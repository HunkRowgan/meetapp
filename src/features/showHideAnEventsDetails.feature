Feature: Show/Hide Event Details
 Scenario: An event element is collapsed by default
   Given the user opens the application
   When the list of events loads
   Then all events will colapse by default
 Scenario: User can expand an event to see its details
   Given the user sees a list of events
   When the user clicks on the button to get the details
   Then details are displayed
 Scenario: User can collapse an event to hide details
   Given details are displayed for the user
   When the user clicks on the button to hide the details
   Then details are hidden