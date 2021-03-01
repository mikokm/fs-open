describe('Blog app', function () {
  const testUser = {
    name: 'tester',
    username: 'testuser',
    password: 'testpassword'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()
      cy.contains('logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(testUser)
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()
      cy.contains('test title')
      cy.contains('test author')
    })

    it('Blogs are sorted by likes', function () {
      cy.createBlog({
        title: 'blog 1',
        author: 'author',
        url: 'url',
        likes: 0,
      })
      cy.createBlog({
        title: 'blog 2',
        author: 'author',
        url: 'url',
        likes: 2,
      })
      cy.createBlog({
        title: 'blog 3',
        author: 'author',
        url: 'url',
        likes: 1,
      })

      cy.get('#blogs').within(() => {
        cy.get('div').eq(0).contains('blog 1')
        cy.get('div').eq(1).contains('blog 3')
        cy.get('div').eq(2).contains('blog 2')

        cy.get('div').eq(1).contains('view').click()
        cy.contains('likes: 1')
        cy.get('button').contains('like').click()
        cy.contains('likes: 2')
        cy.get('button').contains('like').click()
        cy.contains('likes: 3')
      })

      // Check that the ordering changed.
      cy.visit('http://localhost:3000')
      cy.get('#blogs').within(() => {
        cy.get('div').eq(0).contains('blog 1')
        cy.get('div').eq(1).contains('blog 2')
        cy.get('div').eq(2).contains('blog 3')
      })
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.login(testUser)
        cy.createBlog({
          title: 'blog 0',
          author: 'author',
          url: 'url',
          likes: 0,
        })
      })

      it('A blog can be liked', function () {
        cy.contains('blog 0')
        cy.contains('view').click()
        cy.contains('likes: 0')
        cy.contains('like').click()
        cy.contains('likes: 1')
        cy.contains('like').click()
        cy.contains('likes: 2')
      })

      it('A blog can be removed', function () {
        cy.contains('blog 0')
        cy.contains('remove').click()
        cy.contains('Removed blog blog 0')
      })
    })
  })
})
