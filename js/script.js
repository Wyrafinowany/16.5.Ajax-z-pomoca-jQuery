$(function() {

	var prefix = 'https://cors-anywhere.herokuapp.com/';
    var tweetLink = 'https://twitter.com/intent/tweet?text=';
    var quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    /*---------- Download quote ----------*/
    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
        $.ajaxSetup({ cache: false });
    }

    /*---------- Creat tweet ----------*/
    function createTweet(input) {
        var data = input[0];
        var quoteText = $(data.content).text().trim();
        var quoteAuthor = data.title;

        if (!quoteAuthor.length) {
            quoteAuthor = 'Unknown author';
        }

        var tweetText = 'Quote of the day - ' + quoteText + ' Author: ' + quoteAuthor;
	var maximumTwitterPostLength = 140;
        if (tweetText.length > maximumTwitterPostLength) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);

            $('.quote').text(quoteText);
            $('.author').text('Author: ' + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
    }

    /*---------- Generating a quote ----------*/
    $(document).ready(function() {
        getQuote();
        $('.trigger').click(function() {
            getQuote();
        })
    });
});
