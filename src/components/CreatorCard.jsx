import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { useState } from 'react';
import { 
  Info, 
  Edit, 
  Youtube, 
  Twitter, 
  Instagram, 
  Music, 
  ExternalLink,
  AlertTriangle,
  Trash2
} from 'lucide-react';

export default function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL } = creator;
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting creator:', error);
        alert('Error deleting creator. Please try again.');
      } else {
        // Refresh the page to update the list
        window.location.reload();
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error deleting creator. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Extract social media info from URL (simplified)
  const getSocialPlatform = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('tiktok.com')) return 'TikTok';
    return 'Website';
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'YouTube': return <Youtube size={16} />;
      case 'Twitter': return <Twitter size={16} />;
      case 'Instagram': return <Instagram size={16} />;
      case 'TikTok': return <Music size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  const platform = getSocialPlatform(url);
  const icon = getSocialIcon(platform);

  return (
    <>
      <article className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background Image */}
        {imageURL && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60%',
              backgroundImage: `url(${imageURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
              zIndex: 0
            }}
          />
        )}
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header with action buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            marginBottom: '1rem' 
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => navigate(`/creators/${id}`)}
                style={{
                  background: 'rgba(74, 144, 226, 0.2)',
                  border: '1px solid rgba(74, 144, 226, 0.3)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4A90E2',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                title="View Details"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(74, 144, 226, 0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(74, 144, 226, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Info size={18} />
              </button>
              <button
                onClick={() => navigate(`/creators/${id}/edit`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                title="Edit"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                style={{
                  background: 'rgba(231, 76, 60, 0.2)',
                  border: '1px solid rgba(231, 76, 60, 0.3)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E74C3C',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                title="Delete"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(231, 76, 60, 0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(231, 76, 60, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Main image */}
          {imageURL && (
            <div style={{ 
              marginBottom: '1rem', 
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              aspectRatio: '16/9'
            }}>
              <img 
                src={imageURL} 
                alt={name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }} 
              />
            </div>
          )}

          {/* Creator info */}
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              color: 'var(--color-primary)', 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Link 
                to={`/creators/${id}`} 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  transition: 'color 0.3s ease'
                }}
              >
                {name}
              </Link>
            </h3>
            
            {/* Social media icons */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginBottom: '1rem' 
            }}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                title={`Visit ${platform}`}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--color-primary)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {icon}
              </a>
            </div>
            
            <p style={{ 
              color: 'var(--color-text-muted)', 
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              {description}
            </p>
          </div>
        </div>
      </article>

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
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
              Are you sure you want to delete {name}???
            </h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-primary"
                disabled={isDeleting}
              >
                NAH, NEVER MIND
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                disabled={isDeleting}
              >
                {isDeleting ? 'DELETING...' : 'YES! TOTALLY SURE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}