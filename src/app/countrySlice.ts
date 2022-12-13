import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type of slice

interface CountryState {
    items: [],
    infoIsShown: boolean,
    chosenCountry: any,
    filteredItems: any,
    menuIsShown: boolean,
    loading: boolean,
    error: any
}

const initialState:CountryState = {
    items: [],
    infoIsShown: false,
    chosenCountry: null,
    filteredItems: null,
    menuIsShown: false,
    loading: false,
    error: null
}

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        addDataToRedux: (state, action:PayloadAction<[]>) => {
            state.items = action.payload
        },
        showInfo: (state) => {
            state.infoIsShown = true
        },
        hideInfo: (state) => {
            state.infoIsShown = false
        },
        setChosenCountry: (state, action:PayloadAction<[]>) => {
            state.chosenCountry = action.payload
        },
        clearChosenCountry: (state) => {
            state.chosenCountry = null
        },
        filterByQuantity: (state, action:PayloadAction<number>) => {
            state.filteredItems = state.items.filter((el:any) => {
                return el.population > action.payload
            })
        },
        filterByLanguage: (state, action:PayloadAction<string>) => {
    
                state.filteredItems = state.items && state.items.filter((el:any) => {
                    let langs = el.languages && Object.values(el.languages)
             
                    return langs && langs.includes(action.payload)
                })
        },
        toggleMenu: (state) => {
            state.menuIsShown = !state.menuIsShown
        },
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action:PayloadAction<string|null>) => {
            state.error = action.payload
        }
    }

})


export const countryActions = countrySlice.actions;

export default countrySlice.reducer;



