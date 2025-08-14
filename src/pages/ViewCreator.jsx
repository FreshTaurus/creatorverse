import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

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

  if (!creator) return <p>Loading...</p>;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/">← Back to Creators</Link>
      </div>
      <article>
        {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={{ maxWidth: 400 }} />}
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <div style={{ marginTop: 16 }}>
          <a href={creator.url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>Visit</a>
          <Link to={`/creators/${creator.id}/edit`} style={{ marginRight: 8 }}>Edit</Link>
          <button 
            onClick={handleDelete}
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}

