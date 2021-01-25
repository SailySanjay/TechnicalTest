const carinputfiles = [
    {
        "fname": "DN09HRM",
        "findex": "1"
    },
    {
        "fname": "KT17DLX",
        "findex": "2"
    },
    {
        "fname": "BW57BOW",
        "findex": "3"
    },
    {
        "fname": "SG18HTN",
        "findex": "4"
    },
]

describe('Car input files', function() {
    //loop through multiple car input files 
    carinputfiles.forEach((inputfile) => {
        describe(inputfile.findex, () => {    
            before(function(){ 
                cy.fixture(inputfile.fname).then(function(data)
                {
                    this.data=data ;    

                })
            }) 
            it('Test the Registration number  ' + inputfile.fname, function() {
                cy.visit('https://cartaxcheck.co.uk/')  
                cy.title().should('eq','Car Tax Check | Free Car Check')
                cy.get("#vrm-input").type(this.data.registration)
                cy.get('.jsx-4211136584').click()
                cy.get('dd.jsx-3496807389').should('contain',this.data.registration);
                cy.readFile("caroutput.txt").should('include', this.data.registration);
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
         })
    })
})