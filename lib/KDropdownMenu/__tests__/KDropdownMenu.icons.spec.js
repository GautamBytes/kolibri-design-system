import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu - Items with Icons', () => {
  const snapshotOptions = { widths: [375, 768], minHeight: 512 };
  const dropdownSelector = '[data-test="dropdown-menu"]';

  it('renders items with icons', async () => {
    await renderComponent(
      'KButton',
      { text: 'Open Menu' },
      {
        menu: {
          element: 'KDropdownMenu',
          elementProps: {
            hasIcons: true,
            options: [
              { label: 'Item 1', icon: 'add' },
              { label: 'Item 2', icon: 'remove' },
            ],
          },
        },
      },
      dropdownSelector
    );
    await click('button');
    await takeSnapshot('KDropdownMenu - Items with Icons', snapshotOptions);
  });
});
