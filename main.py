from typing import Set
import graphics
from common import authenticate_user

# https://developer.spotify.com/web-api/using-scopes/
scope = 'user-library-read user-top-read playlist-read-private'

# Return username, spotify
def auth():
    return authenticate_user('user-library-read user-top-read playlist-read-private')

def curr_user_library_tracks(spotify):
    tracks = []
    total = 1
    while len(tracks) < total:
        tracks_response = spotify.current_user_saved_tracks(offset=len(tracks))
        tracks.extend(tracks_response.get('items', []))
        total = tracks_response.get('total')

    if 'track' in tracks[0]:
        return [track.get('track') for track in tracks]
    else: 
        return tracks
    
def curr_user_playlists(spotify):
    resp = spotify.current_user_playlists()
    playlists = resp['items']
    while resp['next']:
        resp = spotify.next(resp)
        playlists.extend(resp['items'])
    return playlists 

def curr_user_playlist_tracks(spotify, playlists, target_name):
    p = None
    for item in playlists:
        if item['name'] == target_name:
            p = item
            break
    if not p:
        print(f"Couldn't find playlist '{target_name}'")
        names = [p['name'] for p in playlists]
        print(names)

    tracks = []
    resp = spotify.playlist(p['id'])
    tracks.extend(resp['tracks']['items']) 
    while resp and 'next' in resp['tracks']:
        resp = spotify.next(resp['tracks'])
        if resp:
            tracks.extend(resp['tracks']['items']) 

    return [track.get('track') for track in tracks]

def make_visual_configs(tracks):
    print(tracks[0])
    visuals = []
    seen = set() 
    for t in tracks:
        name = t['name']
        artist = t['artists'][0]['name']
        img_url = t['album']['images'][1]['url']
        if img_url not in seen:
            seen.add(img_url)
            visuals.append([name, artist, img_url])
    return visuals

def generate_liked_songs_poster(outfile):
    _, spotify = auth()
    tracks = curr_user_library_tracks(spotify)
    visual_configs = make_visual_configs(tracks) 
    graphics.make_color_sorted_poster(visual_configs, outfile=outfile)

def generate_poster_from_playlist(outfile, playlist_name):
    _, spotify = auth()
    playlists = curr_user_playlists(spotify)
    tracks = curr_user_playlist_tracks(spotify, playlists, playlist_name)
    visual_configs = make_visual_configs(tracks) 
    graphics.make_color_sorted_poster(visual_configs, outfile=outfile)

if __name__ == '__main__':
    # generate_liked_songs_poster("out.png")
    generate_poster_from_playlist('out.png', 'Your Top Songs 2021')

