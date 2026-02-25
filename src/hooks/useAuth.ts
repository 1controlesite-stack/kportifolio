import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let adminCheckSequence = 0;
    const initialLoadDone = { current: false };

    const setBaseAuthState = (nextSession: Session | null) => {
      if (!isMounted) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    };

    const finishAsLoggedOut = () => {
      if (!isMounted) return;
      setIsAdmin(false);
      initialLoadDone.current = true;
      setLoading(false);
    };

    const checkAdmin = async (userId: string, sequence: number) => {
      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: userId,
          _role: "admin",
        });

        if (error) throw error;
        if (!isMounted || sequence !== adminCheckSequence) return;

        setIsAdmin(!!data);
      } catch (error) {
        console.error("Erro ao validar permissão admin:", error);
        if (!isMounted || sequence !== adminCheckSequence) return;

        setIsAdmin(false);
      } finally {
        if (!isMounted || sequence !== adminCheckSequence) return;
        initialLoadDone.current = true;
        setLoading(false);
      }
    };

    const syncAuthState = (nextSession: Session | null) => {
      setBaseAuthState(nextSession);

      if (!nextSession?.user) {
        finishAsLoggedOut();
        return;
      }

      const sequence = ++adminCheckSequence;
      if (isMounted && !initialLoadDone.current) setLoading(true);
      void checkAdmin(nextSession.user.id, sequence);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      syncAuthState(nextSession);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session: currentSession } }) => {
        syncAuthState(currentSession);
      })
      .catch((error) => {
        console.error("Erro ao recuperar sessão:", error);
        setBaseAuthState(null);
        finishAsLoggedOut();
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  return { user, session, loading, isAdmin, signIn, signOut };
}

