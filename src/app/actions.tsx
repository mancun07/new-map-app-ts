import {countryActions} from './countrySlice';

export const getData = () => {
    return async (dispatch:any) => {

        const fetchData = async () => {
            dispatch(countryActions.setLoading(true))
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            if (!response.ok) {
                throw new Error('Извините, возникла ошибка. Попробуйте перезагрузить приложение.')
            }
            const data = await response.json();
            dispatch(countryActions.addDataToRedux(data))
            
        }

        try {
            await fetchData();
        } catch (err) {
            dispatch(countryActions.setError(err.message))
            setTimeout(() => {
            dispatch(countryActions.setError(null))
            }, 5000)
        }
        dispatch(countryActions.setLoading(false))

    }
}

export const getSingleData = (name:string) => {
    return async (dispatch:any) => {

        const fetchSingleData = async () => {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            if (!response.ok) {
                throw new Error('Извините, возникла ошибка. Попробуйте перезагрузить приложение.')
            }
            const data = await response.json();
            dispatch(countryActions.setChosenCountry(data))
        }

        try {
            await fetchSingleData()
        } catch (err: Error) {
            dispatch(countryActions.setError(err.message))
        }
    }
}