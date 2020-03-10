require("dotenv").config({
  path: ".env"
})
module.exports = {
  siteMetadata: {
    title: `Superminerbattlefarm`,
    description: `Southwest Fighting Game community.`,
    author: `@quorauk`,
  },
  plugins: [
    {
      resolve: `gatsby-source-facebook`,
      options: {
        places: [`202326136471980`], // Can be either a numeric ID or the URL ID
        params: {
          fields: 'events { name, cover, attending_count, start_time, end_time}, posts { message, created_time }', // See Facebooks API to see what you can query for
        },
        key: process.env.FACEBOOK_KEY,
        version: '6.0', // The version of the graph API to use. Defaults to 5.0
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
