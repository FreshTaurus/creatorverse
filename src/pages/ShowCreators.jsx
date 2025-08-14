import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import CreatorCard from '../components/CreatorCard';
import { Users, Plus, Sparkles } from 'lucide-react';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true });
      if (!error) setCreators(data || []);
      setLoading(false);
    }
    load();
  }, []);

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
            width: '50px',
            height: '50px',
            border: '4px solid var(--color-border)',
            borderTop: '4px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ fontSize: '1.2rem' }}>Loading creators...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero space-background">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <Sparkles size={40} style={{ color: 'var(--color-primary)', marginRight: '1rem' }} />
          <h1 className="hero-title" style={{ margin: 0 }}>Creatorverse</h1>
          <Sparkles size={40} style={{ color: 'var(--color-primary)', marginLeft: '1rem' }} />
        </div>
        <p style={{ 
          fontSize: '1.3rem', 
          color: 'rgba(255,255,255,0.8)', 
          textAlign: 'center',
          marginBottom: '2rem',
          maxWidth: '600px'
        }}>
          Discover and celebrate amazing content creators from across the digital universe
        </p>
        <div className="hero-buttons">
          <Link 
            to="/" 
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <Users size={20} />
            View All Creators
          </Link>
          <Link 
            to="/new" 
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <Plus size={20} />
            Add A Creator
          </Link>
        </div>
      </section>

      {/* Creators Grid */}
      <section style={{ padding: '4rem 0' }}>
        {creators.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '6rem 2rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              opacity: '0.7'
            }}>
              <Users size={48} color="white" />
            </div>
            <h3 style={{ 
              color: 'var(--color-text)', 
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              No creators yet
            </h3>
            <p style={{ 
              color: 'var(--color-text-muted)', 
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Be the first to add a creator to the universe! Share your favorite content creators and help others discover amazing talent.
            </p>
            <Link 
              to="/new" 
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                fontSize: '1.1rem',
                padding: '1rem 2rem'
              }}
            >
              <Plus size={20} />
              Add Your First Creator
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem',
              padding: '1.5rem',
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid var(--color-border)',
              maxWidth: '400px',
              margin: '0 auto 3rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <Users size={24} style={{ color: 'var(--color-primary)' }} />
                <span style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)'
                }}>
                  {creators.length}
                </span>
              </div>
              <p style={{
                color: 'var(--color-text-muted)',
                margin: 0,
                fontSize: '1.1rem'
              }}>
                {creators.length === 1 ? 'Creator' : 'Creators'} in the universe
              </p>
            </div>

            {/* Creators Grid */}
            <div className="grid grid-auto">
              {creators.map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>

            {/* Add More Creators CTA */}
            <div style={{
              textAlign: 'center',
              marginTop: '4rem',
              padding: '3rem 2rem',
              background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(74, 144, 226, 0.05))',
              borderRadius: 'var(--border-radius-lg)',
              border: '2px dashed var(--color-primary)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--color-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Plus size={32} color="white" />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--color-text)'
              }}>
                Know more amazing creators?
              </h3>
              <p style={{
                color: 'var(--color-text-muted)',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem'
              }}>
                Help expand our creator universe by adding more talented individuals who inspire and entertain.
              </p>
              <Link 
                to="/new" 
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}
              >
                <Plus size={20} />
                Add Another Creator
              </Link>
            </div>
          </>
        )}
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}