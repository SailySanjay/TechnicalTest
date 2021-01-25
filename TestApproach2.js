const rnos = require('../../fixtures/carinputdata')

describe('CarCheck', function(){ 
  /*  before('Read Registration from the car_input file', () => {            
        cy.fixture('carinputdata').as('testdata')               
    }) */   
    rnos.forEach(rno => {
        it('Check cartaxcheck website for the Registration number ' +rno, function() {   
            cy.visit('https://cartaxcheck.co.uk/')  
            cy.title().should('eq','Car Tax Check | Free Car Check')
            cy.log('SETUP DONE')
            cy.get("#vrm-input").type(rno)
            cy.get('.jsx-4211136584').click()
            cy.get('dd.jsx-3496807389').should('contain',rno);
            cy.wait(2000)  
            cy.get('.jsx-2427602283.modal-title').each(($elm) => {
                cy.wrap($elm).invoke('text').then((text) => {
                    if (text.includes('Vehicle Not Found')) {
                        cy.get('a.jsx-1260445701').contains('Try Again').click() 
                        cy.get("#vrm-input").clear()
                    }      
                })
                                  
            }) 
        })

        it(" Compare the cartaxcheck website output with the given car_output.txt  " +rno , () => {
            cy.readFile("caroutput.txt").should('include', rno);
            cy.wait(3000)
          })
        
    })
})