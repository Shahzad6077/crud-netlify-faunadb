/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Faunadb Crud`,
    description: `Faunadb CRUD with netlify functions as a serverless functions.`,
    author: `M Shahzad Ali`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      // resolve: "gatsby-plugin-prefetch-google-fonts",
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: [`400`, `600`, `700`, `800`],
            },
            {
              family: "Quicksand",
              variants: [`400`, `500`, `700`],
            },
          ],
        },
      },
    },
  ],
}
