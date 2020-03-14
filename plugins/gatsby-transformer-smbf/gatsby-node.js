const { GraphQLString } = require("gatsby/graphql")
const moment = require("moment")


const transformFacebookEvent = async ({ node, actions, createNodeId, loadNodeContent, createContentDigest }) => {
    const { createNode, createParentChildLink } = actions
    const nodeId = createNodeId(`${node.id} >>> waistmansEvent`)
    const contentStr = await loadNodeContent(node)
    const content = JSON.parse(contentStr)

    const getWaistmansNumber = (content) => {
      const nameRegex = /Waistman Weeklies #(\d+)/
      const result = nameRegex.exec(content.name)
      if (result !== null && result.length === 2) {
        return result[1]
      }
      return null
    }

    const waistmansEvent = {
        ...content,
        id: nodeId,
        facebookURL: `https://facebook.com/events/${content.id}`,
        waistmansNumber: getWaistmansNumber(content),
        internal: {
            type: "WaistmansEvent",
            contentDigest: createContentDigest(content),
            content: JSON.stringify(content),
        }
    }

    createNode(waistmansEvent)
}

exports.onCreateNode = async (inputs) => {
    switch(inputs.node.internal.type) {
        case "FacebookEvents": return transformFacebookEvent(inputs)
        default: return
    }
}

exports.setFieldsOnGraphQLNodeType = async ({ type }) => {
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
    }
    return {}
}