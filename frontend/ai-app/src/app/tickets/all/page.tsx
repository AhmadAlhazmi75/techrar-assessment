'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllTickets, likeAISolution, dislikeAISolution } from '@/utils/api';
import { Ticket, AISolution } from '@/app/tickets/page';
import ProtectedRoute from '@/components/ProtectedRoute';
interface TicketWithSolutions extends Ticket {
  ai_solutions: AISolution[];
}

export default function AllTickets() {
  const [tickets, setTickets] = useState<TicketWithSolutions[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets();
        setTickets(fetchedTickets);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };

    fetchTickets();

  }, []);

  const handleLikeToggle = async (solutionId: number) => {
    try {
      const response = await likeAISolution(solutionId);
      const updatedTickets = tickets.map(ticket => ({
        ...ticket,
        ai_solutions: ticket.ai_solutions.map(solution =>
          solution.id === solutionId ? { ...solution, likes: response.likes, dislikes: response.dislikes } : solution
        )
      }));
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Failed to toggle like for solution:', error);
    }
  };

  const handleDislikeToggle = async (solutionId: number) => {
    try {
      const response = await dislikeAISolution(solutionId);
      const updatedTickets = tickets.map(ticket => ({
        ...ticket,
        ai_solutions: ticket.ai_solutions.map(solution =>
          solution.id === solutionId ? { ...solution, likes: response.likes, dislikes: response.dislikes } : solution
        )
      }));
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Failed to toggle dislike for solution:', error);
    }
  };

  return (
    <ProtectedRoute forAdmin={true}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 bg-zinc-950 text-zinc-200 min-h-screen mt-36"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        All Tickets
      </motion.h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {tickets.map((ticket) => (
          <motion.div
            key={ticket.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 p-4 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
            <p className="text-zinc-400 mb-2">{ticket.description}</p>
            <p className="text-sm text-zinc-500 mb-4">Priority: {ticket.priority}</p>
            {ticket.ai_solutions?.map((solution) => (
              <div key={solution.id} className="mt-4 bg-zinc-800 p-3 rounded">
                <p className="text-zinc-300 mb-2">{solution.solution}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleLikeToggle(solution.id)}
                    className={`px-2 py-1 ${solution.likes > 0 ? 'bg-green-700' : 'bg-green-600'} text-white rounded hover:bg-green-700 transition duration-300`}
                  >
                    {solution.likes > 0 ? 'Unlike' : 'Like'} ({solution.likes})
                  </button>
                  <button
                    onClick={() => handleDislikeToggle(solution.id)}
                    className={`px-2 py-1 ${solution.dislikes > 0 ? 'bg-red-700' : 'bg-red-600'} text-white rounded hover:bg-red-700 transition duration-300`}
                  >
                    {solution.dislikes > 0 ? 'Undislike' : 'Dislike'} ({solution.dislikes})
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </ProtectedRoute>
  );
}
