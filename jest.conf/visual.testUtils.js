import percySnapshot from '@percy/puppeteer';

/**
 * Renders a Vue component within the VisualTestingPlayground.
 *
 * @param {string} component - The name of the Vue component to render.
 * @param {Object} props - The props to pass to the component.
 * @param {Object} [slots={}] - An object representing the slots to pass to the component.
 */
export async function renderComponent(component, props, slots = {}) {
  // Capture the initial state of the testing playground.
  const beforeRenderState = await page.evaluate(() => {
    const testing_playground = document.querySelector('#testing-playground');
    return testing_playground ? testing_playground.innerHTML : '';
  });

  // Trigger rendering via postMessage.
  await page.evaluate(
    ({ component, props, slots }) => {
      window.postMessage(
        {
          type: 'RENDER_COMPONENT',
          component: component,
          props: props,
          slots: slots,
        },
        '*'
      );
    },
    { component, props, slots }
  );
  await page.waitForSelector('#testing-playground');

  // For KDropdownMenu, use a known selector from Keen's UI Menu.
  // Adjust the selector as needed (e.g., it might be '.ui-menu', '.keen-ui-menu', or a data attribute).
  const knownSelector =
    component === 'KDropdownMenu'
      ? '.ui-menu, .keen-ui-menu, [data-test="dropdown-menu"]'
      : null;

  if (knownSelector) {
    // Wait for the known dropdown element to appear.
    await page.waitForSelector(knownSelector, { timeout: 30000 });
  } else {
    // Wait until the innerHTML of the testing playground changes.
    await page.waitForFunction(
      initialState => {
        const testing_playground = document.querySelector('#testing-playground');
        return testing_playground && testing_playground.innerHTML !== initialState;
      },
      { timeout: 30000 },
      beforeRenderState
    );
  }

  // Verify that the component has been rendered.
  const isComponentRendered = await page.evaluate(
    (initialState, knownSelector) => {
      const testing_playground = document.querySelector('#testing-playground');
      const knownElement = knownSelector ? document.querySelector(knownSelector) : null;
      return (testing_playground && testing_playground.innerHTML !== initialState) || !!knownElement;
    },
    beforeRenderState,
    knownSelector
  );

  global.expect(isComponentRendered).toBe(true);
}

/**
 * Captures a visual snapshot using Percy.
 *
 * @param {string} name - Snapshot name.
 * @param {Object} [options={}] - Options such as widths, minHeight, etc.
 */
export async function takeSnapshot(name, options = {}) {
  if (process.env.VISUAL_TESTING === 'true') {
    await percySnapshot(page, name, options);
  }
}

export async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const click = async selector => {
  await page.locator(selector).click();
};

export const hover = async selector => {
  await page.locator(selector).hover();
};

export const scrollToPos = async (selector, scrollOptions) => {
  await page.locator(selector).scroll(scrollOptions);
};

export const waitFor = async selector => {
  await page.locator(selector).wait();
};

