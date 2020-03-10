/// <reference types="Cypress" />
// with the above statement you'll get intellisense in vscode
// and be able to hover over commands for docs

describe('TodoMVC - React', function () {
  // avoid hard-coding test data
  // why? readablity, maintainability, flexiblity
  const TODO_ITEM_ONE = 'buy some cheese'
  const TODO_ITEM_TWO = 'feed the cat'
  const TODO_ITEM_THREE = 'book a doctors appointment'

  context('No Todos', function () {
      it('should hide #main and #footer', function () {
        cy.visit('http://localhost:8888')
        // using class selectors makes this really easy to understand, right?
        cy.get('.new-todo')
        // `have` is a chainable getter
        // it's optional and strictly for aesthetics
        // `attr` is provided in the docs
        // see https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery
          .should('have.attr', 'placeholder', 'What needs to be done?')
        cy.get('.todo-list li')
          .should('not.exist')
        cy.get('.main')
          .should('not.exist')
        cy.get('.footer')
          .should('not.exist')
      })
    })

  context('New Todo', function () {

      it('add two todo items', function () {
        cy.visit('http://localhost:8888')
        // create 1st todo
        cy.get('.new-todo')
          // use the `type` command to...type
          .type(TODO_ITEM_ONE)
          // the command supports keyboard keys
          // typing the enter key separately
          // yields better debugging in the runner
          .type('{enter}')

        // make sure the 1st label contains the 1st todo text
        // use `eq` and `find` commands instead of
        // cy.get('.todo-list li:nth-child(1) label')
        // first get all the todos
        cy.get('.todo-list li')
          // select the first element from an array of elements
          .eq(0)
          // the first element is passed on as the subject
          // `find` is like `get` but within the scope of the subject
          .find('label')
          // https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery
          .should('contain', TODO_ITEM_ONE)

        // create 2nd todo
        cy.get('.new-todo')
          .type(TODO_ITEM_TWO)
          .type('{enter}')

        // make sure the 2nd label contains the 2nd todo text
        cy.get('.todo-list li')
          .eq(1)
          .find('label')
          .should('contain', TODO_ITEM_TWO)
      })

      it('adds items, items left count', function () {
        cy.visit('http://localhost:8888')
        // create several todos then check the number of items in the list
        cy.get('.new-todo')
          .type('todo A{enter}')
          .type('todo B{enter}') // we can continue working with same element
          .type('todo C{enter}') // and keep adding new items
          .type('todo D{enter}')

        cy.get('.todo-list li')
          // https://docs.cypress.io/guides/references/assertions.html#Length
          .should('have.length', 4)

        // even though the text content is split across
        // multiple <span> and <strong> elements
        // `cy.contains` can verify this correctly
        cy.get('.todo-count')
          .contains('4 items left')
      })

      it('when an item is added, clear text input field, show #main and #footer', function () {
        cy.visit('http://localhost:8888')

        cy.get('.new-todo')
          .type(TODO_ITEM_ONE)
          .type('{enter}')

        cy.get('.new-todo')
          // for precision, use `text` instead of `contain`
          .should('have.text', '')
        cy.get('.main')
          // https://docs.cypress.io/guides/references/assertions.html#Visibility
          .should('be.visible')
        cy.get('.footer')
          .should('be.visible')
      })

    })

  context('Checking off (completing) todos', function () {

    it('complete and uncomplete items, view completed', function () {
      cy.visit('http://localhost:8888')

      cy.get('.new-todo')
        .type(TODO_ITEM_ONE)
        .type('{enter}')

      cy.get('.new-todo')
        .type(TODO_ITEM_TWO)
        .type('{enter}')

      cy.get('.todo-list li')
        .eq(0)
        .find('.toggle')
        // use `check` command
        // for `input` of type `checkbox` or `radio`
        .check()

      cy.get('.todo-list li')
        .eq(0)
        // assert `class` attribute
        .should('have.class', 'completed')

      cy.get('.todo-list li')
        .eq(1)
        // example:
        // https://docs.cypress.io/guides/references/assertions.html#Class
        .should('not.have.class', 'completed')

      cy.get('.filters')
        .contains('Completed')
        .click()

      cy.get('.todo-list li')
        .should('have.length', 1)

      cy.get('.todo-list li')
        .eq(0)
        .should('contain', TODO_ITEM_ONE)
        // `and` is an alas of `should`
        .and('have.class', 'completed')

      cy.get('.filters')
        .contains('All')
        .click()

      cy.get('.todo-list li')
        .eq(1)
        .find('.toggle')
        .check()

      cy.get('.todo-list li')
        .eq(0)
        .should('have.class', 'completed')

      cy.get('.todo-list li')
        .eq(1)
        .should('have.class', 'completed')

      cy.get('.todo-list li')
        .eq(0)
        .find('.toggle')
        .uncheck()

      cy.get('.todo-list li')
        .eq(1)
        .find('.toggle')
        .uncheck()

      cy.get('.todo-list li')
        .eq(0)
        .should('not.have.class', 'completed')

      cy.get('.todo-list li')
        .eq(1)
        .should('not.have.class', 'completed')

    })

  })

})