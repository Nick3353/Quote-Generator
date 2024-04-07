const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote') ;
const authorText = document.getElementById('author'); 
const btn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


//showing loader

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hiding loader
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


let  apiQuotes = [];
// quotes from API

//show new quote
function newQuote(){
    loading();
    //pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   if(!quote.author){
    authorText.textContent = 'UNKNOWN';
   } else {
    authorText.textContent = quote.author; 
   };
   
    if(quote.text.lenth > 60){
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }
// set quote , hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes(){
    loading()
   const apiLink = 'https://type.fit/api/quotes';

   try { 
     const response = await fetch(apiLink);
     apiQuotes = await response.json();
     newQuote()
    }  catch (error) {
        // catch error here
    }
}

// on load
getQuotes();

// event listeners
newQuoteBtn.addEventListener('click' , newQuote);