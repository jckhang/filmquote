$(document).ready(function() {
  var theQuote = '';
  var theAuthor = '';
  createQuote();

  $('.btn1').on("click", function() {
    createQuote();
  });

  $('.btn2').on("click", function() {
    var myUrl = 'https://twitter.com/intent/tweet?text=' + theQuote + ' ' + theAuthor;
    window.open(myUrl, 'twitter');
    return false;
  });

  function createQuote() {
    // The following is the API call to the MashApe random quotes API server
    var output = $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous',
      type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
      data: {}, // Additional parameters here
      dataType: 'json',
      success: function(data) {
        theQuote = data.quote;
        theAuthor = data.author;
        document.getElementById('quote').innerHTML = theQuote;
        document.getElementById('author').innerHTML = theAuthor;
      },
      error: function(err) {
        // If, for some reason, the API becomes unavailable, the Quote Machine will still work, though in a limited manner.
        var quotes = {
          1: ['If a man does his best, what else is there?', 'Gen. George S. Patton'],
          2: ['Give me chastity and continence, but not yet.', 'Saint Augustine'],
          3: ['You can avoid reality, but you cannot avoid the consequences of avoiding reality.', 'Ayn Rand'],
          4: ['I have always depended on the kindness of strangers.', 'A Streetcar Named Desire']
        };
        var randomQuoteNumber = Math.ceil(Math.random() * Object.keys(quotes).length);

        $('#quote').text(quotes[randomQuoteNumber][0]);
        $('#author').text(quotes[randomQuoteNumber][1]);

      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "Sr4ugfUfUHmshOQ2IbeGXw8i1Gujp15JgPZjsnIcl0TaxHmdX3"); // Enter here your Mashape key
      }
    });
  }
});