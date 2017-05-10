// USE NYTIMES API FOR ALL ARTICLES, COLLECT THEM HERE
// MODALS ARE HOW THE SPECIFIC INSTANCE/EVENT EFFECTS ME WITH THE YEAR
// POEM / THREADED SOUL SHOULD BE 20 LINES
// PUT OUTLINE IN A COMMON SECTION, GROUPING EVERYTHING

animatePage();

var theCurrentYear;

var nytprefix = "../data/nytarticles/";

$( document ).ready( function()
{
	theCurrentYear = getCurrentYear();
	fillPage( theCurrentYear );

	// THE PROBLEM:
	// LOADS ALL DATA FROM TIMELINE PAGE WHEN CLICKED AND NOT HOME
	// MAKE A DELAY OR
	// CONSTANTLY UPDATE CURRENT YEAR AND RETRIEVE IT WHEN CLICKED
	// OR TIMELINE PAGE ID QUERY/CONDITIONAL/IFF STATEMENT
} );

function getCurrentYear()
{
	var theYr = sessionStorage.yearOfLink;
	if( theYr )
	{
		return theYr;
	}
	else
	{
		return 1996;
	}
}

// EVENT LISTENER TO SAVE LINK VALUE FROM HOMEPAGE
// ---
$( "#linkToArticle" ).click( function()
{
	var anchorElement = $( "#linkToArticle" );
	var yrAsString = anchorElement.html();
	theCurrentYear = parseInt( yrAsString );
	sessionStorage.clear();
	sessionStorage.setItem( "yearOfLink", theCurrentYear );
	if( theCurrentYear == 2016 )
	{
		animatePage();
		fillPage( theCurrentYear );
	}
} );

// DYNAMIC HTML EVENT LISTENER ADDITION
// ---
$( '.dropDownLink' ).on( 'click', '.yrLink', function() 
{
	var anchorElement = $( this );
	var yrAsString = anchorElement.html();
	theCurrentYear = parseInt( yrAsString );
	animatePage();
	fillPage( theCurrentYear );
});

function animatePage()
{
	var imgElement = $( "#titleImage" );
	var titleElem = $( ".titleBar" );
	var $initialPoemBox = $( ".poemBox:first" );
	var articleDiv = $( "#article" );
	var sessionDiv = $( "#session" );

	var tl = new TimelineMax({ delay: 0, repeat: 0 });

	tl.from( imgElement, 1.25, { scale: 4, autoAlpha: 0 } )
		.from( titleElem, 1.5, { rotationY: 180, autoAlpha: 0 } )
		.from( $initialPoemBox, 1.5, { rotationY: 180, autoAlpha: 0 }, "-=1.5" )
		.from( sessionDiv, 2, { autoAlpha: 0 }, "-=0.5" )
		.from( articleDiv, 2, { autoAlpha: 0 }, "-=2" );
}

// FILL PAGE WITH YEAR SPECIFIC CONTENT
// ---
function fillPage( theYear )
{
	getTitleImage( theYear );
	getModalInfo( theYear );
	getPoemInfo( theYear );
	getTextData( theYear );
}

// GET THE PARALLAX IMAGE HEADER FROM DATA FILES
// ---
function getTitleImage( year )
{
	var imgElement = $( "#titleImage" );

	var linkPrefix = '../data/img/banners/';
	var linkSuffix = '.jpg';

	var cssValue = "url('" + linkPrefix + year + linkSuffix + "')";

	imgElement.css( {"background-image": cssValue} );
}

// COLLECT MODAL CONTENT FROM TEXT FILE
// ---
function getModalInfo( year )
{
	$.get( "../data/modaltext/modalinfo.txt", function(data)
	{
	   	var stringLines = configureString( data );
	   	changeModalContent( stringLines, year );
	}, 'text' );
}

// COLLECT POEM CONTENT FROM TEXT FILE
// ---
function getPoemInfo( year )
{
	$.get( "../data/modaltext/modalpoem.txt", function(data)
	{
	   	var stringLines = configureString( data );
	   	changePoemContent( stringLines, year );
	}, 'text' );
}

