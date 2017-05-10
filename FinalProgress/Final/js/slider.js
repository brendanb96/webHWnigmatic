// $('.carousel').carousel({
//     interval: 1000 //changes the speed
// })

loadSlideImages();

$( document ).ready( function(){
	updateSlideLink();
  $( '#myCarousel' ).carousel({
    interval: 4000,
    pause: 'null'
  });
})

$('#myCarousel').on('slid.bs.carousel', function () {
  updateSlideLink();
})

$( '.titleYear' ).mouseenter( function(){
	$( '#myCarousel' ).carousel( 'pause' );
})

$( '.titleYear' ).mouseleave( function(){
	$( '#myCarousel' ).carousel( {
		pause: 'null'} );
})

$( '.left' ).click(function(){
  $( '#myCarousel' ).carousel( 'prev' );
})

$( '.right' ).click(function(){
  $( '#myCarousel' ).carousel( 'next' );
})

$( '.slideIndi' ).click(function(){
	var indx = $( '.slideIndi' ).index( this );
  	$( '#myCarousel' ).carousel( indx );
})

$( '.jumpButtons button' ).click(function(){
	var theClass = this.className;
	var classDetails = theClass.split( "-" );

	jumpSlides( classDetails[ 1 ], classDetails[ 2 ] );
})

function loadSlideImages()
{
	var $initialSlide = $( ".item:first" );
	var $parentDiv = $initialSlide.parent();

	var linkPrefix = 'data/img/';
	var linkSuffix = '.jpg';

	for( var i = 1; i < 21; i++ )
	{
		var yr = 1996 + i;
		var $clonedSlide = $initialSlide.clone();
		var $caption = $clonedSlide.find( "h2" );
		$caption.html( yr );

		var theUrl = linkPrefix + yr + linkSuffix;
		var theImgAlt = yr + " for Brendan";

		var theImg = $clonedSlide.find( "img" );
		theImg.attr( "src", theUrl );
		theImg.attr( "alt", theImgAlt );

		$clonedSlide.removeClass( 'active' );

		$clonedSlide.appendTo( $parentDiv );
	}
}

function updateSlideLink()
{
	var slideYear = $( '.active .carousel-caption h2' ).html();

	var titleElement = $( '.titleYear p a').html( slideYear );

	changeIndiDisplay();

	// changeIndiBar();
}

function changeIndiDisplay()
{
	var activeSlide = $( '.active:first' );
	console.log( activeSlide );

	var indicatorList = $( '.slideIndi' );

	var indx = indicatorList.index( activeSlide );

	for( var i = 0; i < indicatorList.length; i++ )
	{
		var leftIndi = indx - 2;

		var rightIndi = indx + 2;

		if( leftIndi < 0 )
		{
			rightIndi += (-1*leftIndi);
		}

		if( rightIndi >= indicatorList.length )
		{
			var offset = rightIndi - (indicatorList.length - 1);
			leftIndi -= offset;
		}

		var indicator;
		if( i <= rightIndi && i >= leftIndi )
		{
			indicator = indicatorList[ i ];
			indicator.style.display = "inline-block";
		}
		else
		{
			indicator = indicatorList[ i ];
			indicator.style.display = "none";
		}
	}
}

function jumpSlides( direction, totalJump )
{
	var goRight = ( direction == "right" );

	var activeSlide = $( '.active:first' );

	var indicatorList = $( '.slideIndi' );

	var oldIndx = indicatorList.index( activeSlide );
	var newIndx;

	if( goRight )
	{
		newIndx = oldIndx + 5;
		if( totalJump )
		{
			newIndx = indicatorList.length - 1;
		}
	}
	else
	{
		newIndx = oldIndx - 5;
		if( totalJump )
		{
			newIndx = 0;
		}
	}

	$( '#myCarousel' ).carousel( newIndx );
}

function changeIndiBar()
{
	var sliderBtns = $( '.sliderBtn' );

	var slideYear = $( '.active .carousel-caption h2' ).html();

	for( var i = 0; i < sliderBtns.length; i++ )
	{
		if( slideYear == $sliderBtns[ i ].find( 'P' ).html() )
		{
			console.log( slideYear );
			alert( slideYear );
		}
	}
}

