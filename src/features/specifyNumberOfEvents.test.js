import { render } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {                                 
        given('the user does not specify the number of events', () => {                                                                      

        });                                                                                                                                  

        let AppComponent
        when('the user sees the entire list of events', () => {
          AppComponent = render(<App/>)
        });

        then('the default number of events is 32', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list')

          await waitFor(() => {
          const EventListItems = within(EventListDOM).queryAllByRole('listitem')
          expect(EventListItems.length).toBe(32)
         })
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {

        let AppComponent
        given('the user sees a list of events', async () => {
            AppComponent = render(<App/>)
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list')

          await waitFor(() => {
          const EventListItems = within(EventListDOM).queryAllByRole('listitem')
          expect(EventListItems.length).toBe(32)
         })
        });

        when('the user changes the number to the desired one', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const input = AppDOM.querySelector('.number-input')
            const user = userEvent.setup()

            await user.type(input, "{backspace}{backspace}10");
        });

        then('the amount changes according to the number selected by the user', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventList = within(AppDOM).queryAllByRole('listitem');
            expect(eventList.length).toEqual(10);
        });
    });
})