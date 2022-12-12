import React, {Fragment} from 'react'
import { countryActions } from '../app/countrySlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import classes from './Info.module.scss'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'

const Info = () => {

    const dispatch = useAppDispatch();
    const chosenCountry = useAppSelector(state => state.country.chosenCountry)

    const clickHandler = () => {
        dispatch(countryActions.hideInfo())
        dispatch(countryActions.clearChosenCountry())
    }

    const numberWithSpaces = (number:number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    let convertedNumbersPopulation;
    let sideTraffic; 
    let convertedTotalArea;

    if (chosenCountry) {
        convertedNumbersPopulation = numberWithSpaces(chosenCountry[0].population);
        convertedTotalArea = numberWithSpaces(chosenCountry[0].area);
        if (chosenCountry[0].car.side === 'right') {
            sideTraffic = 'Правостороннее'
        } else {
            sideTraffic = 'Левостороннее'
        }
    }


    return (
        <Fragment>
        { chosenCountry && 
        <motion.div initial={{y: '-100vh'}} animate={{y: 0}} className={classes.info}>
       <div className={classes.title}>
           <div>{chosenCountry[0].name.common}</div> 
           <p>Данные на 2020г.</p>
           <img src={chosenCountry[0].flags.svg} alt={'Flag'}/>
        </div>
       <div className={classes.main}>
            <div>Столица: {chosenCountry[0].capital}</div>
            <div>Население: {convertedNumbersPopulation} чел.</div>
            {/* <div>Площадь: {(convertedTotalArea === '-1') ? 'Нет данных'  : (convertedTotalArea + ' км2')}</div> */}
            <div>Движение: {sideTraffic}</div>
            <div>Официальные языки в стране: {Object.values(chosenCountry[0].languages).map((el,i, arr) => { return i !== arr.length - 1 ? <span key={i}>{el}{', '}</span> : <span key={i}>{el}</span>
            })}</div>
            <div>Валюта: {Object.values(chosenCountry[0].currencies).map((el:any, i) => {
                return <span key={i}>{el.name}({el.symbol})</span>
            })}</div>
       </div>
            <button onClick={clickHandler}>Скрыть</button>
        </motion.div>  }
        </Fragment>
    )
}

export default Info
