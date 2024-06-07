import { faker, th } from '@faker-js/faker'
class RegisterPage {

    verifyPageHeading() {
        cy.get('h1').should('be.visible').and('include.text', 'Register')
    }

    checkGender(gender) {
        if(gender == 'M'){
            cy.get('#gender-male').check()
        }
        else{
            cy.get('#gender-female').check()
        }
        
    }

    fillNameEmail() {
        let firstname = faker.person.firstName()
        let lastname = faker.person.lastName().toLocaleLowerCase()
        cy.get('#FirstName').type(firstname)
        cy.get('#LastName').type(lastname)
        let email = faker.internet.email({ firstName: firstname, lastName: lastname, provider: 'automation.com' })
        cy.get('#Email').type(email)
    }

    fillPassword() {
        
        let password = faker.internet.password({ length: 8 })
        cy.get('#Password').type(password)
        cy.get('#ConfirmPassword').type(password)
    }

    clickRegister() {
        cy.get('#register-button').click()
    }

    verifyRegistration() {
        cy.get('.result').should('contain.text', 'Your registration completed')
        cy.get('[value="Continue"]').click()
    }

    registerNewUser(){
        this.checkGender('M')
        this.fillNameEmail()
        this.fillPassword()
        this.clickRegister()
        this.verifyRegistration()
    }
}

export default RegisterPage