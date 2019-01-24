module.exports = {
siteMetadata: {
    title: 'Trigrammaton English Gematria',
    pathPrefix: "/TQGematria",
},
plugins: [
 	{
  	resolve: `gatsby-plugin-typography`,
  		options: {
    		pathToConfigModule: `src/utils/typography`,
  		}
	},
	{
	resolve: `gatsby-plugin-manifest`,
	    options: {
	        name: "Trigrammaton English Gematria",
	        short_name: "TQ Gematria",
	        start_url: "/",
	        background_color: "#fafbed",
	        theme_color: "#fafbed",
	        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
	        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
	        display: "standalone",
	        icon: "src/images/icon.png", // This path is relative to the root of the site.
	    },
	},
	'gatsby-plugin-offline'
],
}