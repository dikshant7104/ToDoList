import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const URL = 'http://localhost:5173';
const PLACEHOLDER = 'Enter Your Task';

// Input Component Tests
test.describe('Input Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('renders input and button', async ({ page }) => {
    await expect(page).toHaveTitle('To-Do-App');
    await expect(page.getByPlaceholder('Enter Your Task')).toBeVisible();
    await expect(page.getByRole('button')).toBeVisible();
  });
  test('add a task and clears input on submit', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('Enter Your Task');
    // Create 1st todo.
    await newTodo.fill('Play Football');
    await newTodo.press('Enter');
    // Make sure the list only has one todo item.
    await expect(page.getByText('Play Football')).toBeVisible();
    await expect(newTodo).toHaveValue('');
  });
  test('does not add a task when input is empty', async ({ page }) => {
    // assume tasks are rendered inside a UL as LI; adjust selector if your markup differs
    const listItems = page.locator('ul li');
    const initialCount = await listItems.count();

    const button = page.getByRole('button');
    await button.click();

    // count should remain the same
    await expect(listItems).toHaveCount(initialCount);
  });
});

// List Component Tests
test.describe('List Function', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {
        // no-op
      }
    });
    await page.reload({ waitUntil: 'networkidle' });
  });
  test('renders list of tasks (exists in the DOM)', async ({ page }) => {
    const list = page.locator('[data-testid="list"]');
    // Assert the list element is present in the DOM
    await expect(list).toHaveCount(1);
  });
});

// helper to add a task via the UI

async function addTask({ page }: { page: Page }, text: string) {
  const input = page.getByPlaceholder(PLACEHOLDER);
  await expect(input).toBeVisible();
  await input.fill(text);
  // try submit by Enter then click add button as fallback
  await input.press('Enter').catch(() => {});
  const addBtn = page.getByRole('button').first();
  await addBtn.click();
  await expect(page.getByText(text)).toBeVisible();
  return text;
}

test.describe('Task component (E2E) — edit / complete / delete', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    // ensure clean state
    await page.evaluate(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {
        // no-op
      }
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('edit button enables edit mode and saves updated text', async ({ page }) => {
    const TASK = 'E2E: task to edit';
    const UPDATED = 'E2E: task edited';
    await addTask({ page }, TASK);

    // find the task form container that has the task text
    const taskForm = page.locator('.task-form', { hasText: TASK }).first();
    await expect(taskForm).toBeVisible();

    const editBtn = taskForm.getByRole('button', { name: 'edit' }).first();
    await expect(editBtn).toBeVisible();
    // click edit to shows input
    await editBtn.click();

    const editInput = taskForm.locator('input[type="text"]').first();

    if ((await editInput.count()) === 0) {
      const focused = page.locator('input:focus').first();
      await expect(focused).toBeVisible();
      await focused.fill(UPDATED);
      await focused.press('Enter');
    } else {
      await expect(editInput).toBeVisible();
      await editInput.fill(UPDATED);
      // submit the form by pressing Enter
      await editInput.press('Enter');
    }

    // assert updated text appears and old text is gone
    await expect(page.getByText(UPDATED)).toBeVisible();
    await expect(page.getByText(TASK)).toHaveCount(0);
  });

  test('complete button marks task as completed (renders <s>) and disables edit', async ({
    page,
  }) => {
    const TASK = 'E2E: task to complete';
    await addTask({ page }, TASK);

    const taskForm = page.locator('.task-form', { hasText: TASK }).first();
    await expect(taskForm).toBeVisible();

    const completeBtn = taskForm.getByRole('button', { name: 'complete' }).first();
    await expect(completeBtn).toBeVisible();
    await completeBtn.click();

    // after completing, Task component renders
    const struck = taskForm.locator('s', { hasText: TASK });
    await expect(struck).toBeVisible();

    // edit button should be disabled when completed
    const editBtn = taskForm.getByRole('button', { name: 'edit' }).first();
    // HTML disabled attribute is expected check attribute or property
    const disabledAttr = await editBtn.getAttribute('disabled');
    // either disabled attribute present or button has disabled property (truthy)
    if (disabledAttr === null) {
      // check property instead
      const isDisabled = await editBtn.evaluate((el) => (el as HTMLButtonElement).disabled);
      expect(isDisabled).toBeTruthy();
    } else {
      expect(disabledAttr).not.toBeNull();
    }
  });

  test('delete button removes the task from the list', async ({ page }) => {
    const TASK = 'E2E: task to delete';
    await addTask({ page }, TASK);

    const taskForm = page.locator('.task-form', { hasText: TASK }).first();
    await expect(taskForm).toBeVisible();

    const deleteBtn = taskForm.getByRole('button', { name: 'delete' }).first();
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    // after deletion the task text should not exist
    await expect(page.getByText(TASK)).toHaveCount(0);
  });
});
