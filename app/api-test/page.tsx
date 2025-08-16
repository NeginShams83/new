"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ApiTestPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testApiCall = async () => {
    setIsLoading(true);
    setResult("");

    try {
      console.log("Testing API call to /@admin/login");
      
      const response = await fetch("https://nervous-jackson-pvcf9esfp.liara.run/@admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      setResult(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: data
      }, null, 2));

    } catch (error) {
      setResult("Network Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>تست API - @admin/login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">نام کاربری:</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری را وارد کنید"
              />
            </div>
            
            <div>
              <Label htmlFor="password">رمز عبور:</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور را وارد کنید"
              />
            </div>

            <Button onClick={testApiCall} disabled={isLoading}>
              {isLoading ? "در حال تست..." : "تست API"}
            </Button>

            {result && (
              <div className="mt-4">
                <Label>نتیجه:</Label>
                <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-auto max-h-96">
                  {result}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
