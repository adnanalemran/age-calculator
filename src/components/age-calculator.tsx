"use client";

import { useState } from "react";
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/date-picker";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date>();
  const [targetDate, setTargetDate] = useState<Date>();
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = birthDate;
    const target = targetDate || new Date();

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
    setBirthDate(undefined);
    setTargetDate(undefined);
    setAge(null);
  };

  return (
    <Card className="w-[90%] max-w-[400px] mx-auto mt-4 sm:mt-10 px-2 sm:px-4">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">Age Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          <DatePicker
            date={birthDate}
            setDate={setBirthDate}
            label="Birth Date"
          />

          <DatePicker
            date={targetDate}
            setDate={setTargetDate}
            label="Target Date (Optional)"
          />
          <p className="text-sm text-muted-foreground">
            Leave empty to calculate age until today
          </p>

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
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-4 bg-primary/10 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{age.years}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years</div>
                </div>
                <div className="p-2 sm:p-4 bg-primary/10 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{age.months}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Months</div>
                </div>
                <div className="p-2 sm:p-4 bg-primary/10 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{age.days}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Days</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 