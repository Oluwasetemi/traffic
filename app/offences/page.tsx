"use client";

import { useState } from "react";
import { Heading } from "../components/heading";
import { Text } from "../components/text";
import { Input } from "../components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Badge } from "../components/badge";
import { Disclaimer } from "../components/ui/disclaimer";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Offence {
  code: string;
  description: string;
  fine: number;
  points: number;
  category: string;
}

const offences: Offence[] = [
  // Major Licensing
  {
    code: "115",
    description: "Operating motor vehicle without driver's licence/permit",
    fine: 40000,
    points: 14,
    category: "Licensing",
  },
  {
    code: "83",
    description: "No motor vehicle insurance",
    fine: 20000,
    points: 0,
    category: "Licensing",
  },
  {
    code: "88",
    description: "No valid certificate of fitness",
    fine: 15000,
    points: 0,
    category: "Licensing",
  },

  // Speeding - Regular
  {
    code: "37",
    description: "Speeding 16-32 km/h over limit",
    fine: 6000,
    points: 2,
    category: "Speeding",
  },
  {
    code: "38",
    description: "Speeding 33-49 km/h over limit",
    fine: 10000,
    points: 4,
    category: "Speeding",
  },
  {
    code: "39",
    description: "Speeding 50+ km/h over limit",
    fine: 15000,
    points: 6,
    category: "Speeding",
  },

  // Speeding - School Zone
  {
    code: "34",
    description: "School zone speeding 16-32 km/h over",
    fine: 12000,
    points: 3,
    category: "School Safety",
  },
  {
    code: "35",
    description: "School zone speeding 33-49 km/h over",
    fine: 20000,
    points: 6,
    category: "School Safety",
  },
  {
    code: "36",
    description: "School zone speeding 50+ km/h over",
    fine: 30000,
    points: 10,
    category: "School Safety",
  },

  // Dangerous Driving
  {
    code: "5",
    description: "Careless driving causing collision",
    fine: 25000,
    points: 10,
    category: "Dangerous Driving",
  },
  {
    code: "6",
    description: "Careless driving where no collision occurs",
    fine: 11000,
    points: 4,
    category: "Dangerous Driving",
  },

  // Traffic Signals
  {
    code: "15",
    description: "Disobeying traffic light or stop sign",
    fine: 10000,
    points: 6,
    category: "Traffic Control",
  },
  {
    code: "45",
    description: "Failing to comply with other traffic signs",
    fine: 6000,
    points: 3,
    category: "Traffic Control",
  },
  {
    code: "44",
    description: "Failing to obey constable command",
    fine: 5000,
    points: 1,
    category: "Traffic Control",
  },

  // Electronic Devices
  {
    code: "28",
    description: "Using electronic communication device while driving",
    fine: 10000,
    points: 4,
    category: "Distracted Driving",
  },
  {
    code: "29",
    description: "Using electronic visual device within driver's line of sight",
    fine: 10000,
    points: 6,
    category: "Distracted Driving",
  },
  {
    code: "126",
    description: "Smoking ganja while driving",
    fine: 10000,
    points: 2,
    category: "Distracted Driving",
  },

  // Pedestrian Safety
  {
    code: "70",
    description: "Failing to stop at pedestrian crossing",
    fine: 10000,
    points: 4,
    category: "Pedestrian Safety",
  },
  {
    code: "46",
    description: "Failing to stop for school crossing warden",
    fine: 12000,
    points: 6,
    category: "School Safety",
  },
  {
    code: "48",
    description: "Failing to remain stationary when stopped by school warden",
    fine: 12000,
    points: 6,
    category: "School Safety",
  },

  // Safety Equipment
  {
    code: "82",
    description: "No helmet (motorcyclist)",
    fine: 8000,
    points: 2,
    category: "Safety Equipment",
  },
  {
    code: "30",
    description: "Not wearing seatbelt",
    fine: 2000,
    points: 2,
    category: "Safety Equipment",
  },
  {
    code: "11",
    description: "Child without child restraint system",
    fine: 5000,
    points: 4,
    category: "Safety Equipment",
  },

  // Vehicle Equipment
  {
    code: "81",
    description: "No headlamp",
    fine: 5000,
    points: 4,
    category: "Vehicle Equipment",
  },
  {
    code: "80",
    description: "No brake light",
    fine: 5000,
    points: 2,
    category: "Vehicle Equipment",
  },
  {
    code: "24",
    description: "Driving defective motor vehicle",
    fine: 10000,
    points: 2,
    category: "Vehicle Equipment",
  },

  // Motorcycle Violations
  {
    code: "10",
    description: "Causing motorcycle to be driven on one wheel (wheelie)",
    fine: 5000,
    points: 3,
    category: "Motorcycle",
  },
  {
    code: "78",
    description: "More than prescribed number of persons on motorcycle",
    fine: 5000,
    points: 3,
    category: "Motorcycle",
  },

  // Emergency Vehicles
  {
    code: "43",
    description: "Failing to yield right of way to emergency vehicle",
    fine: 25000,
    points: 0,
    category: "Emergency",
  },

  // Overtaking
  {
    code: "20",
    description: "Overtaking without clear view",
    fine: 10000,
    points: 3,
    category: "Overtaking",
  },
  {
    code: "116",
    description: "Overtaking causing obstruction",
    fine: 10000,
    points: 3,
    category: "Overtaking",
  },
  {
    code: "22",
    description: "Driving backwards unnecessarily",
    fine: 3000,
    points: 4,
    category: "Road Position",
  },

  // Parking
  {
    code: "97",
    description: "Parking to obstruct traffic",
    fine: 5000,
    points: 0,
    category: "Parking",
  },
  {
    code: "94",
    description: "Obstructing traffic",
    fine: 5000,
    points: 0,
    category: "Parking",
  },
];

