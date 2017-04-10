// Traditional JavaScript
//-----------------------

// MAKES USE OF OMDB's SEARCH FEATURE
// OMDB is a host of movies from iMDB as JSON objects
// These JSON objects are stored in url's in a similar fashion
// The base link, with various parameters like title, plot, and year.

// GLOBAL VARIABLE FOR JSON LINK
// OMDB Base Link
var JSONlink = "http://www.omdbapi.com/?t=";

document.addEventListener('DOMContentLoaded', function() 
{
    //we only need to grab this button once, rather than storing it as a variable we can just grab
    // it ad add the event listener by chaining 2 methods/fuction
    document.getElementById( 'sendBtn' ).addEventListener( 'click', fetchInfo );
});

function fetchInfo()
{
    resetLink();

    var movieTitle = document.getElementById( 'title' ).value;
    var movieYear = document.getElementById( 'yr' ).value;
    var includePlot = document.getElementById( 'plot' );

    var infoFetched = [ false, false, false ];

    //Error Checking Commands/Operations for Title
    if( !movieTitle )
    {
    	return;
    }

    var titleStr = createTitleString( movieTitle );

    JSONlink += titleStr;
    infoFetched[ 0 ] = true;

    //Data Checking Commands/Operations for Year and Plot
    if( movieYear )
    {
    	var theYear = "&y=" + movieYear;
    	JSONlink += theYear;
    }
    infoFetched[ 1 ] = true;

    if( includePlot )
    {
    	JSONlink += "&plot=full";
    }
    infoFetched[ 2 ] = true;

    createDataObject();
}

function createDataObject()
{
    var movieObject = new MovieJSON( JSONlink );

    console.log( movieObject );

    movieObject.loadData();
}

function createTitleString( movieTitle )
{
    var titleArray = movieTitle.split( " " );
    var newTitleStr;

    for( var i = 0; i < titleArray.length; i++ )
    {
        if( !newTitleStr )
        {
            newTitleStr = titleArray[ i ];
        }
        else
        {
            newTitleStr += titleArray[ i ];
        }
        
        if( i != titleArray.length - 1 )
        {
            newTitleStr += "+";
        }
    }

    return newTitleStr;
}

function resetLink()
{
	JSONlink = "http://www.omdbapi.com/?t=";
}