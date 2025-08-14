import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, User, Link as LinkIcon, FileText, Image } from 'lucide-react';

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      {/* Back Navigation */}
      <Link 
        to="/" 
        className="back-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--color-primary)',
          textDecoration: 'none',
          fontWeight: '500',
          marginBottom: '2rem',
          padding: '8px 0',
          transition: 'all 0.3s ease'
        }}
      >
        <ArrowLeft size={18} />
        Back to Creators
      </Link>

      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
          borderRadius: '50%',
          marginBottom: '1.5rem'
        }}>
          <Plus size={32} color="white" />
        </div>
        <h2 className="page-title" style={{ margin: 0 }}>Add New Creator</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Add a new content creator to the universe
        </p>
      </div>

      {/* Form */}
      <div className="card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <User size={18} />
              Creator Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter creator's name"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="url" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <LinkIcon size={18} />
              Social Media URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/channel/..."
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <FileText size={18} />
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about this creator..."
              required
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                resize: 'vertical',
                minHeight: '120px'
              }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="imageURL" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <Image size={18} />
              Image URL (optional)
            </label>
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--color-text)',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'flex-end',
            marginTop: '2rem' 
          }}>
            <Link 
              to="/" 
              className="btn btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Plus size={18} />
              {loading ? 'Adding Creator...' : 'Add Creator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}