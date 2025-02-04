/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    //********************** Aula 02 **********************\\
    beforeEach(function () {
        // antes de cada teste, roda esta funcao
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //********************** Aula 03 **********************\\
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
        cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
        cy.get('#email').should('be.visible').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
        cy.get('#open-text-area').should('be.visible').type('Teste de envio').should('have.value', 'Teste de envio')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })


    it('EXTRA1 - preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "Mussum Ipsum, cacilds vidis litro abertis. Copo furadis é disculpa de bebadis, arcu quam euismod magna.Quem manda na minha terra sou euzis!Suco de cevadiss deixa as pessoas mais interessantis.Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi."
        cy.get('#firstName').type('Patricia').should('have.value', 'Patricia')
        cy.get('#lastName').type('Possari').should('have.value', 'Possari')
        cy.get('#email').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value', longText)
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('EXTRA 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari_teste.com')
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA3 - campo de telefone, validar que, se um valor não-numérico for digitado, seu valor continuará vazio', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari_teste.com')
        cy.get('#phone').type('abcdef').should('have.value', '')
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulár', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA5 - preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari@teste.com')
        cy.get('#phone').should('be.visible').type('47988556644').should('have.value', '47988556644')
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.get('#firstName').clear()
        cy.get('#lastName').clear()
        cy.get('#email').clear()
        cy.get('#phone').clear()
        cy.get('#open-text-area').clear()
    })

    it('EXTRA6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA7 - envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('EXTRA8 - uso do contains', function () {
        cy.contains('button', 'Enviar')

    })

    //********************** Aula 04 **********************\\
    it('seleciona um produto (YouTube) por seu texto', function () {
        //cy.get('select').select('YouTube').should('have.value','youtube')
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('EXTRA 1 - seleciona um produto (Mentoria) por seu valor (value)', function () {
        //cy.get('select').select('mentoria').should('have.value', 'mentoria')
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('EXTRA 2 - seleciona um produto (Blog) por seu índice', function () {
        //cy.get('select').select(1).should('have.value', 'blog')
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //********************** Aula 05 **********************\\
    it('marca o tipo de atendimento "Feedback"', function () {
        // cy.get('[type="radio"]').check('feedback')-- solucao errada
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('EXTRA - marca cada tipo de atendimento"', function () {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    //********************** Aula 06 **********************\\
    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('EXTRA - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário"', function () {
        cy.get('#firstName').type('Patricia')
        cy.get('#lastName').type('Possari')
        cy.get('#email').type('patricia.possari@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("Texto de teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    //********************** Aula 07 **********************\\
    it('seleciona um arquivo da pasta fixtures', function () {
        //cy.get('input[type="file"]#file-upload')---podemos usar id=file-upload que é bem especifico 
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .then(function ($input) {
                console.log($input)
                //expect($input[0].files[0].name).to.eq('example.json') --pode ser usado deste modo também
                const files = $input[0].files
                expect(files[0].name).to.eq('example.json')
            })
    })

    it('EXTRA1 - seleciona um arquivo simulando um drag-and-drop', function () {
        // cy.get('input[type=file]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .then(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('EXTRA2 -seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //********************** Aula 08 **********************\\

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        //  cy.get('.some-link').should('have.attr', 'target', '_blank')    
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('EXTRA1 - acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('EXTRA 2 - testa a página da política de privacidade de forma independente', function () {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })


    //********************** Aula 09 **********************\\
    // Simulando as dimensões de um dispositivo móvel



    //********************** Aula 10 **********************\\
    //Documentação do projeto de testes automatizados
    /*
    >> Pre-requirements
    É necessário ter instalados para executar este projeto.:
        Node.js;
        Npm .
    
    >> Instalação
    Execute para instalar as dependências do desenvolvedor:
        npm install (ou npm i para a versão curta).
    
    >> Testes
    > Teste em Desktop:
    Run 'npm test' (ou 'npm t' para a versão curta) para executar o teste no modo headless.
    Run 'npm run cy:open' para abrir o Cypress no modo interativo.
    > Teste em Mobile:
    Run 'npm run test:mobile'  para executar o teste no modo headless.
    Run 'npm run cy:open:mobile' para abrir o Cypress no modo interativo.


    */
    //********************** Aula 11 **********************\\
    // Integração contínua com GitHub Actions


    //********************** Aula 12 **********************\\
    //Avançando no uso do Cypress

    it('EXERCICIO - verifica mensagens (de sucesso e erro)', function () {
        cy.get('button[type="submit"]').click()
        cy.clock()
        cy.contains('.error', 'Valide os campos obrigatórios!')
            .should('be.visible')
        cy.tick(3000)
        cy.contains('.error', 'Valide os campos obrigatórios!')
            .should('not.be.visible')

        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('.success', 'Mensagem enviada com sucesso.')
            .should('be.visible')
        cy.tick(3000)
        cy.contains('.success', 'Mensagem enviada com sucesso.')
            .should('not.be.visible')
    })

    Cypress._.times(5, () => {
        it(' EXTRA 1 - verifica mensagens (de sucesso e erro) - Cypress._.times()', function () {
            cy.clock()
            cy.get('button[type="submit"]').click()

            cy.contains('.error', 'Valide os campos obrigatórios!')
                .should('be.visible')
            cy.tick(3000)
            cy.contains('.error', 'Valide os campos obrigatórios!')
                .should('not.be.visible')

            cy.fillMandatoryFieldsAndSubmit()
            cy.contains('.success', 'Mensagem enviada com sucesso.')
                .should('be.visible')
            cy.tick(3000)
            cy.contains('.success', 'Mensagem enviada com sucesso.')
                .should('not.be.visible')
        })

    });

    Cypress._.times(5, () => {
        it(' EXTRA 1 - texto long com repeat', function () {
           const longText = Cypress._.repeat("TextoLongo-",20)
            cy.get('#firstName').should('be.visible').type('Patricia').should('have.value', 'Patricia')
            cy.get('#lastName').should('be.visible').type('Possari').should('have.value', 'Possari')
            cy.get('#email').should('be.visible').type('patricia.possari@teste.com').should('have.value', 'patricia.possari@teste.com')
            cy.get('#open-text-area').should('be.visible').type(longText).should('have.value', longText)
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible')
        })
    });

    it('EXTRA 2 - exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('EXTRA 3 - preenche a area de texto usando o comando invoke', function () {
        const longText = Cypress._.repeat("TextoLongo -",20)
        cy.get('#open-text-area')
        .invoke('val',longText)
        .should('have.value',longText)
       })

       it('EXTRA 4 -faz uma requisição HTTP', function () {       
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
          })
         .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
           expect(response.body).to.include('CAC TAT')
        })
/*
        .should(function(response) {
            const{status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
          })
*/

    })

    //********************** Aula 13 **********************\\
    // Desafio
    it.only('DESAFIO - Encontre o gato', function () {  
        cy.get('#cat')
        .invoke('show')
          .should('be.visible')
          cy.get('#title')
          .invoke('text', 'CAT TAT')
          cy.get('#subtitle')
          .invoke('text', 'I Love Cats')
          
    })
})
