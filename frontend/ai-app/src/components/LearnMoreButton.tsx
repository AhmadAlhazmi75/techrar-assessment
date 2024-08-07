import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

export const LearnMoreButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-neutral-950">
      <button
        className="rounded-md px-4 py-2 text-zinc-100 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]"
      onClick={() => setOpen(true)}
    >
      Learn More
    </button>

      <DragCloseDrawer open={open} setOpen={setOpen}>
      <div className="mx-auto max-w-2xl space-y-4 text-neutral-400">
    <h2 className="text-4xl font-bold text-neutral-200">
      Techrar Assessment Project: AI-Powered Ticketing System
    </h2>
    <p>
      Welcome to the Techrar Assessment Project, a cutting-edge ticketing system
      that leverages artificial intelligence to streamline support processes and
      enhance user experience.
    </p>
    <p>
      At its core, our system combines a robust ticketing platform with an
      AI-powered question-answering service, providing efficient and accurate
      solutions to user queries.
    </p>
    <p>
      The backbone of our project is built on a modern tech stack, featuring
      Django and Django Ninja for a powerful backend, coupled with a responsive
      NextJS frontend. This combination ensures high performance and a seamless
      user interface.
    </p>
    <p>
      One of the key features of our system is the integration of CrewAI, which
      enables intelligent analysis of system-specific documentation. This allows
      for rapid and context-aware responses to user inquiries.
    </p>
    <p>
      Our ticketing system goes beyond basic functionality by incorporating
      AI-generated solutions. These solutions can be rated by administrators,
      allowing for continuous improvement and quality assurance.
    </p>
    <p>
      Security is a top priority in our project. We&apos;ve implemented a robust
      token-based authentication system, ensuring that user data and interactions
      are protected at all times.
    </p>
    <p>
      The project also features a flexible architecture that allows for easy
      integration of multiple documentation sources. This adaptability ensures
      that the AI can provide accurate answers across various systems and domains.
    </p>
    <p>
      For developers and system administrators, we&apos;ve provided comprehensive API
      documentation, detailing endpoints, request/response formats, and
      authentication methods. This makes it easy to integrate our system into
      existing workflows or extend its functionality.
    </p>
    <p>
      Looking ahead, we envision expanding the system&apos;s capabilities to include
      more advanced AI features, enhanced user feedback mechanisms, and integration
      with popular third-party tools and platforms.
    </p>
    <p>
      Whether you&apos;re a small team looking for an efficient support system or a
      large organization aiming to leverage AI in your customer service, our
      Techrar Assessment Project offers a scalable, intelligent solution to meet
      your needs.
    </p>
  </div>
      </DragCloseDrawer>
    </div>
  );
};

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

const DragCloseDrawer = ({ open, setOpen, children }: Props) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
