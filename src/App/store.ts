
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { ThunkDispatch } from "redux-thunk/es/types";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { VacanciesActionType, vacanciesReducer } from './reducers/vacanciesReducer';
import { FavoriteActionType, favoriteReducer } from './reducers/favoritesReducer';
import { CategoriesActionType, categoriesReducer } from './reducers/categoriesReducer';
import { FilterParamsActionType, filterParamsReducer } from './reducers/filterParamsReducer';
import { AppActionsType, appReducer } from './reducers/appReducer';

const rootReducer = combineReducers({
    vacancies: vacanciesReducer,
    favorite: favoriteReducer,
    categories: categoriesReducer,
    filterParams: filterParamsReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ReduxStoreType = typeof store
export type AllActionsType = VacanciesActionType
    | FavoriteActionType
    | CategoriesActionType
    | FilterParamsActionType
    | AppActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
