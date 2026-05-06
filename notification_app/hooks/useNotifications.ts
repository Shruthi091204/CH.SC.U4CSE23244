import { useState, useEffect, useCallback } from 'react';
import { Notification, NotificationType } from '../types/notification';
import { Log } from '../utils/logger';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjaC5zYy51NGNzZTIzMjQ0QGNoLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjMxNTcsImlhdCI6MTc3ODA2MjI1NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ4ZmZjMDhkLTZkNWEtNDg3Zi1iYmNkLTNlM2U3MWQxZWU3ZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNocnV0aGlrYSByYWphbiIsInN1YiI6IjQ4NjkzNzY4LWFmNjYtNDZhMS1hODRkLTM5MDNkOThlZjdjYyJ9LCJlbWFpbCI6ImNoLnNjLnU0Y3NlMjMyNDRAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJzaHJ1dGhpa2EgcmFqYW4iLCJyb2xsTm8iOiJjaC5zYy51NGNzZTIzMjQ0IiwiYWNjZXNzQ29kZSI6IlBUQk1tUSIsImNsaWVudElEIjoiNDg2OTM3NjgtYWY2Ni00NmExLWE4NGQtMzkwM2Q5OGVmN2NjIiwiY2xpZW50U2VjcmV0IjoiSHNtcFFCaEZ2WmRZQndGTiJ9.-k-NibzqO6XC-7APfVXxu0DpGzCv6_nU6FKNl-y9ltc";
const API_URL = "/api/notifications";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('read_notifications');
    if (saved) {
      setReadIds(new Set(JSON.parse(saved)));
    }
  }, []);

  const fetchNotifications = useCallback(async (params: { limit?: number; page?: number; type?: string } = {}) => {
    setLoading(true);
    setError(null);
    Log("frontend", "info", "hook", "loading notifications");

    try {
      const query = new URLSearchParams();
      if (params.limit) query.append('limit', params.limit.toString());
      if (params.page) query.append('page', params.page.toString());
      if (params.type && params.type !== 'All') query.append('notification_type', params.type);

      const response = await fetch(`${API_URL}?${query.toString()}`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const list = data.notifications || [];
      setNotifications(list);
      Log("frontend", "info", "api", "data fetched successfully");
    } catch (err: any) {
      setError(err.message);
      Log("frontend", "error", "api", "failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = (id: string) => {
    const newReadIds = new Set(readIds).add(id);
    setReadIds(newReadIds);
    localStorage.setItem('read_notifications', JSON.stringify(Array.from(newReadIds)));
    Log("frontend", "info", "state", "notification read");
  };

  const getPriorityNotifications = (n: number, typeFilter: string) => {
    const weights: Record<NotificationType, number> = {
      "Placement": 3,
      "Result": 2,
      "Event": 1
    };

    return [...notifications]
      .filter(n => typeFilter === 'All' || n.Type === typeFilter)
      .sort((a, b) => {
        const weightA = weights[a.Type] || 0;
        const weightB = weights[b.Type] || 0;
        if (weightA !== weightB) return weightB - weightA;
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      })
      .slice(0, n);
  };

  return {
    notifications,
    loading,
    error,
    readIds,
    fetchNotifications,
    markAsRead,
    getPriorityNotifications
  };
};
