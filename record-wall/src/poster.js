import React from 'react';

const clientId = '4992ddaf29794b0ebb4f4eb1d49a5642';
// const clientSecret = '85160e6a78524ba283cb2bf79ac37012';

const querystring = require('querystring');

function makePlaylistButton(t, playlist) {
    return (
        <li key={playlist.id}>
            <button className={playlist.selected ? "button selected" : "button"} onClick={() => t.toggleSelected(playlist)} >{playlist.name}</button>
        </li>
    )
}

class PosterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
        };
    }

    updatePlaylists() {
        this.setState({playlists:[
            {name: "Your top songs 2021", id: "key1", selected: false},
            {name: "Your top songs 2020", id: "key2", selected: false},
        ]})
    }

    toggleSelected(p) {
        var newPlaylists = this.state.playlists
        newPlaylists.filter((a) => p.id === a.id)[0].selected = !newPlaylists.filter((a) => p.id === a.id)[0].selected
        this.setState({playlists: newPlaylists})
        console.log(newPlaylists)
    }

    componentDidMount() {
        this.updatePlaylists()
    }
    
    render() {
        return <div className='background'>
            <p> Select playlists: </p>
            <div id="playlist-list"> 
            <ul style={{"list-style": "none"}}>
                {this.state.playlists.map(p => makePlaylistButton(this, p))}
            </ul>       
            </div>
            <button class="button" onClick={() => {
                const playlists = this.state.playlists.filter((p) => p.selected).map((p) => p.id).join(",")
                window.location.replace(window.location.protocol + "//" + window.location.host + "/load-poster?playlists=" + playlists)
            }
            }>Continue</button>
        </div>
    }
}

export default PosterPage;