const categories = [ "All", "Licensing", "Speeding", "School Safety", "Dangerous Driving", "Traffic Control", "Distracted Driving", "Pedestrian Safety", "Safety Equipment", "Vehicle Equipment", "Motorcycle", "Emergency", "Overtaking", "Road Position", "Parking",
];

export default function OffencesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredOffences = offences.filter((offence) => {
    const matchesSearch =
      offence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offence.code.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "All" || offence.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return `JMD $${amount.toLocaleString("en-JM")}`;
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12">
          <Heading>Jamaica Traffic Offences & Fines</Heading>
          <Text className="mt-2">
            Complete reference of traffic violations, fines, and demerit points
            under the Road Traffic Act 2018
          </Text>

          {/* Key Information */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-4 border border-red-200 dark:border-red-900">
              <p className="text-sm font-semibold text-red-900 dark:text-red-200">
                10+ Points
              </p>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                6-month suspension
              </p>
            </div>
            <div className="rounded-xl bg-orange-50 dark:bg-orange-950/20 p-4 border border-orange-200 dark:border-orange-900">
              <p className="text-sm font-semibold text-orange-900 dark:text-orange-200">
                14-19 Points
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                1-year suspension
              </p>
            </div>
            <div className="rounded-xl bg-purple-50 dark:bg-purple-950/20 p-4 border border-purple-200 dark:border-purple-900">
              <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">
                20+ Points
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                2-year suspension + retest
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search by offence description or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Offences Table */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 ring-1 ring-zinc-950/5 dark:ring-white/10 overflow-hidden p-6">
          <Table bleed>
            <TableHead>
              <TableRow>
                <TableHeader>Code</TableHeader>
                <TableHeader>Offence Description</TableHeader>
                <TableHeader>Fine</TableHeader>
                <TableHeader>Points</TableHeader>
                <TableHeader>Category</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOffences.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      No offences found
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOffences.map((offence) => (
                  <TableRow key={offence.code}>
                    <TableCell className="font-medium">
                      {offence.code}
                    </TableCell>
                    <TableCell>{offence.description}</TableCell>
                    <TableCell>{formatCurrency(offence.fine)}</TableCell>
                    <TableCell>
                      {offence.points > 0 ? (
                        <Badge
                          color={
                            offence.points >= 10
                              ? "red"
                              : offence.points >= 6
                                ? "orange"
                                : "blue"
                          }
                        >
                          {offence.points} pts
                        </Badge>
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge color="zinc">{offence.category}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Info */}
        <div className="mt-8 space-y-4">
          <div className="rounded-xl bg-blue-50 dark:bg-blue-950/20 p-6">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <strong className="font-semibold text-zinc-950 dark:text-white">
                Important:
              </strong>{" "}
              Points expire after 15 months if you stay below 10 points.
              Camera-detected violations carry financial penalties only (no
              points). You have 21 days to pay fines before they convert to
              court summons. Exceeding 135 km/h triggers dangerous driving
              charges with automatic suspension.
            </p>
          </div>

          <Disclaimer type="offences" />
        </div>
      </main>
    </div>
  );
}
