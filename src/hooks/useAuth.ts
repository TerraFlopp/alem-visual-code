import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // loading stays true until BOTH the session is restored AND the role check completes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkRole(userId: string) {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (!mounted) return;
      if (error) {
        console.error("Role check failed", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
      setLoading(false);
    }

    // Listener FIRST so we don't miss any event
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (!mounted) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setLoading(true);
        // Defer to avoid potential deadlock inside the auth callback
        setTimeout(() => {
          if (mounted) checkRole(sess.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Then restore from storage
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      if (!mounted) return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        checkRole(sess.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading };
}