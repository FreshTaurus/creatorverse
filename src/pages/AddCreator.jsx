import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

export default function AddCreator() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('creators')
        .insert([formData]);
      
      if (error) {
        console.error('Error adding creator:', error);
        alert('Error adding creator. Please try again.');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding creator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Creator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="imageURL">Image URL (optional):</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Creator'}
        </button>
      </form>
    </div>
  );
}
