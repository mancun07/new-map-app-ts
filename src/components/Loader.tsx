import React from 'react'
import classes from './Loader.module.scss'

const Loader:React.FC = () => {
    return (
        <div className={classes.loading}>
            <div className={classes[`lds-dual-ring`]}> </div>
            <h2>Подождите, идет загрузка...</h2>            
           
        </div>

    )
}

export default Loader
