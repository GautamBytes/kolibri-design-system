import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu - With Header Slot', () => {
  const snapshotOptions = { widths: [375, 768], minHeight: 512 };
  const dropdownSelector = '[data-test="dropdown-menu"]';

  it('renders with header slot', async () => {
    await renderComponent(
      'KButton',
      { text: 'Open Menu' },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            options: [{ label: 'Item 1' }],
          },
          slots: {
            header: {
              element: 'div',
              innerHTML: 'Header Content',
            },
          },
        },
      },
      dropdownSelector
    );
    await click('button');
    await takeSnapshot('KDropdownMenu - With Header Slot', snapshotOptions);
  });
});
