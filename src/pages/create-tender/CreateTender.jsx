import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button'; // Adjust import paths based on your project structure
import { setToken } from '@/store/slices/authSlice';

const CreateTender = () => {
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.auth.token);
    

  const [newTender, setNewTender] = useState({
    title: '',
    deadline: '',
    description: '', // Added for tender description
    documents: [],
  });

  // useEffect for token retreival
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleNewTenderChange = (field, value) => {
    setNewTender((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    setNewTender((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const handleCreateTender = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create the tender without documents first
      
      const response = await axios.post(
        'http://localhost:3000/api/tenders', // Update with your actual API route
        {
          title: newTender.title,
          deadline: newTender.deadline,
          description: newTender.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token for authentication
          },
        }
      );

      const tenderId = response.data.id; // Get the created tender's ID

      // Step 2: Upload documents
      const uploadPromises = newTender.documents.map((document) => {
        const formData = new FormData();
        formData.append('document', document); // Field name should match what is expected by multer

        return axios.post(
          `http://localhost:3000/api/tenders/${tenderId}/documents`, // Update with your actual API route
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`, // Include the token for authentication
            },
          }
        );
      });

      await Promise.all(uploadPromises);

      // Clear the form
      setNewTender({
        title: '',
        deadline: '',
        description: '',
        documents: [],
      });

      alert('Tender created successfully with documents!');
      console.log(newTender)
    } catch (error) {
      console.error('Error creating tender:', error);
      alert('Error creating tender. Please try again.');
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Create New Tender</h2>
        </div>
        <Card>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleCreateTender}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTender.title}
                  onChange={(e) => handleNewTenderChange('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTender.description}
                  onChange={(e) => handleNewTenderChange('description', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newTender.deadline}
                  onChange={(e) => handleNewTenderChange('deadline', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documents">Documents</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    onChange={handleDocumentUpload}
                    className="flex-1 rounded-md border border-muted bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {newTender.documents.length > 0 && (
                    <div className="flex items-center gap-2">
                      {newTender.documents.map((doc, index) => (
                        <div key={index} className="bg-muted rounded-md px-2 py-1 text-sm">
                          {doc.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Button 
                type="submit"
                className="bg-orange-400 hover:bg-orange-500"
              >Create Tender</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreateTender;
