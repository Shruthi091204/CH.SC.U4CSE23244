'use client';

import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Box, Select, MenuItem, 
  FormControl, InputLabel, CircularProgress, Alert 
} from '@mui/material';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationCard } from '@/components/NotificationCard';
import { Log } from '@/utils/logger';

export default function PriorityPage() {
  const { loading, error, readIds, fetchNotifications, markAsRead, getPriorityNotifications } = useNotifications();
  const [n, setN] = useState(10);
  const [type, setType] = useState('All');

  useEffect(() => {
    fetchNotifications({ limit: 100, page: 1 });
    Log("frontend", "info", "page", "priority page load");
  }, [fetchNotifications, n, type]);

  const handleNChange = (event: any) => {
    setN(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setType(event.target.value);
  };

  const priorityList = getPriorityNotifications(n, type);

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Priority Inbox</Typography>
        
        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Show Top</InputLabel>
            <Select value={n} label="Show Top" onChange={handleNChange}>
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={handleTypeChange}>
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {priorityList.length === 0 ? (
            <Typography align="center" color="text.secondary" my={8}>
              No priority notifications found.
            </Typography>
          ) : (
            priorityList.map((item, index) => (
              <NotificationCard 
                key={item.ID} 
                notification={item} 
                isRead={readIds.has(item.ID)} 
                onRead={markAsRead}
                rank={index + 1}
              />
            ))
          )}
        </Box>
      )}
    </Container>
  );
}
