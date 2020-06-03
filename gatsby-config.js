module.exports = {
siteMetadata: {
    title: "Gematria Calculator",
    pathPrefix: "/Gematria",
    titleTemplate: "%s · Gematria Calculator",
    description:
      "Gematria or gimatria is a system of assigning numerical value to a word or phrase. Hebrew Gematria calculator is a tool to help in this task. Moreover you can find the correspondences of the Liber Sepher Sephiroth sub figurâ D",
    url: "https://gematria.starryabode.com", // No trailing slash allowed!
    image: "src/images/icon512.png" // Path to your image you placed in the 'static' folder
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
	        name: "Gematria Calculator",
	        short_name: "Gematria Calculator",
	        start_url: "/",
	        background_color: "#fafbed",
	        theme_color: "#fafbed",
	        display: "standalone",
	        icon: "src/images/icon512.png", // This path is relative to the root of the site.
	    },
	},
	'gatsby-plugin-offline',
	{
      resolve: `gatsby-source-filesystem`,
      options: {
		workboxConfig: {
			globPatterns: ['**/*']
		 }
      },
    },
    `gatsby-transformer-csv`,
],
}