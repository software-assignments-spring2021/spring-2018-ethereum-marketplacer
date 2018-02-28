App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        return App.initWeb3();

    },

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },


    initContract: function() {
        $.getJSON('QuestionAnswer.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var QuestionAnswerArtifact = data;
            App.contracts.QuestionAnswer = TruffleContract(QuestionAnswerArtifact);

            // Set the provider for our contract
            App.contracts.QuestionAnswer.setProvider(App.web3Provider);

            // Use our contract to retrieve and allow users to submit question
            return App.submitQuestion();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-submitquestion', App.handleAdopt);
    }


};

$(function() {
    $(window).load(function() {
        App.init();
    });
});
