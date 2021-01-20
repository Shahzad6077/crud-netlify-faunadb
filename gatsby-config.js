/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
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
