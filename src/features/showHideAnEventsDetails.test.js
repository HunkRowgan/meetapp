import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { render, waitFor, within } from '@testing-library/react';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {

        let AppComponent
        given('the user opens the application', () => {
            AppComponent = render(<App/>)
        });

        when('the list of events loads', async () => {
            const AppDOM = AppComponent.container.firstChild
            const EventListDOM = AppDOM.querySelector('#event-list')

            await waitFor(() => {
             const EventListItems = within(EventListDOM).queryAllByRole('listitem')
             expect(EventListItems.length).toBe(32)
            })
        });

        then('all events will colapse by default', () => {
            const EventDOM = AppComponent.container.firstChild
            const details = EventDOM.querySelector('#details')
            expect(details).not.toBeInTheDocument()
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {

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

        when('the user clicks on the button to get the details', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const button = AppDOM.querySelector('.details-btn')
            const user = userEvent.setup()

            await user.click(button)
        });

        then('details are displayed', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('#details')
            expect(details).toBeInTheDocument()
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        let AppComponent
        given('details are displayed for the user', async() => {
          AppComponent = render(<App/>)
          const AppDOM = AppComponent.container.firstChild;
          const EventListDOM = AppDOM.querySelector('#event-list')

          await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem')
            expect(EventListItems.length).toBe(32)
           })

          const button = AppDOM.querySelector('.details-btn');
          await userEvent.click(button);

          const details = AppDOM.querySelector('#details')
          expect(details).toBeInTheDocument()         

        });

        when('the user clicks on the button to hide the details', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const button = AppDOM.querySelector('.details-btn');
            const user = userEvent.setup()

            await user.click(button)
        });

        then('details are hidden', () => {
            const AppDOM = AppComponent.container.firstChild;
            const details = AppDOM.querySelector('#details')
            expect(details).not.toBeInTheDocument()
        });
    });
});