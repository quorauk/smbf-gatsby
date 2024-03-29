require("dotenv").config({
  path: ".env"
})
module.exports = {
  siteMetadata: {
    title: `Superminerbattlefarm`,
    description: `Southwest Fighting Game community.`,
    author: `@quorauk`,
    siteUrl: `https://superminerbattle.farm`
  },
  plugins: [
    // {
    //   resolve: `gatsby-source-facebook`,
    //   options: {
    //     places: [202326136471980], // Can be either a numeric ID or the URL ID
    //     params: {
    //       fields: 'events { name, cover, attending_count, start_time, end_time }', // See Facebooks API to see what you can query for
    //     },
    //     key: process.env.FACEBOOK_KEY,
    //     version: '6.0', // The version of the graph API to use. Defaults to 5.0
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: `gatsby-source-challonge`,
    //   options: {
    //     api_keys: process.env.CHALLONGE_KEYS.split(",")
    //   }
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-image',
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'SmashGG_Image',
        imagePath: 'url'
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/smbf-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "SmashGG",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "smashgg",
        // Url to query from
        url: "https://api.start.gg/gql/alpha",
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer ${process.env.SMASHGG_TOKEN}`,
        },
      },
    },
    // {
    //   resolve: `gatsby-source-youtube`,
    //   options: {
    //     channelId: process.env.YOUTUBE_CHANNEL_ID,
    //     apiKey: process.env.YOUTUBE_KEY,
    //     maxVideos: 50 // Defaults to 50
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-160403649-1",
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://superminerbattle.farm',
        sitemap: 'https://superminerbattle.farm/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    // `gatsby-transformer-smbf`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Super Miner Battle Farm`,
    //     short_name: `SMBF`,
    //     start_url: `/`,
    //     background_color: `#343a40`,
    //     theme_color: `#343a40`,
    //     display: `standalone`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
