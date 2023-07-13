import axios from "axios";
import { AuthResponseType, FilterParamsType, GetCategoriesResponseType, GetVacanciesResponseType, Vacancy } from "../types";
import vacanciesDemoData from '../data/vacancies.json'
import cataloguesDemoData from '../data/catalogues.json'

const baseURL = 'https://api.superjob.ru/2.0/';
const PASSWORD = 'GEU4nvd3rej*jeh.eqp';
enum PassDate {
    login = 'sergei.stralenia@gmail.com',
    password = 'paralect123',
    client_id = '2356',
    client_secret = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    hr = '0',
}

const access_token = (() => {
    const authDataStr = localStorage.getItem('joboredAuthData')
    if (authDataStr) {
        const authData: AuthResponseType = JSON.parse(authDataStr)
        return authData.access_token
    }
})()

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': `Bearer ${access_token}`,
        'x-secret-key': PASSWORD,
        'X-Api-App-Id': PassDate.client_secret,
    }
});

export const vacancyAPI = {
    async getAuth() {
        return await axios
            .get<AuthResponseType>
                (`${baseURL}oauth2/password?login=${PassDate.login}&password=${PassDate.password}&client_id=${PassDate.client_id}&client_secret=${PassDate.client_secret}&hr=${PassDate.hr}`,
                { headers: { 'x-secret-key': PASSWORD, } }
            )
    },
    async refreshToken(refreshToken: string) {
        return await axios
            .get<AuthResponseType>
                (`${baseURL}oauth2/refresh_token/?refresh_token=${refreshToken}&client_id=${PassDate.client_id}&client_secret=${PassDate.client_secret}`,
                { headers: { 'x-secret-key': PASSWORD, } }
            )
    },

    getVacancies(params: FilterParamsType, page = 1, count = 4) {
        return instance.get<GetVacanciesResponseType>
            (`vacancies?page=${page}&count=${count}&published=1&keyword=${params.keyword}&payment_from=${params.payment_from}&payment_to=${params.payment_to}&catalogues=${params.category}`)
    },
    getCategories() {
        return instance.get<GetCategoriesResponseType>('catalogues')
    }
}

export const favoriteVacanciesAPI = {
    getFavoriteVacancies() {
        const value = localStorage.getItem('favoriteVacancies')
        if (value) {
            return JSON.parse(value) as Vacancy[]
        }
    },

    addFavoriteVacancies(vacancy: Vacancy) {
        const favoriteVacancies = this.getFavoriteVacancies()
        const newFavoriteVacancies: Vacancy[] =
            favoriteVacancies
                ? [...favoriteVacancies, { ...vacancy, isFavorite: true }]
                : [{ ...vacancy, isFavorite: true }]
        localStorage.setItem('favoriteVacancies', JSON.stringify(newFavoriteVacancies))
    },
    
    removeFavoriteVacancies(vacancyId: number) {
        const favoriteVacancies = this.getFavoriteVacancies()
        if (favoriteVacancies) {
            const newFavoriteVacancies: Vacancy[] = favoriteVacancies.filter(fv => fv.id !== vacancyId)
            localStorage.setItem('favoriteVacancies', JSON.stringify(newFavoriteVacancies))
        }
    }
}

export const demoVacanciesAPI = {
    async getAuth() {
        return new Promise((res) => {
            res('Aутентификация успешна')
        })
    },

    getVacancies(params: FilterParamsType, page = 0, count = 4) {
        const vacancies = vacanciesDemoData.objects
            .filter(vacancy => params.payment_from === '' || vacancy.payment_from >= params.payment_from)
            .filter(vacancy => params.payment_to === '' || (vacancy.payment_to <= params.payment_to && params.payment_to >= vacancy.payment_from))
            .filter(vacancy => params.keyword === '' || vacancy.profession.toLowerCase().includes(params.keyword))
            .filter(vacancy => params.category === '' || vacancy.catalogues.some(cat => cat.key.toString() === params.category))
        const vacanciesToView = vacancies.length !==0
            ? vacancies.slice((page * count - count), (page * count))
            : [{
                isFavorite: false,
                id :'',
                payment_from: '',
                payment_to: '',
                currency: '',
                profession: '',
                type_of_work: '',
                town: '',
                firm_name: '',
                vacancyRichText: ''
            }]
        return new Promise((res) => {
            res({
                status: 200,
                data: {
                    ...vacanciesDemoData,
                    objects: vacanciesToView,
                    total: vacancies.length
                }
            })
        })
    },

    getCategories() {
        return new Promise((res) => {
            res({
                status: 200,
                data: cataloguesDemoData
            })
        })
    }
}
