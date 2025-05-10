"use client";

import { useState } from "react";
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();

    // Validate dates
    if (birth > target) {
      alert("Birth date cannot be after target date!");
      return;
    }

    const years = differenceInYears(target, birth);
    const months = differenceInMonths(target, birth) % 12;
    const days = differenceInDays(target, birth) % 30;

    setAge({ years, months, days });
  };

  const resetCalculator = () => {
    setBirthDate("");
    setTargetDate("");
    setAge(null);
  };

  return (
    <Card className="w-[400px] mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Age Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birth Date</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetdate">Target Date (Optional)</Label>
            <Input
              id="targetdate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Leave empty to calculate age until today
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateAge} className="flex-1">
              Calculate Age
            </Button>
            <Button 
              onClick={resetCalculator} 
              variant="outline" 
              className="flex-1"
            >
              Reset
            </Button>
          </div>
          
          {age && (
            <div className="mt-6 space-y-2">
              <div className="text-center text-lg font-semibold">
                {targetDate ? "Age at target date:" : "Current age:"}
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{age.years}</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{age.months}</div>
                  <div className="text-sm text-muted-foreground">Months</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{age.days}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 