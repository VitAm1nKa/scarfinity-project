import {combineReducers} from 'redux';

import tracks       from './tracks';
import playlists    from './playlists';
import filterTracks from './filterTracks';
import filters      from './filters';

export default combineReducers({
    tracks,
    playlists,
    filterTracks,
    filters,
})