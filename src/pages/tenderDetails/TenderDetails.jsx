import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MenuIcon, CalendarIcon, BriefcaseIcon } from "@/components/iconComponents/Icons";

export default function TenderDetails() {
  const [filters, setFilters] = useState({
    status: "all",
    deadline: "all",
  });
  const { tenderId} = useParams();
  
  

  const [selectedTender, setSelectedTender] = useState(null);
  const [error, setError] = useState(null);

  // Fetching the tender by ID
    useEffect(() => {
      const fetchTender = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/tender/${tenderId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSelectedTender(data);
        } catch (error) {
          console.log("Error while requesting the server:", error);
          setError("Failed to fetch tender");
        }
      };

      fetchTender();
    }, [tenderId]);

  // Handle bid submission
  const handleBidSubmit = (bidAmount) => {
    if (selectedTender) {
      console.log(`Submitted bid of $${bidAmount} for tender ${selectedTender.title}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedTender) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="bg-background py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{selectedTender.title}</h1>
              <p className="text-muted-foreground md:text-xl">{selectedTender.description}</p>
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold">Requirements</h2>
              <ul className="list-disc pl-6 space-y-2">
                {selectedTender.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold">Documents</h2>
              <div className="space-y-2">
                {selectedTender.documents.map((document, index) => (
                  <div key={index}>
                    <a href="#" className="text-blue-600 underline">
                      {document.name}
                    </a>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <h2 className="text-2xl font-bold">Contact</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {selectedTender.contact.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> <a href={`mailto:${selectedTender.contact.email}`}>{selectedTender.contact.email}</a>
                </p>
                <p>
                  <span className="font-medium">Phone:</span> <a href={`tel:${selectedTender.contact.phone}`}>{selectedTender.contact.phone}</a>
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold">Tender Details</h2>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Status</p>
                  {selectedTender.status === "open" ? (
                    <Badge variant="secondary">Open</Badge>
                  ) : (
                    <Badge variant="outline">Closed</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Deadline</p>
                  <p>{new Date(selectedTender.deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-semibold">${selectedTender.amount}</p>
                </div>
              </div>
              <Separator className="my-6" />
              {selectedTender.status === "open" ? (
                <div className="grid gap-4">
                  <Input type="number" placeholder="Enter your bid amount" />
                  <Button className="w-full" onClick={() => handleBidSubmit(1000)}>
                    Submit Bid
                  </Button>
                </div>
              ) : (
                <Button className="w-full" disabled>
                  Tender Closed
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
