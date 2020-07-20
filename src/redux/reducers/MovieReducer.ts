import { MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction, DeletAction, MovieChangeSwitchAction } from "../actions/MovieAction";
import { Reducer } from "react";

export interface ISearchCondition {
    page: number
    limit: number
    key: string
}

export interface IMovieState {
    data: any[]
    condition: ISearchCondition
    total: number
    isLoading: boolean,
    totalPage: number
}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ''
    },
    total: 0,
    totalPage: 0,
    isLoading: false
}

type MovieReducer<A> = Reducer<IMovieState, A>

const saveMovie: MovieReducer<SaveMoviesAction> = function (state, action) {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total,
        totalPage: Math.ceil(action.payload.total / state.condition.limit)
    }
}

const setCondition: MovieReducer<SetConditionAction> = function (state, action) {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }

    newState.totalPage = Math.ceil(newState.total / newState.condition.limit)

    return newState
}

const setLoading: MovieReducer<SetLoadingAction> = function (state, action) {
    return {
        ...state,
        isLoading: action.payload
    }
}

const deletMovie: MovieReducer<DeletAction> = function (state, action) {
    return {
        ...state,
        data: state.data.filter(m => m._id !== action.payload),
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.limit)
    }
}

const changeSwitch: MovieReducer<MovieChangeSwitchAction> = function(state, action) {
    const movie = state.data.find(d => d._id === action.payload.id)

    if(!movie) {
        return state
    }

    const newMovie = { ...movie }
    newMovie[action.payload.type] = action.payload.newVal
    const newData = state.data.map(d => {
        if(d._id === action.payload.id) {
            return newMovie
        }

        return d
    })
    console.log(newData)
    return {
        ...state,
        data: newData
    }
}

export default function (state: IMovieState = defaultState, action: MovieActions) {
    switch(action.type) {
        case 'movie_delete':
            return deletMovie(state, action)
        case 'movie_save': 
            return saveMovie(state, action)
        case 'movie_setCondition':
            return setCondition(state, action)
        case 'movie_setLoading':
            return setLoading(state, action)
        case 'movie_switch':
            return changeSwitch(state, action)
        default:
            return state
    }
}