
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { ThunkDispatch } from "redux-thunk/es/types";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { VacanciesActionType, vacanciesReducer } from './reducers/vacanciesReducer';

const rootReducer = combineReducers({
    vacancies: vacanciesReducer,
    //catalogues: cataloguesReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ReduxStoreType = typeof store;
export type AllActionsType = VacanciesActionType;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// кастомный хук для того, чтобы не типизировать хук useDispatch при каждом использовании
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
