
// RUNNING NOTE: All PLAYEROPTIONS and OPTIONTITLES are paired ALWAYS within the HTML Code
// ...Functions Are Written Under the Assumption That There Are NO Exceptions
// These Functions All Change the SRC attributes of the Clicked Elements

// CONTROL ACTION WHEN ALL OPTION 1s ARE CLICKED
document.getElementById( 'playerOption1' ).addEventListener( 'click', function(e)
{
	// LOG out the event object for testing
	console.log( e );

	switchMediaFile( 'optionTitle1' );
} );

// CONTROL ACTION WHEN ALL OPTION 2s ARE CLICKED
document.getElementById( 'playerOption2' ).addEventListener( 'click', function(e)
{
	// LOG out the event object for testing
	console.log( e );

	switchMediaFile( 'optionTitle2' );
} );

// CONTROL ACTION WHEN ALL OPTION 3s ARE CLICKED
document.getElementById( 'playerOption3' ).addEventListener( 'click', function(e)
{
	// LOG out the event object for testing
	console.log( e );

	switchMediaFile( 'optionTitle3' );
} );

//THESE ARE FOR THE "NEW" FOOTERLINKS THAT APPEAR WHEN MEDIA QUERIES ARE SMALL
//FOOTERLINKS REPLACE THE NAVBAR AND THUS HAVE DIFFERENT IDs BUT SAME FUNCTION NEEDED
// CONTROL ACTION WHEN ALL OPTION 1s ARE CLICKED
document.getElementById( 'playerOption1fl' ).addEventListener( 'click', function(e)
{
	// LOG out the event object for testing
	console.log( e );

	switchMediaFile( 'optionTitle1fl' );
} );

// CONTROL ACTION WHEN ALL OPTION 2s ARE CLICKED
document.getElementById( 'playerOption2fl' ).addEventListener( 'click', function(e)
{
	// LOG out the event object for testing
	console.log( e );

	switchMediaFile( 'optionTitle2fl' );
} );

// CONTROL ACTION WHEN ALL OPTION 3s ARE CLICKED
document.getElementById( 'playerOption3fl' ).addEventListener( 'click', function(e)
{
	// LOG out the event object for testing
	console.log( e );

	switchMediaFile( 'optionTitle3fl' );
} );

function switchMediaFile( optionName )
{
	// Create a variable to store Title of The Element That Was Clicked
	// NOTE: The Title is a <p> Tag. ACTUAL String is this elements innerHTML
	var titleElement = document.getElementById( optionName );

	// LOG out the innerHTML (string of the Title) for testing
	console.log( titleElement.innerHTML );

	// THERE ARE NO DUPLICATE TITLES
	// Specific Titles Are KNOWN to be a Certain Type of Media Item... text, video, etc.
	//OPTION 1s
	if( titleElement.innerHTML == "Mercy" )
	{
		var element = document.getElementById( 'vidPlayer' );
		element.src = "https://player.vimeo.com/video/43183234?color=ababab&title=0&portrait=0";
	}
	else if( titleElement.innerHTML == "Enter the Demon" )
	{
		var element = document.getElementById( 'writingPlayer' );
		element.src = "../text/EnterTheDemon.txt";
	}
	else if( titleElement.innerHTML == "Photo 1" )
	{
		var element = document.getElementById( 'picturePlayer' );
		element.src = "../img/imgmain1.jpg";
	}
	//OPTION 2s
	else if( titleElement.innerHTML == "No Church" )
	{
		var element = document.getElementById( 'vidPlayer' );
		element.src = "https://player.vimeo.com/video/149266922?title=0&byline=0&portrait=0";
	}
	else if( titleElement.innerHTML == "OBA" )
	{
		var element = document.getElementById( 'writingPlayer' );
		element.src = "../text/OBA.txt";
	}
	else if( titleElement.innerHTML == "Photo 2" )
	{
		var element = document.getElementById( 'picturePlayer' );
		element.src = "../img/imgmain2.jpg";
	}
	//OPTION 3s
	else if( titleElement.innerHTML == "Bad Religion" )
	{
		var element = document.getElementById( 'vidPlayer' );
		element.src = "https://player.vimeo.com/video/45624218?title=0&byline=0&portrait=0";
	}
	else if( titleElement.innerHTML == "The Star Path" )
	{
		var element = document.getElementById( 'writingPlayer' );
		element.src = "../text/TheStarPath.txt";
	}
	else if( titleElement.innerHTML == "Photo 3" )
	{
		var element = document.getElementById( 'picturePlayer' );
		element.src = "../img/imgmain3.jpg";
	}
}

