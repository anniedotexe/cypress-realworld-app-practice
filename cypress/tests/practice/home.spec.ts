import { User } from "models";

describe("sign in page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
      })
    it("the h1 contains the correct text", () => {
        cy.get("h1").contains("Sign in")
    })
    it("the sign in form components exists on the page", () => {
        cy.getBySel("signin-username")
        cy.getBySel("signin-password")
        cy.getBySel("signin-remember-me")
        cy.getBySel("signin-submit")
    })
    it("allows signing in to the website", () => {
        cy.database("find", "users").then((user: User) => {
            cy.getBySel("signin-username").type(user.username)
            cy.getBySel("signin-password").type("s3cret")
            cy.getBySel("signin-remember-me").find("input").click()
            cy.getBySel("signin-submit").click()
            cy.getBySel("signin-submit").should("not.exist")
        });
    })
})

describe("home page", () => {
    // Before each, navigate to sign in page and sign in to a user's account
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.database("find", "users").then((user: User) => {
            cy.login(user.username, "s3cret", { rememberUser: true });
        });
      })
    it("signed in user's name exists on the home page", () => {
        cy.database("find", "users").then((user: User) => {
            cy.getBySel("sidenav-user-full-name").contains(user.firstName)
        });
    })
})