'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createTicket, generateAISolution } from '../../utils/api';
import toast from 'react-hot-toast';
import { Ticket, AISolution } from '@/types/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import {CornerGrid} from '@/components/CornerGrid';

  const SYSTEMS = [
    { value: 'system1', name: 'Do the work book' },
    { value: 'system2', name: 'Django Rest Framework' },
    { value: 'system3', name: 'System 3' },
  ];

  const getSystemName = (value: string) => {
    const system = SYSTEMS.find((s) => s.value === value);
    return system ? system.name : 'Unknown System';
  };

const Tickets: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('MEDIUM');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [aiSolution, setAiSolution] = useState<AISolution | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string>('system1');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newTicket = await createTicket(title, description, priority);
      setTicket(newTicket);
      const solution = await generateAISolution(newTicket.id, selectedSystem);
      setAiSolution(solution);
      toast.success('Ticket created and AI solution generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
};


  return (
    <ProtectedRoute>
      <div className="relative min-h-screen">
      <div className="z-1 overflow-hidden">
          <CornerGrid />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 container mx-auto p-4 bg-transparent text-zinc-200 min-h-screen mt-36"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Create a Ticket
          </motion.h1>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-zinc-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.input
              type="text"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 bg-zinc-800 text-zinc-200 rounded border border-zinc-700 focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-50"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 bg-zinc-800 text-zinc-200 rounded border border-zinc-700 focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-50"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.select
              value={priority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value)}
              className="w-full p-3 bg-zinc-800 text-zinc-200 rounded border border-zinc-700 focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-50"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </motion.select>
            <motion.select
              value={selectedSystem}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSystem(e.target.value)}
              className="w-full p-3 bg-zinc-800 text-zinc-200 rounded border border-zinc-700 focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-50"
              whileFocus={{ scale: 1.02 }}
            >
            {SYSTEMS.map((system) => (
              <option key={system.value} value={system.value}>
                {system.name}
              </option>
            ))}
            </motion.select>
            <motion.button
              type="submit"
              className="w-full p-3 bg-violet-600 text-white rounded hover:bg-violet-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Ticket
            </motion.button>
          </motion.form>

          {ticket && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-zinc-900 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Ticket Created</h2>
              <p><span className="font-semibold">Title:</span> {ticket.title}</p>
              <p><span className="font-semibold">Description:</span> {ticket.description}</p>
              <p><span className="font-semibold">Priority:</span> {ticket.priority}</p>
              <p><span className="font-semibold">System:</span> {getSystemName(selectedSystem)}</p>
              <p><span className="font-semibold">Assigned to:</span> {ticket.assigned_to ? 'You' : 'Unassigned'}</p>
            </motion.div>
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center mt-8"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 1, repeat: Infinity, ease: "linear" }
                }}
                className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {aiSolution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-zinc-900 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">AI Solution</h2>
              <p className="mb-4">{aiSolution.solution}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default Tickets;
