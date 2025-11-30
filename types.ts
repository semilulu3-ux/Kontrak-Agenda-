import React from 'react';

export interface UserAccount {
  name: string;
  price: string;
  benefit: string;
  expiryMinutes: number;
  phoneNumber?: string;
  agendaNumber?: string;
  dob?: string;
  city?: string;
  profileImage?: string; // New field for profile picture
}

export interface ContractStep {
  label: string;
  description: string;
  status: 'Done' | 'Pending' | 'Failed';
  key: string; // for React keys
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}