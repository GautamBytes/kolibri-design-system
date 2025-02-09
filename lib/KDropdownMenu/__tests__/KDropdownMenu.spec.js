import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu Visual Tests', () => {
  const snapshotOptions = { 
    widths: [400], 
    minHeight: 512,
    percyCSS: `
      .ui-menu {
        position: static !important;
        display: block !important;
        visibility: visible !important;
      }
    `
  };

  // Simple test case that we know works
  it('renders with a single item', async () => {
    await renderComponent('KButton', {
      text: 'Single Item Dropdown'
    }, {
      menu: {
        element: 'KDropdownMenu',
        elementProps: {
          options: ['Single Option']
        }
      }
    });
    await click('button');
    await takeSnapshot('KDropdownMenu - Single Item', snapshotOptions);
  });

  // Multiple items test following KButton pattern
  it('renders with multiple items', async () => {
    await renderComponent('KButton', {
      text: 'Multiple Items Dropdown'
    }, {
      menu: {
        element: 'KDropdownMenu',
        elementProps: {
          options: [
            'Option 1',
            'Option 2',
            'Option 3'
          ]
        }
      }
    });
    await click('button');
    await takeSnapshot('KDropdownMenu - Multiple Items', snapshotOptions);
  });

  // Icons test following KButton pattern
  it('renders items with icons', async () => {
    await renderComponent('KButton', {
      text: 'Icons Dropdown'
    }, {
      menu: {
        element: 'KDropdownMenu',
        elementProps: {
          options: [
            { label: 'Add', icon: 'add' },
            { label: 'Delete', icon: 'delete' }
          ],
          hasIcons: true
        }
      }
    });
    await click('button');
    await takeSnapshot('KDropdownMenu - With Icons', snapshotOptions);
  });

  // Header slot test following KButton pattern
  it('renders with header slot', async () => {
    await renderComponent('KButton', {
      text: 'Dropdown with Header'
    }, {
      menu: {
        element: 'KDropdownMenu',
        elementProps: {
          options: ['Option 1', 'Option 2']
        },
        slots: {
          header: {
            element: 'div',
            innerHTML: '<h3 style="padding: 8px 16px; margin: 0;">Menu Header</h3>'
          }
        }
      }
    });
    await click('button');
    await takeSnapshot('KDropdownMenu - With Header', snapshotOptions);
  });
});

















