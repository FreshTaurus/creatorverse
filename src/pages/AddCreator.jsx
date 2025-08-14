import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, User, Link as LinkIcon, FileText, Image, Youtube, Twitter, Instagram, Music, ExternalLink } from 'lucide-react';

export default function AddCreator() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
    youtube: '',
    twitter: '',
    instagram: '',
    tiktok: '',
    twitch: ''
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
      // Only send the original database fields (filter out new social media fields)
      const { name, url, description, imageURL } = formData;
      const creatorData = { name, url, description, imageURL };
      
      const { error } = await supabase
        .from('creators')
        .insert([creatorData]);
      
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
               Main Social Media URL *
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
           
           {/* Social Media Links Section */}
           <div style={{ marginTop: '2rem' }}>
             <h3 style={{ 
               color: 'var(--color-text)', 
               fontSize: '1.2rem', 
               fontWeight: '600',
               marginBottom: '1rem',
               textTransform: 'uppercase',
               letterSpacing: '0.5px'
             }}>
               SOCIAL MEDIA LINKS
             </h3>
             <p style={{ 
               color: 'var(--color-text-muted)', 
               fontSize: '0.9rem',
               marginBottom: '1.5rem'
             }}>
               Provide at least one of the creator's social media links.
             </p>
             
             <div className="form-group">
               <label htmlFor="youtube" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.5rem',
                 marginBottom: '0.5rem'
               }}>
                 <Youtube size={18} />
                 YouTube
               </label>
               <p style={{ 
                 color: 'var(--color-text-muted)', 
                 fontSize: '0.8rem',
                 marginBottom: '0.5rem'
               }}>
                 The creator's YouTube handle (without the @)
               </p>
               <input
                 type="text"
                 id="youtube"
                 name="youtube"
                 value={formData.youtube}
                 onChange={handleChange}
                 placeholder="pewdiepie"
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
               <label htmlFor="twitter" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.5rem',
                 marginBottom: '0.5rem'
               }}>
                 <Twitter size={18} />
                 Twitter
               </label>
               <p style={{ 
                 color: 'var(--color-text-muted)', 
                 fontSize: '0.8rem',
                 marginBottom: '0.5rem'
               }}>
                 The creator's Twitter handle (without the @)
               </p>
               <input
                 type="text"
                 id="twitter"
                 name="twitter"
                 value={formData.twitter}
                 onChange={handleChange}
                 placeholder="elonmusk"
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
               <label htmlFor="instagram" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.5rem',
                 marginBottom: '0.5rem'
               }}>
                 <Instagram size={18} />
                 Instagram
               </label>
               <p style={{ 
                 color: 'var(--color-text-muted)', 
                 fontSize: '0.8rem',
                 marginBottom: '0.5rem'
               }}>
                 The creator's Instagram handle (without the @)
               </p>
               <input
                 type="text"
                 id="instagram"
                 name="instagram"
                 value={formData.instagram}
                 onChange={handleChange}
                 placeholder="cristiano"
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
               <label htmlFor="tiktok" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.5rem',
                 marginBottom: '0.5rem'
               }}>
                 <Music size={18} />
                 TikTok
               </label>
               <p style={{ 
                 color: 'var(--color-text-muted)', 
                 fontSize: '0.8rem',
                 marginBottom: '0.5rem'
               }}>
                 The creator's TikTok handle (without the @)
               </p>
               <input
                 type="text"
                 id="tiktok"
                 name="tiktok"
                 value={formData.tiktok}
                 onChange={handleChange}
                 placeholder="charlidamelio"
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
               <label htmlFor="twitch" style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.5rem',
                 marginBottom: '0.5rem'
               }}>
                 <ExternalLink size={18} />
                 Twitch
               </label>
               <p style={{ 
                 color: 'var(--color-text-muted)', 
                 fontSize: '0.8rem',
                 marginBottom: '0.5rem'
               }}>
                 The creator's Twitch channel name
               </p>
               <input
                 type="text"
                 id="twitch"
                 name="twitch"
                 value={formData.twitch}
                 onChange={handleChange}
                 placeholder="ninja"
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