// CHANGE THE CONTENT INSIDE THE POEM MODAL
// ---
function changeModalContent( data, year )
{
	// Modal Info Document is Structured Like This For Each Line:
	// "Year - Modal Body Text"
	// Thus 1996 would be Line (0), and Every Other Year Would be Line (yr-1996)
	// Split "Year" and "Modal Body Text"
	var yrIndex = year - 1996;
	var newStringLine = data[ yrIndex ].split( " - " );

	// NOTE: newStringLines Has A Scattered Index Now, so (yr-1996) is Not Enough
	// 1996(0) - Text(1)1
	// 1997(2) - Text(3)1 ... 1997 - 1996 = 1 THUS Index (2) = (1997-1996)*2 and Add 1 For Text
	// 1998(4) - Text(5)1 ... 1998 - 1996 = 2 THUS Index (4) = (1998-1996)*2 and Add 1 For Text
	// 1999(6) - Text(7)1 ... 1999 - 1996 = 3 THUS Index (6) = (1999-1996)*2 and Add 1 For Text
	// THUS Year = (yr-1996)*2 and Add 1 For Text
	//var yrIndex = (year - 1996) * 2;

	var modalTitle = $( ".modal-title" );
	var modalBody = $( ".modal-body" );

	modalTitle.html( newStringLine[ 0 ] );
	modalBody.html( newStringLine[ 1] );
}

// CHANGE THE CONTENT INSIDE THE POEM BOX DIV
// ---
function changePoemContent( data, year )
{
	var yrIndex = year - 1996;
	var poemBoxStart = $( ".poemTextBegin" );
	var textStart = "";

	var poemBoxLink = $( "#poemModalLink" );
	var textMid = "";

	var poemBoxEnd = $( ".poemTextEnd" );
	var textEnd = "";
	
	for( var i = 0; i < data.length; i++ )
	{
		if( i < yrIndex )
		{
			textStart += data[ i ];
		}
		else if( i == yrIndex )
		{
			textMid += data[ i ];
		}
		else
		{
			textEnd += data[ i ];
		}
	}
	poemBoxStart.html( textStart );
	poemBoxLink.html( textMid );
	poemBoxEnd.html( textEnd );
}

// CHANGE PAGE-SPECIFIC CONTENT WITH DATA BASED ON THE YEAR
// ---
function getTextData( year )
{
	var yearFile = nytprefix + year + '.txt';

	$.get( yearFile, function(data)
	{
	   var stringLines = configureString( data );

	   changeHTML( stringLines );
	}, 'text' );
}

// SPLIT STRINGS BY LINE
// ---
function configureString( txt )
{
	var txtLines = txt.split( "\n" );
	return txtLines;
}

// CHANGE PAGE WITH YEAR-SPECIFIC CONTENT BY USING DATA THAT IS PASSED IN
// ---
function changeHTML( data )
{
	// Tell itself the object is loaded
	// If other functions/objects/etc. need to know
	// Change Title of Article
	changeHTMLTitle( data[ 0 ] );

	// Change Article Data
	changeHTMLArticle( data );

	// Resize Article Container Div
	constructHTMLSessionDiv();

	// Resize/Loop/Duplicate Article Container Div Based on Article Div Size
	constructHTMLPoemBox();
}

// CHANGE ARTICLE SESSION TITLE
// ---
function changeHTMLTitle( dataTitle )
{
	var titleElem = $( ".titleBar" );
	titleElem.html( dataTitle );
}

// CHANGE THE ACTUAL ARTICLE SESSION CONTENT
// ---
function changeHTMLArticle( data )
{
	var allData = [];
	var articleDiv = $( "#article" );
	for( var i = 1; i < data.length; i++ )
	{
		allData.push( data[ i ] );
	}

	articleDiv.html( allData );
}

// CHANGE ARTICLE SESSION CONTAINER TO MATCH LENGTH OF TEXT
// ---
function constructHTMLSessionDiv()
{
	var textHeight = $( "#article" ).height();
	var sessionDiv = $( "#session" );
	sessionDiv.css( { "height": textHeight*1.1 } );
}

// CHANGE POEM BOX DIV TO MATCH LENGTH OF ARTICLE
// ---
function constructHTMLPoemBox()
{
	resetPoemBox();

	var sessionHeight = $( "#session" ).height();

	var $initialPoemBox = $( ".poemBox:first" );

	var poemBoxHeight = $initialPoemBox.height()*1.5;
	var $parentDiv = $initialPoemBox.parent();

	while( sessionHeight > poemBoxHeight )
	{

		var $newPoemBox = $initialPoemBox.clone();
		$newPoemBox.appendTo( $parentDiv );

		sessionHeight -= poemBoxHeight;
	}
}

// RESET AND DELETE ALL POEM BOX DIVS, EXCEPT THE INITIAL
// ---
function resetPoemBox()
{
	var poemBoxArray = $( ".poemBox" );
	for( var i = 1; i < poemBoxArray.length; i++ )
	{
		poemBoxArray[ i ].remove();
	}
}

