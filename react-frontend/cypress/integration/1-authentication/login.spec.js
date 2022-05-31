/// <reference types="cypress" />

describe('login functionality', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('#email').should('be.visible').type('mikeconrad@onmail.com')
        cy.get('#password').should('be.visible').type('Romans:33#')
        cy.get('button[type=submit]').click()
    })
  
    // it('allows user to login', () => {
    //   cy.visit('/login')

    //   cy.get('#email').should('be.visible').type('mikeconrad@onmail.com')
    //   cy.get('#password').should('be.visible').type('Romans:33#')
    //   cy.get('button[type=submit]').click()
    // })

    it('redirects to dashboard on login', () => {

        cy.url().should('include', '/dashboard')
    })

    it('shows admin settings to admin users', () => {
        cy.get('a[href="/students/1"]')
        cy.get('a[href="/teachers"]')
        cy.get('a[href="/parents"]')
        cy.get('a[href="/settings"]')

        cy.get('a[href="/students"]').first().click()
        cy.get('tbody tr').should('have.length', 10)

        // Click on the first student in the list to go to the edit course page
        cy.get('tbody tr').first().then(($span) => {
            const studentName = $span.text()
            cy.get('tbody tr a').first().click()

            // Check to make sure that the first/last name inputs are populated with the correct student.
            cy.get('#firstName').should('have.value', studentName.split(' ').slice(0,studentName.split(' ').length - 1).join(' '))
            cy.get('#lastName').should('have.value', studentName.split(' ').slice(studentName.split(' ').length - 1).join(' '))


            // Delete any current courses so we start with 0

            cy.get('[data-action="add-course"]').click()
            cy.get('#courseName').first().type(`Course 1`)
            cy.get('#courseGrade').first().type(`Grade 1`)
            cy.get('#feedback').first().type('feedback')
            cy.get('[data-action="save-course"]').first().click()

            cy.wait(1000)
    
            cy.get('[data-action="add-course"]').click()
            cy.get('#courseName').first().type(`Course 2`)
            cy.get('#courseGrade').first().type(`Grade 2`)
            cy.get('#feedback').first().type('feedback')
            cy.get('[data-action="save-course"]').first().click()
            cy.wait(1000)

            cy.get('[data-action="add-course"]').click()
            cy.get('#courseName').first().type(`Course 3`)
            cy.get('#courseGrade').first().type(`Grade 3`)
            cy.get('#feedback').first().type('feedback')
            cy.get('[data-action="save-course"]').first().click()
            cy.wait(1000)

            cy.get('[data-label="course-card"] .chakra-badge').first().should('have.text', 'Teacher: Mike Conrad')

            // cy.get('[data-label="course-card"] .chakra-badge').first().should('have.text', 'Mike Conrad')

            cy.get('[data-action="delete-course"]').click({multiple: true})


            




        })


    })
    // it('shows list of students', () => {
    //     cy.get('a[href="/students"]').first().click()
    //     cy.get('tr').should('have.length', 11)
    //     cy.get('tr').first().get('a').first().click()

    // })

    // it('shows student card', () => {
    //     cy.get('a[href="/students"]').first().click()
    //     cy.get('tr').should('have.length', 11)

    //     cy.get('tr').first().get('a').first().click()

    // })
  

    // it('can add new todo items', () => {
    //   // We'll store our item text in a variable so we can reuse it
    //   const newItem = 'Feed the cat'
  
    //   // Let's get the input element and use the `type` command to
    //   // input our new list item. After typing the content of our item,
    //   // we need to type the enter key as well in order to submit the input.
    //   // This input has a data-test attribute so we'll use that to select the
    //   // element in accordance with best practices:
    //   // https://on.cypress.io/selecting-elements
    //   cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
  
    //   // Now that we've typed our new item, let's check that it actually was added to the list.
    //   // Since it's the newest item, it should exist as the last element in the list.
    //   // In addition, with the two default items, we should have a total of 3 elements in the list.
    //   // Since assertions yield the element that was asserted on,
    //   // we can chain both of these assertions together into a single statement.
    //   cy.get('.todo-list li')
    //     .should('have.length', 3)
    //     .last()
    //     .should('have.text', newItem)
    // })
  
    // it('can check off an item as completed', () => {
    //   // In addition to using the `get` command to get an element by selector,
    //   // we can also use the `contains` command to get an element by its contents.
    //   // However, this will yield the <label>, which is lowest-level element that contains the text.
    //   // In order to check the item, we'll find the <input> element for this <label>
    //   // by traversing up the dom to the parent element. From there, we can `find`
    //   // the child checkbox <input> element and use the `check` command to check it.
    //   cy.contains('Pay electric bill')
    //     .parent()
    //     .find('input[type=checkbox]')
    //     .check()
  
    //   // Now that we've checked the button, we can go ahead and make sure
    //   // that the list element is now marked as completed.
    //   // Again we'll use `contains` to find the <label> element and then use the `parents` command
    //   // to traverse multiple levels up the dom until we find the corresponding <li> element.
    //   // Once we get that element, we can assert that it has the completed class.
    //   cy.contains('Pay electric bill')
    //     .parents('li')
    //     .should('have.class', 'completed')
    // })
  
    // context('with a checked task', () => {
    //   beforeEach(() => {
    //     // We'll take the command we used above to check off an element
    //     // Since we want to perform multiple tests that start with checking
    //     // one element, we put it in the beforeEach hook
    //     // so that it runs at the start of every test.
    //     cy.contains('Pay electric bill')
    //       .parent()
    //       .find('input[type=checkbox]')
    //       .check()
    //   })
  
    //   it('can filter for uncompleted tasks', () => {
    //     // We'll click on the "active" button in order to
    //     // display only incomplete items
    //     cy.contains('Active').click()
  
    //     // After filtering, we can assert that there is only the one
    //     // incomplete item in the list.
    //     cy.get('.todo-list li')
    //       .should('have.length', 1)
    //       .first()
    //       .should('have.text', 'Walk the dog')
  
    //     // For good measure, let's also assert that the task we checked off
    //     // does not exist on the page.
    //     cy.contains('Pay electric bill').should('not.exist')
    //   })
  
    //   it('can filter for completed tasks', () => {
    //     // We can perform similar steps as the test above to ensure
    //     // that only completed tasks are shown
    //     cy.contains('Completed').click()
  
    //     cy.get('.todo-list li')
    //       .should('have.length', 1)
    //       .first()
    //       .should('have.text', 'Pay electric bill')
  
    //     cy.contains('Walk the dog').should('not.exist')
    //   })
  
    //   it('can delete all completed tasks', () => {
    //     // First, let's click the "Clear completed" button
    //     // `contains` is actually serving two purposes here.
    //     // First, it's ensuring that the button exists within the dom.
    //     // This button only appears when at least one task is checked
    //     // so this command is implicitly verifying that it does exist.
    //     // Second, it selects the button so we can click it.
    //     cy.contains('Clear completed').click()
  
    //     // Then we can make sure that there is only one element
    //     // in the list and our element does not exist
    //     cy.get('.todo-list li')
    //       .should('have.length', 1)
    //       .should('not.have.text', 'Pay electric bill')
  
    //     // Finally, make sure that the clear button no longer exists.
    //     cy.contains('Clear completed').should('not.exist')
    //   })
    // })
  })
  