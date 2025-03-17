import { Card, CardContent } from "@/components/ui/card"; 
import { axiosInstance } from "@/lib/axios"; 
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react"; 
import { useEffect, useRef } from "react"; 
import { useNavigate } from "react-router-dom"; 


const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser(); // Getting user authentication details from Clerk
  const navigate = useNavigate(); // Hook for redirecting users
  const syncAttempted =  useRef(false);  // Reference to track if sync has already been attempted

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;
      // Prevent execution if user data isn't loaded or sync was already attempted

      try {

        syncAttempted.current = true;// Mark sync as attempted

        // Sending user data to the backend for authentication callback
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

      } catch (error) {
        console.log("Error in auth callback", error); // Logging any errors
      
      } finally {
        navigate("/"); // Redirecting the user to the home page after the request completes
      }
    };

    syncUser(); // Invoke the function on component mount
  }, [isLoaded, user, navigate]); // Dependencies for useEffect

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      {/* Centered card to indicate login processing */}
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-red-600 animate-spin" /> {/* Loading spinner */}
          <h3 className="text-red-600 text-xl font-bold">Welcome back! Logging in...</h3>
          <p className="text-zinc-400 text-sm">Please wait, redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
