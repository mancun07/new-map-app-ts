import React, {useEffect} from 'react';
import Map from './components/Map';
import Header from './components/Header';
import Loader from './components/Loader';
import Info from './components/Info';
import {getData} from './app/actions'
import Notification from './components/Notification';
import { useAppSelector, useAppDispatch } from './hooks/hooks'

function App() {
    const infoIsShown = useAppSelector(state => state.country.infoIsShown)
    const loading = useAppSelector(state => state.country.loading)
    const error = useAppSelector(state => state.country.error)

    const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getData());
  }, [dispatch])

  return (
    <div className="app">
      <Header/>
      {loading && <Loader />}
      <Map/>
      {infoIsShown && <Info/>}
      {error && <Notification error={error} />}
    </div>
  );
}

export default App;
