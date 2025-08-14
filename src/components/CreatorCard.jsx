import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Edit, Trash2, Youtube, Twitter, Instagram, Music, ExternalLink, AlertTriangle } from 'lucide-react';
import { supabase } from '../client';

export default function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL } = creator;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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
    if (url.includes('twitch.tv')) return 'Twitch';
    return 'Website';
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'YouTube': return <Youtube size={16} />;
      case 'Twitter': return <Twitter size={16} />;
      case 'Instagram': return <Instagram size={16} />;
      case 'TikTok': return <Music size={16} />;
      case 'Twitch': return <ExternalLink size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  // For now, we'll show the main platform from the URL
  // In a real app, you'd store multiple social media links in the database
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

          {/* Creator Info */}
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700',
              margin: '0 0 1rem 0',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {name}
            </h3>
            
            {/* Social media icons */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginBottom: '1rem' 
            }}>
              {/* Main platform from URL */}
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
              
              {/* Additional social media icons - show as disabled for now */}
              <div
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
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }}
                title="YouTube (coming soon)"
              >
                <Youtube size={16} />
              </div>
              
              <div
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
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }}
                title="Twitter (coming soon)"
              >
                <Twitter size={16} />
              </div>
              
              <div
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
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }}
                title="Instagram (coming soon)"
              >
                <Instagram size={16} />
              </div>
            </div>
            
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
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
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--color-bg-secondary)',
            padding: '2rem',
            borderRadius: 'var(--border-radius-lg)',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              background: 'rgba(231, 76, 60, 0.2)',
              borderRadius: '50%',
              margin: '0 auto 1rem'
            }}>
              <AlertTriangle size={24} color="#E74C3C" />
            </div>
            <h3 style={{ 
              color: 'var(--color-text)', 
              margin: '0 0 1rem 0',
              fontSize: '1.3rem'
            }}>
              Delete Creator
            </h3>
            <p style={{ 
              color: 'var(--color-text-muted)', 
              margin: '0 0 2rem 0',
              lineHeight: '1.5'
            }}>
              Are you sure you want to delete "{name}"? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '10px 20px',
                  background: 'var(--color-border)',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  padding: '10px 20px',
                  background: '#E74C3C',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  color: 'white',
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  opacity: isDeleting ? 0.7 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}