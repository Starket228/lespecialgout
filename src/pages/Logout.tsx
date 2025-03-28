
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
      navigate('/');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-6"></div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Déconnexion en cours...</h1>
      <p className="text-gray-600">Merci d'avoir utilisé notre service</p>
    </div>
  );
}
