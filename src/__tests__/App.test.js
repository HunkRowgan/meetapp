import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

//unit tests
describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test("render number of events component", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
  
});

//integration tests
describe('<App /> integration', () => {

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup(); // 1-3 userEvent is set, and the App component and its DOM are mocked.
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search'); // A reference to the CitySearch component root DOM node is initialized, then a query is performed to find the city input text box in it.
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin"); // sim typing berlin
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany'); //sim suggest berlin
    await user.click(berlinSuggestionItem); //sim click berlin

    const EventListDOM = AppDOM.querySelector('#event-list'); //queries #event-list (the EventList component root node DOM), and finds what Event list item is rendered inside
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   

    const allEvents = await getEvents(); //Gets a list of all events from the mock data that are located in “Berlin, Germany”
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length); //Comparing the number of events located in "Berlin, Germany" with the array of rendered Event list items, expecting them to have the same length
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany"); // checks all rendered events have "Berlin, Germany"
    });
  });

  test('selected number of events by the user are rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole('textbox');

    await userEvent.type(NumberOfEventsInput, '{backspace}{backspace}10');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem');
    expect(allRenderedEventItems.length).toEqual(10);
  });

});