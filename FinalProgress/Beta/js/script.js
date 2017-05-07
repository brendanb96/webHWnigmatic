var activeLink;

$( document ).ready( function()
{
	$( ".dropDownLink" ).click( function()
	{
		toggleDropDown( this );
	} );
});

// TOGGLE DELETE AND ADD DYNAMIC UL LINKED CONTENT
// ---
function toggleDropDown( headerLink )
{
	var dropDownList = $( ".dropDownLink ul" );

	if( dropDownList.length > 0 )
	{
		removeDropDownList( dropDownList );
	}
	else if( headerLink == activeLink )
	{
		createDropDownList( headerLink );
	}
	
	if( headerLink != activeLink )
	{
		var tl = new TimelineMax({ delay: 0.55,repeat: 0 });
		tl.add( function(){ createDropDownList( headerLink ) });
		activeLink = headerLink;
	}
}

// DELETE DROPDOWN LINKS FROM DOM
// ---
function removeDropDownList( dropDown )
{
	var tl = new TimelineMax({ delay: 0.15,repeat: 0 });
    tl.to( dropDown, 0.35, { x: -50, autoAlpha: 0 } ).add( function(){ resetClass(dropDown) });
}

// CREATE/ADD DROPDOWN LINKS TO DOM
// ---
function createDropDownList( headerLink )
{
	resetClass( $( ".dropDownLink ul" ) );

    var yrUl = document.createElement( 'UL' );
    yrUl.className = "yearList";

    var theYr = getHeaderLinkYear( headerLink );

    if( theYr != 2016 )
	{
		for( var i = 0; i < 4; i++ )
		{
			var yrLi = document.createElement( 'LI' );
    		var yrLink = document.createElement( 'A' );
    		yrLink.className = "yrLink";
			
			var theString = (theYr + i).toString();
			var yrText = document.createTextNode( theString );

			yrLink.appendChild( yrText );
			yrLi.appendChild( yrLink );
			yrUl.appendChild( yrLi );
		}
	}
	headerLink.appendChild( yrUl );
	TweenLite.from( $( '.yearList') , 1, { x: -50, autoAlpha: 0 } );
}

// RETRIEVE THE "HEADER" YEAR (LINKS ARE GROUPED BY 4 AND TITLED BY THEIR OLDEST YEAR)
// ---
function getHeaderLinkYear( theLink )
{
	var dropDownLinkText = theLink.innerHTML.split( "--" );
	var dropDownLinkYear = parseInt( dropDownLinkText[ 0 ] );
	return dropDownLinkYear;
}

// DELETE A CLASS FROM DOM
// ---
function resetClass( classList )
{
	for( var i = 0; i < classList.length; i++ )
	{
		classList[ i ].remove();
	}
}