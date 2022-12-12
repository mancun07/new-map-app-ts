import React, {useEffect} from 'react'
import { countryActions } from '../app/countrySlice'
import classes from './Header.module.scss'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'

const Header = () => {

    const items = useAppSelector((state) => state.country.items)
    const menuIsShown = useAppSelector((state)=> state.country.menuIsShown)
    const dispatch = useAppDispatch();
    
    // useEffect(() => {
    //     if (window.innerWidth > 500) {
    //         dispatch(countryActions.toggleMenu())
    //     }
    // }, [dispatch, window.innerWidth])



    const onChangeHandler = (value:number) => {
        dispatch(countryActions.filterByQuantity(value))
        dispatch(countryActions.toggleMenu())
    }

    const onChangeHandler2 = (value:string) => {
        dispatch(countryActions.filterByLanguage(value))
        dispatch(countryActions.toggleMenu())
    }

    const mobileMenuHandler = () => {
        dispatch(countryActions.toggleMenu())
    }

    // получаем массив, состоящий только из языков, чтобы вывести в select языки
    const onlyLanguages = items && items.map(el => {
        const {languages} = el;
        let arr = languages && Object.values(languages).slice(0,1)
        let mainLanguage = arr && arr[0]
        return mainLanguage
    })


    const onlyUnique = (arr: string[]) => {
        let newArr:string[] =  [];
        for (const el of arr) {
            if (!newArr.includes(el) && el !== undefined) {
                newArr.push(el)
            }
        }
        return newArr
    }

    // оставляем только уникальные языки в массиве
    const uniqueLanguages = onlyUnique(onlyLanguages)
    .sort((a, b) => {
        return a > b ? 1 : -1
    })
    .map(el => {
        return {
            language: el,
            id: Math.random()
        }
    })

    return (
        <div className={classes.header}>
            <h2>Узнай основные факты о стране (всего одним кликом!)</h2>
            <div className={classes.hamb__button} onClick={mobileMenuHandler}></div>
            <div className={`${classes.navbar} ${menuIsShown && classes.navbar__isShown}`}>
                <div className={classes.navbar__item}>
                    <label htmlFor="population">Показать на карте страны с численностью населения:</label>
                    <select name="population" id="population" onChange={(e => onChangeHandler(e.target.value))}>
                        <option value={0}>Все страны</option>
                        <option value={10000000}>Более 10млн человек</option>
                        <option value={30000000}>Более 30млн человек</option>
                        <option value={50000000}>Более 50млн человек</option>
                        <option value={70000000}>Более 70млн человек</option>
                        <option value={100000000}>Более 100млн человек</option>
                    </select>
                </div>
                <div className={classes.navbar__item}>
                    <label htmlFor="language">Показать на карте страны, в которых выбранный ниже язык, является официальным:</label>
                    <select  name="language" id="language" onChange={e => onChangeHandler2(e.target.value)}>
                        <option>Все языки</option>
                    {uniqueLanguages && uniqueLanguages.map((el) => {
                        return <option key={el.id} value={el.language}>{el.language}</option>
                    })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Header
