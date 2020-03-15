const { GraphQLString } = require("gatsby/graphql")
const moment = require("moment")

const getWaistmansNumber = (content) => {
    const nameRegex = /Waistman Weeklies #(\d+)/
    const result = nameRegex.exec(content.name)
    if (result !== null && result.length === 2) {
    return result[1]
    }
    return null
}

exports.setFieldsOnGraphQLNodeType = async ({ type, loadNodeContent }) => {
    if (type.name == "YoutubeVideo") {
        return {
            group_date: {
              type: GraphQLString,
              resolve: (source, _) => moment(source.publishedAt).isoWeekday(0).format("YYYY-MM-DD")
            }
        }
    } else if (type.name == "ChallongeTournament") {
        return {
            group_date: {
              type: GraphQLString,
              resolve: (source, _) => moment(source.created_at).format("YYYY-MM-DD")
            }
        }
    } else if (type.name = "FacebookEvents") {
        return {
            facebookURL: {
              type: GraphQLString,
              resolve: async (source, _) => {
                  const contentStr = await loadNodeContent(source)
                  const content = JSON.parse(contentStr)
                  return `https://facebook.com/events/${content.id}`
              }
            },
            waistmansNumber: {
              type: GraphQLString,
              resolve: async (source, _) => {
                  const contentStr = await loadNodeContent(source)
                  const content = JSON.parse(contentStr)
                  return getWaistmansNumber(content)
              }
            }
        }
    }
    return {}
}