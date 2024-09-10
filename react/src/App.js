import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddSuperVisor from './componantDashboard/AddSuperVisor';
import UpdateSupervisors from './componantDashboard/UpdateSupervisors';
import MartyrsDash from './componantDashboard/MartyrsDash';
import DisplayMartysDash from './componantDashboard/DisplayMartysDash';
import DetaineesDash from './componantDashboard/DetaineesDash';
import DisplayDestainessDash from './componantDashboard/DisplayDestainessDash';
import MissingDash from './componantDashboard/MissingDash';
import DisplayMissingDash from './componantDashboard/DisplayMissingDash';
import WarCriminals from './componantDashboard/WarCriminals';
import DisplayWarCriminals from './componantDashboard/DisplayWarCriminals';
import TraitorsDash from './componantDashboard/TraitorsDash';
import DisplayTraitorsDash from './componantDashboard/DisplayTraitorsDash';
import HonorCard from './componantDashboard/HonorCard';
import DisplayHonorCard from './componantDashboard/DisplayHonorCard';
import LastNewsDash from './componantDashboard/LastNewsDash';
import RevolutionArchiveDash from './componantDashboard/RevolutionArchiveDash';
import SymbolsoftheRevolution from './componantDashboard/SymbolsoftheRevolution';
import BlackListDash from './componantDashboard/BlackListDash';
import CrimesSystem from './componantDashboard/CrimesSystem';
import UsersDash from './componantDashboard/UsersDash';
import AddUser from './componantDashboard/AddUser';
import UpdateUser from './componantDashboard/UpdateUser';
import SymbolThouraUser from './componantUser/SymbolThouraUser/SymbolThouraUser';
import BlackListUser from './componantUser/BlackListUser/BlackListUser';
import GaraamDaaehUser from './componantUser/GaraamDaaehUser/GaraamDaaehUser';
import GaraamQasad from './componantUser/GraamQasad/GaraamQasad';
import MainPage from './componantUser/MainPage/MainPage';
import { ContextProvider} from './context/Context';
import BaraemSystem from './componantUser/GaraamSystem/BaraemSystem';
import NewsDetails from './componantUser/NewsDetails/NewsDetails';
import WantedToSystem from './componantUser/WantedToSytstem/WantedToSystem';
import DataDisplaySite from './componantDashboard/DataDisplaySite';
import ResponseLastNews from './componantDashboard/ResponseLastNews';
import ResponseLastChild from './componantDashboard/DataSite/ResponseLastChild';
import DataSiteResponseMassacre from './componantDashboard/DataSite/DataSiteResponseMassacre';
import UpdateLastNews from './componantDashboard/DataSite/UpdateLastNews';
import ResponseUpdateChild from './componantDashboard/DataSite/ResponseUpdateChild';
import UpdateSiteMascers from './componantDashboard/DataSite/UpdateSiteMascers';
import NewsDetailsMascers from './componantUser/NewsDetails/NewsDetailsMascers';
import NewsDetailsMartyr from './componantUser/NewsDetails/NewsDetailsMartyr';
import UpdatedPassword from './componantUser/UpdatedPassword/UpdatedPassword.jsx';
import ProtectedRouted from './componantDashboard/ProtectedRouted.jsx';
import ArchiefThourahUser from "./componantUser/ArchiefThouraUser/ArchiefThourahUser.jsx";
import SpinnerFull from './componantUser/SpinnerFull.jsx';
import {  ContextDashboardProvider } from './context/DashboardContext.jsx';
import AllExcelDash from './componantDashboard/AllExcelDash.jsx';
import ExeclSheet from './componantDashboard/ExeclSheet.jsx';
import MainPageFirst from './componantUser/MainPageFirst/MainPageFirst.jsx';
import PrivacyPolicy from './componantUser/PrivacyPolicy/PrivacyPolicy.jsx';
import SingleUser from './componantDashboard/SingleUser.jsx';
import MessageDashboard from './componantDashboard/MessageDashboard.jsx';
import PaypalDashboard from './componantDashboard/PaypalDashboard.jsx';
import MainHistory from './componantDashboard/History/MainHistory.jsx';
import SingleMessageAndPaypal from './componantDashboard/SingleMessageAndPaypal.jsx';
import LastNewsDashFromUser from './componantDashboard/InformMessagesFromUser/LastNewsDashFromUser.jsx';
import DisplayLastNewsFromUser from './componantDashboard/InformMessagesFromUser/DisplayLastNewsFromUser.jsx';
import WathaaqFromUser from './componantDashboard/InformMessagesFromUser/WathaaqFromUser.jsx';
import DisplayWathaaqFromUser from './componantDashboard/InformMessagesFromUser/DisplayWathaaqFromUser.jsx';
import ProtectedRoutedOnUser from './componantDashboard/ProtectedRoutedOnUser.jsx';
import BackgroundImage from './componantDashboard/BackgroundDashboard/BackgroundImage.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchList from './componantUser/SearchGlobal/SearchList.jsx';
import SearchChild from './componantUser/SearchGlobal/SearchChild.jsx';
import SearchMascers from './componantUser/SearchGlobal/SearchMascers.jsx';
import PrivateNews from './componantDashboard/privateNews/privateNews.jsx';
import PrivateNewsUser from './componantUser/privateNewsUser/privateNewsUser.jsx';


