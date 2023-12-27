import { render } from '@testing-library/react';
import Event from '../components/Event';
import mockData from "../mock-data";
import userEvent from '@testing-library/user-event';

const singleEvent = mockData[0]

describe ('<Event/> component', () => {
    let EventComponent

    beforeEach(() => {
        EventComponent = render(<Event event={singleEvent}/>)
    })


    test("renders event location", () => {
        expect(EventComponent.queryByText(singleEvent.location)).toBeInTheDocument();
      });

    test("renders event title(summary)", () => {
        expect(EventComponent.queryByText(singleEvent.summary)).toBeInTheDocument();
      }); 

    test("checks if details are hidden", () => {
        expect(EventComponent.container.querySelector('#details')).not.toBeInTheDocument();
      }); 

    test("checks the 'show details' button", () => {
        expect(EventComponent.queryByText("Show details")).toBeInTheDocument();
      });  

    test("checks if 'show details' shows details", async () => {
       const user = userEvent.setup()
       const button = EventComponent.queryByText('Show details')
       await user.click(button)
       const details = EventComponent.container.querySelector('#details')

       expect(details).toBeInTheDocument()
    })

    test("checks if 'hide details' hides details", async () => {
        const button = EventComponent.queryByText('Hide details')
        const details = EventComponent.container.querySelector('#details')
        await userEvent.click(button)

        expect(details).not.toBeInTheDocument()
     })

})
