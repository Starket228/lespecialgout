
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pencil, Trash, Plus, Eye } from 'lucide-react';

interface FoodItemManagerProps {
  foodItems: any[];
  categories: any[];
}

const defaultFoodItem = {
  name: '',
  description: '',
  price: '',
  image: '',
  category: '',
  is_special: false
};

export default function FoodItemManager({ foodItems, categories }: FoodItemManagerProps) {
  const [newFoodItem, setNewFoodItem] = useState({...defaultFoodItem});
  const [editFoodItem, setEditFoodItem] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [previewFoodItem, setPreviewFoodItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditFoodItem({ ...editFoodItem, [name]: value });
    } else {
      setNewFoodItem({ ...newFoodItem, [name]: value });
    }
  };

  const handleSelectChange = (value: string, field: string, isEdit = false) => {
    if (isEdit) {
      setEditFoodItem({ ...editFoodItem, [field]: value });
    } else {
      setNewFoodItem({ ...newFoodItem, [field]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const { name, checked } = e.target;
    if (isEdit) {
      setEditFoodItem({ ...editFoodItem, [name]: checked });
    } else {
      setNewFoodItem({ ...newFoodItem, [name]: checked });
    }
  };

  const validateFoodItem = (item: any) => {
    if (!item.name.trim()) return "Le nom est obligatoire";
    if (!item.description.trim()) return "La description est obligatoire";
    if (!item.price) return "Le prix est obligatoire";
    if (isNaN(parseFloat(item.price))) return "Le prix doit être un nombre";
    if (!item.image.trim()) return "L'image est obligatoire";
    if (!item.category.trim()) return "La catégorie est obligatoire";
    return null;
  };

  const handleAddFoodItem = async () => {
    const error = validateFoodItem(newFoodItem);
    if (error) {
      toast({
        title: "Erreur de validation",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('food_items')
        .insert([{
          ...newFoodItem,
          price: parseFloat(newFoodItem.price)
        }]);

      if (error) throw error;

      setNewFoodItem({...defaultFoodItem});
      setIsAddDialogOpen(false);
      toast({
        title: "Succès",
        description: "Plat ajouté avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFoodItem = async () => {
    const error = validateFoodItem(editFoodItem);
    if (error) {
      toast({
        title: "Erreur de validation",
        description: error,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('food_items')
        .update({
          ...editFoodItem,
          price: parseFloat(editFoodItem.price)
        })
        .eq('id', editFoodItem.id);

      if (error) throw error;

      setIsEditDialogOpen(false);
      toast({
        title: "Succès",
        description: "Plat mis à jour avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFoodItem = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('food_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Plat supprimé avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFoodItemForm = (isEdit = false) => {
    const item = isEdit ? editFoodItem : newFoodItem;
    
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor={`name-${isEdit ? 'edit' : 'new'}`}>Nom</Label>
          <Input
            id={`name-${isEdit ? 'edit' : 'new'}`}
            name="name"
            value={item.name}
            onChange={(e) => handleInputChange(e, isEdit)}
            placeholder="Nom du plat"
          />
        </div>
        
        <div>
          <Label htmlFor={`description-${isEdit ? 'edit' : 'new'}`}>Description</Label>
          <Textarea
            id={`description-${isEdit ? 'edit' : 'new'}`}
            name="description"
            value={item.description}
            onChange={(e) => handleInputChange(e, isEdit)}
            placeholder="Description du plat"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor={`price-${isEdit ? 'edit' : 'new'}`}>Prix (€)</Label>
          <Input
            id={`price-${isEdit ? 'edit' : 'new'}`}
            name="price"
            value={item.price}
            onChange={(e) => handleInputChange(e, isEdit)}
            placeholder="Prix"
            type="number"
            step="0.01"
          />
        </div>
        
        <div>
          <Label htmlFor={`image-${isEdit ? 'edit' : 'new'}`}>URL de l'image</Label>
          <Input
            id={`image-${isEdit ? 'edit' : 'new'}`}
            name="image"
            value={item.image}
            onChange={(e) => handleInputChange(e, isEdit)}
            placeholder="https://exemple.com/image.jpg"
          />
        </div>
        
        <div>
          <Label htmlFor={`category-${isEdit ? 'edit' : 'new'}`}>Catégorie</Label>
          <Select
            value={item.category}
            onValueChange={(value) => handleSelectChange(value, 'category', isEdit)}
          >
            <SelectTrigger id={`category-${isEdit ? 'edit' : 'new'}`}>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id={`is_special-${isEdit ? 'edit' : 'new'}`}
            name="is_special"
            type="checkbox"
            checked={item.is_special}
            onChange={(e) => handleCheckboxChange(e, isEdit)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor={`is_special-${isEdit ? 'edit' : 'new'}`}>
            Plat spécial
          </Label>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Plats</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus size={16} />
              <span>Ajouter un plat</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau plat</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {renderFoodItemForm(false)}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddFoodItem} disabled={loading}>
                {loading ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Prix</TableHead>
              <TableHead className="text-center">Spécial</TableHead>
              <TableHead className="w-32 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Aucun plat trouvé. Ajoutez votre premier plat.
                </TableCell>
              </TableRow>
            ) : (
              foodItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.price.toFixed(2)} €</TableCell>
                  <TableCell className="text-center">
                    {item.is_special ? "Oui" : "Non"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setPreviewFoodItem(item);
                          setIsPreviewDialogOpen(true);
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                      
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditFoodItem({...item, price: item.price.toString()})}
                          >
                            <Pencil size={16} />
                          </Button>
                        </DialogTrigger>
                        {editFoodItem && editFoodItem.id === item.id && (
                          <DialogContent className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>Modifier le plat</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              {renderFoodItemForm(true)}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Annuler
                              </Button>
                              <Button onClick={handleUpdateFoodItem} disabled={loading}>
                                {loading ? 'Mise à jour...' : 'Mettre à jour'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action supprimera définitivement le plat "{item.name}".
                              Cette action ne peut pas être annulée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteFoodItem(item.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Aperçu du plat</DialogTitle>
          </DialogHeader>
          {previewFoodItem && (
            <div className="py-4 space-y-4">
              <div className="rounded-md overflow-hidden w-full h-64">
                <img 
                  src={previewFoodItem.image} 
                  alt={previewFoodItem.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{previewFoodItem.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm bg-primary text-white px-2 py-0.5 rounded">
                    {previewFoodItem.category}
                  </span>
                  <span className="font-semibold">{previewFoodItem.price.toFixed(2)} €</span>
                </div>
                <p className="mt-2 text-gray-600">{previewFoodItem.description}</p>
                {previewFoodItem.is_special && (
                  <p className="mt-2 text-green-600 font-medium">✓ Plat spécial</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
