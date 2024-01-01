import NumberOfEvents from'../components/NumberOfEvents'
import { render } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

describe ('<NumberOfEvents/> component', () => {
   let NumberOfEventsComponent

   beforeEach(() => {
    NumberOfEventsComponent = render(
    <NumberOfEvents
    setCurrentNOE={() => {}}
    setErrorAlert={() => {}}
    />)
   })

   test('has input field', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox')
    expect(input).toBeInTheDocument()
   })

   test('default number is 32', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox')
    expect(input.value).toBe('32')
   })

   test("updates number of events when user types", async () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    await userEvent.type(input, "{backspace}{backspace}10");
    expect(input).toHaveValue("10");
  });
})