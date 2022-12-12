import React from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../hooks/hooks'

const Map:React.FC = () => {

  const items = useAppSelector(state => state.country.items)
  const filteredItems = useAppSelector(state => state.country.filteredItems)

  const updatedItems = items.map((el:any) => {
    return {
      ...el,
      id: Math.random()
    }
  })

  const updatedFilteredItems = filteredItems && filteredItems.map((el:any) => {
    return {
      ...el,
      id: Math.random()
    }
  })

  const itemsToMap = updatedItems.map((el:any) => {
    return <Marker key={el.id}
    lat={el.latlng[0]}
    lng={el.latlng[1]}
    name={el.name.common}
    flag={el.flags.svg}
  />
})

  const filteredItemsToMap = filteredItems && updatedFilteredItems.map((el:any) => {
    return <Marker key={el.id}
    lat={el.latlng[0]}
    lng={el.latlng[1]}
    name={el.name.common}
    flag={el.flags.svg}
  />
})


    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={{lat: 59.95, lng: 30.33}}
        defaultZoom={3}
      >
        {!filteredItems ? itemsToMap : filteredItemsToMap}

      </GoogleMapReact>
    </div>
    )
}


export default Map
