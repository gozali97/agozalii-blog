import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSetting {
  key: string;
  value: string | null;
  label: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

// Get all settings as key-value object
export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      const settings: Record<string, string> = {};
      (data as SiteSetting[]).forEach((setting) => {
        settings[setting.key] = setting.value || "";
      });

      return settings;
    },
  });
};

// Get all settings as array with full details
export const useAllSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as SiteSetting[];
    },
  });
};

// Get single setting value
export const useSiteSetting = (key: string) => {
  return useQuery({
    queryKey: ["site-setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();

      if (error) throw error;
      return data?.value || "";
    },
  });
};

// Update a setting
export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings-all"] });
    },
  });
};

// Create a new setting
export const useCreateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (setting: {
      key: string;
      label: string;
      value: string;
      type: string;
    }) => {
      const { error } = await supabase.from("site_settings").insert({
        key: setting.key,
        label: setting.label,
        value: setting.value,
        type: setting.type,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings-all"] });
    },
  });
};

// Delete a setting
export const useDeleteSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase
        .from("site_settings")
        .delete()
        .eq("key", key);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings-all"] });
    },
  });
};
