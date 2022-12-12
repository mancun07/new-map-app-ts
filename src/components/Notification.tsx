import React from 'react'
import classes from './Notification.module.scss'
import { motion } from 'framer-motion'

const Notification:React.FC<{error:any}> = (props) => {

    return (
        <motion.div initial={{y: '-100vh'}} animate={{y: 0}} className={classes.notification}>
            {props.error}
        </motion.div>
    )
}

export default Notification
