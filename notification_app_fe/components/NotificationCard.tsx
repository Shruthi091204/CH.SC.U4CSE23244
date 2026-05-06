'use client';

import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Badge } from '@mui/material';
import { Notification } from '../types/notification';
import { format } from 'date-fns';

interface Props {
  notification: Notification;
  isRead: boolean;
  onRead: (id: string) => void;
  rank?: number;
}

const typeColors: Record<string, "success" | "primary" | "warning"> = {
  Placement: "success",
  Result: "primary",
  Event: "warning"
};

export const NotificationCard: React.FC<Props> = ({ notification, isRead, onRead, rank }) => {
  return (
    <Card 
      onClick={() => onRead(notification.ID)}
      sx={{ 
        cursor: 'pointer',
        mb: 2,
        borderLeft: isRead ? 'none' : '5px solid #e91e63',
        backgroundColor: isRead ? 'inherit' : '#fff5f8',
        transition: '0.3s',
        '&:hover': { boxShadow: 6 }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            {rank && (
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mr: 1 }}>
                #{rank}
              </Typography>
            )}
            <Chip 
              label={notification.Type} 
              color={typeColors[notification.Type]} 
              size="small" 
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {format(new Date(notification.Timestamp), 'MMM dd, yyyy HH:mm')}
          </Typography>
        </Box>
        
        <Badge color="error" variant="dot" invisible={isRead} sx={{ width: '100%' }}>
          <Typography variant="body1" sx={{ fontWeight: isRead ? 'normal' : 'bold' }}>
            {notification.Message}
          </Typography>
        </Badge>
      </CardContent>
    </Card>
  );
};
