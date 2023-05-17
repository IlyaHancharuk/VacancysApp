
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { ThunkDispatch } from "redux-thunk/es/types";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { VacanciesActionType, vacanciesReducer } from './reducers/vacanciesReducer';
import { FavoriteActionType, favoriteReducer } from './reducers/favoritesReducer';

const rootReducer = combineReducers({
    vacancies: vacanciesReducer,
    favorite: favoriteReducer
    //catalogues: cataloguesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ReduxStoreType = typeof store
export type AllActionsType = VacanciesActionType | FavoriteActionType
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
