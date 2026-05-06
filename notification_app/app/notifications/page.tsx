'use client';

import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Box, Select, MenuItem, 
  FormControl, InputLabel, Pagination, CircularProgress, Alert 
} from '@mui/material';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationCard } from '@/components/NotificationCard';
import { Log } from '@/utils/logger';

export default function NotificationsPage() {
  const { notifications, loading, error, readIds, fetchNotifications, markAsRead } = useNotifications();
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');
  const limit = 10;

  useEffect(() => {
    fetchNotifications({ page, limit, type });
    Log("frontend", "info", "page", "notifications page load");
  }, [page, type, fetchNotifications]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>All Notifications</Typography>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select value={type} label="Type" onChange={handleTypeChange}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Typography align="center" color="text.secondary" my={8}>
              No notifications found for this selection.
            </Typography>
          ) : (
            <Box>
              {notifications.map((n) => (
                <NotificationCard 
                  key={n.ID} 
                  notification={n} 
                  isRead={readIds.has(n.ID)} 
                  onRead={markAsRead}
                />
              ))}
            </Box>
          )}

          <Box display="flex" justifyContent="center" mt={4} mb={8}>
            <Pagination 
              count={10}
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </>
      )}
    </Container>
  );
}
