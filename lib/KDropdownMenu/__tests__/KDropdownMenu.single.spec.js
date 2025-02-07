import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu - Single Item', () => {
  const snapshotOptions = { widths: [375, 768], minHeight: 512 };
  // Known selector for the dropdown menu (adjust if needed)
  const dropdownSelector = '[data-test="dropdown-menu"]';

  it('renders with a single item', async () => {
    await renderComponent(
      'KButton',
      { text: 'Open Menu' },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            options: [{ label: 'Single Item' }],
          },
        },
      },
      dropdownSelector
    );
    // Simulate a click to open the dropdown.
    await click('button');
    await takeSnapshot('KDropdownMenu - Single Item', snapshotOptions);
  });
});












