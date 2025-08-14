import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setFormData(data);
      } else {
        console.error('Error loading creator:', error);
      }
      setLoading(false);
    }
    
    loadCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', id);
      
      if (error) {
        console.error('Error updating creator:', error);
        alert('Error updating creator. Please try again.');
      } else {
        navigate(`/creators/${id}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error updating creator. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Error deleting creator:', error);
          alert('Error deleting creator. Please try again.');
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error deleting creator. Please try again.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to={`/creators/${id}`}>← Back to Creator</Link>
      </div>
      
      <h2>Edit Creator</h2>
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
        
        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={saving} style={{ marginRight: 8 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={handleDelete}
            style={{ backgroundColor: '#dc3545', color: 'white' }}
          >
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
}
