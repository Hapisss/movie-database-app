import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllMovies from './pages/AllMovies';
import WatchedMovies from './pages/WatchedMovies';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setConnected, setDisconnected } from './redux/slices/connectionSlice';
import OfflineIndicator from './components/OfflineIndicator';
import AddModal from './components/modals/AddModal';
import DetailModal from './components/modals/DetailModal';
import { useExecuteQueuedRequests } from './hooks/executeQueuedRequest.hooks';
import RequestQueue from './components/RequestQueue';

function App() {

  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.connection.isConnected);
  const modalAddOpen = useSelector(state => state.modal.modalAddOpen);
  const modalDetail = useSelector(state => state.modal.modalDetail);
  const request = useSelector(state => state.request.requests)

  useEffect(() => {

    function handleOnline() {
      dispatch(setConnected());
    }

    function handleOffline() {
      dispatch(setDisconnected());
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  useExecuteQueuedRequests();

  if (modalAddOpen || modalDetail.open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div className={`min-w-screen min-h-screen bg-gray-200`}>
      <Navbar />
      {!isConnected ? <OfflineIndicator /> : ''}
      {request.length > 0 ? <RequestQueue /> : ''}

      <Routes>
        <Route path='/' element={<AllMovies />} />
        <Route path='/watched' element={<WatchedMovies />} />
      </Routes>

      <AddModal isOpen={modalAddOpen} />
      <DetailModal isOpen={modalDetail.open} movie={modalDetail.movie} />
    </div>
  );
}

export default App;
