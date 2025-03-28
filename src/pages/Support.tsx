
import { useState } from 'react';
import { ChevronLeft, MessageSquare, Phone, Mail, HelpCircle, PlusCircle, MinusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function Support() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: 'Comment suivre ma commande en cours ?',
      answer: 'Vous pouvez suivre votre commande en cours en vous rendant dans la section "Mes Commandes" accessible depuis le menu latéral. Vous y trouverez toutes les informations concernant vos commandes et leur statut actuel.',
      isOpen: false
    },
    {
      question: 'Quels sont les moyens de paiement acceptés ?',
      answer: 'Nous acceptons plusieurs moyens de paiement : espèces à la livraison, paiement mobile (Flooz, T-Money), cartes de crédit/débit et virement bancaire pour les commandes professionnelles.',
      isOpen: false
    },
    {
      question: 'Comment annuler une commande ?',
      answer: 'Vous pouvez annuler une commande en cours en allant dans "Mes Commandes", en sélectionnant la commande concernée et en cliquant sur le bouton "Annuler la commande". Notez que l\'annulation n\'est possible que pour les commandes qui n\'ont pas encore été préparées.',
      isOpen: false
    },
    {
      question: 'Quelle est la zone de livraison ?',
      answer: 'Nous livrons dans toute la ville de Lomé et ses environs. Pour les zones plus éloignées, des frais supplémentaires peuvent s\'appliquer. Veuillez nous contacter pour confirmer si votre localisation est desservie.',
      isOpen: false
    },
    {
      question: 'Comment puis-je signaler un problème avec ma commande ?',
      answer: 'En cas de problème avec votre commande, vous pouvez nous contacter par téléphone au +228 90 12 34 56 ou par email à support@specialgout.com. Vous pouvez également utiliser le formulaire de contact sur cette page.',
      isOpen: false
    },
  ]);

  const toggleFaq = (index: number) => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, isOpen: !faq.isOpen };
      }
      return faq;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et reviendrons vers vous rapidement.",
      });
      setMessage('');
    }
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

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Aide et Support</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Nous contacter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
              <Phone className="text-primary mb-3" size={24} />
              <h3 className="font-medium">Téléphone</h3>
              <p className="text-sm text-gray-600 mt-1">+228 90 12 34 56</p>
              <p className="text-xs text-gray-500 mt-2">Lun-Sam: 8h-20h</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
              <Mail className="text-primary mb-3" size={24} />
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-gray-600 mt-1">support@specialgout.com</p>
              <p className="text-xs text-gray-500 mt-2">Réponse sous 24h</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
              <MessageSquare className="text-primary mb-3" size={24} />
              <h3 className="font-medium">Chat</h3>
              <p className="text-sm text-gray-600 mt-1">Chat en direct</p>
              <p className="text-xs text-gray-500 mt-2">Disponible 24/7</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold mb-4">Envoyez-nous un message</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px]"
              placeholder="Décrivez votre problème ou posez-nous une question..."
              required
            ></textarea>
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold flex items-center">
            <HelpCircle className="mr-2 text-primary" size={20} />
            Questions fréquentes
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-gray-900"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                {faq.isOpen ? (
                  <MinusCircle className="text-primary" size={18} />
                ) : (
                  <PlusCircle className="text-primary" size={18} />
                )}
              </button>
              {faq.isOpen && (
                <div className="mt-2 text-sm text-gray-600 pl-1">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
