import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  User, 
  Link as LinkIcon, 
  FileText, 
  Image,
  AlertTriangle
} from 'lucide-react';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    setDeleting(true);
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
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--color-border)',
            borderTop: '3px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Loading creator...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
        {/* Back Navigation */}
        <Link 
          to={`/creators/${id}`}
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
          Back to Creator
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
            <User size={32} color="white" />
          </div>
          <h2 className="page-title" style={{ margin: 0 }}>Edit Creator</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            Update {formData.name}'s information
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
              justifyContent: 'space-between',
              marginTop: '2rem',
              flexWrap: 'wrap'
            }}>
              <button 
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-danger"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Trash2 size={18} />
                Delete Creator
              </button>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link 
                  to={`/creators/${id}`}
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={saving}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={18} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '2rem', 
              marginBottom: '1rem',
              color: 'var(--color-danger)'
            }}>
              <AlertTriangle size={48} />
              <span style={{ color: 'var(--color-primary)' }}>WAIT!!!</span>
              <AlertTriangle size={48} />
            </div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
              Are you sure you want to delete {formData.name}???
            </h3>
            <p style={{ 
              color: 'var(--color-text-muted)', 
              marginBottom: '2rem',
              fontSize: '0.95rem' 
            }}>
              This action cannot be undone. All information about this creator will be permanently removed.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                disabled={deleting}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Trash2 size={18} />
                {deleting ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}