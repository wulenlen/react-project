import { IAction } from "./ActionTypes";
import { ISearchCondition } from "../reducers/MovieReducer";
import { ThunkAction } from 'redux-thunk'
import { IRootState } from "../reducers/RootReducer";
import { SwitchType } from "../../components/MovieTable";

export type SaveMoviesAction = IAction<'movie_save', {
    movies: any[]
    total: number
}>

function saveMoviesAction(movies: any, total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<'movie_setLoading', boolean>

function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: 'movie_setLoading',
        payload: isLoading
    }
}

export type SetConditionAction = IAction<'movie_setCondition', Partial<ISearchCondition>>

function setConditionAction(condition: Partial<ISearchCondition>): SetConditionAction {
    return {
        type: 'movie_setCondition',
        payload: condition
    }
}

export type DeletAction = IAction<'movie_delete', string>

function deleteAction(id: string): DeletAction {
    return {
        type: 'movie_delete',
        payload: id
    }
}

export type MovieChangeSwitchAction = IAction<'movie_switch', {
    type: SwitchType, 
    newVal: boolean, 
    id: string
}>

function changeSwithAction(type: SwitchType, newVal: boolean, id: string): MovieChangeSwitchAction {
    return {
        type: 'movie_switch',
        payload: {
            type,
            newVal,
            id
        }
    }
}

function fetchMovies(condition: Partial<ISearchCondition>)
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
        return async (dispatch, getState) => {
            dispatch(setLoadingAction(true))

            dispatch(setConditionAction(condition))

            // //获取服务器数据
            // const curCondition = getState().movie.condition
            // const resp = await MovieService.getMovies(curCondition)
            //更改仓库数据
            dispatch(saveMoviesAction([{
                _id: '10' + getState().movie.data.length,
                name: 'hhh' + Math.random(),
                areas: ['ch', 'dl'],
                types: ['haha','lalal'],
                isHot: false
            }], ++getState().movie.data.length))

            dispatch(setLoadingAction(false))
        }  
}

function deletMovie(id: string)
    : ThunkAction<Promise<void>, IRootState, any, DeletAction> {
        return async (dispatch) => {
            dispatch(deleteAction(id))
        }  
}

export type MovieActions = DeletAction | SetConditionAction | SetLoadingAction | SaveMoviesAction | MovieChangeSwitchAction

export default {
    saveMoviesAction,
    setLoadingAction,
    setConditionAction,
    deleteAction,
    fetchMovies,
    deletMovie,
    changeSwithAction
}