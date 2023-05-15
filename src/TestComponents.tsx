import React, { useEffect } from 'react'
import { vacancyAPI } from './APITools/APITools'

export const GetComponent = () => {

    useEffect(() => {
        console.log('render')
        vacancyAPI.getVacancys().then(res => {
            console.log(res.data)
        })
    }, [])
    
    return <div> {JSON.stringify('state')}</div>
}