
const rnos = ['DN09HRM', 'KT17DLX', 'BW57BOW', 'SG18HTN']

describe('CarCheck', () => { 
  rnos.forEach((rno) => {      
  it('Check the website output for the Car Registration '+rno , () => {
    cy.visit('https://cartaxcheck.co.uk/')
    cy.title().should('eq','Car Tax Check | Free Car Check')
    cy.log('SETUP DONE')
    cy.get("#vrm-input").type(rno)
    cy.get('.jsx-4211136584').click()
    cy.get('dd.jsx-3496807389').should('contain',rno);
    cy.wait(2000)  
    cy.get('.jsx-2427602283.modal-title')
    .each(($elm) => {
      cy.wrap($elm).invoke('text').then((text) => {
        if (text.includes('Vehicle Not Found')) {
          cy.get('a.jsx-1260445701').contains('Try Again').click() 
          cy.get("#vrm-input").clear()
        }      
      })
    })    
   })

   it("Compare the website output with the car_output file for the Registration " +rno , () => {
      cy.readFile("caroutput.txt").should('include', rno);
      cy.wait(3000)
    })    
  }) 
})