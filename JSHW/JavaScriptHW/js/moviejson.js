//jQuery
//------

function MovieJSON( jsonlink )
{
	this.link = jsonlink;
	this.loaded = false;
	this.title;
	this.ratings;
	this.plot;

	// Load JSON Data from OMDB
	this.loadData = function()
	{
		// Get the JSON Objects from Link
		// Then Run a Function with the JSON Object as parameter
		$.getJSON( this.link, function( jsonData )
		{
			// Tell itself the object is loaded
			// If other functions/objects/etc. need to know
			this.loaded = true;

			// Retrieve data based on JSON Key/Value Pairs on Site
			// (It is the same for every movie)
			this.title = jsonData.Title;
			this.ratings = jsonData.Ratings;
			this.plot = jsonData.Plot;

			// Change innerHTML of the titleText <p> to the movie title.
			$( "#titleText" ).html( this.title );

			// Initiate a string that will include the whole Ratings Array
			// Then append it with "Source" and "Score" labelings
			// Then pass complete string as the innerHTML to ratingsText <p>
			var ratingsString = "";
			for( var i = 0; i < this.ratings.length; i++ )
            {
            	ratingsString += "Source: ";
            	ratingsString += this.ratings[ i ].Source;
            	ratingsString += " ";

            	ratingsString += "Score: ";
            	ratingsString += this.ratings[ i ].Value;
            	ratingsString += " || ";
            }
			$( "#ratingsText" ).html( ratingsString );

			// If the "Include Box" checkbox is checked,
			// ...include the plot
			// Because this is a choice, it is orginally hidden
			if( $( "#checkBoxPlot" ).is( ":checked" ) )
			{
				$( "#plotDiv" ).show();

				var plotString = this.plot;

				$( "#plotText" ).html( this.plot );
			}
			else
			{
				$( "#plotDiv" ).hide();
			}
		});
	}
}