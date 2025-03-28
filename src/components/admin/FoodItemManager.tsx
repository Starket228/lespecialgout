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
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Pencil, Trash, Plus, Eye, Utensils, Check } from 'lucide-react';

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
  const isMobile = useIsMobile();

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
            className="border-primary/30 focus-visible:ring-primary"
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
            className="border-primary/30 focus-visible:ring-primary"
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
            className="border-primary/30 focus-visible:ring-primary"
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
            className="border-primary/30 focus-visible:ring-primary"
          />
        </div>
        
        <div>
          <Label htmlFor={`category-${isEdit ? 'edit' : 'new'}`}>Catégorie</Label>
          <Select
            value={item.category}
            onValueChange={(value) => handleSelectChange(value, 'category', isEdit)}
          >
            <SelectTrigger 
              id={`category-${isEdit ? 'edit' : 'new'}`}
              className="border-primary/30 focus:ring-primary"
            >
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg">
        <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" />
          <span>Gestion des Plats</span>
        </h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1 w-full sm:w-auto shadow-sm">
              <Plus size={16} />
              <span>Ajouter un plat</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau plat</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {renderFoodItemForm(false)}
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                Annuler
              </Button>
              <Button onClick={handleAddFoodItem} disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Ajout en cours...' : 'Ajouter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {foodItems.length === 0 ? (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Aucun plat trouvé. Ajoutez votre premier plat.</p>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="grid grid-cols-1 gap-4 p-1">
                {foodItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-transparent border-b">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex gap-1">
                        {item.is_special && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">Spécial</Badge>
                        )}
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">{item.price.toFixed(2)} €</Badge>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <div className="p-3 text-sm">
                        <p className="text-gray-600 line-clamp-2">{item.description}</p>
                        <p className="mt-2 text-sm font-semibold text-muted-foreground">{item.category}</p>
                      </div>
                      <div className="flex justify-end gap-2 p-3 border-t bg-gradient-to-r from-transparent to-muted/20">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPreviewFoodItem(item);
                            setIsPreviewDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditFoodItem({...item, price: item.price.toString()});
                            setIsEditDialogOpen(true);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                              <Trash size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-[90vw]">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action supprimera définitivement le plat "{item.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteFoodItem(item.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      ) : (
        <div className="overflow-hidden border rounded-lg shadow-md">
          <Table>
            <TableHeader className="bg-muted/30">
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
                  <TableRow key={item.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/30">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{item.price.toFixed(2)} €</TableCell>
                    <TableCell className="text-center">
                      {item.is_special ? (
                        <span className="inline-flex items-center text-green-600">
                          <Check size={16} className="mr-1" /> Oui
                        </span>
                      ) : "Non"}
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
                          className="hover:bg-muted/20"
                        >
                          <Eye size={16} />
                        </Button>
                        
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setEditFoodItem({...item, price: item.price.toString()})}
                              className="hover:bg-muted/20"
                            >
                              <Pencil size={16} />
                            </Button>
                          </DialogTrigger>
                          {editFoodItem && editFoodItem.id === item.id && (
                            <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-auto">
                              <DialogHeader>
                                <DialogTitle>Modifier le plat</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                {renderFoodItemForm(true)}
                              </div>
                              <DialogFooter className="flex-col sm:flex-row gap-2">
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
                                  Annuler
                                </Button>
                                <Button onClick={handleUpdateFoodItem} disabled={loading} className="w-full sm:w-auto">
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
      )}

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Aperçu du plat</DialogTitle>
          </DialogHeader>
          {previewFoodItem && (
            <div className="py-4 space-y-4">
              <div className="rounded-md overflow-hidden w-full h-48 sm:h-64 shadow-md">
                <img 
                  src={previewFoodItem.image} 
                  alt={previewFoodItem.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/orange/white?text=Image+non+disponible";
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{previewFoodItem.name}</h3>
                <div className="flex flex-wrap justify-between items-center mt-1 gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {previewFoodItem.category}
                  </Badge>
                  <span className="font-semibold text-lg">{previewFoodItem.price.toFixed(2)} €</span>
                </div>
                <p className="mt-2 text-gray-600">{previewFoodItem.description}</p>
                {previewFoodItem.is_special && (
                  <p className="mt-2 text-green-600 font-medium flex items-center gap-1">
                    <Check size={16} /> Plat spécial
                  </p>
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
