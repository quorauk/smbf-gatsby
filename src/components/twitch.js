import React, { useEffect, useState } from "react"

import axios from "axios"
import styled from "styled-components"

const Embed = styled.div`
    min-height: 80vh;

    iframe {
        min-height: inherit;
        margin-bottom: 0;
    }
`

const Twitch = () => {
    const client_id = "2yfqizhjeqzumn8gl5dk0nax32y2yp"
    const [ twitchStream, setStream ] = useState(null)
    var client = axios.create({
        baseURL: 'https://api.twitch.tv/',
        timeout: 1000,
        headers: {'Client-ID': client_id}
      });

    const EMBED_URL = "https://embed.twitch.tv/embed/v1.js"
    useEffect(() => {
        if (twitchStream !== null) {
            const props = {
                targetID: 'twitch-embed',
                width: '100%',
                height: '100%',
                channel: 'sodiumshowdown',
                autoplay: "false"
            }

            const script = document.createElement('script');
            script.setAttribute(
            'src',
            EMBED_URL
            );
            script.addEventListener('load', () => {
                var embed = new window.Twitch.Embed(props.targetID, { ...props });
                embed.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
                    var player = embed.getPlayer();
                    player.pause();
                });
            });
            document.body.appendChild(script);
        }
    }, [twitchStream])
    
    useEffect(() => {
        async function getStream() {
            const live = await client.get('/helix/streams?user_login=sodiumshowdown')
            if (live.data.data.length > 0) {
                setStream(live.data.data[0])
            }
        }
        if (twitchStream === null) {
            getStream()
        }
    }, [client, setStream, twitchStream])


    if (twitchStream !== null) {
        return <Embed id="twitch-embed"></Embed>
    } else {
        return (
            <>
            </>
        )
    }
}

export default Twitch