const HomeUser = lazy( () => import( './componantUser/HomeUser.jsx' ) );
const HomeDashboard = lazy(() =>
  import("./componantDashboard/HomeDashboard.jsx")
);
export default function App() {
  let queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ContextDashboardProvider>
        <ContextProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFull />}>
              <Routes>
                <Route path="/" element={<HomeUser />}>
                  <Route path="/" element={<MainPageFirst />} />
                  <Route path="/lastNews" element={<MainPage />} />
                  <Route
                    path="archiefthoura"
                    element={<ArchiefThourahUser />}
                  />
                  <Route
                    path="symbolthourauser"
                    element={<SymbolThouraUser />}
                  />
                  <Route path="blacklistuser" element={<BlackListUser />} />
                  <Route path="graamsystem" element={<BaraemSystem />} />
                  <Route path="graemqasad" element={<GaraamQasad />} />
                  <Route path="graemdashuser" element={<GaraamDaaehUser />} />
                  <Route path="privateNewsUser" element={<PrivateNewsUser />} />
                  <Route path="/success/:id" element={<UpdatedPassword />} />
                  <Route path="privacypolicy" element={<PrivacyPolicy />} />
                </Route>
                <Route path="newsDetails/:id" element={<NewsDetails />} />
                <Route
                  path="NewsDetailsMascers/:id"
                  element={<NewsDetailsMascers />}
                />
                <Route
                  path="NewsDetailsMartyr/:id"
                  element={<NewsDetailsMartyr />}
                />

                <Route path="WantedToSystem" element={<WantedToSystem />} />
                <Route path="searchList" element={<SearchList />} />
                <Route path="searchchild" element={<SearchChild />} />
                <Route path="searchmascers" element={<SearchMascers />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRouted>
                      <HomeDashboard />
                    </ProtectedRouted>
                  }
                >
                  <Route path="singleUser/:id" element={<SingleUser />} />
                  <Route path="addsupervisor" element={<AddSuperVisor />} />
                  <Route
                    path="updatesupervisor"
                    element={<UpdateSupervisors />}
                  />
                  <Route path="privateNews" element={<PrivateNews />} />
                  <Route path="message" element={<MessageDashboard />} />
                  <Route path="background" element={<BackgroundImage />} />
                  <Route path="paypal" element={<PaypalDashboard />} />
                  <Route
                    path="singlemessageandpaypal/:id"
                    element={<SingleMessageAndPaypal />}
                  />
                  <Route path="history" element={<MainHistory />} />
                  <Route path="addsupervisor" element={<AddSuperVisor />} />
                  <Route path="martyrs" element={<MartyrsDash />} />
                  <Route path="martyrs/:id" element={<DisplayMartysDash />} />
                  <Route path="detaineesdash" element={<DetaineesDash />} />
                  <Route
                    path="detaineesdash/:id"
                    element={<DisplayDestainessDash />}
                  />
                  <Route path="missingdash" element={<MissingDash />} />
                  <Route
                    path="missingdash/:id"
                    element={<DisplayMissingDash />}
                  />
                  <Route path="warcriminals" element={<WarCriminals />} />
                  <Route
                    path="displaywarcriminals/:id"
                    element={<DisplayWarCriminals />}
                  />
                  <Route path="traitors" element={<TraitorsDash />} />
                  <Route
                    path="traitors/:id"
                    element={<DisplayTraitorsDash />}
                  />
                  <Route path="honorcard" element={<HonorCard />} />
                  <Route path="honorcard/:id" element={<DisplayHonorCard />} />
                  <Route
                    path="lastnewsfromuser"
                    element={<LastNewsDashFromUser />}
                  />
                  <Route
                    path="displaylastnewsfromuser/:id"
                    element={<DisplayLastNewsFromUser />}
                  />
                  <Route path="wathaaqfromuser" element={<WathaaqFromUser />} />
                  <Route
                    path="displaywathaaqfromuser/:id"
                    element={<DisplayWathaaqFromUser />}
                  />

                  <Route path="lastnewsdash" element={<LastNewsDash />} />
                  <Route
                    path="revolutionarchivedash"
                    element={<RevolutionArchiveDash />}
                  />
                  <Route
                    path="symbolsoftherevolution"
                    element={<SymbolsoftheRevolution />}
                  />
                  <Route path="allexcel" element={<AllExcelDash />} />
                  <Route path="excel" element={<ExeclSheet />} />
                  <Route path="blacklist" element={<BlackListDash />} />
                  <Route path="crimessystem" element={<CrimesSystem />} />
                  <Route
                    path="userDash"
                    element={
                      <ProtectedRoutedOnUser>
                        <UsersDash />
                      </ProtectedRoutedOnUser>
                    }
                  />
                  <Route path="AddUser" element={<AddUser />} />
                  <Route path="updateuser" element={<UpdateUser />} />
                  <Route path="dataDisplaySite" element={<DataDisplaySite />} />
                  <Route
                    path="dataDisplaySite/:id"
                    element={<ResponseLastNews />}
                  />
                  <Route
                    path="dataChildDisplaySite/:id"
                    element={<ResponseLastChild />}
                  />
                  <Route
                    path="dataChildDisplaySitemascr/:id"
                    element={<DataSiteResponseMassacre />}
                  />
                  <Route
                    path="dataDisplaySiteupdate/:id"
                    element={<UpdateLastNews />}
                  />
                  <Route
                    path="dataChildDisplaySiteupdate/:id"
                    element={<ResponseUpdateChild />}
                  />
                  <Route
                    path="dataChildDisplaySitemascrupdate/:id"
                    element={<UpdateSiteMascers />}
                  />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ContextProvider>
      </ContextDashboardProvider>
    </QueryClientProvider>
  );
}
