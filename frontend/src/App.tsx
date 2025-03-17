
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/authCallback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
       path="/sso-callback" 
       element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={"/auth-callback"} />} 
       />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
    
    </>
  );
}

export default App;