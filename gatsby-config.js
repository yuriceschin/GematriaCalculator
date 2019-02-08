module.exports = {
siteMetadata: {
    title: 'TQ Gematria Calculator',
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
	        name: "TQ Gematria Calculator",
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
	'gatsby-plugin-offline',
	{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
],
}