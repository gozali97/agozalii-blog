import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  useAllSiteSettings,
  useUpdateSiteSetting,
  useCreateSiteSetting,
  useDeleteSiteSetting,
} from "@/hooks/useSiteSettings";

interface SettingFormData {
  key: string;
  label: string;
  value: string;
  type: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: settings, isLoading, error } = useAllSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const createSetting = useCreateSiteSetting();
  const deleteSetting = useDeleteSiteSetting();

  const [editedSettings, setEditedSettings] = useState<Record<string, string>>(
    {}
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSetting, setNewSetting] = useState<SettingFormData>({
    key: "",
    label: "",
    value: "",
    type: "text",
  });

  useEffect(() => {
    if (settings) {
      const initial: Record<string, string> = {};
      settings.forEach((s) => {
        initial[s.key] = s.value || "";
      });
      setEditedSettings(initial);
    }
  }, [settings]);

  const handleValueChange = (key: string, value: string) => {
    setEditedSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    try {
      await updateSetting.mutateAsync({
        key,
        value: editedSettings[key],
      });
      toast({
        title: "Setting updated",
        description: `"${key}" has been saved successfully.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update setting. Check RLS policies.",
        variant: "destructive",
      });
    }
  };

  const handleAddSetting = async () => {
    if (!newSetting.key || !newSetting.label) {
      toast({
        title: "Validation Error",
        description: "Key and Label are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createSetting.mutateAsync(newSetting);
      toast({
        title: "Setting created",
        description: `"${newSetting.label}" has been added.`,
      });
      setNewSetting({ key: "", label: "", value: "", type: "text" });
      setIsAddDialogOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create setting. Check RLS policies.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSetting = async (key: string) => {
    try {
      await deleteSetting.mutateAsync(key);
      toast({
        title: "Setting deleted",
        description: `"${key}" has been removed.`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete setting. Check RLS policies.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="text-destructive">Error loading settings</p>
        <Button onClick={() => navigate("/admin/dashboard")} className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Site Settings
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your site configuration
              </p>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Setting
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Setting</DialogTitle>
                <DialogDescription>
                  Create a new site configuration setting.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-key">Key</Label>
                  <Input
                    id="new-key"
                    placeholder="e.g., site_name"
                    value={newSetting.key}
                    onChange={(e) =>
                      setNewSetting({ ...newSetting, key: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-label">Label</Label>
                  <Input
                    id="new-label"
                    placeholder="e.g., Site Name"
                    value={newSetting.label}
                    onChange={(e) =>
                      setNewSetting({ ...newSetting, label: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-type">Type</Label>
                  <Select
                    value={newSetting.type}
                    onValueChange={(value) =>
                      setNewSetting({ ...newSetting, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-value">Initial Value</Label>
                  <Input
                    id="new-value"
                    placeholder="Optional initial value"
                    value={newSetting.value}
                    onChange={(e) =>
                      setNewSetting({ ...newSetting, value: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSetting}
                  disabled={createSetting.isPending}
                >
                  {createSetting.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Setting
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Author Profile Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Author Profile</CardTitle>
            </div>
            <CardDescription>
              Update your profile photo for the About page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <ImageUpload
                  value={editedSettings["author_avatar"] || ""}
                  onChange={(url) => handleValueChange("author_avatar", url)}
                  bucket="profile-images"
                  folder="avatars"
                  label="Profile Photo"
                  aspectRatio="square"
                />
                <Button
                  onClick={() => handleSave("author_avatar")}
                  disabled={
                    updateSetting.isPending ||
                    editedSettings["author_avatar"] ===
                      (settings?.find((s) => s.key === "author_avatar")
                        ?.value || "")
                  }
                  className="mt-4 w-full"
                >
                  {updateSetting.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Profile Photo
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Author Name</Label>
                  <div className="flex gap-2">
                    <Input
                      value={editedSettings["author_name"] || ""}
                      onChange={(e) =>
                        handleValueChange("author_name", e.target.value)
                      }
                      placeholder="Your name"
                    />
                    <Button
                      onClick={() => handleSave("author_name")}
                      disabled={
                        updateSetting.isPending ||
                        editedSettings["author_name"] ===
                          (settings?.find((s) => s.key === "author_name")
                            ?.value || "")
                      }
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings List */}
        {settings && settings.length > 0 ? (
          <div className="space-y-4">
            {settings.map((setting) => (
              <Card key={setting.key}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{setting.label}</CardTitle>
                      <CardDescription className="font-mono text-xs">
                        {setting.key}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {setting.type}
                      </span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Setting</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{setting.label}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSetting(setting.key)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {setting.type === "textarea" ? (
                      <Textarea
                        value={editedSettings[setting.key] || ""}
                        onChange={(e) =>
                          handleValueChange(setting.key, e.target.value)
                        }
                        className="flex-1"
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={
                          setting.type === "url"
                            ? "url"
                            : setting.type === "email"
                            ? "email"
                            : "text"
                        }
                        value={editedSettings[setting.key] || ""}
                        onChange={(e) =>
                          handleValueChange(setting.key, e.target.value)
                        }
                        className="flex-1"
                      />
                    )}
                    <Button
                      onClick={() => handleSave(setting.key)}
                      disabled={
                        updateSetting.isPending ||
                        editedSettings[setting.key] === (setting.value || "")
                      }
                    >
                      {updateSetting.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-muted-foreground">
                No settings configured yet.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Setting
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Settings;
