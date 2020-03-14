const axios = require("axios")
const crypto = require("crypto")

const processMatch = async(tournament, match) => {
  return {
    ... match,
    id: `${match.id}`,
    parent: `${tournament.id}`,
    internal: { 
      type: `ChallongeTournamentMatch`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(match))
        .digest(`hex`),
    }
  }
}

const processParticipant = async(tournament, participant) => {
  return {
    ... participant,
    id: `${participant.id}`,
    parent: `${tournament.id}`,
    internal: {
      type: `ChallongeTournamentParticipant`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(participant))
        .digest(`hex`),
    }
  }
}

const processTournament = async (actions, id, api_key) => {
  const { createNode } = actions

  const response = await axios.get(`https://api.challonge.com/v1/tournaments/${id}.json`, {
    params: {
      api_key,
      include_participants: 1,
      include_matches: 1
    }
  })

  const tournament = response.data.tournament

  const tournament_node = {
    ... tournament,
    id: `${tournament.id}`,
    internal: {
      type: `ChallongeTournament`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(tournament))
        .digest(`hex`),
    }
  }

  tournament.participants.map(async (participant) => {
    const participant_node = await processParticipant(tournament, participant)
    createNode(participant_node)
    return participant_node
  })

  return tournament_node
}

exports.sourceNodes = async ({ actions }, { api_keys: api_keys}) => {
    const { createNode } = actions
    // Create nodes here, generally by downloading data
    // from a remote API.
    api_keys.forEach(async (api_key) => {
      const tournaments = await axios.get('https://api.challonge.com/v1/tournaments.json', {
          params: {
            api_key
          }
        })

      // Process data into nodes.
      tournaments.data.forEach(async (datum) => {
        var tournament = await processTournament(actions, datum.tournament.id, api_key)
        return createNode(tournament)
      })
    })

    return
  }