import React from 'react';

const clientId = '4992ddaf29794b0ebb4f4eb1d49a5642';
// const clientSecret = '85160e6a78524ba283cb2bf79ac37012';

const querystring = require('querystring');
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        };
    }
    
    componentDidMount() {
        const hash = window.location.hash.substring(1).split('&').reduce(
            (obj, remaining) => {
                if (remaining) {
                    const next = remaining.split('=')
                    obj[next[0]] = decodeURIComponent(next[1])
                }
                return obj 
            }, {}
        )
        console.log(hash)
        const accessToken = hash.access_token
        if (accessToken) {
            if (!this.props.noCookie) {
              document.cookie = `spotifyAuthToken=${accessToken}; max-age=${60 * 60};`
            }
            if (this.props.localStorage) {
              window.localStorage.setItem('spotifyAuthToken', accessToken)
            }
            window.opener?.postMessage({ type: 'spotify-auth', accessToken }, '*')
            this.props.onAccessToken(accessToken)
        }
    }

    loginClick = (e) => {
        e.preventDefault()
        const url = (
            "https://accounts.spotify.com/authorize?" + 
            querystring.stringify({
                response_type: "token",
                client_id: clientId,
                scope: "user-library-read user-top-read playlist-read-private",
                redirect_uri: window.location.protocol + "//" + window.location.host + "/callback",
                show_dialog: true
            })
        ) 
        if (window.location !== window.parent.location) {
            const loginWindow = window.open(url)
            window.addEventListener('message', (e) => {
                if (e.data.type !== 'spotify-auth' || !e.data.accessToken) {
                    return
                }
                loginWindow.close()
                this.props.onAccessToken(e.data.accessToken)
            })
        } else {
            window.location = url 
        }
    }

    render() {
        return <div className='background'>
            <button className="login" onClick={(e) => this.loginClick(e)}> Login </button>
        </div>
    }
}

export default LoginPage;