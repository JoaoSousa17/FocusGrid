import { supabase } from "./supabaseClient";

// Substitui base44.auth — mesma forma de chamadas (me/login/logout/...),
// mas sobre o Supabase Auth (JWT, refresh automático, OTP por email, OAuth Google).
export const auth = {
  async me() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw error || new Error("not_authenticated");
    return data.user;
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Regista com email+password. O Supabase envia um email de confirmação
  // (equivalente ao fluxo OTP descrito na documentação).
  async register(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async verifyOtp(email, token) {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
    if (error) throw error;
    return data;
  },

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async loginWithGoogle(redirectTo = window.location.origin) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw error;
    return data;
  },

  async requestPasswordReset(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async resetPassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  async logout() {
    await supabase.auth.signOut();
  },

  onAuthStateChange(callback) {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return () => data.subscription.unsubscribe();
  },
};
