// $('.carousel').carousel({
//     interval: 1000 //changes the speed
// })

loadSlideImages();

$( document ).ready( function(){
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
  // changeSlideLink();
})

$( '.right' ).click(function(){
  $( '#myCarousel' ).carousel( 'next' );
  // changeSlideLink();
})

$( '.slideIndi' ).click(function(){
	var indx = $( '.slideIndi' ).index( this );
  	$( '#myCarousel' ).carousel( indx );
  	// changeSlideLink();
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
		$caption.html( yr);

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

	changeIndiBar();
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


