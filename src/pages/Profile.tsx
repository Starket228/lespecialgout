
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Thomas Dupont',
    email: 'thomas.dupont@example.com',
    phone: '+228 90 12 34 56',
    address: 'Lomé, Togo',
    avatar: 'https://i.pravatar.cc/300?img=8'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès",
    });
  };

  return (
    <div className="pb-24 p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-primary mb-6"
      >
        <ChevronLeft size={20} className="mr-1" />
        Retour
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mon Profil</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 flex flex-col items-center border-b border-gray-100">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md">
                <Camera size={16} />
              </button>
            )}
          </div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-500 text-sm">Client fidèle depuis 2023</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profile);
                  }}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <User className="text-gray-500 mr-3" size={18} />
              <div>
                <div className="text-xs text-gray-500">Nom</div>
                <div>{profile.name}</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Mail className="text-gray-500 mr-3" size={18} />
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div>{profile.email}</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Phone className="text-gray-500 mr-3" size={18} />
              <div>
                <div className="text-xs text-gray-500">Téléphone</div>
                <div>{profile.phone}</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <MapPin className="text-gray-500 mr-3" size={18} />
              <div>
                <div className="text-xs text-gray-500">Adresse</div>
                <div>{profile.address}</div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3 mt-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Modifier le profil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
