import { AgeCalculator } from "@/components/age-calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Age Calculator
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Calculate your exact age in years, months, and days
        </p>
        <AgeCalculator />
      </div>
    </main>
  );
}
