import axios from "axios";
import { Vacancy } from "../types";

type AuthResponseType = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    reg_user_resumes_count: number;
    token_type: string;
    ttl: number;
}

type GetVacanciesResponseType = {
    objects: Vacancy[]
    total: number,
    more: boolean
}

const baseURL = 'https://startup-summer-2023-proxy.onrender.com/2.0/';
const PASSWORD = 'GEU4nvd3rej*jeh.eqp';
enum PassDate {
    login = 'sergei.stralenia@gmail.com',
    password = 'paralect123',
    client_id = '2356',
    client_secret = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    hr = '0',
}
const authResp = {
    access_token: "v3.r.137440105.88451540e35aad48efb83f3cd0bcbd7a2a19581b.842ea036ca63adc09bfbb3a0222e3b1b1ac3ecc4",
    expires_in: 604800,
    refresh_token: "v3.r.137440105.955d22bb7163db952073a10c373eaab93137cf0d.1eb4bb7dc95ceb93e4f26a545cc47ed1d9f9b308",
    reg_user_resumes_count: 1,
    token_type: "Bearer",
    ttl: 1684670517,
}

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': `${authResp.token_type} ${authResp.access_token}`,
        'x-secret-key': PASSWORD,
        'X-Api-App-Id': PassDate.client_secret,
    }
});

type FilterParamsType = {
    keyword: string
    payment_from: null | number
    payment_to: null | number
    catalogues: null | number
}

const defaultFilterParams = {
    keyword: '',
    payment_from: null,
    payment_to: null,
    catalogues: null
}

export const vacancyAPI = {
    async getAuth() {
        return await axios
            .get<AuthResponseType>
                (`${baseURL}oauth2/password?login=${PassDate.login}&password=${PassDate.password}&client_id=${PassDate.client_id}&client_secret=${PassDate.client_secret}&hr=${PassDate.hr}`,
                { headers: { 'x-secret-key': PASSWORD, } }
            );
    },
    getVacancies(params: FilterParamsType = defaultFilterParams) {
        return instance.get<GetVacanciesResponseType>
            (`vacancies?published=1&keyword=${params.keyword}&payment_from=${params.payment_from}&payment_to=${params.payment_to}&catalogues=${params.catalogues}`)
    },
    getCatalogies() {
        return instance.get('catalogues')
    }

}
