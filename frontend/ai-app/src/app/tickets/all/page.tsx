'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { TicketWithSolution } from '@/types/types';
import { likeAISolution, dislikeAISolution, getAllTickets } from '@/utils/api';
import { CornerGrid } from '@/components/CornerGrid';

export default function AllTickets() {
  const [tickets, setTickets] = useState<TicketWithSolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const fetchedTickets = await getAllTickets();
      console.log('Fetched tickets:', fetchedTickets);
      setTickets(fetchedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeToggle = async (solutionId: number) => {
    try {
      const response = await likeAISolution(solutionId);
      setTickets(prevTickets =>
        prevTickets.map(ticket => {
          if (ticket.ai_solution && ticket.ai_solution.id === solutionId) {
            return {
              ...ticket,
              ai_solution: {
                ...ticket.ai_solution,
                likes: response.likes,
                dislikes: response.dislikes
              }
            };
          }
          return ticket;
        })
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like. Please try again.');
    }
  };

  const handleDislikeToggle = async (solutionId: number) => {
    try {
      const response = await dislikeAISolution(solutionId);
      setTickets(prevTickets =>
        prevTickets.map(ticket => {
          if (ticket.ai_solution && ticket.ai_solution.id === solutionId) {
            return {
              ...ticket,
              ai_solution: {
                ...ticket.ai_solution,
                likes: response.likes,
                dislikes: response.dislikes
              }
            };
          }
          return ticket;
        })
      );
    } catch (error) {
      console.error('Error toggling dislike:', error);
      toast.error('Failed to update dislike. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center mt-8"
      >
        Loading tickets...
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen">
    <div className="absolute inset-0 overflow-hidden">
        <CornerGrid />
    </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 container mx-auto px-4 py-8"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-8 mt-28"
        >
          All Tickets
        </motion.h1>
        <AnimatePresence>
          {tickets.map((ticket: TicketWithSolution) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-800 p-6 rounded-lg shadow-lg mb-6"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-2"
              >
                {ticket.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-zinc-300 mb-4"
              >
                {ticket.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center mb-4"
              >
                <span className="text-zinc-400">Priority: {ticket.priority}</span>
                <span className="text-zinc-400">Status: {ticket.status}</span>
              </motion.div>
              {ticket.ai_solution ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-4 bg-zinc-700 p-4 rounded"
                >
                  <h3 className="text-xl font-semibold mb-2">AI Solution</h3>
                  <p className="text-zinc-300 mb-2">{ticket.ai_solution.solution}</p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-end space-x-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLikeToggle(ticket.ai_solution!.id)}
                      className={`px-2 py-1 ${ticket.ai_solution.likes > 0 ? 'bg-green-700' : 'bg-green-600'} text-white rounded hover:bg-green-700 transition duration-300`}
                    >
                      {ticket.ai_solution.likes > 0 ? 'Unlike' : 'Like'} ({ticket.ai_solution.likes})
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDislikeToggle(ticket.ai_solution!.id)}
                      className={`px-2 py-1 ${ticket.ai_solution.dislikes > 0 ? 'bg-red-700' : 'bg-red-600'} text-white rounded hover:bg-red-700 transition duration-300`}
                    >
                      {ticket.ai_solution.dislikes > 0 ? 'Undislike' : 'Dislike'} ({ticket.ai_solution.dislikes})
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-zinc-400 mt-2"
                >
                  No AI solution available for this ticket.
                </motion.p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
