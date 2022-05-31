import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AddBook } from '../src/screens/admin/addBook';
import './App.css';
import { BookDetails } from './components/BookDetails';
import BooksCatalogue from './components/BooksCatalogue';
import HistoryGrid from './components/HistoryGrid';
import { IssuedBooks } from './components/Issued';
import { RequestBook } from './components/RequestBook';
import { RequestStatus } from './components/requestStatus';
import { SearchBook } from './components/searchBook';
import { AuthContext, AuthProvider } from './context/authProvider';
import { RequestedBooks } from './screens/admin/requestedBooks';
import { UpdateBook } from './screens/admin/updateBook';
import { Dashboard } from './screens/Dashboard';
import { HomePage } from './screens/HomePage';

function App() {

  const { role } = useContext(AuthContext);
  // console.log(role === 'admin');
  // console.log(token ? role : "null");

  return (
    <>

      <div className="App">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{ duration: 3500 }}
        />
        {/* to deploy the app on github pages, BrowserRouter requires a basename (root url) to be provided = basename='http://vidhi-arora.github.io/lib-mng-system' */}
        <Router>
          <Routes>

            {/* when role not specified, nvigating to any link other than login/signup, will navigate to login */}
            <Route path="*" element={<Navigate replace to="/" />} />

            {/* 1. Homepage Route */}
            <Route path="/" element={<HomePage />}>
              {/* <Route path="/login" element={<LoginCard />} /> */}
              {/* <Route path="/signup" element={<SignupCard />} /> */}
            </Route>

            {role === 'user' ?
              <>
                {/* 2. Dashboard Route */}
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="/dashboard" element={<Navigate replace to="/dashboard/viewBooks" />} />
                  {/* <Route path="home" element={<Home />} /> */}
                  {/* <Route path="profile" element={<Profile />} /> */}
                  <Route path="issuedBooks" element={<IssuedBooks />} />
                  <Route path="viewBooks" element={<BooksCatalogue />} />
                  <Route path="viewBooks/bookDetails" element={<BookDetails />} />
                  <Route path="viewBooks/search" element={<SearchBook />} />
                  {/* <Route path="read/bookDetails" element={<BookDetails />} /> */}
                  <Route path="requestBook" element={<RequestBook />} />
                  <Route path="read" element={<HistoryGrid />} />
                  <Route path="requestStatus" element={<RequestStatus />} />
                </Route>
                {/* <Route path="recommendations" element={<Recommendations />} /> */}
                {/* <Route path="pendingDues" element={<Dues />} /> */}
              </>
              : role === 'admin' ?
                <>
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard" element={<Navigate replace to="/dashboard/viewBooks" />} />
                    <Route path="viewBooks" element={<BooksCatalogue />} />
                    <Route path="viewBooks/bookDetails" element={<BookDetails />} />
                    <Route path="viewBooks/search" element={<SearchBook />} />

                    <Route path="addBook" element={<AddBook />} />
                    <Route path="viewBooks/updateBook" element={<UpdateBook />} />
                    <Route path="requestedBooks" element={<RequestedBooks />} />
                  </Route>
                </> :
                <>
                  {/* disable switching of roles */}
                  <Route path="*" element={<Navigate replace to="/" />} />
                </>
            }

          </Routes>
        </Router>

      </div>

    </>
  );
}
function MainApp() {
  return (
    <AuthProvider>
      {/* <ToastProvider placement="bottom-right" autoDismiss={true} autoDismissTimeout={4500}><App /></ToastProvider> */}
      {/* <Toaster
        position="bottom-right"
        reverseOrder={false}
      > */}
      <App />
      {/* </Toaster> */}
    </AuthProvider>
  )
}

export default MainApp;
