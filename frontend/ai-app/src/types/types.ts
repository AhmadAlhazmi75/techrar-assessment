import React from 'react';
export interface User {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
  }

export interface ProtectedRouteProps {
    children: React.ReactNode;
    forAdmin?: boolean;
  }

export interface PublicRouteProps {
    children: React.ReactNode;
    redirectIfAuthenticated?: boolean;
  }

export interface Message {
    text: string;
    isUser: boolean;
  }

  export interface Ticket {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    priority: string;
    status: string;
    assigned_to: number | null;
  }

  export interface AISolution {
    id: number;
    solution: string;
    created_at: string;
    likes: number;
    dislikes: number;
  }

 export interface TicketWithSolution extends Ticket {
    ai_solution?: AISolution;
  }

  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  }
