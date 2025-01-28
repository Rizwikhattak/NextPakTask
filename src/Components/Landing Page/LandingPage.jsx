import { Link, Navigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  ListChecks,
  LineChart,
  Smartphone,
  ListPlus,
  ShoppingCart,
  TrendingUp,
  PiggyBank,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-green-600" />
          <span className="font-semibold text-xl">GrocerySave</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">
            <Link to="/login" className="w-full h-full">
              Sign in
            </Link>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Link to="/signup" className="w-full h-full">
              Sign up
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart Grocery Shopping,{" "}
          <span className="text-green-600">Made Simple</span>
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Organize your grocery lists, track prices, and save money with our
          intelligent shopping assistant. Join over 50,000 smart shoppers saving
          time and money every day.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Link to="/login" className="w-full h-full">
              Get Started
            </Link>
          </Button>
          <Button variant="outline">Watch Demo</Button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <span>4.8/5 rating</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>50K+ users</span>
          </div>
          <div className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            <span>Secure & Private</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need to shop smarter
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Simple yet powerful features to make grocery shopping a breeze
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <ListPlus className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Lists</h3>
            <p className="text-gray-600">
              Create and manage multiple shopping lists with smart
              categorization and priority settings.
            </p>
          </Card>
          <Card className="p-6">
            <LineChart className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Price History</h3>
            <p className="text-gray-600">
              Track price changes over time and get notified when items you need
              go on sale.
            </p>
          </Card>
          <Card className="p-6">
            <Smartphone className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mobile Ready</h3>
            <p className="text-gray-600">
              Access your lists anywhere with our mobile app, complete with
              offline support.
            </p>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          How GrocerySave Works
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Get started in minutes and save hours every week
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ListPlus className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Step 1: Create Lists</h3>
                <p className="text-gray-600">
                  Create custom shopping lists for different stores or occasions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Step 2: Add Items</h3>
                <p className="text-gray-600">
                  Add items to your lists with prices and quantities
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Step 3: Track Prices</h3>
                <p className="text-gray-600">
                  Monitor price changes and find the best deals
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <PiggyBank className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Step 4: Save Money</h3>
                <p className="text-gray-600">
                  Watch your savings grow over time
                </p>
              </div>
            </div>
          </div>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Create Lists</h3>
            <p className="text-gray-600 mb-4">
              Create custom shopping lists for different stores or occasions
            </p>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <ListPlus className="h-4 w-4 text-green-600" />
                </div>
                <span>Organize by store</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                </div>
                <span>Share with family</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <span>Set reminders</span>
              </div>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Next Step
            </Button>
          </Card>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Calculate Your Savings
        </h2>
        <p className="text-gray-600 text-center mb-12">
          See how much you could save with GrocerySave
        </p>
        <Card className="max-w-md mx-auto p-6">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm text-gray-600 mb-2">
                Monthly Grocery Spend
              </h3>
              <p className="text-3xl font-bold text-green-600">$600</p>
              <p className="text-sm text-gray-600">Average customer spend</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-600 mb-2">Potential Savings</h3>
              <p className="text-3xl font-bold text-green-600">$180</p>
              <p className="text-sm text-gray-600">30% average savings</p>
            </div>
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Start Saving Today
          </Button>
        </Card>
      </section>

      {/* Footer CTA */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start saving on groceries today
          </h2>
          <p className="mb-8">
            Join thousands of smart shoppers who are already saving time and
            money with GrocerySave. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary">
              <Link to="/signup">Sign Up Now - Its Free</Link>
            </Button>
            <Button
              variant="outline"
              className="text-white border-white bg-emerald-600"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
