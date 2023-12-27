#meetapp - an events based serverless App built in React (Create-React-App) which allows users to find  events in different cities. The application uses the Google Calendar API to fetch upcoming events.

##User Stories:
2. As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.
3. As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
4. As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
5. As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.
6. As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

##Scenarios:
2. Given a user has loaded event details for a particular city
When the user clicks the minimise icon
Then the user sees a minimised version of the event
3. Given a user has loaded the events for a particular city
When the user clicks the "Events per Page" Icon
Then the user is shown only the number of events corresponding to the number that they clicked on
4. Given a user has already loaded the app in the past AND they are offline
When the user opens the app
Then display the events they had previously loaded
5. Given a user has downloaded the app
When the user adds the app to homepage
Then display the app icon in homepage and open the app upon clicking on the icon
6. Given a user has selected a particular city
When the user clicks on "Show Events Calendar"
Then display a calendar view with the upcoming events for the next 14 days

Serverless functions will be used (AWS Lambda) to interact with the authorisation server and the calendar API.