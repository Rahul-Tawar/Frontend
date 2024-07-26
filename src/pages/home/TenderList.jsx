import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tenders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTenders(data);
      } catch (error) {
        console.log("Error while requesting the server:", error);
        setError("Failed to fetch tenders");
      }
    };

    fetchTenders();
  }, []);

  useEffect(() => {
    console.log(tenders);
  }, [tenders]);

  const handleTenderClick = (tender) => {
    navigate(`/tender/${tender.id}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-wrap gap-4 flex-row mx-auto '>
      {tenders.map((tender) => (
        <Card key={tender.id} className="h-48 w-96 max-w-sm">
          <CardHeader>
            <CardTitle>{tender.title}</CardTitle>
            <CardDescription>
              {tender.status === "open" ? (
                <Badge variant="secondary">Open</Badge>
              ) : (
                <Badge variant="outline">Closed</Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Deadline: {tender.deadline}</p>
              <p className="font-semibold">${tender.amount}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => handleTenderClick(tender)} className="bg-orange-400 hover:bg-orange-500">
              View Tender
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TenderList;
