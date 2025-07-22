import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "@/utils/fetchUserProfile";

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    fetchUserProfile(userId)
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Carregando usuário...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!user) return <p>Nenhum usuário encontrado.</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Outros dados */}
    </div>
  );
}
