import {combineReducers} from 'redux';

import tracks       from './tracks';
import playlists    from './playlists';
import filterTracks from './filterTracks';
import rating       from './filters/rating';
import colors       from './filters/colors';
import priceRange   from './filters/price-range';
import season       from './filters/season';

export default combineReducers({
    tracks,
    playlists,
    filterTracks,
    rating,
    colors,
    priceRange,
    season,
})