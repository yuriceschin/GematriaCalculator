module.exports = {
siteMetadata: {
    title: "Gematria Calculator",
    pathPrefix: "/Gematria",
    titleTemplate: "%s · Gematria Calculator",
    description:
      "Gematria or gimatria is a system of assigning numerical value to a word or phrase. Hebrew Gematria calculator is a tool to help in this task. Moreover you can find the correspondences of the Liber Sepher Sephiroth sub figurâ D",
    url: "https://gematria.starryabode.com", // No trailing slash allowed!
    image: "src/images/icon.png" // Path to your image you placed in the 'static' folder
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