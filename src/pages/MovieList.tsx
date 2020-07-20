import MovieTable, { IMovieTableEvents } from '../components/MovieTable'
import {connect} from 'react-redux'
import { IRootState } from '../redux/reducers/RootReducer';
import { Dispatch } from 'react';
import MovieAction from '../redux/actions/MovieAction';


function mapStateToProps(state: IRootState) {
    return state.movie
}

function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents  {
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 20,
                key: ''
            }))
        },
        onSwitchChange(type, value, id) {
            dispatch(MovieAction.changeSwithAction(type, value, id))
        },
        async onDelete(id) {
            await dispatch(MovieAction.deletMovie(id))
        },
        onChange(newPage) {
            dispatch(MovieAction.fetchMovies({
                page: newPage
            }))
        },
        onKeyChange(key) {
            dispatch(MovieAction.setConditionAction({
                key
            }))
        },
        onSearch() {
            dispatch(MovieAction.fetchMovies({
                page: 1
            })) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)
