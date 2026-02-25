import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();

  const [isSignup, setIsSignup] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (
      savedUser.userId === userId &&
      savedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setLocation("/dashboard");
    } else {
      setError("Invalid User ID or Password");
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("All fields are required");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ userId, password })
    );

    alert("Account created successfully! Please login.");
    setIsSignup(false);
    setUserId("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={isSignup ? handleSignup : handleLogin}
            className="space-y-5"
          >
            {/* User ID */}
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your user ID"
              />
            </div>

            {/* Password with Eye Icon */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500 font-medium -mt-2">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-xl">
              {isSignup ? "Create Account" : "Login"}
            </Button>
          </form>

          {/* Toggle Section */}
          <div className="mt-6 text-center">
            {isSignup ? (
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-primary hover:underline font-medium"
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-primary hover:underline font-medium"
                >
                  Create New Account
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}