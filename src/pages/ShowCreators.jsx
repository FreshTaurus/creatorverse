import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import CreatorCard from '../components/CreatorCard';

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
        Loading creators...
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero space-background">
        <h1 className="hero-title">Creatorverse</h1>
        <div className="hero-buttons">
          <Link to="/" className="btn btn-secondary">
            View All Creators
          </Link>
          <Link to="/new" className="btn btn-primary">
            Add A Creator
          </Link>
        </div>
      </section>

      {/* Creators Grid */}
      <section style={{ padding: '4rem 0' }}>
        {creators.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1.5rem' }}>
              No creators yet
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>
              Be the first to add a creator to the universe!
            </p>
          </div>
        ) : (
          <div className="grid grid-auto">
            {creators.map(creator => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}