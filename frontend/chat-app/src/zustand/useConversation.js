// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const useConversation = create(
//   persist(
//     (set) => ({
//       selectedConversation: null,
//       setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
//       messages: [],
//       setMessages: (messages) => set({ messages: Array.isArray(messages) ? messages : [] }),
//     }),
//     {
//       name: 'conversation-storage', // Key for localStorage
//       partialize: (state) => ({ 
//         selectedConversation: state.selectedConversation 
//       }), // Only persist selectedConversation
//     }
//   )
// );

// export default useConversation;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useConversation = create(
  persist(
    (set, get) => ({
      selectedConversation: null,
      messages: [],
      
      // Set the entire messages array
      setMessages: (messages) => set({ 
        messages: Array.isArray(messages) ? messages : [] 
      }),
      
      // Add a single new message with deduplication
      addNewMessage: (newMessage) => {
        if (!newMessage?._id) return; // Validate message has ID
        
        set((state) => {
          // Check for duplicates
          const isDuplicate = state.messages.some(
            msg => msg._id === newMessage._id
          );
          
          if (isDuplicate) return state;
          
          return { 
            messages: [...state.messages, newMessage] 
          };
        });
      },
      
      // Clear messages when changing conversations
      clearMessages: () => set({ messages: [] }),
      
      // Set selected conversation
      setSelectedConversation: (selectedConversation) => {
        // Clear messages when conversation changes
        if (selectedConversation !== get().selectedConversation) {
          set({ 
            selectedConversation,
            messages: [] 
          });
        } else {
          set({ selectedConversation });
        }
      }
    }),
    {
      name: 'conversation-storage',
      partialize: (state) => ({ 
        selectedConversation: state.selectedConversation 
      }),
    }
  )
);

export default useConversation;