import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Youtube, 
  Twitter, 
  Instagram, 
  Music,
  AlertTriangle,
  User,
  Calendar,
  Globe
} from 'lucide-react';

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadOne() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setCreator(data);
    }
    loadOne();
  }, [id]);

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

  // Extract social media info from URL
  const getSocialPlatform = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('tiktok.com')) return 'TikTok';
    return 'Website';
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'YouTube': return <Youtube size={20} />;
      case 'Twitter': return <Twitter size={20} />;
      case 'Instagram': return <Instagram size={20} />;
      case 'TikTok': return <Music size={20} />;
      default: return <Globe size={20} />;
    }
  };

  if (!creator) {
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

  const platform = getSocialPlatform(creator.url);
  const platformIcon = getSocialIcon(platform);

  return (
    <>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 0' }}>
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

        <article className="card" style={{ padding: '0', overflow: 'hidden' }}>
          {/* Hero Section with Image */}
          <div style={{ 
            position: 'relative', 
            height: creator.imageURL ? '300px' : '200px',
            background: creator.imageURL 
              ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${creator.imageURL})`
              : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '2rem'
          }}>
            {/* Action Buttons */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <Link 
                to={`/creators/${creator.id}/edit`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                title="Edit Creator"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  background: 'rgba(231, 76, 60, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(231, 76, 60, 0.3)',
                  borderRadius: '12px',
                  color: '#E74C3C',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                title="Delete Creator"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(231, 76, 60, 0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(231, 76, 60, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Creator Title */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                  <User size={32} color="white" />
                </div>
                <div>
                  <h1 style={{ 
                    fontSize: '3rem', 
                    fontWeight: '700',
                    margin: 0,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    {creator.name}
                  </h1>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}>
                    <Calendar size={16} color="rgba(255,255,255,0.8)" />
                    <span style={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      fontSize: '0.9rem' 
                    }}>
                      Content Creator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ padding: '2rem' }}>
            {/* Social Media Link */}
            <div style={{ marginBottom: '2rem' }}>
              <a
                href={creator.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem',
                  textDecoration: 'none'
                }}
              >
                {platformIcon}
                Visit {platform}
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Description */}
            <div>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                About {creator.name}
              </h3>
              <p style={{ 
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: 'var(--color-text-muted)',
                marginBottom: '2rem'
              }}>
                {creator.description}
              </p>
            </div>

            {/* Additional Creator Image */}
            {creator.imageURL && (
              <div style={{
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                marginTop: '2rem'
              }}>
                <img 
                  src={creator.imageURL} 
                  alt={creator.name}
                  style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
          </div>
        </article>
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
              Are you sure you want to delete {creator.name}???
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