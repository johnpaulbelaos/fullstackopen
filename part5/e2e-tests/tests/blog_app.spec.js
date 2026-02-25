const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Steve Rogers',
        username: 'captain',
        password: 'vibranium'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'captain', 'vibranium')
      await expect(page.getByText('captain logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'captain', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'captain', 'vibranium')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Blog', 'John Blog', 'blog.com')
      await expect(page.getByText('Blog John Blog')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'Blog', 'John Blog', 'blog.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'likes' }).click()
      await expect(page.getByText('1')).toBeVisible()
    })

    test.only('blog can be deleted', async ({ page }) => {
      await createBlog(page, 'Blog', 'John Blog', 'blog.com')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()
      const locator = page.getByText('blogs')
      await expect(locator).not.toContainText('Blog John Blog');
    })
  })
})