'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '@/utils/api';
import { TicketWithSolution } from '@/types/types';





export default function AllTickets() {
  const [tickets, setTickets] = useState<TicketWithSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/tickets/tickets');
      console.log('Fetched tickets:', response.data);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeToggle = async (solutionId: number) => {
    try {
      await api.post(`/tickets/ai-solutions/${solutionId}/like`);
      fetchTickets(); // Refresh tickets after liking
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like. Please try again.');
    }
  };

  const handleDislikeToggle = async (solutionId: number) => {
    try {
      await api.post(`/tickets/ai-solutions/${solutionId}/dislike`);
      fetchTickets();
    } catch (error) {
      console.error('Error toggling dislike:', error);
      toast.error('Failed to update dislike. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading tickets...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-3xl font-bold mb-6">All Tickets</h1>
      {tickets.map((ticket: TicketWithSolution) => (
  <motion.div
    key={ticket.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-6"
  >
    <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
    <p className="text-zinc-300 mb-4">{ticket.description}</p>
    <div className="flex justify-between items-center mb-4">
      <span className="text-zinc-400">Priority: {ticket.priority}</span>
      <span className="text-zinc-400">Status: {ticket.status}</span>
    </div>
    {ticket.ai_solution ? (
      <div className="mt-4 bg-zinc-700 p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">AI Solution</h3>
        <p className="text-zinc-300 mb-2">{ticket.ai_solution.solution}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleLikeToggle(ticket.ai_solution!.id)}
            className={`px-2 py-1 ${ticket.ai_solution.likes > 0 ? 'bg-green-700' : 'bg-green-600'} text-white rounded hover:bg-green-700 transition duration-300`}
          >
            {ticket.ai_solution.likes > 0 ? 'Unlike' : 'Like'} ({ticket.ai_solution.likes})
          </button>
          <button
            onClick={() => handleDislikeToggle(ticket.ai_solution!.id)}
            className={`px-2 py-1 ${ticket.ai_solution.dislikes > 0 ? 'bg-red-700' : 'bg-red-600'} text-white rounded hover:bg-red-700 transition duration-300`}
          >
            {ticket.ai_solution.dislikes > 0 ? 'Undislike' : 'Dislike'} ({ticket.ai_solution.dislikes})
          </button>
        </div>
      </div>
    ) : (
      <p className="text-zinc-400 mt-2">No AI solution available for this ticket.</p>
    )}
  </motion.div>
))}
    </div>
  );
}
