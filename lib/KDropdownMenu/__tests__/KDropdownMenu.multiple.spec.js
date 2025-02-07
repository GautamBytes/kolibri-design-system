import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu - Multiple Items', () => {
  const snapshotOptions = { widths: [375, 768], minHeight: 512 };
  const dropdownSelector = '[data-test="dropdown-menu"]';

  it('renders with multiple items', async () => {
    await renderComponent(
      'KButton',
      { text: 'Open Menu' },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            options: [
              { label: 'Item 1' },
              { label: 'Item 2' },
              { label: 'Item 3' },
            ],
          },
        },
      },
      dropdownSelector
    );
    await click('button');
    await takeSnapshot('KDropdownMenu - Multiple Items', snapshotOptions);
  });
});
