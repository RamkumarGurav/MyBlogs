import "@/styles/globals.css";
// import store from "../redux/store";
import { wrapper } from '../redux/store';
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();
// export default function App({ Component, pageProps }) {

export default function App({ Component, ...rest }) {
  

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  // const dispatch = useDispatch();
  // const { isAuthenticated, user } = useSelector((state) => ({ ...state.auth }));
  //------------user persist----------------------------
  //whenever user refresh page user data will be persist(remail) in user state of redux
  //1st we get user data that is stored in localstorage and then using useeffect hook we make sure that whevenve application page is refreshed or reloaded we dispatch an action to again store the user data in the user state of the redux
  //we dispatched this acton in root App component so that it applies to all the pages of our application


  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  );
}
